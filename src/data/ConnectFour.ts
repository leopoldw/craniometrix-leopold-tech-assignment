import {
  BoardType,
  PlayerType,
  ColumnCountType,
  RowCountType,
  PlayerOrNullType,
  BoardPositionType,
} from "../types";

type UpdateUIType = () => void;
type ConstructorPropsType = {
  updateUI: UpdateUIType;
};

type BoardSegmentType = [
  BoardPositionType,
  BoardPositionType,
  BoardPositionType,
  BoardPositionType
];

const COLUMNS = 7;
const ROWS = 7;
const WIN_LENGTH = 4;
const MAX_TURNS_TAKEN = COLUMNS * ROWS; // 42
const PLAYER_COUNT = 2;
const NOT_ENOUGH_TURNS_FOR_WIN = WIN_LENGTH * PLAYER_COUNT - 1;

class ConnectFour {
  board: BoardType;
  currentPlayer: PlayerOrNullType;
  updateUI: UpdateUIType;
  turnsTaken: number;
  winnerPlayer: PlayerOrNullType | "STALEMATE";

  constructor({ updateUI }: ConstructorPropsType) {
    this.board = this.createNewBoard();
    this.turnsTaken = 0;
    this.currentPlayer = this.randomlySelectPlayer();
    this.winnerPlayer = null;
    this.updateUI = updateUI;
  }

  resetGame = () => {
    this.constructor({ updateUI: this.updateUI });
  };

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
    if (!this.winnerPlayer) {
      const { addedColumn, addedRow } = this.addPlayerChip(chosenColumn);
      this.turnsTaken++;
      this.calculateWinCondition(addedColumn, addedRow);
      this.flipPlayer();
      this.updateUI();
    }
  };

  addPlayerChip = (
    chosenColumn: ColumnCountType
  ): { addedColumn: ColumnCountType; addedRow: RowCountType } => {
    const column = this.board[chosenColumn - 1];
    const nextEmptySpotIndex = column.lastIndexOf(null);

    if (nextEmptySpotIndex === -1) {
      // null not present in array
      throw new Error("This column is full, please select another column");
    }

    column[nextEmptySpotIndex] = this.currentPlayer;

    return {
      addedColumn: chosenColumn,
      addedRow: (nextEmptySpotIndex + 1) as RowCountType,
    };
  };

  flipPlayer = () => {
    if (this.winnerPlayer) {
      this.currentPlayer = null;
    } else {
      this.currentPlayer = this.currentPlayer === "Y" ? "R" : "Y";
    }
  };

  getCurrentPlayerName = () => {
    return this.currentPlayer === "Y" ? "Yellow" : "Red";
  };

  // to make things easier, allow arbritary numbers but return
  // 'undefined' if out of range from board (different from 'null')
  // co-ordinates start from top left as (1, 1)
  getValue = (column: number, row: number): BoardPositionType => {
    return this.board?.[column - 1]?.[row - 1];
  };

  calculateWinCondition = (column: ColumnCountType, row: RowCountType) => {
    // was going to get fancy with recursion here to
    // see if I could test all permutations across the board
    // to find a win, but we can actually cut down the calculations
    // needed every cycle considerably as we know exactly which space
    // is now occupied with a player chip

    // firstly, we don't need to check for any win conditions before one user has
    // taken their 4th  (see formula above in const)
    // if (this.turnsTaken < NOT_ENOUGH_TURNS_FOR_WIN) {
    //   return false;
    // }

    const winArrays = this.collectAllPossibleWinArrays(column, row);

    for (const array of winArrays) {
      const isWinner = this.confirmBoardSegmentWin(array);
      if (isWinner) {
        return;
      }
    }

    // finally, if no win is found and the board is full, declare stalemate
    if (this.turnsTaken >= MAX_TURNS_TAKEN) {
      this.declareStalemate();
    }
  };

  // iteration utility
  //   times = <P, C extends number>(
  //     count: number,
  //     func: (index: number) => P
  //   ): FixedLengthArray<P, C> => {
  //     return [...Array(count)].map((_, index) => func(index)) as FixedLengthArray<
  //       P,
  //       C
  //     >;
  //   };

  collectAllPossibleWinArrays = (
    column: ColumnCountType,
    row: RowCountType
  ) => {
    // shorthand
    const GV = this.getValue;
    const possibleWinArrays: BoardSegmentType[] = [];

    // calculate Y-axis winner possibility
    // there can never be an "up" winner possibility as bits are only
    // added to the top (only look down from central chip) - so only one Y axis possibility
    // but only need to look if at least 4 items in that column (row <= ROWS - WIN_LENGTH)
    if (row <= ROWS - WIN_LENGTH) {
      possibleWinArrays.push(
        Array.from({ length: 4 }, (_, index) =>
          GV(column, row + index)
        ) as BoardSegmentType
      );
    }

    // calculate X-axis winner possibility
    // there's only 4 it could (COLUMN_COUNT - WIN_LENGTH) be so add those to array
    const XAxis = Array.from(
      { length: 4 },
      (_, rootIndex) =>
        Array.from({ length: 4 }, (_, rowIndex) =>
          GV(1 + rootIndex + rowIndex, row)
        ) as BoardSegmentType
    );
    possibleWinArrays.push(...XAxis);

    // calculate forward-facing diagonal winner possibility
    // these do not happen if chip fell in top left of bottom right
    // corner of the board (ie: )

    return possibleWinArrays;
  };

  confirmBoardSegmentWin = (boardSegment: BoardSegmentType) => {
    const isWinner = boardSegment.every((chip) => chip === this.currentPlayer);

    if (isWinner) {
      this.winnerPlayer = this.currentPlayer;
    }

    return isWinner;
  };

  declareWinner = () => {
    this.winnerPlayer = this.currentPlayer;
  };

  declareStalemate = () => {
    this.winnerPlayer = "STALEMATE";
  };

  gameIsOver = () => this.winnerPlayer !== null;
}

export default ConnectFour;
