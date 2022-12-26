// Components
import DifficultyRange from "./difficulty-range/DifficultyRange";
import Heart from "./heart/Heart";

// CSS
import React from "react";
import styles from "./ControlPanel.module.css";

// Props destructuring
export interface IGameOptions {
  disabled: boolean;
  min: number;
  max: number;
  current: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  lives: boolean[];
}

// Control panel main function
export default function ControlPanel({
  disabled,
  min,
  max,
  current,
  onChange,
  lives,
}: IGameOptions) {

  // Returns the control panel to Board.tsx
  return (
    <div className={styles.controlPanel}>
      <h1>React + TS Memory Game</h1>
      <DifficultyRange
        disabled={disabled}
        min={min}
        max={max}
        current={current}
        onChange={onChange}
      ></DifficultyRange>
      <div className={styles.heartsContainer}>
        {lives.map((life, index) => (
          <div key={index}>
            <Heart heartState={life}></Heart>
          </div>
        ))}
      </div>
    </div>
  );
}
