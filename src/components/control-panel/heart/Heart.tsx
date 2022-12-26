// CSS
import styles from "./Heart.module.css";

// Props destructuring
interface Props {
  heartState: boolean;
}

// Heart main function
export default function Heart({ heartState }: Props) {
  
  // Returns a heart-shaped div that changes based on its boolean value to ControlPanel.tsx
  return (
    <div className={styles.heartContainer}>
      <div className={heartState ? styles.heart : styles.lostHeart}></div>
    </div>
  );
}
