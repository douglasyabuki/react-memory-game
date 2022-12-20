// CSS
import styles from "./Card.module.css";
interface ICardProps {
  value: number;
  onClickHandler: React.MouseEventHandler;
  isVisible: boolean
}

export default function Card({ value, onClickHandler, isVisible }: ICardProps) {

  return (
    <div className={styles.card} onClick={onClickHandler}>
      <div className={isVisible ? styles.face : `${styles.face} ${styles.hidden}`}  id={`#${value}`}>
        <h1>{value}</h1>
      </div>
    </div>
  );
}
