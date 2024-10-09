export interface BalanceSheetResponse {
  Status: string;
  Reports: BalanceSheetReport[];
}

export interface BalanceSheetReport {
  ReportID: string;
  ReportName: string;
  ReportType: string;
  ReportTitles: string[];
  ReportDate: string;
  UpdatedDateUTC: string;
  Fields: any[];
  Rows: Row2[];
}

export interface Row2 {
  RowType: string;
  Cells?: Cell[];
  Title?: string;
  Rows?: (Row | Rows2)[];
}

export interface Rows2 {
  RowType: string;
  Cells: Cell[];
}

export interface Row {
  RowType: string;
  Cells: Cell2[];
}

export interface Cell2 {
  Value: string;
  Attributes?: Attribute[];
}

export interface Attribute {
  Value: string;
  Id: string;
}

export interface Cell {
  Value: string;
}