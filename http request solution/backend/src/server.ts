import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { ChessManager } from './shared/chessManager'; 
import cors from 'cors';

const app = express();
const PORT = 3001; // You can choose any port you like
// Use CORS middleware before defining routes
app.use(cors({
    origin: '*'
}));


// Middleware to parse JSON requests
app.use(express.json());

let games = {};
let nextGameId = 1;

app.post('/new-game', (req, res) => {
    const gameId = nextGameId++;
    const newGame = new ChessManager();
    games[gameId] = newGame;
    res.json({ gameId });
});

// Endpoint to make a move
app.post('/move', (req, res) => {
    const { gameId, from, to } = req.body;
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const move = game.move({ from, to });
    if (move) {
        res.json({ status: 'success', board: game.ascii() });
    } else {
        res.json({ status: 'error', message: 'Invalid move' });
    }
});

// Endpoint to get the board state
app.get('/board/:gameId', (req, res) => {
    const game = games[req.params.gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const board = game.getBoard();
    console.log("Sending board state:", board);
    res.json(board);
});

// Endpoint to check if it's in check
app.get('/check/:gameId', (req, res) => {
    const game = games[req.params.gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const isInCheck = game.isInCheck();
    res.json({ inCheck: isInCheck });
});

// Endpoint to check if it's checkmate
app.get('/checkmate/:gameId', (req, res) => {
    const game = games[req.params.gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const isInCheckmate = game.isInCheckmate();
    res.json({ inCheckmate: isInCheckmate });
});

// Endpoint to get legal moves for a particular square
app.get('/legal-moves/:gameId', (req, res) => {
    const { square } = req.body;
    const game = games[req.params.gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    const legalMoves = game.getLegalMoves(square);
    res.json({ legalMoves });
});

// Endpoint to reset the game
app.post('/reset/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    const game = games[gameId];
    if (!game) {
        return res.status(404).json({ message: 'Game not found' });
    }
    games[gameId] = new ChessManager();
    res.json({ status: 'success', message: 'Game reset' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);  // Log the error stack trace for debugging
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong on the server! 🚨 Please try again later.',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});