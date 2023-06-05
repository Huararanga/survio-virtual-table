import React from "react";
import { ColumnParam, TableCellData } from "../types";
import { getCellColor } from "./utils";

export type CellProps = {
  cell: TableCellData;
  columns: ColumnParam;
  onDoubleClick: () => void;
};

function Cell({
  cell,
  columns,
  onDoubleClick
}: CellProps) {
  const { value } = cell;

  return (
    <span
      style={{
        display: "inline-block",
        textAlign: 'center',
        color: getCellColor(value, columns.format),
        width: columns.width,
      }}
      onClick={(e) => {
        if (e.detail > 1) {
          onDoubleClick();
        }
      }}
    >
      {value}
    </span>
  );
}

export default Cell;
