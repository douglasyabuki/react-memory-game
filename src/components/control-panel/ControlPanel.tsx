// Components
import Heart from "./heart/Heart";
import DifficultyRange from "./difficulty-range/DifficultyRange";

// CSS
import styles from "./ControlPanel.module.css";
import React from "react";

// Props destructuring
export interface IGameOptions {
  lives: boolean[];
  min: number;
  max: number;
  current: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlPanel({ lives, min, max , current, onChange}: IGameOptions) {
  const validHearts = {};

  return (
    <div className={styles.controlPanel}>
      <h1>React + TS Memory Game</h1>
      <DifficultyRange min={min} max={max} current={current} onChange={onChange}></DifficultyRange>
      <div className={styles.heartsContainer}>
        {lives.map((life) => (
          <Heart heartState={life}></Heart>
        ))}
      </div>
    </div>
  );
}
