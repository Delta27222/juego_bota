import React from "react";
import WordInput from "../inputs/WordInput";
import Confetti from "react-confetti";

interface TriviaBodyProps {
  word: string;
  question: string;
  index?: number;
  wordIndex: number;
  setWordIndex: (value: number) => void;
}

function TriviaBody({
  word,
  question,
  index,
  wordIndex,
  setWordIndex,
}: TriviaBodyProps) {

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


  return (
    <section className="flex flex-col justify-start items-center w-full md:px-5 h-screen mt-[150px] text-white z-50">
      <div className="mb-[80px]">
        <p className="text-[30px] md:text-[60px] text-center font-bold ">
          Pregunta #{index} 🎄
        </p>
      </div>
      <div className="flex flex-col justify-between items-center mb-[80px]">
        <h1 className=" text-2xl md:text-4xl text-center">{question}</h1>
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
        <div>
          <button
            type="button"
            className="bg-green-500 hover:bg-green-700 text-white font-extrabold py-2 px-4 rounded text-[20px]"
            onClick={onClick}
          >
            Siguiente
          </button>
          <div className="z-20 flex flex-col justify-center items-center"><Confetti width={350} height={900} gravity={0.6} /></div>
        </div>
      )}
    </section>
  );
}

export default TriviaBody;
