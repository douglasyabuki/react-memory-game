// Components
import Board from "./components/board/Board";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";

// CSS
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <Header></Header>
      <main className={styles.main}>
        <Board></Board>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
