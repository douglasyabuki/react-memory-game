// CSS
import styles from "./Card.module.css";

interface ICardProps {
  value: number;
  onClickHandler: React.MouseEventHandler;
}

export default function Card({ value, onClickHandler }: ICardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.face} ${styles.hidden}`} onClick={onClickHandler} id={`#${value}`}>
        <h1>{value}</h1>
      </div>
    </div>
  );
}
