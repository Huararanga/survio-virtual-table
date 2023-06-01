import {
  TableData,
  ColumnParams,
  SortType,
  TableRowData,
  TableCellData,
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

export function updateCell(data: TableData, changeRow: TableRowData, changeCell: TableCellData) {
  return data.map((row) => {
    if(row === changeRow) {
      return row.map((cell) => {
        if(cell === changeCell) {
          return createCell(generateValue());
        } else {
          return cell;
        }
      });
    } else {
      return row;
    }
  })
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
    },
  ];
}

export function getRowSum(row: TableRowData) {
  return row.reduce((sum, current) => sum + current.value, 0);
}

export function sortData(tableData: TableData, sort: SortType): TableData {
  const clone = [...tableData];
  switch (sort) {
    case "asc":
      return clone.sort((a, b) => getRowSum(b) - getRowSum(a));
    case "desc":
      return clone.sort((a, b) => getRowSum(a) - getRowSum(b));
    default:
      return clone;
  }
}
