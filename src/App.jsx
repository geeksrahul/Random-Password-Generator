import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(8);
  const [digitAllowed, setDigitAllowed] = useState(false);
  const [symbolAllowed, setSymbolAllowed] = useState(false);

  // Handle password generation whenever dependencies change
  useEffect(() => {
    let generatedPassword = "";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let digits = "0123456789";
    let symbol = "!@#$%^&*()_+-=[]{}|;:',.<>?/";

    if (digitAllowed) {
      characters += digits;
    }
    if (symbolAllowed) {
      characters += symbol;
    }

    // Generate password based on selected length
    for (let i = 1; i <= length; i++) {
      generatedPassword += characters[Math.floor(Math.random() * characters.length)];
    }
    setPassword(generatedPassword);
  }, [length, digitAllowed, symbolAllowed]);

  const passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
      window.navigator.clipboard.writeText(password);
      passwordRef.current.setSelectionRange(0, 999);
      passwordRef.current.select();
  }, [password]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-blue-500">
      <div className="bg-gray-200 p-5 rounded-md flex flex-col gap-1">
        <h1 className="text-4xl font-semibold p-1 text-center">Password Generator</h1>
        <div className="flex p-1">
          {/* Password input (readonly) */}
          <input
            type="text"
            value={password}
            className="bg-gray-300 pl-2 pr-2 pt-1 pb-1 w-full rounded-md rounded-r-none"
            ref={passwordRef}
          />
          {/* Copy button */}
          <button
            className="bg-blue-500 text-white pl-2 pr-2 pt-1 pb-1 rounded-md rounded-l-none"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>
        <div className="flex p-1 items-center justify-center border-red-100 min-h-8 gap-2">
          <input
            type="range"
            min="8"
            max="24"
            value={length}
            onChange={(event) => setLength(event.target.value)}
          />
          Length ({length < 10 ? "0" + length : length})
          {/* Checkbox for allowing symbols */}
          <input
            type="checkbox"
            id="cbSymbols"
            checked={symbolAllowed}
            onChange={() => setSymbolAllowed((prev) => !prev)}
          />
          <label htmlFor="cbSymbols">Symbols</label>
          {/* Checkbox for allowing digits */}
          <input
            type="checkbox"
            id="cbDigits"
            checked={digitAllowed}
            onChange={() => setDigitAllowed((prev) => !prev)}
          />
          <label htmlFor="cbDigits">Digits</label>
        </div>
      </div>
    </div>
  );
}

export default App;
