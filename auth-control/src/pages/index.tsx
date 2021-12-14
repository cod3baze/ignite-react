import { useState, FormEvent } from "react";

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { email, password };

    console.log(data);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Sign | Sessions</title>
        <meta
          name="description"
          content="App authentication controller to Dash.Go"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">enviar</button>
        </form>
      </main>
    </div>
  );
}