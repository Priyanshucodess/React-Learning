import { useState, useCallback, useEffect, useRef } from "react";

// Import global styles (Tailwind or your CSS file).
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
 

  const passwordRef = useRef(null);


  // useCallback memoizes the function so it doesn't get recreated on every render
  // unless its dependencies change (length/numberAllowed/charAllowed).
  const passwordGenerator = useCallback(() => {

    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) chars += "0123456789";
    if (charAllowed) chars += "!@#$%^&*()_+[]{};:,.<>/?|~-=\\";
  


    let pass = "";
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * chars.length);
      pass += chars.charAt(idx);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]); 

  // Auto-generate on first mount and whenever options change.
  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);


  // Copies current password to clipboard 
  const copyToClipboard = useCallback(async () => {
   
      await navigator.clipboard.writeText(password);
      passwordRef.current?.select();
      alert("Password copied to clipboard!");
  }, [password]);

 
  return (
    <>
      {/* Outer container card */}
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 bg-gray-800 text-orange-300 mt-50">
        {/* Title */}
        <h1 className="text-3xl text-center font-bold text-white mb-4">
          Password Generator
        </h1>

        {/* Password display + Copy button */}
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          {/* Read-only input displaying the password */}
          <input
            type="text"
            value={password}
            ref={passwordRef}
            className="w-full outline-white px-4 py-2 text-white"
            placeholder="password"
            readOnly
          />
          {/* Copy button */}
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 shrink-0 bg-blue-500 hover:bg-blue-600 text-white font-medium"
          >
            Copy
          </button>
        </div>

        {/* Controls: length slider */}
        <div className="flex items-center gap-3 mb-3">
          <label htmlFor="length" className="whitespace-nowrap">
            Length:
          </label>
          <input
            id="length"
            type="range"
            min={4}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full"
          />
          <span className="w-10 text-center">{length}</span>
        </div>

        {/* Controls: number toggle */}
        <div className="flex items-center gap-2 mb-2">
          <input
            id="numbers"
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label htmlFor="numbers">Include numbers</label>
        </div>

        {/* Controls: special characters toggle */}
        <div className="flex items-center gap-2 mb-4">
          <input
            id="specials"
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label htmlFor="specials">Include special characters</label>
        </div>

        {/* Manual regenerate button (optional, for user control) */}
        <div className="flex justify-end">
          <button
            onClick={passwordGenerator}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md"
          >
            Generate
          </button>
        </div>
      </div>
   


  
 


    </>
  );
}

export default App;
