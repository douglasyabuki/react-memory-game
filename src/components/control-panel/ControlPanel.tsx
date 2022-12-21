// Components
import Heart from "./heart/Heart";
import DifficultyRange from "./difficulty-range/DifficultyRange";

// CSS
import styles from "./ControlPanel.module.css";

// Props destructuring
export interface IGameOptions {
  lives: boolean[];
  difficulty: number;

}

export default function ControlPanel({ lives, difficulty }: IGameOptions) {
  const validHearts = {};

  return (
    <div className={styles.controlPanel}>
      <h1>React + TS Memory Game</h1>
      <DifficultyRange difficulty={difficulty}></DifficultyRange>
      <div className={styles.heartsContainer}>
        {lives.map((life) => (
          <Heart heartState={life}></Heart>
        ))}
      </div>
    </div>
  );
}
