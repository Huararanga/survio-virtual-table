import {
  TableData,
  ColumnParams,
  SortTypeValues,
  TableRowData,
  ColumnFormat,
} from "./types";

export function generateValue() {
  return Math.floor(Math.random() * 9);
}

export function createCell(value: number) {
  return { value };
}

export function generateData(rows: number, columns: number): TableData {
  return Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () => {
      return createCell(generateValue());
    });
  });
}

export function getColumnParams(columns: number): ColumnParams {
  let index = 0;
  return [
    ...Array.from({ length: columns }, () => {
      return {
        name: `Col${index++}`,
        width: 50,
        format: { evenColor: "#f44336", oddColor: "#3f50b5" },
      };
    }),
    {
      name: `Sum`,
      width: 50,
      format: { evenColor: "#f44336", oddColor: "#3f50b5" },
    }
  ];
}

export function getRowSum(row: TableRowData) {
  return row.reduce((sum, current) => sum + current.value, 0);
}

export function sortData(
  tableData: TableData,
  sort: SortTypeValues
): TableData {
  switch (sort) {
    case "asc":
      return tableData.sort((a, b) => getRowSum(a) - getRowSum(b));
    case "desc":
      return tableData.sort((a, b) => getRowSum(b) - getRowSum(a));
    default:
      return [...tableData];
  }
}

export function getCellColor(value: number, format: ColumnFormat) {
  return (value % 2) ? format.evenColor : format.oddColor
}
