// GameMenu.js
import React from 'react';

function GameMenu({ resetBoard, undoMove, saveGame, loadGame, openSettings, showHelp }) {
  return (
    <div className="game-menu">
      <button onClick={resetBoard}>Reset Board</button>
      <button onClick={undoMove}>Undo Move</button>
      <button onClick={saveGame}>Save Game</button>
      <button onClick={loadGame}>Load Game</button>
      <button onClick={openSettings}>Settings</button>
    </div>
  );
}

export default GameMenu;
