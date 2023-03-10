export type PlayerType = "R" | "Y";
export type PlayerOrNullType = null | PlayerType;
export type WinnerPlayerType = PlayerOrNullType | "STALEMATE";
export type RowCountType = 1 | 2 | 3 | 4 | 5 | 6;
export type ColumnCountType = RowCountType | 7;

// https://stackoverflow.com/questions/41139763/how-to-declare-a-fixed-length-array-in-typescript
type Grow<T, A extends Array<T>> = ((x: T, ...xs: A) => void) extends (
  ...a: infer X
) => void
  ? X
  : never;
type GrowToSize<T, A extends Array<T>, N extends number> = {
  0: A;
  1: GrowToSize<T, Grow<T, A>, N>;
}[A["length"] extends N ? 0 : 1];

export type FixedLengthArray<T, N extends number> = GrowToSize<T, [], N>;

export type ColumnType = FixedLengthArray<PlayerOrNullType, 6>;

export type BoardType = FixedLengthArray<ColumnType, 7>;
