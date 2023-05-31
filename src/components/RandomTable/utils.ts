import {
  Digits,
  TableData,
  ColumnParams,
  SortTypeValues,
  TableRowData,
} from "./types";

export function generateData(rows: number, columns: number): TableData {
  return Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () => {
      return { value: Math.floor(Math.random() * 9) as Digits };
    });
  });
}

export function getColumnParams(columns: number): ColumnParams {
  return [
    ...Array.from({ length: columns }, (index) => {
      return {
        name: `Col${index}`,
        width: 50,
        format: { evenColor: "error", oddColor: "primary" },
      };
    }),
    {
      name: `Sum`,
      width: 50,
      format: { evenColor: "error", oddColor: "primary" },
    }
  ];
}

export function sumRow(row: TableRowData) {
  return row.reduce((sum, current) => sum + current.value, 0);
}

export function sortData(
  tableData: TableData,
  sort: SortTypeValues
): TableData {
  switch (sort) {
    case "asc":
      return tableData.sort((a, b) => sumRow(a) - sumRow(b));
    case "desc":
      return tableData.sort((a, b) => sumRow(b) - sumRow(a));
    default:
      return [...tableData];
  }
}
