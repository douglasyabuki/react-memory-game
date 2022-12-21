// CSS
import styles from "./DifficultyRange.module.css";

// Props destructuring
interface Props {
  difficulty: number;
}

export default function DifficultyRange({difficulty}: Props) {
  return (
    <div className={styles.difficultyRange}>
      <label>Level</label>
      <input type="range" id="difficulty" name="difficulty" min={1} max={3} step={1} value={difficulty}/>
    </div>
  );
}
