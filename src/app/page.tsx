"use client";
import Image from "next/image";
import styles from "./page.module.css";
import TodoList from "./dashboard/todoList";
import { useState } from 'react'
import Link from 'next/link';


export default function Home() {


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <nav>
          <h2>영혜의 포트폴리오</h2>
          <ul>
            <li><Link href="">Home</Link></li>
            <li><Link href="/dashboard">TodoList</Link></li> {/* 버튼으로 변경 */}
          </ul>
        </nav>
      </main>
    </div>
  );
}
