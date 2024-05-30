export type Columns<T> = Record<
  string,
  string | ((item: T, data: { isSmallDevice: boolean, idx: number }) => React.ReactNode)
>;
export type ColumnNames = string[] | undefined;
