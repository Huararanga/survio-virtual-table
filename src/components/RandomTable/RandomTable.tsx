import React, { useState, useEffect, useCallback } from "react";
import { Stack } from "@mui/material";
import Controls from "./Controls/Controls";
import { generateData, getColumnParams, sortData } from "./utils";
import { SortType, TableData, TableParams, ColumnParams } from "./types";
import Table from "./Table/Table";

function RandomTable() {
  const [tableParams, setTableParams] = useState<TableParams>({
    rows: 0,
    columns: 0,
  });

  const [sortState, setSortState] = useState<SortType>(SortType.DEFAULT);

  const [tableData, setTableData] = useState<TableData>([]);
  
  const [columnParams, setColumnParams] = useState<ColumnParams>([]);

  const [sortedTableData, setSortedTableData] = useState<TableData>([]);

  const generateNewData = useCallback(
    (rows: number, columns: number, sortState: SortType) => {
      const data = generateData(rows, columns);
      setTableData(data);
      setSortedTableData(sortData(data, sortState));
      setColumnParams(getColumnParams(columns));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    []
  );

  useEffect(() => {
    generateNewData(tableParams.rows, tableParams.columns, sortState);
  }, [tableParams.rows, tableParams.columns, sortState, generateNewData]);

  useEffect(() => {
    setSortedTableData(sortData(tableData, sortState));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortState]);

  return (
    <Stack direction='column' spacing="1rem" margin="1rem">
      <Controls
        sortState={sortState}
        onGenerateClick={(params) => {
          if (
            params.rows === tableParams.rows &&
            params.columns === tableParams.columns
          ) {
            generateNewData(tableParams.rows, tableParams.columns, sortState);
          } else {
            setTableParams(params);
          }
        }}
        onSortClick={(sortState) => setSortState(sortState)}
      />
      {sortedTableData.length ? (
        <Table data={sortedTableData} columns={columnParams} />
      ) : null}
    </Stack>
  );
}

export default RandomTable;
