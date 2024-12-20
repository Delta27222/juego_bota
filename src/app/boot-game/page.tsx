"use client";

import Surprice from "@/componets/surprice/Surprice";
import TriviaBody from "@/componets/words/TriviaBody";
import React from "react";

function HomeBotaPage() {
  const WORDS = JSON.parse(process.env.NEXT_PUBLIC_WORDS || "[]");
  const QUESTIONS = JSON.parse(process.env.NEXT_PUBLIC_QUESTIONS || "[]");
  const ICONS = JSON.parse(process.env.NEXT_PUBLIC_LETTERS || "[]");
  const [gameState, setGameState] = React.useState(true);
  const [wordIndex, setWordIndex] = React.useState(0);

  const firsMessage = () => {
    return (
      <div className="text-[30px] md:text-[60px] text-center text-green-600 animate-pulse md:p-10">
        <h1>¡Bienvenidos equipo ⛰️ al juego de la Bota 2024! 🎄🎅</h1>
      </div>
    );
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setGameState(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if(wordIndex === 8){
      for (let i = 0; i < 10; i++) {
        const icon = document.getElementById(`icon-${i}`);
        icon?.classList.remove("hidden");
      }
    }
  }, [wordIndex])

  return (
    <section className={`w-full h-screen flex flex-col justify-center items-center z-50 px-5  ${wordIndex === WORDS.length ? 'animate-pulse' : ''}`}>
      {gameState ? (
        firsMessage()
      ) : wordIndex !== WORDS.length ? (
        <TriviaBody
          word={WORDS[wordIndex] ?? ""}
          question={QUESTIONS[wordIndex] ?? ""}
          index={wordIndex + 1}
          wordIndex={wordIndex}
          setWordIndex={setWordIndex}
        />
      ) : (
        <Surprice />
      )}

      <div
        key={'icons'}
        className="flex flex-row justify-center items-center font-bold space-x-3 font-serif text-white z-50">
        {ICONS.map((icon: string, index: number) => (
          <span
            id={`icon-${index}`}
            key={`icon${icon}${index + 10}`}
            className={`text-center hidden ${wordIndex!== WORDS.length ? 'text-sm opacity-45' : ' text-4xl opacity-100'}`}
          >
            {icon}
          </span>
        ))}
      </div>

    </section>
  );
}

export default HomeBotaPage;
