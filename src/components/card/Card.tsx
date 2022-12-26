// CSS
import styles from "./Card.module.css";

// Props destructuring
interface ICardProps {
  value: number;
  isVisible: boolean;
}

// Card main function
export default function Card({ value, isVisible }: ICardProps) {

  // Returns a card to Board.tsx
  return (
    <div className={value ? styles.cardContainer : styles.invisible}>
      <div
        className={isVisible ? styles.card : `${styles.card} ${styles.flipped}`}
      >
        <img
          className={`${styles.front} ${styles.cardFace}`}
          src={value ? `card${value}.jpg` : ``}
        />
        <img
          className={`${styles.back} ${styles.cardFace}`}
          src={"cardback.jpg"}
        />
      </div>
    </div>
  );
}
