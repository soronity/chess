import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { ChessManager } from './shared/chessManager';
import { Socket } from 'socket.io';

const app = express();
app.use(cors({ origin: 'http://localhost:3000' }));

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

const PORT = 3001;

let chessGame = new ChessManager();
let players: Socket[] = [];
let turn = 0;


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

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});