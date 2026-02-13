import { useState, useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [step, setStep] = useState(1);
  const [puzzleDone, setPuzzleDone] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const audioRef = useRef(null);

  // Detect if user is on mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 600;

  // Music autoplay on first user interaction
  useEffect(() => {
    const playMusic = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => {});
      }
      window.removeEventListener("click", playMusic);
    };
    window.addEventListener("click", playMusic);
  }, []);

  // Generate multiple hearts for animation
  const [hearts, setHearts] = useState([]);
  useEffect(() => {
    const heartCount = 20;
    const newHearts = Array.from({ length: heartCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 5,
      size: 16 + Math.random() * 20,
    }));
    setHearts(newHearts);
  }, []);

  // Puzzle functions
  const allowDrop = (e) => e.preventDefault();
  const drag = (e) => e.dataTransfer.setData("text", e.target.id);
  const drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text");
    if (e.target.id === "puzzleSlot") {
      e.target.appendChild(document.getElementById(data));
      setPuzzleDone(true);
    }
  };

  const handlePuzzleClick = () => {
    if (isMobile) {
      const slot = document.getElementById("puzzleSlot");
      const piece = document.getElementById("piece");
      if (slot && piece) {
        slot.appendChild(piece);
        setPuzzleDone(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Background Music */}
      <audio ref={audioRef} loop>
        <source src="/Mi Alma.mp3" type="audio/mpeg" />
      </audio>

      {/* Animated Hearts */}
      <div className={styles.hearts}>
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className={styles.heart}
            style={{
              left: `${heart.left}%`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {/* Step 1 */}
      {step === 1 && (
        <section className={styles.section}>
          <h1>To the moon and back</h1>
          <button className={styles.button} onClick={() => setStep(2)}>
            Continue ❤️
          </button>
        </section>
      )}

      {/* Step 2: Puzzle */}
      {step === 2 && (
        <section className={styles.section}>
          <h2>🧩 Piece Us Together</h2>
          <div className={styles.puzzleArea}>
            <img
              id="piece"
              src="/couple.jpg"
              draggable={!isMobile}
              onDragStart={drag}
              onClick={handlePuzzleClick} // tap on mobile
              className={styles.puzzlePiece}
              alt="Puzzle Piece"
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

      {/* Step 3: Quote */}
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

      {/* Step 4: Envelope */}
      {step === 4 && (
        <section className={styles.section}>
          <h2>💌 Tap Envelope</h2>
          <div
            className={
              envelopeOpen
                ? styles.envelopeWrapperOpen
                : styles.envelopeWrapperClosed
            }
            onClick={() => setEnvelopeOpen(true)}
          >
            <img
              src="/envelope.png"
              className={styles.envelope}
              alt="Envelope"
            />
          </div>

          {/* Card content */}
          {envelopeOpen && (
            <div className={styles.card}>
              <p>To the love of my life Mi Alma ❤️</p>
              <p>
                I will always love you no matter what.  
                You are the best part of my life.  
                I can’t imagine life without you. FOREVER IS THE DEAL.
              </p>
            </div>
          )}

          {/* Watch Video button - always visible after Step 4 */}
          <button className={styles.button} onClick={() => setStep(5)}>
            Watch Our Video 🎥
          </button>
        </section>
      )}

      {/* Step 5: Video */}
      {step === 5 && (
        <section className={styles.section}>
          <h2>🎬 A Special Video for You</h2>
          <video
            className={styles.video}
            controls
            autoPlay
            muted
            loop
            playsInline
            src="/valentine.mp4"
          >
            Your browser does not support the video tag.
          </video>
          <button className={styles.button} onClick={() => setStep(1)}>
            Watch Again 🔁
          </button>
        </section>
      )}
    </div>
  );
}
