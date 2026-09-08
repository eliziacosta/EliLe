import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BookOpen,
  ImagePlus,
  User,
  FileText,
  Tag,
  Hash,
  Plus,
  X,
  Upload,
} from "lucide-react";

import { useLivros } from "../../context/LivrosContext";

function AdicionarLivro() {
  const navigate = useNavigate();
  const { adicionarLivro } = useLivros();

  const [formulario, setFormulario] = useState({
    titulo: "",
    autor: "",
    capa: "",
    descricao: "",
    genero: "",
    paginas: "",
    status: "quero-ler",
  });

  const [erroImagem, setErroImagem] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      [name]: value,
    }));
  }

  function handleImagem(event) {
    const arquivo = event.target.files?.[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
      alert("Selecione um arquivo de imagem.");
      return;
    }

    const tamanhoMaximo = 5 * 1024 * 1024;

    if (arquivo.size > tamanhoMaximo) {
      alert("A imagem deve ter no máximo 5 MB.");
      return;
    }

    const leitor = new FileReader();

    leitor.onload = () => {
      setFormulario((estadoAnterior) => ({
        ...estadoAnterior,
        capa: leitor.result,
      }));

      setErroImagem(false);
    };

    leitor.readAsDataURL(arquivo);
  }

  function removerCapa() {
    setFormulario((estadoAnterior) => ({
      ...estadoAnterior,
      capa: "",
    }));

    setErroImagem(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formulario.titulo.trim()) {
      alert("Digite o título do livro.");
      return;
    }

    if (!formulario.autor.trim()) {
      alert("Digite o nome do autor.");
      return;
    }

    const novoLivro = {
      ...formulario,
      titulo: formulario.titulo.trim(),
      autor: formulario.autor.trim(),
      genero: formulario.genero.trim(),
      descricao: formulario.descricao.trim(),
      paginas: formulario.paginas
        ? Number(formulario.paginas)
        : "",
    };

    adicionarLivro(novoLivro);

    navigate("/biblioteca");
  }

  return (
    <main className="add-page">

      <div className="add-container">

        {/* VOLTAR */}

        <Link to="/" className="back-link">
          <ArrowLeft size={18} />
          <span>Voltar para início</span>
        </Link>

        {/* CABEÇALHO */}

        <header className="add-header">

          <span className="section-label">
            NOVA LEITURA
          </span>

          <h1>
            Adicionar livro
          </h1>

          <p>
            Adicione um livro à sua biblioteca e
            comece a registrar sua jornada de leitura.
          </p>

        </header>

        {/* FORMULÁRIO */}

        <form
          className="book-form"
          onSubmit={handleSubmit}
        >

          {/* CAPA */}

          <section className="form-cover-section">

            <div className="cover-preview">

              {formulario.capa && !erroImagem ? (

                <>
                  <img
                    src={formulario.capa}
                    alt={
                      formulario.titulo
                        ? `Capa de ${formulario.titulo}`
                        : "Capa do livro"
                    }
                    onError={() => setErroImagem(true)}
                  />

                  <button
                    type="button"
                    className="remove-cover"
                    onClick={removerCapa}
                    title="Remover capa"
                  >
                    <X size={16} />
                  </button>
                </>

              ) : (

                <div className="cover-placeholder">

                  <div className="cover-placeholder-icon">
                    <BookOpen size={35} />
                  </div>

                  <strong>
                    Sem capa
                  </strong>

                  <span>
                    Adicione uma imagem
                  </span>

                </div>

              )}

            </div>

            <div className="cover-info">

              <span className="cover-title">
                Capa do livro
              </span>

              <p className="cover-description">
                Escolha uma imagem da capa para
                deixar sua biblioteca mais bonita.
              </p>

              <label
                htmlFor="capa-upload"
                className="upload-cover-button"
              >
                <ImagePlus size={18} />
                {formulario.capa
                  ? "Trocar capa"
                  : "Adicionar capa"}
              </label>

              <input
                id="capa-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImagem}
                hidden
              />

              <small>
                JPG, PNG ou WEBP • máximo 5 MB
              </small>

            </div>

          </section>

          {/* INFORMAÇÕES */}

          <div className="form-section-title">

            <div className="form-section-icon">
              <BookOpen size={18} />
            </div>

            <div>
              <h2>
                Informações do livro
              </h2>

              <p>
                Conte um pouco sobre o livro que
                você adicionou.
              </p>
            </div>

          </div>

          <div className="form-grid">

            {/* TÍTULO */}

            <div className="form-group full">

              <label htmlFor="titulo">
                Título do livro
                <span>*</span>
              </label>

              <div className="input-wrapper">

                <BookOpen size={18} />

                <input
                  id="titulo"
                  type="text"
                  name="titulo"
                  value={formulario.titulo}
                  onChange={handleChange}
                  placeholder="Ex.: O Pequeno Príncipe"
                  required
                />

              </div>

            </div>

            {/* AUTOR */}

            <div className="form-group">

              <label htmlFor="autor">
                Autor
                <span>*</span>
              </label>

              <div className="input-wrapper">

                <User size={18} />

                <input
                  id="autor"
                  type="text"
                  name="autor"
                  value={formulario.autor}
                  onChange={handleChange}
                  placeholder="Nome do autor"
                  required
                />

              </div>

            </div>

            {/* GÊNERO */}

            <div className="form-group">

              <label htmlFor="genero">
                Gênero
              </label>

              <div className="input-wrapper">

                <Tag size={18} />

                <input
                  id="genero"
                  type="text"
                  name="genero"
                  value={formulario.genero}
                  onChange={handleChange}
                  placeholder="Ex.: Fantasia"
                />

              </div>

            </div>

            {/* PÁGINAS */}

            <div className="form-group">

              <label htmlFor="paginas">
                Número de páginas
              </label>

              <div className="input-wrapper">

                <Hash size={18} />

                <input
                  id="paginas"
                  type="number"
                  name="paginas"
                  value={formulario.paginas}
                  onChange={handleChange}
                  placeholder="Ex.: 320"
                  min="1"
                />

              </div>

            </div>

            {/* STATUS */}

            <div className="form-group">

              <label htmlFor="status">
                Status da leitura
              </label>

              <div className="input-wrapper select-wrapper">

                <BookOpen size={18} />

                <select
                  id="status"
                  name="status"
                  value={formulario.status}
                  onChange={handleChange}
                >
                  <option value="quero-ler">
                    Quero ler
                  </option>

                  <option value="lendo">
                    Lendo
                  </option>

                  <option value="lido">
                    Lido
                  </option>
                </select>

              </div>

            </div>

            {/* DESCRIÇÃO */}

            <div className="form-group full">

              <label htmlFor="descricao">
                Descrição
              </label>

              <div className="textarea-wrapper">

                <FileText size={18} />

                <textarea
                  id="descricao"
                  name="descricao"
                  value={formulario.descricao}
                  onChange={handleChange}
                  placeholder="Escreva uma breve descrição do livro..."
                  rows="6"
                />

              </div>

              <div className="field-help">
                <span>
                  Você poderá editar essas informações depois.
                </span>

                <span>
                  {formulario.descricao.length}/500
                </span>
              </div>

            </div>

          </div>

          {/* RODAPÉ */}

          <div className="form-actions">

            <Link
              to="/biblioteca"
              className="cancel-button"
            >
              Cancelar
            </Link>

            <button
              type="submit"
              className="primary-button"
            >
              <Plus size={18} />
              Adicionar à biblioteca
            </button>

          </div>

        </form>

      </div>

    </main>
  );
}

export default AdicionarLivro;