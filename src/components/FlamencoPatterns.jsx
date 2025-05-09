import React from "react";

const FlamencoPatterns = ({ onSelectPattern }) => {
  const patrones = {
    buleria: {
      nombre: "Bulería (12)",
      patron: [
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
      ],
      tempo: 120,
    },
    solea: {
      nombre: "Soleá",
      patron: [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      ],
      tempo: 90,
    },
    seguiriya: {
      nombre: "Seguiriya",
      patron: [
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0],
      ],
      tempo: 70,
    },
  };

  const cargarPatron = (tipo) => {
    const patronSeleccionado = patrones[tipo];
    if (patronSeleccionado) {
      onSelectPattern({
        pattern: patronSeleccionado.patron.map((row) =>
          row.map((cell) => Boolean(cell))
        ),
        tempo: patronSeleccionado.tempo,
      });
    }
  };

  return (
    <div className="flamenco-patterns">
      <h3>Patrones Flamencos</h3>
      <div className="pattern-buttons">
        {Object.entries(patrones).map(([tipo, { nombre }]) => (
          <button
            key={tipo}
            className="pattern-btn"
            onClick={() => cargarPatron(tipo)}
          >
            {nombre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FlamencoPatterns;
