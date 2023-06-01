import React, { memo, useState, useCallback, useEffect } from "react";
import { ColumnParams, TableRowData } from "../types";
import { Box } from "@mui/material";
import Cell from "./Cell";
import { createCell, generateValue, getRowSum } from "../utils";

export type RowProps = {
  row: TableRowData;
  height: number;
  top: number;
  columns: ColumnParams;
};

function Row({ row, height, columns, top }: RowProps) {
  const [currentSumRow, setCurrentSumRow] = useState(getRowSum(row));
  
  useEffect(() => {
    setCurrentSumRow(getRowSum(row));
  }, [row])

  const updateCellValue = useCallback((columnIndex: number) => {
    row[columnIndex].value = generateValue();
    setCurrentSumRow(getRowSum(row));
  }, [row])


  const rowWithSum = [...row, createCell(currentSumRow)];

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        borderBottom: '1px solid black',
        height,
        top,
      }}
    >
      {rowWithSum.map((cell, columnIndex) => {
        return (
          <Cell
            key={columnIndex}
            cell={cell}
            columnParams={columns[columnIndex]}
            onDoubleClick={() => updateCellValue(columnIndex)}
          />
        );
      })}
    </div>
  );
}

export default memo(Row);
