import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [step, setStep] = useState(1);
  const [puzzleDone, setPuzzleDone] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);

  // Autoplay music
  useEffect(() => {
    const audio = document.getElementById("bgMusic");
    if (audio) {
      audio.volume = 0.5;
      audio.play().catch(() => {});
    }
  }, []);

  // Puzzle logic
  function allowDrop(e) {
    e.preventDefault();
  }

  function drag(e) {
    e.dataTransfer.setData("text", e.target.id);
  }

  function drop(e) {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (e.target.id === "puzzleSlot") {
      e.target.appendChild(document.getElementById(data));
      setPuzzleDone(true);
    }
  }

  return (
    <div className={styles.container}>
      {/* Background Music */}
      <audio id="bgMusic" loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* Floating Hearts */}
      <div className={styles.hearts}></div>

      {step === 1 && (
        <section className={styles.section}>
          <h1>Apparently tech bros are stepping up this year</h1>
          <button className={styles.button} onClick={() => setStep(2)}>
            Continue ❤️
          </button>
        </section>
      )}

      {step === 2 && (
        <section className={styles.section}>
          <h2>🧩 Piece Us Together</h2>

          <div className={styles.puzzleArea}>
            <img
              id="piece"
              src="/couple.jpg"
              draggable="true"
              onDragStart={drag}
              className={styles.puzzlePiece}
            />

            <div
              id="puzzleSlot"
              className={styles.puzzleSlot}
              onDrop={drop}
              onDragOver={allowDrop}
            >
              Drop Here ❤️
            </div>
          </div>

          {puzzleDone && (
            <button className={styles.button} onClick={() => setStep(3)}>
              Continue 💖
            </button>
          )}
        </section>
      )}

      {step === 3 && (
        <section className={styles.section}>
          <p className={styles.quote}>
            “we’re doing long distance, he probs didn’t get me anything”
          </p>

          <button className={styles.button} onClick={() => setStep(4)}>
            Wait…
          </button>
        </section>
      )}

      {step === 4 && (
        <section className={styles.section}>
          <h2>💌 Tap Envelope</h2>

          <img
            src="/envelope.png"
            className={
              envelopeOpen ? styles.envelopeOpen : styles.envelopeClosed
            }
            onClick={() => setEnvelopeOpen(true)}
          />

          {envelopeOpen && (
            <div className={styles.card}>
              <p>To the love of my life ❤️</p>
              <p>
                I will always love you no matter what.  
                You are the best part of my life.  
                I can’t imagine life without you.
              </p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
