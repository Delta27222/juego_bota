import React from "react";
import WordInput from "../inputs/WordInput";

interface TriviaBodyProps {
  word: string;
  question: string;
  index?: number;
  wordIndex: number;
  setWordIndex: (value: number) => void;
  setShowConfetti: (value: boolean) => void;
}

function TriviaBody({
  word,
  question,
  index,
  wordIndex,
  setWordIndex,
  setShowConfetti,
}: TriviaBodyProps) {
  console.log("🚀 ~ wordIndex:", wordIndex);

  const [renderNext, setRenderNext] = React.useState(false);
  const [showCorrectWord, setShowCorrectWord] = React.useState(false);
  const [letrasIngresadas, setLetrasIngresadas] = React.useState<string[]>(
    Array(word.length).fill("")
  );

  const onClick = () => {
    setRenderNext(false); // Oculta el botón después de hacer clic
    setLetrasIngresadas(Array(word.length).fill(""));
    setWordIndex(wordIndex !== undefined ? wordIndex + 1 : 0);
    setShowCorrectWord(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if(wordIndex !== 8){
      if (showCorrectWord) {
        setShowConfetti(true);
      }
      setTimeout(() => {
        setShowConfetti(false);
      }, 7000);
    }
  }, [showCorrectWord]);

  return (
    <section className="flex flex-col justify-start items-center w-full px-5 h-screen mt-[150px] text-white">
      <div className="mb-[80px]">
        <p className="text-[35px] md:text-[60px] text-center font-bold ">
          Pregunta #{index} 🎄
        </p>
      </div>
      <div className="flex flex-col justify-between items-center mb-[80px]">
        <h1 className=" text-4xl text-center">{question}</h1>
      </div>
      <div className="mb-[80px]">
        <WordInput
          palabra={word}
          setRenderNext={setRenderNext}
          letrasIngresadas={letrasIngresadas}
          setLetrasIngresadas={setLetrasIngresadas}
          wordIndex={wordIndex}
          showCorrectWord={showCorrectWord}
          setShowCorrectWord={setShowCorrectWord}
        />
      </div>
      {renderNext && (
        <button
          type="button"
          className="bg-green-500 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded text-[20px]"
          onClick={onClick}
        >
          Siguiente
        </button>
      )}
    </section>
  );
}

export default TriviaBody;
