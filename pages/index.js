import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [step, setStep] = useState(1);

  return (
    <div className={styles.container}>
      {step === 1 && (
        <section className={styles.hero}>
          <h1>Apparently tech bros are stepping up this year</h1>
          <button onClick={() => setStep(2)}>Continue</button>
        </section>
      )}

      {step === 2 && (
        <section className={styles.puzzle}>
          <h2>Piece Us Together</h2>
          <p>Love is built piece by piece.</p>
          <button onClick={() => setStep(3)}>Puzzle Completed ❤️</button>
        </section>
      )}

      {step === 3 && (
        <section className={styles.expectation}>
          <p className={styles.quote}>
            “we’re doing long distance, he probs didn’t get me anything”
          </p>
          <button onClick={() => setStep(4)}>Wait…</button>
        </section>
      )}

      {step === 4 && (
        <section className={styles.reveal}>
          <h2>Heart 2 Heart</h2>
          <div className={styles.card}>
            <p>To the love of my life,</p>
            <p>
              You make my life so meaningful and I am so lucky to have you as my
              valentine this year.
            </p>
            <p>I love you wholeheartedly and can’t wait to continue loving you
              for the rest of my life.</p>
          </div>

          <div className={styles.notes}>
            <span>I will always love you no matter what</span>
            <span>You are the best part of my life</span>
            <span>I can’t imagine a life without you</span>
          </div>
        </section>
      )}
    </div>
  );
}
