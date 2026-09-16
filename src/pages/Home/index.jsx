import { Link } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Library,
  BookMarked,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import "./style.css";
import elile from "../../assets/elile.png";
import { useLivros } from "../../context/LivrosContext";

function Home() {
  const { livros } = useLivros();

  const totalLivros = livros.length;

  const livrosLendo = livros.filter(
    (livro) => livro.status === "lendo"
  ).length;

  const livrosLidos = livros.filter(
    (livro) => livro.status === "lido"
  ).length;

  const livrosQueroLer = livros.filter(
    (livro) => livro.status === "quero-ler"
  ).length;

  const livrosRecentes = [...livros].reverse().slice(0, 4);

  return (
    <main className="home-page">


      <header className="navbar">

        <Link to="/" className="logo">
          <img
            src={elile}
            alt="EliLê"
            className="logo-image"
          />
        </Link>

        <nav>

          <Link
            to="/"
            className="active"
          >
            Início
          </Link>

          <Link to="/biblioteca">
            Minha biblioteca
          </Link>

          <Link to="/biblioteca">
            Livros lidos
          </Link>

        </nav>

      </header>



      <section className="hero">

        <div className="hero-content">

          <span className="hero-label">
            SUA BIBLIOTECA PESSOAL
          </span>

          <h1>
            Cada livro,
            <br />
            uma nova história.
          </h1>

          <p>
            Organize suas leituras, registre suas experiências
            e guarde para sempre os livros que marcaram você.
          </p>

          <div className="hero-actions">

            <Link
              to="/adicionar"
              className="primary-button"
            >
              <Plus size={19} />
              Adicionar livro
            </Link>

            <Link
              to="/biblioteca"
              className="secondary-button"
            >
              Minha biblioteca
            </Link>

          </div>

        </div>



        <div className="hero-decoration">

          <div className="book-shape book-one">
            <span>eLivro</span>
          </div>

          <div className="book-shape book-two">
            <BookOpen size={38} />
          </div>

          <div className="book-shape book-three">
            <span>Leia</span>
          </div>

          <div className="quote-card">

            <BookOpen size={20} />

            <p>
              "Um leitor vive mil vidas
              antes de morrer."
            </p>

            <span>
              — George R. R. Martin
            </span>

          </div>

        </div>

      </section>



      <section className="library-section">

  

        <div className="section-header">

          <div>

            <span className="section-label">
              SUA COLEÇÃO
            </span>

            <h2>
              Minha biblioteca
            </h2>

          </div>

          <Link
            to="/biblioteca"
            className="view-library"
          >
            <span>Ver biblioteca</span>
            <ArrowRight size={17} />
          </Link>

        </div>



        <div className="stats">

          {/* TOTAL */}

          <div className="stat-card">

            <div className="stat-icon">
              <Library size={20} />
            </div>

            <span>
              Total de livros
            </span>

            <strong>
              {totalLivros}
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <BookMarked size={20} />
            </div>

            <span>
              Quero ler
            </span>

            <strong>
              {livrosQueroLer}
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <BookOpen size={20} />
            </div>

            <span>
              Lendo
            </span>

            <strong>
              {livrosLendo}
            </strong>

          </div>


          <div className="stat-card">

            <div className="stat-icon">
              <CheckCircle size={20} />
            </div>

            <span>
              Livros lidos
            </span>

            <strong>
              {livrosLidos}
            </strong>

          </div>

        </div>

        {livrosRecentes.length > 0 ? (

          <div className="recent-section">

            <div className="recent-header">

              <div>

                <span className="section-label">
                  CONTINUE SUA JORNADA
                </span>

                <h2>
                  Adicionados recentemente
                </h2>

              </div>

            </div>


            <div className="books-grid home-books">

              {livrosRecentes.map((livro) => {

                const avaliacao =
                  Number(livro.avaliacao) || 0;

                return (

                  <Link
                    key={livro.id}
                    to={`/livro/${livro.id}`}
                    className="book-card-link"
                  >

                    <article className="book-card">


                      <div className="book-cover">

                        {livro.capa ? (

                          <img
                            src={livro.capa}
                            alt={`Capa de ${livro.titulo}`}
                          />

                        ) : (

                          <div className="no-cover">

                            <BookOpen size={35} />

                            <span>
                              Sem capa
                            </span>

                          </div>

                        )}

                      </div>


                      <div className="book-card-content">

                        <h3>
                          {livro.titulo}
                        </h3>

                        <p>
                          {livro.autor}
                        </p>



                        <div className="home-rating">

                          <div className="home-stars">

                            <span
                              className={
                                avaliacao >= 1
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>

                            <span
                              className={
                                avaliacao >= 2
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>

                            <span
                              className={
                                avaliacao >= 3
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>

                            <span
                              className={
                                avaliacao >= 4
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>

                            <span
                              className={
                                avaliacao >= 5
                                  ? "filled"
                                  : ""
                              }
                            >
                              ★
                            </span>

                          </div>

                          <span className="rating-number">
                            {avaliacao > 0
                              ? `${avaliacao}/5`
                              : "Sem avaliação"}
                          </span>

                        </div>


                        {livro.genero && (

                          <span className="book-genre">
                            {livro.genero}
                          </span>

                        )}

                      </div>

                    </article>

                  </Link>

                );

              })}

            </div>

          </div>

        ) : (

        
          <div className="empty-library">

            <div className="empty-icon">

              <BookOpen size={32} />

            </div>

            <h3>
              Sua estante está esperando por você
            </h3>

            <p>
              Adicione seu primeiro livro e comece
              a construir sua biblioteca.
            </p>

            <Link
              to="/adicionar"
              className="primary-button"
            >
              <Plus size={18} />
              Adicionar primeiro livro
            </Link>

          </div>

        )}

      </section>

    </main>
  );
}

export default Home;