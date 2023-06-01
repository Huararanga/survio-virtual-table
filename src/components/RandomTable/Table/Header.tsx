import React from "react";
import { ColumnParams } from "../types";
import { Box } from "@mui/material";

export type HeaderProps = {
  columns: ColumnParams;
};

function Header({ columns }: HeaderProps) {
  return (
    <Box borderBottom="1px solid">
      {columns.map((column) => (
        <span
          key={column.name}
          style={{
            display: "inline-block",
            width: column.width,
          }}
        >
          {column.name}
        </span>
      ))}
    </Box>
  );
}

export default Header;
