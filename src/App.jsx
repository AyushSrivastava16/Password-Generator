import { useState, useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, seTcharAllowed] = useState(false);
  const [Password, setPassword] = useState("");
  const passwordref = useRef(null);
    const passGenerator = useCallback(
      () => {
        let pass = ""
        let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
        if (numberAllowed) {
          str += "1234567890"
        }
        if (charAllowed) {
          str+="!@#$%^&*()_+}{:?><`"
        }
        for (let index = 0; index < length; index++) {
          let pos = Math.floor(Math.random() * str.length +1)
          pass += str.charAt(pos);
          
        }
        setPassword(pass);

      },
      [length, numberAllowed, charAllowed, setPassword],
    )
    useEffect(()=>{
      passGenerator();
    }, [length, numberAllowed, charAllowed, passGenerator])

    const copyPasswordToClipBoard = useCallback(()=>{
      passwordref.current?.select()
      window.navigator.clipboard.writeText(Password)
    },
    [Password])

  return (
    <>
     <div className="bg-slate-950 h-lvh w-screen flex justify-center">
      
      
      <div className="bg-slate-800 w-[80%] h-40 rounded-lg mt-9 text-orange-400 flex justify-center text-3xl tracking-wide font-serif font-normal"><div>
        <h2 className='mt-2 my-3 text-center'>Password Generator</h2>
        <div className='h-8 '>

      <input type="text" placeholder='PASSWORD' value={Password} ref = {passwordref} readOnly className='h-8 mt-3 rounded py-4 text-[18px] w-96 pl-3 overflow-hidden'/>
      <button 
      className='text-lg text-white bg-blue-800 h-8 pl-2 pr-2 rounded-lg overflow-hidden shrink-0'
      onClick={copyPasswordToClipBoard}
      >COPY</button>
        </div>
        <div className='mt-4'>
          <input type="range" min={8} max={20} value={length} className='cursor-pointer mt-4' 
          onChange={(e) =>{
            setLength(e.target.value)
          }}
          
          />
      <label htmlFor="" className='text-sm ml-2'>Length: {length}</label>
        
          <input type="checkbox" className='ml-4' defaultChecked = {numberAllowed} 
          onChange= {() => {setNumberAllowed((prev)=>!prev)}}
          />
          <label htmlFor="" className='text-sm ml-1'>Numbers</label>
       
          <input type="checkbox" className='ml-4' defaultChecked = {charAllowed} 
          onChange= {() => {seTcharAllowed((prev)=>!prev)}}
          />
          <label htmlFor="" className='text-sm ml-1'>Characters</label>
        </div>
        </div>
      
      </div>

     </div>
    </>
  )
}

export default App
