import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

jest.spyOn(ReactDOM, "render").mockImplementation(() => {});

describe("index.tsx", () => {
  it("renders the App component without crashing", () => {
    require("../index");

    expect(ReactDOM.render).toHaveBeenCalledWith(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
});
