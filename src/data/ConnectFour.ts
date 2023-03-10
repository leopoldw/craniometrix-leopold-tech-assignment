import { BoardType, PlayerType, ColumnCountType } from "../types";

type UpdateUIType = () => void;
type ConstructorPropsType = {
  updateUI: UpdateUIType;
};

const WIN_LENGTH = 4;

class ConnectFour {
  board: BoardType;
  nextPlayer: PlayerType;
  updateUI: UpdateUIType;

  constructor({ updateUI }: ConstructorPropsType) {
    this.board = this.createNewBoard();
    this.nextPlayer = this.randomlySelectPlayer();
    this.updateUI = updateUI;
  }

  createNewBoard = () => {
    // use .from to ensure that columns are new instances
    const board = Array.from({ length: 7 }, () => [
      ...Array(6).fill(null),
    ]) as BoardType;

    return board;
  };

  randomlySelectPlayer = () => {
    const players = ["R", "Y"];
    // https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
    const randomPlayer = players[
      Math.floor(Math.random() * players.length)
    ] as PlayerType;

    return randomPlayer;
  };

  takeTurn = (chosenColumn: ColumnCountType) => {
    this.addPlayerChip(chosenColumn);
    // this.calculateWinCondition();
    this.flipPlayer();
    this.updateUI();
  };

  addPlayerChip = (chosenColumn: ColumnCountType) => {
    const column = this.board[chosenColumn - 1];
    const nextEmptySpotIndex = column.lastIndexOf(null);

    if (nextEmptySpotIndex === -1) {
      // null not present in array
      throw new Error("This column is full, please select another column");
    }

    column[nextEmptySpotIndex] = this.nextPlayer;
  };

  flipPlayer = () => {
    this.nextPlayer = this.nextPlayer === "Y" ? "R" : "Y";
  };

  getNextPlayerName = () => {
    return this.nextPlayer === "Y" ? "Yellow" : "Red";
  };

  calculateWinCondition = () => {
    // for (const [columnIndex, column] of this.board.entries()) {
    //   for (const [rowIndex, row] of column.entries()) {
    //     console.log("test", columnIndex, rowIndex);
    //   }
    // }
    // vertical matches
    // for (const column of this.board) {
    //     let streak = []
    //     for (const [chip, index] of column.entries()) {
    //         if(!streak.length || streak.)
    //     }
    // }
  };
}

export default ConnectFour;
