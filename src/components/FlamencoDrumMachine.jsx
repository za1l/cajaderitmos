import React, { useState } from "react";
import FlamencoControls from "./FlamencoControls";

const FlamencoDrumMachine = () => {
  const [tempo, setTempo] = useState(120);
  const [swing, setSwing] = useState(50);
  const [pattern, setPattern] = useState([]);
  const flamencoSounds = {
    palmas: "/sounds/palmas.wav",
    cajon: "/sounds/cajon.wav",
    guitarra: "/sounds/guitarra.wav",
  };

  const handleCellClick = (sound) => {
    // Lógica para manejar el click en cada celda
  };

  const generateURL = () => {
    const soundsMap = {
      palmas: 1,
      cajon: 2,
      guitarra: 3,
    };
    const sequence = pattern.map((p) => p.join("")).join("");
    const url = `${tempo}-${swing}-${sequence}`;
    window.history.pushState({}, "", `?data=${url}`);
  };

  const decodeURL = () => {
    const params = new URLSearchParams(window.location.search);
    const data = params.get("data");
    if (data) {
      const [tempoParam, swingParam, sequenceParam] = data.split("-");
      setTempo(Number(tempoParam));
      setSwing(Number(swingParam));
      setPattern(sequenceParam.match(/.{1,3}/g).map((s) => s.split("")));
    }
  };

  React.useEffect(() => {
    decodeURL();
  }, []);

  return (
    <div className="drum-machine">
      <FlamencoPalos />
      <FlamencoControls
        tempo={tempo}
        setTempo={setTempo}
        swing={swing}
        setSwing={setSwing}
      />
      <div className="grid">
        {Object.entries(flamencoSounds).map(([name, sound]) => (
          <div
            key={name}
            className="cell"
            onClick={() => handleCellClick(sound)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

import FlamencoPalos from "./FlamencoPalos";

export default FlamencoDrumMachine;
