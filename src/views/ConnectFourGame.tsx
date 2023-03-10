import Board from "../components/Board";
import ConnectFour from "../data/ConnectFour";
import { useRef, useState, useCallback } from "react";

const useConnectFour = () => {
  const gameRef = useRef<ConnectFour>();

  // used to tie together React rendering logic with class-based
  // game logic - kinda weird but it works
  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  const resetGame = useCallback(() => {
    gameRef.current = new ConnectFour({ updateUI: forceUpdate });
    forceUpdate();
  }, []);

  if (!gameRef.current) {
    gameRef.current = new ConnectFour({ updateUI: forceUpdate });
  }

  return {
    game: gameRef.current,
    resetGame,
  };
};

const getWinningString = (playerNameOrStalemate: string) => {
  if (playerNameOrStalemate === "STALEMATE") {
    return "Stalemate - no winner!";
  } else {
    return `${playerNameOrStalemate} wins!!!`;
  }
};

const ConnectFourGame = () => {
  const { game, resetGame } = useConnectFour();

  return (
    <div>
      <h1 className={"text-3xl text-center font-bold mb-2"}>Connect Four</h1>
      <div className={`text-5xl mb-4 text-center font-semibold`}>
        {game.winnerPlayer
          ? getWinningString(game.winnerPlayer)
          : `${game.getCurrentPlayerName()}'s Turn`}
      </div>
      <div className={`flex justify-center mb-4`}>
        <Board
          board={game.board}
          currentPlayer={game.currentPlayer}
          gameIsOver={Boolean(game.winnerPlayer)}
          onColumnClick={game.takeTurn}
        />
      </div>
      {game.winnerPlayer && (
        <div className={`flex justify-center `}>
          <button onClick={resetGame} className={'text-2xl bg-blue-800 hover:bg-blue-600 rounded-xl text-white px-3 py-2 pointer'}>Play Again?</button>
        </div>
      )}
    </div>
  );
};

export default ConnectFourGame;
