// CSS
import styles from "./Card.module.css";
interface ICardProps {
  value: number;
  onClickHandler: React.MouseEventHandler;
  isVisible: boolean;
}

export default function Card({ value, onClickHandler, isVisible }: ICardProps) {
  return (
    <div className={styles.cardContainer} onClick={onClickHandler}>
      <div className={isVisible? styles.card :`${styles.card} ${styles.flipped}`}>
        <div className={`${styles.front} ${styles.cardFace}`} id={`#${value}`}>
          <h1>{value}</h1>
        </div>
        <div className={`${styles.back} ${styles.cardFace}`}></div>
      </div>
    </div>
  );
}
