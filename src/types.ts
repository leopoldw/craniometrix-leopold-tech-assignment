export type PlayerType = "R" | "Y";
export type PlayerOrNullType = null | PlayerType;
export type ColumnCountType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type ColumnType = [
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType,
  PlayerOrNullType
]; // 6 rows

export type BoardType = [
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType,
  ColumnType
]; // 7 columns
