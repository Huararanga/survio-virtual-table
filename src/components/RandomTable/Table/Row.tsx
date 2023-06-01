import React, { memo } from "react";
import { ColumnParams, TableCellData, TableRowData } from "../types";
import Cell from "./Cell";
import { createCell, getRowSum } from "../utils";

export type RowProps = {
  row: TableRowData;
  height: number;
  top: number;
  columns: ColumnParams;
  updateCellValue: (row: TableRowData, cell: TableCellData) => void;
};

function Row({
  row,
  height,
  columns,
  top,
  updateCellValue,
}: RowProps) {
  const rowWithSum = [...row, createCell(getRowSum(row))];
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        borderBottom: "1px solid black",
        height,
        top,
      }}
    >
      {rowWithSum.map((cell, columnIndex) => (
          <Cell
            key={columnIndex}
            cell={cell}
            columnParams={columns[columnIndex]}
            onDoubleClick={() => updateCellValue(row, cell)}
          />
        ))}
    </div>
  );
}

export default memo(Row);
