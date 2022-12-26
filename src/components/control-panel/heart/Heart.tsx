// CSS
import styles from "./Heart.module.css";

// Props destructuring
interface Props {
  heartState: boolean;
}

export default function Heart({ heartState }: Props) {
  return (
    <div className={styles.heartContainer}>
      <div className={heartState ? styles.heart : styles.lostHeart}></div>
    </div>
  );
}
