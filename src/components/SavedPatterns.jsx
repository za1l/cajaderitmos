import React, { useState, useEffect } from "react";
import { getSavedPatterns, deletePattern } from "../utils/patternStorage";

const SavedPatterns = ({ onSelectPattern }) => {
  const [savedPatterns, setSavedPatterns] = useState([]);

  useEffect(() => {
    loadSavedPatterns();
  }, []);

  const loadSavedPatterns = () => {
    const patterns = getSavedPatterns();
    setSavedPatterns(patterns);
  };

  const handleDelete = (patternId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este patrón?")) {
      deletePattern(patternId);
      loadSavedPatterns();
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (savedPatterns.length === 0) {
    return (
      <div className="saved-patterns empty">
        <h3>Mis Patrones Guardados</h3>
        <p>No tienes patrones guardados aún.</p>
      </div>
    );
  }

  return (
    <div className="saved-patterns">
      <h3>Mis Patrones Guardados</h3>
      <div className="patterns-grid">
        {savedPatterns.map((pattern) => (
          <div key={pattern.id} className="pattern-card">
            <div className="pattern-info">
              <span className="pattern-date">
                {formatDate(pattern.createdAt)}
              </span>
              <div className="pattern-actions">
                <button
                  className="load-btn"
                  onClick={() => onSelectPattern(pattern)}
                >
                  Cargar
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(pattern.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedPatterns;
