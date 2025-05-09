import React from "react";

const FlamencoPalos = () => {
  const palos = [
    { nombre: "Soleá", compás: "12 tiempos" },
    { nombre: "Bulería", compás: "12 tiempos" },
    { nombre: "Alegrías", compás: "12 tiempos" },
    { nombre: "Tangos", compás: "4 tiempos" },
    { nombre: "Fandangos", compás: "3 tiempos" },
  ];

  return (
    <div className="palos-container">
      {palos.map((palo, index) => (
        <div key={index} className="palo-card">
          <h3>{palo.nombre}</h3>
          <p>Compás: {palo.compás}</p>
        </div>
      ))}
    </div>
  );
};

export default FlamencoPalos;
