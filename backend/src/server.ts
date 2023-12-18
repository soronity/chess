import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { ChessManager } from './shared/chessManager';
import { Socket } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let chessGame = new ChessManager();
let players: Socket[] = [];
let turn = 0;

app.use(cors());

io.on('connection', (socket) => {
    console.log('New client connected, socket ID:', socket.id);

    if (players.length < 2) {
        players.push(socket);
        console.log(`Player connected, total players: ${players.length}`);
        socket.emit('playerNumber', players.length);
    } else {
        socket.emit('error', 'Two players are already connected');
        console.log('Connection attempt after max players reached');
        return;
    }

    const initialBoardState = chessGame.getBoard();
    console.log('Emitting initial board state:', initialBoardState);
    socket.emit('board', initialBoardState);

    socket.on('move', (data) => {
        if (socket !== players[turn]) {
            socket.emit('error', 'Not your turn');
            return;
        }

        const { from, to } = data;
        const isMoveValid = chessGame.move(from, to);

        if (isMoveValid) {
            turn = 1 - turn; // Switch turn
            io.emit('board', chessGame.getBoard());
        } else {
            socket.emit('error', 'Invalid move');
        }
    });

    socket.on('reset', () => {
        chessGame = new ChessManager(); // Create a new game state
        io.emit('board', chessGame.getBoard());
    });

    socket.on('undo', () => {
        const undoSuccessful = chessGame.undoMove();
        if (undoSuccessful) {
            io.emit('board', chessGame.getBoard());
        } else {
            socket.emit('error', 'No move to undo');
        }
    });
});

server.listen(3001, () => {
    console.log('listening on *:3001');
});