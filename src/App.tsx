// Components
import Board from "./components/board/Board";
import Footer from "./components/footer/Footer";

// CSS
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <main className={styles.main}>
        <Board></Board>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
