import React from "react";

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
  const inputsRef = React.useRef<(HTMLInputElement | null)[]>([]); // Cambiado para aceptar null
  const response = JSON.parse(process.env.NEXT_PUBLIC_RESPONSES || "[]");
  const position = JSON.parse(process.env.NEXT_PUBLIC_WORD_POSITIONS || "[]");

  React.useEffect(() => {
    setLetrasIngresadas(Array(palabra.length).fill(""));
  }, [palabra, setLetrasIngresadas]);

  React.useEffect(() => {
    // Inicializar los refs correctamente
    inputsRef.current = inputsRef.current.slice(0, palabra.length); // Ajustamos el tamaño de los refs según la longitud de la palabra
  }, [palabra]);

  React.useEffect(() => {
    // Enfocar el primer input cuando se monta
    if (inputsRef.current[0]) {
      inputsRef.current[0]?.focus();
    }
  }, []);

  React.useEffect(() => {
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
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 0);
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
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleFocus = (
    index: number,
    event: React.FocusEvent<HTMLInputElement>
  ) => {
    // En dispositivos móviles, prevenir que el teclado se cierre al cambiar entre inputs
    event.preventDefault();
    if (inputsRef.current[index]) {
      inputsRef.current[index]?.focus();
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
        ref={(el) => {
          if (el) inputsRef.current[index] = el;
        }}
        type="text"
        disabled={esCorrecta}
        maxLength={1}
        value={letrasIngresadas[index]}
        onChange={(event) => handleChange(index, event)}
        onKeyDown={(event) => handleKeyDown(index, event)}
        onFocus={(event) => handleFocus(index, event)}
        className={`border-none text-white w-[40px] h-[40px] text-center font-bold rounded font-sans ${show}`}
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
