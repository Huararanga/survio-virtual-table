import React, { useState, useCallback } from "react";
import { Box, Paper } from "@mui/material";
import { throttle } from "throttle-debounce";
import { ColumnParams, TableData } from "../types";
import { getTableHeight, getTableWidth, getVisibleBoundaries } from "./utils";
import Row from "./Row";
import Header from "./Header";

const ROW_HEIGHT = 24;
const TABLE_HEIGHT = 500;
const SCROLLBAR_WIDTH = 18;
const SCROLL_DELAY = 5;

export type TableProps = {
  data: TableData;
  columns: ColumnParams;
};

function Table({ data, columns }: TableProps) {
  const rowCount = data.length;

  const [scrollTop, setScrollTop] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onScroll = useCallback(
    throttle(SCROLL_DELAY, (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
      const scroll = event.currentTarget?.scrollTop;
      if (scroll !== undefined) {
        setScrollTop(Math.round(scroll));
      }
    }),
    []
  );

  const [topVisibleIndex, bottomVisibleIndex] = getVisibleBoundaries(
    TABLE_HEIGHT,
    ROW_HEIGHT,
    scrollTop
  );

  return (
    <Paper sx={{ padding: '1rem', width: 'fit-content' }}>
      <Header columns={columns} />
      <Box
        sx={{
          overflowY: "auto",
          userSelect: "none",
          height: TABLE_HEIGHT,
          width: getTableWidth(columns) + SCROLLBAR_WIDTH,
        }}
        onScroll={onScroll}
      >
        <Box
          sx={{
            position: "relative",
            height: getTableHeight(ROW_HEIGHT, rowCount),
          }}
        >
          {data
            .slice(topVisibleIndex, bottomVisibleIndex)
            .map((row, sliceIndex) => {
              const rowIndex = topVisibleIndex + sliceIndex;
              return (
                <Row
                  key={rowIndex}
                  row={row}
                  height={ROW_HEIGHT}
                  top={rowIndex * ROW_HEIGHT}
                  columns={columns}
                />
              );
            })}
        </Box>
      </Box>
    </Paper>
  );
}

export default Table;
