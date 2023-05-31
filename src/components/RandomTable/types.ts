// SORT
export enum SortType {
    DEFAULT = 'default',
    ASC = 'asc',
    DESC = 'desc',
  }

export type SortTypeValues = `${SortType}`;

export type TableParams = { rows: number, columns: number };

// DATA
export type Digits = number; // 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type TableCellData = { value: Digits };

export type TableRowData = TableCellData[];

export type TableData = TableRowData[];

// COLUMNS
export type ColumnFormat = { evenColor: string; oddColor: string };

export type ColumnParam = { name: string, width: number, format: ColumnFormat };

export type ColumnParams = ColumnParam[];