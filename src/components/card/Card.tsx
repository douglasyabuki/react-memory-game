// CSS
import styles from "./Card.module.css";
interface ICardProps {
  value: number;
  isVisible: boolean;
}

export default function Card({ value, isVisible }: ICardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={isVisible? styles.card :`${styles.card} ${styles.flipped}`}>
        <img className={`${styles.front} ${styles.cardFace}`} src={`card${value}.jpg`}/>
        <img className={`${styles.back} ${styles.cardFace}`} src={"cardback.jpg"}/>
      </div>
    </div>
  );
}
