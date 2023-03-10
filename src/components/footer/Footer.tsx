// CSS
import styles from "./Footer.module.css";

// Footer main function
export default function Footer() {

  // Returns the footer to App.tsx
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="https://www.linkedin.com/in/douglas-yabuki/" target="_blank">
          <img src="/linkedin.png"/>
        </a>
        <a href="https://github.com/douglasyabuki/" target="_blank">
          <img src="/github.png"/>
        </a>
        <a href="mailto:douglasyabuki@gmail.com" target="_blank">
          <img src="/mail.png"/>
        </a>
      </div>
      <h3>Douglas Yuji Yabuki @2022</h3>
    </footer>
  );
}
