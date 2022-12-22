// CSS
import React from "react";
import styles from "./DifficultyRange.module.css";

// Props destructuring
interface Props {
  min: number;
  max: number;
  current: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DifficultyRange({min, max, current, onChange}: Props) {
  return (
    <div className={styles.difficultyRange}>
      <label>Level</label>
      <input type="range" id="difficulty" name="difficulty" min={min} max={max} value={current} onChange={onChange}/>
    </div>
  );
}
