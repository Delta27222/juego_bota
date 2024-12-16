// biome-ignore lint/style/useImportType: <explanation>
import React, { useEffect, useState } from "react";

interface Props {
  palabra: string;
  setRenderNext?: (value: boolean) => void;
  letrasIngresadas: string[];
  setLetrasIngresadas: (value: string[]) => void;
  wordIndex: number;
  showCorrectWord: boolean;
  setShowCorrectWord: (value: boolean) => void;
}

const WordInput = ({
  palabra,
  setRenderNext,
  letrasIngresadas,
  setLetrasIngresadas,
  wordIndex,
  showCorrectWord,
  setShowCorrectWord,
}: Props) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0); // Controlamos el índice del input enfocado

  const response = JSON.parse(process.env.NEXT_PUBLIC_RESPONSES || "[]");
  const position = JSON.parse(process.env.NEXT_PUBLIC_WORD_POSITIONS || "[]");

  useEffect(() => {
    setLetrasIngresadas(Array(palabra.length).fill(""));
  }, [palabra, setLetrasIngresadas]);

  useEffect(() => {
    // Verifica si la palabra está completa y es correcta
    const palabraCompleta = letrasIngresadas.join("");
    if (palabraCompleta === palabra.toUpperCase() && setRenderNext) {
      setRenderNext(true);
      setShowCorrectWord(true);
    }
  }, [letrasIngresadas, palabra, setRenderNext, setShowCorrectWord]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const valor = event.target.value.toUpperCase();

    // Limitar a un solo carácter
    if (valor.length > 1) {
      event.target.value = "";
      return;
    }

    const nuevasLetras = [...letrasIngresadas];
    nuevasLetras[index] = valor;
    setLetrasIngresadas(nuevasLetras);

    // Enfocar el siguiente input si no estamos en el último
    if (valor !== "" && index < palabra.length - 1) {
      setFocusedIndex(index + 1); // Actualizamos el índice del foco
    }
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Si se presiona "Backspace" y el input está vacío, mover al anterior
    if (
      event.key === "Backspace" &&
      letrasIngresadas[index] === "" &&
      index > 0
    ) {
      setFocusedIndex(index - 1); // Mover al input anterior
    }
  };

  const cuadrados = palabra.split("").map((letra, index) => {
    const esCorrecta = letrasIngresadas[index] === letra.toUpperCase();
    const esIncorrecta = letrasIngresadas[index] !== "" && !esCorrecta;
    let show = "";
    if (response[wordIndex] === index && showCorrectWord) {
      show = "text-4xl bg-blue-500";
      const icon = document.getElementById(`icon-${position[wordIndex]}`);
      if (icon) {
        icon.classList.remove("hidden");
      }
    } else {
      show = esCorrecta
        ? "bg-green-500 cursor-not-allowed"
        : esIncorrecta
        ? "bg-red-500"
        : "bg-black";
    }

    return (
      <input
        key={`${letra}-${index}-${Math.random()}`} // Clave única
        ref={(input) => {
          if (index === focusedIndex && input) {
            input.focus();
          }
        }} // Asignamos autofocus en el índice correspondiente
        type="text"
        disabled={esCorrecta}
        maxLength={1}
        value={letrasIngresadas[index]}
        onChange={(event) => handleChange(index, event)}
        onKeyDown={(event) => handleKeyDown(index, event)}
        className={`border-none text-white w-[30px] h-[30px] md:w-[40px] md:h-[40px] text-center font-bold rounded font-sans ${show}`}
        style={{
          imeMode: "disabled",
          caretColor: "transparent",
          width: "40px",
          height: "40px",
        }}
      />
    );
  });

  return <div className="flex gap-2">{cuadrados}</div>;
};

export default WordInput;
