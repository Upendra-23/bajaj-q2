import React from "react";
import ReactDOM from "react-dom/client";
import { EmployeeList } from "./EmployeeList";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    <EmployeeList />
  </React.StrictMode>
);
