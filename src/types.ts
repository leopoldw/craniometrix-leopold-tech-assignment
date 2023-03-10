export type PlayerType = "R" | "Y";
export type PlayerOrNullType = null | PlayerType;
export type BoardPositionType = PlayerOrNullType | undefined;
export type WinnerPlayerType = PlayerOrNullType | "STALEMATE";
export type RowCountType = 1 | 2 | 3 | 4 | 5 | 6;
export type ColumnCountType = RowCountType | 7;

export type ColumnType = [
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType
]; //6

export type BoardType = [
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType
]; //7
