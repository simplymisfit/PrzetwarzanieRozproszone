import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import PokemonProvider from "./providers/PokemonProvider";
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <PokemonProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </PokemonProvider>
  </BrowserRouter>
);
