import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Biblioteca from "./pages/Biblioteca";
import AdicionarLivro from "./pages/AdicionarLivro";
import Livro from "./pages/Livro"; 

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/biblioteca"
        element={<Biblioteca />}
      />

      <Route
        path="/adicionar"
        element={<AdicionarLivro />}
      />

      <Route
        path="/livro/:id"
        element={<Livro />}
      />

    </Routes>
  );
}

export default App;