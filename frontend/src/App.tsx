import React, { useState, useEffect } from "react";
import BalanceSheetTable from "./BalanceSheetTable";
import { BalanceSheetResponse } from "./interfaces";
import './main.scss';

const App: React.FC = () => {
  const [data, setData] = useState<BalanceSheetResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!apiUrl) {
        setError("API URL is not defined");
        return;
      }

      try {
        setLoading(true)
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network Error");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load balance sheet");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      {error && <div>{error}</div>}
      {data && <BalanceSheetTable reportData={data.Reports[0]} loading={loading} />} 
    </div>
  );
};

export default App;
