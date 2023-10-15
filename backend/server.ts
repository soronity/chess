import express from 'express';
import { ChessManager } from './src/shared/chessManager'; 
import cors from 'cors';


const app = express();
const PORT = 3001; // You can choose any port you like
// Use CORS middleware before defining routes
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

let chessGame = new ChessManager();

// Middleware to parse JSON requests
app.use(express.json());

// Endpoint to make a move
app.post('/move', (req, res) => {
    const { from, to } = req.body;
    const isMoveValid = chessGame.move(from, to);
    if (isMoveValid) {
        res.json({ status: 'success', board: chessGame.getBoard() });
    } else {
        res.json({ status: 'error', message: 'Invalid move' });
    }
});

// Endpoint to get the current board state
app.get('/board', (req, res) => {
    res.json(chessGame.getBoard());
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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

