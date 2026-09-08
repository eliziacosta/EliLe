import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import elile from "../../assets/elile.png";

import {
  ArrowLeft,
  BookOpen,
  Calendar,
  FileText,
  Hash,
  Tag,
  Trash2,
  CheckCircle,
  Edit3,
  Download,
  Users,
} from "lucide-react";

import html2canvas from "html2canvas";
import { useLivros } from "../../context/LivrosContext";

function Livro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    livros,
    removerLivro,
    atualizarLivro,
  } = useLivros();

  const livro = livros.find(
    (item) => String(item.id) === String(id)
  );

  const [avaliacao, setAvaliacao] = useState(0);

  useEffect(() => {
    if (livro) {
      setAvaliacao(Number(livro.avaliacao) || 0);
    }
  }, [livro]);

  // =========================
  // LIVRO NÃO ENCONTRADO
  // =========================

  if (!livro) {
    return (
      <main className="not-found">
        <BookOpen size={50} />

        <h1>Livro não encontrado</h1>

        <p>
          Esse livro não está mais na sua biblioteca.
        </p>

        <Link
          to="/biblioteca"
          className="primary-button"
        >
          Voltar para biblioteca
        </Link>
      </main>
    );
  }

  // =========================
  // STATUS
  // =========================

  function marcarComoLido() {
    atualizarLivro(livro.id, {
      status: "lido",
    });
  }

  // =========================
  // AVALIAÇÃO
  // =========================

  function alterarAvaliacao(novaNota) {
    setAvaliacao(novaNota);

    atualizarLivro(livro.id, {
      avaliacao: novaNota,
    });
  }

  // =========================
  // EXCLUIR
  // =========================

  function excluirLivro() {
    const confirmar = window.confirm(
      `Deseja realmente remover "${livro.titulo}" da biblioteca?`
    );

    if (!confirmar) return;

    removerLivro(livro.id);

    navigate("/biblioteca");
  }

  // =========================
  // STATUS
  // =========================

  function mostrarStatus() {
    if (livro.status === "quero-ler") {
      return "QUERO LER";
    }

    if (livro.status === "lendo") {
      return "ESTOU LENDO";
    }

    return "LIVRO LIDO";
  }

  // =========================
  // DATA
  // =========================

  function formatarData() {
    if (!livro.criadoEm) {
      return "Não informado";
    }

    const data = new Date(livro.criadoEm);

    if (Number.isNaN(data.getTime())) {
      return "Não informado";
    }

    return data.toLocaleDateString("pt-BR");
  }

  // =========================
  // ESTRELAS
  // =========================

  function renderizarEstrelas() {
    const estrelas = [];

    for (let i = 1; i <= 5; i++) {
      let preenchimento = 0;

      if (avaliacao >= i) {
        preenchimento = 100;
      } else if (avaliacao >= i - 0.5) {
        preenchimento = 50;
      }

      estrelas.push(
        <button
          key={i}
          type="button"
          className="rating-star-button"
          title={`Avaliar ${i} estrela${i > 1 ? "s" : ""}`}
          onClick={(event) => {
            const rect =
              event.currentTarget.getBoundingClientRect();

            const cliqueX =
              event.clientX - rect.left;

            const metade =
              cliqueX < rect.width / 2;

            const novaNota = metade
              ? i - 0.5
              : i;

            alterarAvaliacao(novaNota);
          }}
        >
          <span
            className="rating-star"
            style={{
              "--star-fill": `${preenchimento}%`,
            }}
          >
            ★
          </span>
        </button>
      );
    }

    return estrelas;
  }

  // =========================
  // EXPORTAR PNG
  // =========================

  async function exportarPNG() {
    const elemento =
      document.getElementById("livro-exportar");

    if (!elemento) return;

    try {
      const canvas = await html2canvas(elemento, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#f8f7ff",
      });

      const imagem =
        canvas.toDataURL("image/png");

      const link =
        document.createElement("a");

      const nomeArquivo =
        livro.titulo
          .replace(/[^a-z0-9]/gi, "-")
          .toLowerCase();

      link.download =
        `elivro-${nomeArquivo}.png`;

      link.href = imagem;

      link.click();
    } catch (erro) {
      console.error(
        "Erro ao gerar PNG:",
        erro
      );

      alert(
        "Não foi possível gerar o PNG."
      );
    }
  }

  // =========================
  // PERSONAGENS
  // =========================

  const personagens =
    livro.personagensFavoritos ||
    livro.personagens ||
    "";

  return (
    <main className="book-page">

      {/* =========================
          TOPO
      ========================= */}

      <div className="book-page-header">

        <Link
          to="/biblioteca"
          className="back-link"
        >
          <ArrowLeft size={18} />
          Minha biblioteca
        </Link>

        <button
          type="button"
          className="export-button"
          onClick={exportarPNG}
        >
          <Download size={18} />
          Exportar como PNG
        </button>

      </div>

      {/* =========================
          FOLHA DO CADERNO
      ========================= */}

      <section
        id="livro-exportar"
        className="notebook-paper"
      >

        {/* margem vermelha */}
        <div className="paper-margin" />

        {/* conteúdo */}
        <div className="paper-content">

             <Link to="/" className="logo">
                    <img
                      src={elile}
                      alt="EliLê"
                      className="logo-image"
                    />
            
                  </Link>

          {/* =========================
              CONTEÚDO PRINCIPAL
          ========================= */}

          <div className="notebook-book-layout">

            {/* CAPA */}

            <div className="notebook-cover-area">

              <div className="notebook-cover">

                {livro.capa ? (
                  <img
                    src={livro.capa}
                    alt={`Capa de ${livro.titulo}`}
                  />
                ) : (
                  <div className="details-no-cover">
                    <BookOpen size={55} />
                    <span>Sem capa</span>
                  </div>
                )}

              </div>

            </div>

            {/* INFORMAÇÕES */}

            <div className="notebook-info">

              <span className="book-status-large">
                {mostrarStatus()}
              </span>

              <h1>
                {livro.titulo}
              </h1>

              <p className="details-author">
                por <strong>{livro.autor}</strong>
              </p>

              {/* ESTRELAS */}

              <div className="notebook-rating">

                <span className="rating-label">
                  MINHA AVALIAÇÃO
                </span>

                <div className="rating-row">

                  <div className="rating-stars">
                    {renderizarEstrelas()}
                  </div>

                  <span className="rating-value">
                    {avaliacao > 0
                      ? `${avaliacao} / 5`
                      : "Ainda não avaliado"}
                  </span>

                </div>

              </div>

              {/* INFORMAÇÕES */}

              <div className="book-information">

                {livro.genero && (
                  <div className="information-item">

                    <Tag size={18} />

                    <div>
                      <span>Gênero</span>
                      <strong>
                        {livro.genero}
                      </strong>
                    </div>

                  </div>
                )}

                {livro.paginas && (
                  <div className="information-item">

                    <Hash size={18} />

                    <div>
                      <span>Páginas</span>
                      <strong>
                        {livro.paginas}
                      </strong>
                    </div>

                  </div>
                )}

                <div className="information-item">

                  <Calendar size={18} />

                  <div>
                    <span>Adicionado em</span>

                    <strong>
                      {formatarData()}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* =========================
              DESCRIÇÃO
          ========================= */}

          <div className="notebook-section">

            <div className="notebook-section-title">
              <FileText size={19} />
              <h2>Sobre o livro</h2>
            </div>

            <p className="notebook-description">
              {livro.descricao ||
                "Nenhuma descrição foi adicionada para este livro."}
            </p>

          </div>

          {/* =========================
              PERSONAGENS
          ========================= */}

          <div className="notebook-section">

            <div className="notebook-section-title">
              <Users size={19} />
              <h2>Personagens favoritos</h2>
            </div>

            <p className="notebook-description">

              {personagens
                ? personagens
                : "Você ainda não adicionou seus personagens favoritos."}

            </p>

          </div>

          {/* =========================
              MINHA OPINIÃO
          ========================= */}

          <div className="notebook-section">

            <div className="notebook-section-title">
              <BookOpen size={19} />
              <h2>Minha opinião</h2>
            </div>

            <p className="notebook-description">
              {livro.opiniao ||
                "Escreva aqui o que você achou dessa leitura..."}
            </p>

          </div>

          {/* ASSINATURA */}

          <div className="paper-footer">
            <span>
              Minha biblioteca no eLivro
            </span>

            <span>
              {formatarData()}
            </span>
          </div>

        </div>

      </section>

      {/* =========================
          AÇÕES
      ========================= */}

      <div className="details-actions">

        {livro.status !== "lido" && (
          <button
            className="primary-button"
            onClick={marcarComoLido}
          >
            <CheckCircle size={18} />
            Marcar como lido
          </button>
        )}


        <button
          className="edit-button"
          onClick={() =>
            alert(
              "A edição será adicionada em breve."
            )
          }
        >
          <Edit3 size={18} />
          Editar
        </button>

        <button
          className="delete-button"
          onClick={excluirLivro}
        >
          <Trash2 size={18} />
          Excluir
        </button>

      </div>

    </main>
  );
}

export default Livro;