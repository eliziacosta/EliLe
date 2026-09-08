import { useState } from "react";
import { Star } from "lucide-react";

function RatingStars({ valor = 0, onChange, tamanho = 28 }) {
  const [hover, setHover] = useState(null);

  const notaAtual = hover !== null ? hover : valor;

  function handleClick(index, event) {
    if (!onChange) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const metade = event.clientX - rect.left < rect.width / 2;

    const novaNota = metade ? index + 0.5 : index + 1;

    onChange(novaNota);
  }

  return (
    <div className="rating-stars">
      {[0, 1, 2, 3, 4].map((index) => {
        const preenchimento = notaAtual - index;

        return (
          <button
            key={index}
            type="button"
            className="star-button"
            onClick={(event) => handleClick(index, event)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const metade = event.clientX - rect.left < rect.width / 2;

              setHover(metade ? index + 0.5 : index + 1);
            }}
            onMouseLeave={() => setHover(null)}
            aria-label={`Avaliar ${index + 1} estrela${index > 0 ? "s" : ""}`}
          >
            <span className="star-container">
              <Star
                size={tamanho}
                strokeWidth={1.8}
                className="star-background"
              />

              {preenchimento > 0 && (
                <span
                  className="star-fill"
                  style={{
                    width:
                      preenchimento >= 1
                        ? "100%"
                        : `${preenchimento * 100}%`,
                  }}
                >
                  <Star
                    size={tamanho}
                    strokeWidth={1.8}
                    className="star-active"
                  />
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default RatingStars;