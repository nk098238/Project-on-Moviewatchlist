import React from "react";
import ReactDOM from "react-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

import "./index.css";

import App from "./App";

const customTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={customTheme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);

