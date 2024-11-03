import Image from "next/image";
import styles from "./page.module.css";
import todoList from "./todoList";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav>
          <h2>영혜의 포트폴리오</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a onClick={todoList} href="#">TodoList</a></li>
          </ul>
        </nav>
      </main>
    </div>
  );
}
