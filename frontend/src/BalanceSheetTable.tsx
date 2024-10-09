import React from "react";
import "./BalanceSheetTable.scss";
import "./LoadingSkeleton.scss";
import { BalanceSheetReport } from "./interfaces";
import LoadingSkeleton from "./LoadingSkeleton";

interface BalanceSheetTableProps {
  reportData: BalanceSheetReport;
  loading: boolean;
}

const BalanceSheetTable: React.FC<BalanceSheetTableProps> = ({
  reportData,
  loading,
}) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  const renderRows = (rows: BalanceSheetReport["Rows"]) => {
    return rows.map((row, index) => {
      switch (row.RowType) {
        case "Header":
          return (
            <tr
              key={index}
              className="balance-sheet__row balance-sheet__row--header"
            >
              {row.Cells?.map((cell, idx) => (
                <th key={idx} className="balance-sheet__header">
                  {cell.Value}
                </th>
              ))}
            </tr>
          );
        case "Section":
          return (
            <React.Fragment key={index}>
              {row.Title && (
                <tr className="balance-sheet__row balance-sheet__row--section-title">
                  <td colSpan={3} className="balance-sheet__section-title">
                    {row.Title}
                  </td>
                </tr>
              )}
              {row.Rows && renderRows(row.Rows)}
            </React.Fragment>
          );
        case "Row":
          return (
            <tr
              key={index}
              className="balance-sheet__row balance-sheet__row--data"
            >
              {row.Cells?.map((cell, idx) => (
                <td key={idx} className="balance-sheet__cell">
                  {cell.Value}
                </td>
              ))}
            </tr>
          );
        case "SummaryRow":
          return (
            <tr
              key={index}
              className="balance-sheet__row balance-sheet__row--summary"
            >
              {row.Cells?.map((cell, idx) => (
                <td
                  key={idx}
                  className="balance-sheet__cell balance-sheet__cell--summary"
                >
                  {cell.Value}
                </td>
              ))}
            </tr>
          );
        default:
          return null;
      }
    });
  };

  return (
    <div className="balance-sheet">
      <h2 className="balance-sheet__title">{reportData.ReportTitles[0]}</h2>
      <h3 className="balance-sheet__subtitle">{reportData.ReportTitles[1]}</h3>
      <h4 className="balance-sheet__date">{reportData.ReportTitles[2]}</h4>

      <table className="balance-sheet__table">
        <thead>
          {renderRows(
            reportData.Rows.filter((row) => row.RowType === "Header")
          )}
        </thead>
        <tbody>
          {renderRows(
            reportData.Rows.filter((row) => row.RowType !== "Header")
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BalanceSheetTable;
