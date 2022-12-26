// CSS
import styles from "./RoundButton.module.css";

// Props destructuring
interface RoundButtonProps {
  value: string;
  onClickHandler: React.MouseEventHandler;
}

// Main function of the Round Button
export default function RoundButton({
  value,
  onClickHandler,
}: RoundButtonProps) {

  // Returns a button to Board.tsx.
  return (
    <div className={styles.buttonContainer}>
      <button value={value} onClick={onClickHandler}>
        {value}
      </button>
    </div>
  );
}
