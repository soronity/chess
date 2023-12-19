// GameMenu.js
import React from 'react';

function GameMenu({ resetBoard, undoMove, openSettings}) {
  return (
    <div className="game-menu">
      <button onClick={resetBoard}>Reset Board</button>
      <button onClick={undoMove}>Undo Move</button>
      <button onClick={openSettings}>Settings</button>
    </div>
  );
}

export default GameMenu;
