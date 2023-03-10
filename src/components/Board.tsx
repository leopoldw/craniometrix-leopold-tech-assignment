import Chip from "./Chip";
import { BoardType, ColumnType, PlayerType, ColumnCountType } from "../types";

export const getColorForPlayer = (player: PlayerType) => {
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
  nextPlayer: PlayerType;
  onColumnClick: (column: ColumnCountType) => void;
};

const Board = ({ board, onColumnClick, nextPlayer }: BoardProps) => (
  <div className={"inline-block"}>
    <div className={`bg-blue-800 rounded-2xl p-3 flex border-[10px] ${getColorForPlayer(nextPlayer)}`}>
      {board.map((column: ColumnType, columnIndex: number) => (
        <div className={"px-3 cursor-pointer hover:bg-blue-700"} key={columnIndex} onClick={() => onColumnClick(columnIndex + 1 as ColumnCountType)}>
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
