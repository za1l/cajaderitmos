import React, { useState } from "react";

const FlamencoControls = ({ tempo, setTempo, swing, setSwing }) => {
  return (
    <div className="controls">
      <div className="control">
        <label>Tempo:</label>
        <input
          type="range"
          min="40"
          max="240"
          value={tempo}
          onChange={(e) => setTempo(Number(e.target.value))}
        />
        <span>{tempo} BPM</span>
      </div>
      <div className="control">
        <label>Swing:</label>
        <input
          type="range"
          min="0"
          max="100"
          value={swing}
          onChange={(e) => setSwing(Number(e.target.value))}
        />
        <span>{swing}%</span>
      </div>
    </div>
  );
};

export default FlamencoControls;
