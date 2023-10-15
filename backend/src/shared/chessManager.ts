import { Chess } from 'chess.js';

export class ChessManager {
    private game: any;

    constructor() {
      this.game = new Chess();
    }
  
    // Validate and make a move
    public move(from: string, to: string): boolean {
        const move = this.game.move({
            from,
            to,
            promotion: 'q'
        });
        return move !== null;
    }

    // Get current board state
    public getBoard(): any {
        return this.game.board();
    }

    // Check if the current position is a check
    public isInCheck(): boolean {
        return this.game.in_check();
    }

    // Check if the current position is a checkmate
    public isInCheckmate(): boolean {
        return this.game.in_checkmate();
    }

    // Check if the current position is a stalemate
    public isInStalemate(): boolean {
        return this.game.in_stalemate();
    }

    // Check if the game has ended in a draw
    public isDraw(): boolean {
        return this.game.in_draw();
    }

    // Get all legal moves for a piece on a square
    public getLegalMoves(square: string): any {
        return this.game.moves({ square, verbose: true });
    }

    // Reset the game to the initial position
    public resetGame(): void {
        this.game.reset();
    }

    // Additional methods as needed...
}
