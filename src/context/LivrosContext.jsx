import { createContext, useContext, useEffect, useState } from "react";

const LivrosContext = createContext();

export function LivrosProvider({ children }) {
  const [livros, setLivros] = useState(() => {
    const livrosSalvos = localStorage.getItem("elivro-livros");

    return livrosSalvos ? JSON.parse(livrosSalvos) : [];
  });

  useEffect(() => {
    localStorage.setItem("elivro-livros", JSON.stringify(livros));
  }, [livros]);

  function adicionarLivro(livro) {
    const novoLivro = {
      ...livro,
      id: Date.now(),
      criadoEm: new Date().toISOString(),
    };

    setLivros((livrosAtuais) => [...livrosAtuais, novoLivro]);
  }

  function removerLivro(id) {
    setLivros((livrosAtuais) =>
      livrosAtuais.filter((livro) => livro.id !== id)
    );
  }

  function atualizarLivro(id, dadosAtualizados) {
    setLivros((livrosAtuais) =>
      livrosAtuais.map((livro) =>
        livro.id === id
          ? { ...livro, ...dadosAtualizados }
          : livro
      )
    );
  }

  return (
    <LivrosContext.Provider
      value={{
        livros,
        adicionarLivro,
        removerLivro,
        atualizarLivro,
      }}
    >
      {children}
    </LivrosContext.Provider>
  );
}

export function useLivros() {
  return useContext(LivrosContext);
}