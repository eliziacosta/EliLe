import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  BookOpen,
  Trash2,
  Search,
  Library,
  BookMarked,
  BookCheck,
} from "lucide-react";
import { useState } from "react";
import "./style.css";
import { useLivros } from "../../context/LivrosContext";
import elile from "../../assets/elile.png";

function Biblioteca() {
  const { livros, removerLivro } = useLivros();

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todos");

  const livrosFiltrados = livros.filter((livro) => {
    const correspondeBusca =
      livro.titulo
        .toLowerCase()
        .includes(busca.toLowerCase()) ||
      livro.autor
        .toLowerCase()
        .includes(busca.toLowerCase());

    const correspondeFiltro =
      filtro === "todos" ||
      livro.status === filtro;

    return correspondeBusca && correspondeFiltro;
  });

  function excluirLivro(event, id) {
    event.preventDefault();
    event.stopPropagation();

    const livro = livros.find((item) => item.id === id);

    if (!livro) return;

    const confirmar = window.confirm(
      `Deseja remover "${livro.titulo}" da sua biblioteca?`
    );

    if (confirmar) {
      removerLivro(id);
    }
  }

  return (
    <div className="biblioteca-page">

    

      <header className="navbar">

        <Link to="/" className="logo">
                <img
                  src={elile}
                  alt="EliLê"
                  className="logo-image"
                />
        
              </Link>

        <nav>
          <Link to="/">
            Início
          </Link>

          <Link
            to="/biblioteca"
            className="active"
          >
            Minha biblioteca
          </Link>

          <Link to="/biblioteca">
            Livros lidos
          </Link>
        </nav>

        <Link
          to="/adicionar"
          className="navbar-add"
        >
          <Plus size={17} />
          Adicionar
        </Link>

      </header>

      <main className="biblioteca-container">


        <div className="biblioteca-heading">

          <div>

            <span className="section-label">
              MINHA COLEÇÃO
            </span>

            <h1>
              Minha biblioteca
            </h1>

            <p>
              Organize suas leituras e acompanhe
              sua jornada pelos livros.
            </p>

          </div>

          <Link
            to="/adicionar"
            className="primary-button"
          >
            <Plus size={18} />
            Adicionar livro
          </Link>

        </div>


        <div className="library-stats">

          <div className="library-stat">

            <div className="library-stat-icon">
              <Library size={20} />
            </div>

            <div>
              <span>Total</span>
              <strong>{livros.length}</strong>
            </div>

          </div>

          <div className="library-stat">

            <div className="library-stat-icon">
              <BookMarked size={20} />
            </div>

            <div>
              <span>Quero ler</span>

              <strong>
                {
                  livros.filter(
                    (livro) =>
                      livro.status === "quero-ler"
                  ).length
                }
              </strong>

            </div>

          </div>

          <div className="library-stat">

            <div className="library-stat-icon">
              <BookOpen size={20} />
            </div>

            <div>
              <span>Lendo</span>

              <strong>
                {
                  livros.filter(
                    (livro) =>
                      livro.status === "lendo"
                  ).length
                }
              </strong>

            </div>

          </div>

          <div className="library-stat">

            <div className="library-stat-icon">
              <BookCheck size={20} />
            </div>

            <div>
              <span>Lidos</span>

              <strong>
                {
                  livros.filter(
                    (livro) =>
                      livro.status === "lido"
                  ).length
                }
              </strong>

            </div>

          </div>

        </div>


        <div className="library-toolbar">

          <div className="library-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Buscar por título ou autor..."
              value={busca}
              onChange={(event) =>
                setBusca(event.target.value)
              }
            />

          </div>

          <div className="library-filters">

            <button
              className={
                filtro === "todos"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() => setFiltro("todos")}
            >
              Todos
            </button>

            <button
              className={
                filtro === "quero-ler"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setFiltro("quero-ler")
              }
            >
              Quero ler
            </button>

            <button
              className={
                filtro === "lendo"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setFiltro("lendo")
              }
            >
              Lendo
            </button>

            <button
              className={
                filtro === "lido"
                  ? "filter-button active"
                  : "filter-button"
              }
              onClick={() =>
                setFiltro("lido")
              }
            >
              Lidos
            </button>

          </div>

        </div>


        {livros.length === 0 ? (

          <div className="library-empty">

            <div className="empty-book-icon">
              <BookOpen size={35} />
            </div>

            <span className="section-label">
              SUA ESTANTE
            </span>

            <h2>
              Sua biblioteca está vazia
            </h2>

            <p>
              Comece adicionando um livro que você
              gostaria de ler.
            </p>

            <Link
              to="/adicionar"
              className="primary-button"
            >
              <Plus size={18} />
              Adicionar primeiro livro
            </Link>

          </div>

        ) : livrosFiltrados.length === 0 ? (

          <div className="no-results">

            <Search size={35} />

            <h2>
              Nenhum livro encontrado
            </h2>

            <p>
              Tente outro título, autor ou filtro.
            </p>

          </div>

        ) : (

          <>

            <div className="books-result-header">
              <span>
                {livrosFiltrados.length}{" "}
                {livrosFiltrados.length === 1
                  ? "livro"
                  : "livros"}
              </span>
            </div>

            <div className="library-books-grid">

              {livrosFiltrados.map((livro) => (

                <Link
                  key={livro.id}
                  to={`/livro/${livro.id}`}
                  className="library-book-card"
                >

                  <div className="library-book-cover">

                    {livro.capa ? (

                      <img
                        src={livro.capa}
                        alt={`Capa de ${livro.titulo}`}
                      />

                    ) : (

                      <div className="library-no-cover">
                        <BookOpen size={42} />
                        <span>Sem capa</span>
                      </div>

                    )}

                    <span className="status-badge">

                      {livro.status === "quero-ler"
                        ? "Quero ler"
                        : livro.status === "lendo"
                        ? "Lendo"
                        : "Lido"}

                    </span>

                    <button
                      className="card-delete"
                      onClick={(event) =>
                        excluirLivro(
                          event,
                          livro.id
                        )
                      }
                      title="Excluir livro"
                    >
                      <Trash2 size={16} />
                    </button>

                  </div>

                <div className="library-book-info">

                <h3>{livro.titulo}</h3>

                <p>{livro.autor}</p>

                {/* AVALIAÇÃO */}
                <div className="library-rating">

                    <div className="library-stars">

                    {[1, 2, 3, 4, 5].map((estrela) => (
                        <span
                        key={estrela}
                        className={
                            estrela <= (Number(livro.avaliacao) || 0)
                            ? "library-star filled"
                            : "library-star"
                        }
                        >
                        ★
                        </span>
                    ))}

                    </div>

                    <span className="library-rating-number">
                    {Number(livro.avaliacao) > 0
                        ? `${livro.avaliacao}/5`
                        : "Sem avaliação"}
                    </span>

                </div>

                {livro.genero && (
                    <span className="genre-tag">
                    {livro.genero}
                    </span>
                )}

                </div>

                </Link>

              ))}

            </div>

          </>

        )}

      </main>

    </div>
  );
}

export default Biblioteca;