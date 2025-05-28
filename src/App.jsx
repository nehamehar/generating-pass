import { useState, useCallback, useEffect, useRef } from 'react';
import Footer from './Footer';
function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex flex-col min-h-screen text-white bg-black">
  {/* Main section */}
  <main className="flex items-center justify-center flex-grow px-4 py-6 pt-5 pe-5">
    <div className="w-full max-w-xl p-10 bg-gray-800 rounded-lg shadow-md">
      <h1 className="mb-10 text-2xl font-extrabold text-center text-white">Password Generator</h1>

      {/* Input & Copy */}
      <div className="flex mb-6 overflow-hidden rounded-lg shadow">
        <input
          type="text"
          value={password}
          className="w-full px-2 py-2 text-black outline-none"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="px-4 text-white bg-blue-700 shrink-0"
        >
          Copy
        </button>
      </div>

      {/* Controls Section */}
      <div className="flex flex-col gap-6 pr-12 text-orange-500 sm:flex-row sm:items-center sm:justify-between">
        {/* Length */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label>Length: {length}</label>
        </div>

        {/* Numbers */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="numberInput"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>

        {/* Characters */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="characterInput"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  </main>

  {/* flex flex-col gap-4 — mobile: stacked vertically with gaps

sm:flex-row sm:justify-between sm:px-8 — from 640px width (small tablets+) make footer horizontal with space between items and horizontal padding

lg:px-16 — bigger padding on large screens (1024px+)
Use Tailwind’s responsive prefixes (sm:, md:, lg: etc.) to add or override styles for bigger screens. */}
  <footer className="w-full py-2.5 text-base px-7 center bg-slate-800">
    <div className="flex flex-col gap-4 p-2 text-center bg-gray-800 text-slate-400 lg:ml-48 sm:flex-row sm:justify-between sm:px-8 lg:px-16">
      
      <p>
        Made with ❤️ by{" "}
        <a
          href="mailto:nehamehar31@gmail.com"
          className="text-lg text-white "
          target="_blank"
          rel="noopener noreferrer"
        >
          Neha
        </a>
      </p>
      <a
        href="https://github.com/nehamehar/generating-pass"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="text-3xl text-white sm:mr-52 fa-brands fa-github"></i>
      </a>
    </div>
  </footer>
</div>

  );
}
export default App;