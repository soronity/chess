class ChessBoard {
  board: (Piece | null)[]; // Assuming a type 'Piece' exists which has 'colour' property

  constructor() {
      this.board = new Array(64).fill(null);
  }

  isTileInBounds(tile: number, indexColumn: number, indexRow: number): boolean {
      const tileColumn = tile % 8;
      const tileRow = Math.floor(tile / 8);
      return !(tileColumn < indexColumn - 1) 
          && !(indexColumn + 1 < tileColumn) 
          && !(tileRow < indexRow - 1) 
          && !(indexRow + 1 < tileRow);
  }

  isOpponentOrEmpty(tile: number, myColor: Colour): boolean {
      const piece = this.board[tile];
      return !piece || piece.colour !== myColor;
  }

  // We'll adapt each of the `possible_moves` methods in a similar manner.
  // I'll start with the Black Pawn as an example:
  blackPawnPossibleMoves(i: number): number[] | null {
      const possibleMoves: number[] = [];
      const indexColumn = i % 8;
      const indexRow = Math.floor(i / 8);
      const potentialDiagonalMoves = [i - 7, i - 9];
      
      for (const tile of potentialDiagonalMoves) {
          if (this.isTileInBounds(tile, indexColumn, indexRow)
              && this.board[tile]?.colour === "White") { // Assuming Colour is an enum or similar construct with "White" and "Black"
              possibleMoves.push(tile);
          }
      }
      
      if (!this.board[i - 8]) {
          possibleMoves.push(i - 8);
          if (!this.board[i - 16] && indexRow === 6) {
              possibleMoves.push(i - 16);
          }
      }

      return possibleMoves.length ? possibleMoves : null;
  }

  // ... Continue in a similar manner for rook, bishop, knight, queen, and king ...
}
