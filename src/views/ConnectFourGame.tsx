import Board from "../components/Board";
import ConnectFour from "../data/ConnectFour";
import { useRef, useState, useCallback } from "react";

const useConnectFour = () => {
  const gameRef = useRef<ConnectFour>();

  const [, updateState] = useState<{}>();
  const forceUpdate = useCallback(() => updateState({}), []);

  if (!gameRef.current) {
    gameRef.current = new ConnectFour({ updateUI: forceUpdate });
  }

  return gameRef.current;
};

const ConnectFourGame = () => {
  const game = useConnectFour();

  if(game.winnerPlayer) {
    return (
        <div onClick={game.resetGame}>{`${game.winnerPlayer} wins!`}</div>
    )
  }

  return (
    <div>
      <h1 className={"text-3xl text-center font-bold mb-2"}>Connect Four</h1>
      <div
        className={`text-5xl mb-4 text-center font-semibold`}
      >{`${game.getCurrentPlayerName()}'s Turn`}</div>
      <div className={`flex justify-center`}>
        <Board
          board={game.board}
          currentPlayer={game.currentPlayer}
          winnerPlayer={game.winnerPlayer}
          onColumnClick={game.takeTurn}
        />
      </div>
    </div>
  );
};

export default ConnectFourGame;
