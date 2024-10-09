import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import { BalanceSheetReport } from "../interfaces";
import '@testing-library/jest-dom';

const mockReportData: BalanceSheetReport = {
  ReportID: "BalanceSheet",
  ReportName: "Balance Sheet",
  ReportType: "BalanceSheet",
  ReportTitles: ["Balance Sheet", "Demo Org", "As at 08 October 2024"],
  ReportDate: "08 October 2024",
  UpdatedDateUTC: "/Date(1728387074044)/",
  Fields: [],
  Rows: [],
};

const mockedFetch = jest.fn() as jest.Mock;

beforeAll(() => {
  global.fetch = mockedFetch;
});

afterEach(() => {
  mockedFetch.mockClear();
});

describe("App Component", () => {
  it("renders the balance sheet table after fetching data", async () => {
    mockedFetch.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({ Reports: [mockReportData] }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        )
      )
    );

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Balance Sheet/i)).toBeInTheDocument();
    });
  });

  it("handles fetch errors", async () => {
    mockedFetch.mockImplementationOnce(() => Promise.reject(new Error("Fetch error")));

    render(<App />);
    
    await waitFor(() => {
      expect(screen.getByText(/Failed to load balance sheet/i)).toBeInTheDocument();
    });
  });
  it("shows an error message when response is not OK", async () => {
    mockedFetch.mockImplementationOnce(() =>
      Promise.resolve(
        new Response(
          JSON.stringify({}),
          { status: 404, headers: { "Content-Type": "application/json" } }
        )
      )
    );

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to load balance sheet/i)).toBeInTheDocument();
    });
  });


  it("shows an error when the API URL is not defined", async () => {
    delete process.env.REACT_APP_API_URL;
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/API URL is not defined/i)).toBeInTheDocument();
    });
  });
});
