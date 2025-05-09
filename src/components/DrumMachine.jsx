import React, { useState, useEffect, useRef } from "react";
import "./DrumMachine.css";

const DrumMachine = () => {
  const [pattern, setPattern] = useState(
    Array(3)
      .fill()
      .map(() => Array(16).fill(false))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(90);
  const [currentStep, setCurrentStep] = useState(0);
  const [compas, setCompas] = useState("4/4");
  const [swing, setSwing] = useState(false);

  const sounds = ["Palmas", "Cajón", "Guitarra"];
  const steps = 16;
  const timerRef = useRef(null);

  // Sonidos para cada instrumento
  const audioFiles = {
    Palmas: "/sounds/palma.mp3",
    Cajón: "/sounds/cajon.mp3",
    Guitarra: "/sounds/guitarra.mp3",
  };

  // Función para reproducir un sonido
  const playSound = (soundName) => {
    try {
      const audio = new Audio(audioFiles[soundName]);
      audio.play();
    } catch (error) {
      console.error("Error al reproducir el sonido:", error);
    }
  };

  // Función para alternar el estado de una celda
  const toggleCell = (rowIndex, colIndex) => {
    const newPattern = [...pattern];
    newPattern[rowIndex][colIndex] = !newPattern[rowIndex][colIndex];
    setPattern(newPattern);

    // Reproducir el sonido al activar una celda
    if (newPattern[rowIndex][colIndex]) {
      playSound(sounds[rowIndex]);
    }
  };

  // Función para iniciar/detener la reproducción
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Función para guardar el patrón en la URL
  const savePattern = () => {
    const patternString = pattern
      .map((row) => row.map((cell) => (cell ? "1" : "0")).join(""))
      .join("-");

    const url = `${window.location.origin}${
      window.location.pathname
    }?data=${tempo}-${compas.replace("/", "")}-${
      swing ? "s" : "n"
    }-${patternString}`;
    window.history.pushState({}, "", url);
    alert(
      "Patrón guardado en la URL. Puedes copiar la dirección para compartirla."
    );
  };

  // Función para cargar un patrón desde la URL
  const loadPatternFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");

    if (data) {
      const parts = data.split("-");
      if (parts.length >= 4) {
        // Cargar tempo
        setTempo(parseInt(parts[0]) || 90);

        // Cargar compás
        const compasValue = parts[1];
        setCompas(
          compasValue.length === 2
            ? `${compasValue[0]}/${compasValue[1]}`
            : "4/4"
        );

        // Cargar swing
        setSwing(parts[2] === "s");

        // Cargar patrón
        const patternData = parts.slice(3);
        const newPattern = Array(3)
          .fill()
          .map(() => Array(16).fill(false));

        patternData.forEach((rowData, rowIndex) => {
          if (rowIndex < 3) {
            for (let i = 0; i < Math.min(rowData.length, 16); i++) {
              newPattern[rowIndex][i] = rowData[i] === "1";
            }
          }
        });

        setPattern(newPattern);
      }
    }
  };

  // Efecto para manejar la reproducción
  useEffect(() => {
    if (isPlaying) {
      const interval = 60000 / tempo / 4; // Duración de cada paso en ms

      timerRef.current = setInterval(() => {
        setCurrentStep((prevStep) => {
          const nextStep = (prevStep + 1) % steps;

          // Reproducir sonidos para este paso
          pattern.forEach((row, rowIndex) => {
            if (row[prevStep]) {
              playSound(sounds[rowIndex]);
            }
          });

          return nextStep;
        });
      }, interval);

      return () => clearInterval(timerRef.current);
    }
  }, [isPlaying, tempo, pattern]);

  // Cargar patrón desde URL al montar el componente
  useEffect(() => {
    loadPatternFromURL();
  }, []);

  return (
    <div className="drum-machine">
      <div className="controls">
        <div className="control">
          <label>Tempo: {tempo} BPM</label>
          <input
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => setTempo(parseInt(e.target.value))}
          />
        </div>

        <div className="control">
          <label>Compás:</label>
          <select value={compas} onChange={(e) => setCompas(e.target.value)}>
            <option value="4/4">4/4</option>
            <option value="3/4">3/4</option>
            <option value="6/8">6/8</option>
          </select>
        </div>

        <div className="control">
          <label>Swing:</label>
          <input
            type="checkbox"
            checked={swing}
            onChange={() => setSwing(!swing)}
          />
        </div>

        <button className="control-btn" onClick={togglePlayback}>
          {isPlaying ? "Detener" : "Reproducir"}
        </button>

        <button className="control-btn" onClick={savePattern}>
          Guardar/Compartir
        </button>
      </div>

      <div className="grid-container">
        {sounds.map((sound, i) => (
          <div key={i} className="sound-row">
            <div className="sound-label">{sound}</div>
            <div className="step-row">
              {Array.from({ length: steps }).map((_, j) => (
                <div
                  key={j}
                  className={`cell ${pattern[i][j] ? "active" : ""} ${
                    currentStep === j ? "current" : ""
                  }`}
                  onClick={() => toggleCell(i, j)}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrumMachine;
