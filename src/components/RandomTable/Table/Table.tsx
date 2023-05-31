import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { ColumnParams, TableData } from "../types";
import { getCellPositions, getTableHeight, getTableWidth } from "./utils";
import { sumRow } from "../utils";

const ROW_HEIGHT = 24;
const ROW_HEIGHT_PX = `${ROW_HEIGHT}px`;
const TABLE_HEIGHT = 500;
const SCROLLBAR_WIDTH = 20;

export type TableProps = {
  data: TableData;
  columns: ColumnParams;
};

function Table({ data, columns }: TableProps) {
  const rowCount = data.length;
  const cellPositions = getCellPositions(columns);

  const [scrollTop, setScrollTop] = useState(0);
  console.log(scrollTop);
  return (
    <Box
      sx={{
        height: TABLE_HEIGHT,
        width: getTableWidth(columns) + SCROLLBAR_WIDTH,
        overflowY: "auto",
        backgroundColor: "blue",
      }}
      onScroll={(event) => {
        setScrollTop(event.currentTarget.scrollTop);
      }}
    >
      <Box
        sx={{
          height: getTableHeight(ROW_HEIGHT, rowCount),
          backgroundColor: "red",
          position: "relative",
        }}
      >
        {data.map((row, rowIndex) => {
          return (
            <Box
              key={rowIndex}
              sx={{
                position: "absolute",
                height: ROW_HEIGHT_PX,
                width: "100%",
                top: `${rowIndex * ROW_HEIGHT}px`,
                backgroundColor: "green",
              }}
            >
              {[...row, { value: sumRow(row) }].map((cell, columnIndex) => {
                const { value } = cell;
                return (
                  <span
                    key={columnIndex}
                    style={{
                      display: "inline-block",
                      backgroundColor: "yellow",
                      left: cellPositions[columnIndex],
                      width: `${columns[columnIndex].width}px`,
                    }}
                  >
                    {value}
                  </span>
                );
              })}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default Table;
