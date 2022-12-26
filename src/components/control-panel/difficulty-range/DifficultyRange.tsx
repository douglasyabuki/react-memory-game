// CSS
import React from "react";
import styles from "./DifficultyRange.module.css";

// Props destructuring
interface Props {
  disabled: boolean;
  min: number;
  max: number;
  current: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Difficulty Range main function
export default function DifficultyRange({
  disabled,
  min,
  max,
  current,
  onChange,
}: Props) {
  
  // Returns an input type "range" to ControlPanel.tsx
  return (
    <div className={styles.difficultyRange}>
      <label>Level</label>
      <input
        type="range"
        id="difficulty"
        name="difficulty"
        disabled={disabled}
        min={min}
        max={max}
        value={current}
        onChange={onChange}
      />
    </div>
  );
}
