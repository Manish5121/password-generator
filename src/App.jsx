import { useRef } from "react"
import { useState, useCallback, useEffect } from "react"

function App() {
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(9)
  const [charAllowed, setCharAllowed] = useState(false)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const passwordRef = useRef(null)

  const copyPassword = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (charAllowed) str += "!@#$%^&*()_+-={}[]|;:<>,.?/"

    if (numberAllowed) str += "0123456789"

    for (let i = 1; i <= length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, charAllowed, numberAllowed, setPassword])

  useEffect(() => {
    console.log(password)
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <div className="w-full h-screen bg-zinc-900 text-white flex justify-center items-center">
      <div className="p-4 w-[500px] flex my-8 flex-col gap-6 bg-teal-900 rounded-md">
        <h1 className="text-3xl  text-center font-semibold">
          MysticCypherGen🍥
        </h1>
        <div className="flex gap-3">
          <input
            type="text"
            value={password}
            readOnly
            placeholder="password"
            className="w-full text-black outline-none py-2 px-4 rounded-md"
            ref={passwordRef}
          />
          <button
            className="bg-slate-800 flex font-semibold justify-between items-center outline-none py-2 px-4 rounded-md"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div className="flex items-center justify-between gap-x-2">
          <div className="flex items-center  gap-x-1">
            <input
              type="range"
              min={9}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="charInput"
              defaultValue={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor=""> Character</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numInput"
              defaultValue={numberAllowed}
              onChange={() => {
                setnumberAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="">Number</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
