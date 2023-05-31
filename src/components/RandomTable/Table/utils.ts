import { ColumnParams } from "../types";

export function getTableHeight(rowHeight: number, rowCount: number) {
  return rowHeight * rowCount;
}

export function getTableWidth(columns: ColumnParams) {
  return columns.reduce((sum, current) => sum + current.width, 0);
}

export function getCellPositions(columns: ColumnParams) {
  return columns.reduce<number[]>((acc, current) => {
    return [
      ...acc,
      !acc.length ? 0 : acc[acc.length - 1] + current.width
    ]
  }, []);
}
