import React, { useState, useCallback } from "react";
import { Stack } from "@mui/material";
import Controls from "./Controls/Controls";
import { generateData, getColumnParams, sortData, updateCell } from "./utils";
import {
  SortType,
  TableData,
  TableParams,
  ColumnParams,
  TableRowData,
  TableCellData,
} from "./types";
import Table from "./Table/Table";

type DataState = {
  data: TableData;
  columns: ColumnParams;
};

function RandomTable() {
  const [tableData, setTableData] = useState<DataState>({
    data: [],
    columns: [],
  });

  const [sortedTableData, setSortedTableData] = useState<TableData>([]);

  const [sortState, setSortState] = useState<SortType>(SortType.DEFAULT);

  const updateData = useCallback(
    (newData: DataState) => {
      setTableData(newData);
      setSortedTableData(sortData(newData.data, sortState));
    },
    [sortState]
  );

  const generateNewData = useCallback(
    (tableParams: TableParams) => {
      const { columns, rows } = tableParams;
      updateData({
        data: generateData(rows, columns),
        columns: getColumnParams(columns),
      });
    },
    [updateData]
  );

  const updateCellValue = useCallback(
    (row: TableRowData, cell: TableCellData) => {
      updateData({
        data: updateCell(tableData.data, row, cell),
        columns: tableData.columns,
      });
    },
    [tableData, updateData]
  );

  return (
    <Stack direction="column" spacing="1rem" margin="1rem">
      <Controls
        sortState={sortState}
        onGenerateClick={generateNewData}
        onSortClick={(sortState) => {
          setSortState(sortState);
          setSortedTableData(sortData(tableData.data, sortState));
        }}
      />
      {sortedTableData.length ? (
        <Table
          data={sortedTableData}
          columns={tableData.columns}
          updateCellValue={updateCellValue}
        />
      ) : null}
    </Stack>
  );
}

export default RandomTable;
