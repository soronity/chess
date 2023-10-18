import { Chess } from 'chess.js';

export class ChessManager {
    private game: any;

    constructor() {
      this.game = new Chess();
    }
  
    public move(from: string, to: string): boolean {
      const moveObj: any = {
        from,
        to
      };
  
      // Let's check and log the piece we're trying to move
      const piece = this.game.get(from);
      console.log(`Attempting to move piece from ${from} to ${to}:`, piece);
  
      if (piece && piece.type === 'p') {
        if (piece.color === 'w' && to[1] === '8') {
          moveObj.promotion = 'q';
        } else if (piece.color === 'b' && to[1] === '1') {
          moveObj.promotion = 'q';
        }
      }
  
      console.log("Move object:", moveObj);  // This log will help us see the move object before the move attempt.
  
      const move = this.game.move(moveObj);
      return move !== null;
    }
  
    
    // Get current board state
    public getBoard(): any {
        return this.game.board();
    }

    // Check if the current position is a check
    public isInCheck(): boolean {
        return this.game.inCheck();
    }

    // Check if the current position is a checkmate
    public isInCheckmate(): boolean {
        return this.game.isCheckmate();
    }

    // Check if the current position is a stalemate
    public isInStalemate(): boolean {
        return this.game.isStalemate();
    }

    // Check if the game has ended in a draw
    public isDraw(): boolean {
        return this.game.isDraw();
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
