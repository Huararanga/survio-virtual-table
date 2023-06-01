import { useState } from "react";
import { Button, Paper, TextField, Stack } from "@mui/material";

import { SortType, TableParams, SortTypeValues } from "../types";
import SortButton from "./SortButton";

export type ControlsProps = {
  sortState: SortTypeValues;
  onGenerateClick: (params: TableParams) => void;
  onSortClick: (sort: SortType) => void;
}

function Controls({ sortState, onGenerateClick, onSortClick }: ControlsProps) {
  const [rows, setRows] = useState(100);
  const [columns, setColumns] = useState(10);

  return (
    <Paper sx={{ padding: '1rem', width: 'fit-content' }}>
      <Stack direction="row" spacing='1rem'>
        <TextField
          type="number"
          label="Rows"
          variant="outlined"
          onChange={(e) => setRows(parseInt(e.target.value))}
          value={rows}
        />
        <TextField
          type="number"
          label="Cols"
          variant="outlined"
          onChange={(e) => setColumns(parseInt(e.target.value))}
          value={columns}
        />
        <Button variant="contained" onClick={() => onGenerateClick({ rows, columns })}>Generate</Button>
      </Stack>
      <Stack direction="row">
        <SortButton sortState={sortState} buttonType={SortType.DEFAULT} onClick={() => onSortClick(SortType.DEFAULT)}/>
        <SortButton sortState={sortState} buttonType={SortType.ASC} onClick={() => onSortClick(SortType.ASC)}/>
        <SortButton sortState={sortState} buttonType={SortType.DESC} onClick={() => onSortClick(SortType.DESC)}/>
      </Stack>
    </Paper>
  );
}

export default Controls;
