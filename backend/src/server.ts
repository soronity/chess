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

let chessGame = new ChessManager();

// Endpoint to make a move
app.post('/move', (req, res) => {
    console.log(req.body);
    const { from, to } = req.body;
    const isMoveValid = chessGame.move(from, to);
    if (isMoveValid) {
        res.json({ status: 'success', board: chessGame.getBoard() });
    } else {
        res.json({ status: 'error', message: 'Invalid move' });
    }
});

app.get('/board', (req, res) => {
    const board = chessGame.getBoard();
    console.log("Sending board state:", board);
    res.json(board);
});


// Endpoint to check if it's in check
app.get('/check', (req, res) => {
    const isInCheck = chessGame.isInCheck();
    res.json({ inCheck: isInCheck });
});

// Endpoint to check if it's checkmate
app.get('/checkmate', (req, res) => {
    const isInCheckmate = chessGame.isInCheckmate();
    res.json({ inCheckmate: isInCheckmate });
});

// Endpoint to get legal moves for a particular square
app.get('/legal-moves/:square', (req, res) => {
    const legalMoves = chessGame.getLegalMoves(req.params.square);
    res.json(legalMoves);
});

// Endpoint to reset the game
app.post('/reset', (req, res) => {
    chessGame.resetGame();
    res.json({ status: 'success', message: 'Game reset successfully!' });
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