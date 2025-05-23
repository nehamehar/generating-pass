import { useState, useCallback, useEffect, useRef } from 'react'

import Footer from "./footer";



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    setPassword(pass)


  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator]) //Dependencies array determines when to re-run the effect

  return (
    
    <div className="w-full max-w-md px-4 py-3 mx-auto my-8 text-orange-500 bg-gray-800 rounded-lg shadow-md">
      <h1 className='my-3 text-center text-white'>Password Generator</h1>
    <div className="flex mb-4 overflow-hidden rounded-lg shadow">
        <input
            type="text"
            value={password}
            className="w-full px-3 py-1 outline-none"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >Copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={6}
        max={100}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div> 
         <footer className="py-2 text-center text-gray-500 bg-gray-800 mt-[500px] flex justify-between items-center px-6">
      <p>
        Made with ❤️ by {""}
        <a 
          href="mailto:nehamehar31@gmail.com"
          className="text-neutral-200 hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
          
        >
          Neha Mehar
        </a>
      </p>
      <a
        href="https://github.com/nehamehar/generating-pass"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="mt-2 text-2xl text-white fa-brands fa-github hover:text-slate-700"></i>
      </a>
    </footer>
</div>

    
  )
}

export default App