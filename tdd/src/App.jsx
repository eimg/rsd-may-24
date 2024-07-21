import { useRef, useState } from "react";
import { usd_to_mmk } from "../libs/math";

export default function App() {
  const [result, setResult] = useState(0);
  const inputRef = useRef();

  return (
    <div>
      <h1 role="title">Converter</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setResult(usd_to_mmk(inputRef.current.value));
        }}
      >
        <input type="text" role="input" ref={inputRef} />
        <button type="submit" role="button">
          Convert
        </button>
      </form>
      <div role="result">{result}</div>
    </div>
  );
}
