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
        <img className={`${styles.front} ${styles.cardFace}`} id={`#${value}`} src={`card${value}.jpg`}/>
        <img className={`${styles.back} ${styles.cardFace}`} src={"cardback.jpg"}/>
      </div>
    </div>
  );
}
