// CSS
import styles from "./RoundButton.module.css";

// Props destructuring
interface RoundButtonProps {
  value: string;
  onClickHandler: React.MouseEventHandler;
}

export default function RoundButton({
  value,
  onClickHandler,
}: RoundButtonProps) {
  return (
    <div className={styles.buttonContainer}>
      <button value={value} onClick={onClickHandler}>
        {value}
      </button>
    </div>
  );
}
