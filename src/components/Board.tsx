import Chip from "./Chip";
import {
  BoardType,
  ColumnType,
  ColumnCountType,
  PlayerOrNullType,
} from "../types";

export const getColorForPlayer = (player: PlayerOrNullType) => {
  switch (player) {
    case "Y":
      return "border-yellow-300";
    case "R":
      return "border-red-500";
    default:
      return "border-white";
  }
};

type BoardProps = {
  board: BoardType;
  currentPlayer: PlayerOrNullType;
  gameIsOver: boolean;
  onColumnClick: (column: ColumnCountType) => void;
};

const Board = ({
  board,
  onColumnClick,
  currentPlayer,
  gameIsOver,
}: BoardProps) => (
  <div className={`inline-block ${gameIsOver ? 'opacity-50' : ''}`}>
    <div
      className={`bg-blue-800 rounded-2xl p-3 flex border-[10px] ${getColorForPlayer(
        currentPlayer
      )}`}
    >
      {board.map((column: ColumnType, columnIndex: number) => (
        <div
          className={`px-3 ${
            gameIsOver ? "" : "cursor-pointer"
          } hover:bg-blue-700`}
          key={columnIndex}
          onClick={
            gameIsOver
              ? undefined
              : () => onColumnClick((columnIndex + 1) as ColumnCountType)
          }
        >
          {column.map((spot, rowIndex) => (
            <div className={"py-3"} key={`${rowIndex}-${columnIndex}`}>
              <Chip player={spot} />
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default Board;
