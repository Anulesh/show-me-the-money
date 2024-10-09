import React from "react";
import { render, screen } from "@testing-library/react";
import BalanceSheetTable from "../BalanceSheetTable";
import { BalanceSheetReport } from "../interfaces";
import "@testing-library/jest-dom";

const mockReportData: BalanceSheetReport = {
  ReportID: "BalanceSheet",
  ReportName: "Balance Sheet",
  ReportType: "BalanceSheet",
  ReportTitles: ["Balance Sheet", "Demo Org", "As at 08 October 2024"],
  ReportDate: "08 October 2024",
  UpdatedDateUTC: "/Date(1728387074044)/",
  Fields: [],
  Rows: [
    {
      RowType: "Header",
      Cells: [
        { Value: "" },
        { Value: "08 October 2024" },
        { Value: "09 October 2023" },
      ],
    },
    {
      RowType: "Row",
      Cells: [
        { Value: "My Bank Account" },
        { Value: "126.70" },
        { Value: "99.60" },
      ],
    },
    {
      RowType: "Section",
      Title: "Assets",
      Rows: [
        {
          RowType: "Row",
          Cells: [{ Value: "Cash" }, { Value: "500.00" }, { Value: "400.00" }],
        },
      ],
    },
    {
      RowType: "SummaryRow",
      Cells: [
        { Value: "Total Assets" },
        { Value: "626.70" },
        { Value: "499.60" },
      ],
    },
  ],
};
const mockReportDataWithUnexpectedRowType: BalanceSheetReport = {
  ReportID: "BalanceSheet",
  ReportName: "Balance Sheet",
  ReportType: "BalanceSheet",
  ReportTitles: ["Balance Sheet", "Demo Org", "As at 08 October 2024"],
  ReportDate: "08 October 2024",
  UpdatedDateUTC: "/Date(1728387074044)/",
  Fields: [],
  Rows: [
    {
      RowType: "Header",
      Cells: [
        { Value: "" },
        { Value: "08 October 2024" },
        { Value: "09 October 2023" },
      ],
    },
    {
      RowType: "UnknownType",
      Cells: [],
    },
    {
      RowType: "Row",
      Cells: [
        { Value: "My Bank Account" },
        { Value: "126.70" },
        { Value: "99.60" },
      ],
    },
  ],
};

describe("BalanceSheetTable Component", () => {
  it("renders the balance sheet table correctly", () => {
    const { getByText } = render(
      <BalanceSheetTable reportData={mockReportData} loading={false} />
    );

    expect(getByText(/Balance Sheet/i)).toBeInTheDocument();
    expect(getByText(/My Bank Account/i)).toBeInTheDocument();
    expect(getByText(/126.70/i)).toBeInTheDocument();
  });

  it("displays loading skeleton when loading is true", () => {
    render(<BalanceSheetTable reportData={mockReportData} loading={true} />);

    expect(screen.getByLabelText("loading-skeleton")).toBeInTheDocument();
  });

  it("renders the balance sheet table when loading is false", () => {
    render(<BalanceSheetTable reportData={mockReportData} loading={false} />);

    expect(screen.getByText("Balance Sheet")).toBeInTheDocument();
  });

  it("renders section rows correctly", () => {
    render(<BalanceSheetTable reportData={mockReportData} loading={false} />);

    const sectionTitle = screen.getByText(/Assets/i, {
      selector: "td.balance-sheet__section-title",
    });
    expect(sectionTitle).toBeInTheDocument();

    const totalAssets = screen.getByText(/Total Assets/i);
    expect(totalAssets).toBeInTheDocument();
  });
  it("renders summary rows correctly", () => {
    render(<BalanceSheetTable reportData={mockReportData} loading={false} />);

    expect(screen.getByText(/Total Assets/i)).toBeInTheDocument();
    expect(screen.getByText(/626.70/i)).toBeInTheDocument();
  });
  it("handles unknown row types by returning null", () => {
    render(
      <BalanceSheetTable
        reportData={mockReportDataWithUnexpectedRowType}
        loading={false}
      />
    );

    expect(screen.getByText(/My Bank Account/i)).toBeInTheDocument();
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
