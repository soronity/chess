export enum Colour {
  White = 'White',
  Black = 'Black'
}

abstract class Piece {
  colour: Colour;
  // ... other common properties and methods ...
}

export class Pawn extends Piece {
  possibleMoves(chessBoard: ChessBoard): number[] {
      // Implement pawn-specific logic here
  }
}

export class Rook extends Piece {
  possibleMoves(chessBoard: ChessBoard): number[] {
      // Implement rook-specific logic here
  }
}

// ... and so on for Bishop, Knight, Queen, King
