import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Controls from "./Controls/Controls";
import { generateData, getColumnParams, sortData } from "./utils";
import {
  SortType,
  TableData,
  TableParams,
  ColumnParams,
} from "./types";
import Table from "./Table/Table";

function RandomTable() {
  const [sortState, setSortState] = useState<SortType>(SortType.DEFAULT);
  const [tableParams, setTableParams] = useState<TableParams>({
    rows: 0,
    columns: 0,
  });
  const [tableData, setTableData] = useState<TableData>([[]]);
  const [columnParams, setColumnParams] = useState<ColumnParams>([]);

  const [sortedTableData, setSortedTableData] = useState<TableData>([[]]);

  useEffect(() => {
    const data = generateData(tableParams.rows, tableParams.columns);
    setTableData(data)
    setSortedTableData(sortData(data, sortState))
    setColumnParams(getColumnParams(tableParams.columns))
  }, [tableParams.rows, tableParams.columns, sortState])

  useEffect(() => {
    setSortedTableData(sortData(tableData, sortState))
  }, [sortState])
  
  return (
    <Box margin="1rem">
      <Controls
        sortState={sortState}
        onGenerateClick={(params) => setTableParams(params)}
        onSortClick={(sortState) => setSortState(sortState)}
      />
      {tableData.length
        ? <Table data={sortedTableData} columns={columnParams}/>
        : null}
    </Box>
  );
}

export default RandomTable;
