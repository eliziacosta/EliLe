import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { LivrosProvider } from "./context/LivrosContext.jsx";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LivrosProvider>
        <App />
      </LivrosProvider>
    </BrowserRouter>
  </StrictMode>
);