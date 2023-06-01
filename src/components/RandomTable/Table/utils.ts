import { ColumnParams } from "../types";

export function getTableHeight(rowHeight: number, rowCount: number) {
  return rowHeight * rowCount;
}

export function getTableWidth(columns: ColumnParams) {
  return columns.reduce((sum, current) => sum + current.width, 0);
}

export function getVisibleBoundaries(tableHeight: number, lineHeight: number, topPosition: number, around = 5) {
  const bottomPosition = topPosition + tableHeight;
  const topIndex = Math.floor(topPosition/lineHeight) - around;
  return [
    topIndex >= 0 ? topIndex : 0,
    Math.ceil(bottomPosition/lineHeight) + around,
  ];
}
