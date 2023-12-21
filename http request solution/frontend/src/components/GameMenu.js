// GameMenu.js
import { useEffect } from "react";
import firebase from "firebase";
import React from "react";

function GameMenu({
  resetBoard,
  undoMove,
  saveGame,
  loadGame,
  openSettings,
}) {
  useEffect(() => {
    const gameRef = firebase.database().ref("games/gameId");
    const handleDataChange = (snapshot) => {
      const gameState = snapshot.val();
      // Update local game state here
    };

    // Attach the listener
    gameRef.on("value", handleDataChange);

    // Clean up the listener when the component is unmounted
    return () => {
      gameRef.off("value", handleDataChange);
    };
  }, []);

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
