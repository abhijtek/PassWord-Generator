import { useCallback, useEffect, useState } from "react";

function App() {
  const [level,setLevel] = useState(8);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charsAllowed,setCharsAllowed] = useState(false);
  const [Password,setPassWord] = useState("123456");
  const [copyText,setCopyText] = useState("Copy");
  const passgen = ()=>{
    setCopyText("Copy");
    let pass = "";
    let baseStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789"
    let chars = "!@#$%^&*()_+-=[]{},.<>?"
    if(numbersAllowed)baseStr+=numbers
    if(charsAllowed)baseStr+=chars
    for(let i = 0;  i < level; i++){
       pass += baseStr.charAt(Math.round(Math.random()*(baseStr.length-1)));           
    } 
    
    setPassWord(pass);
  }
  const passfield = document.getElementById("password");
  const genfun = useCallback(passgen,[numbersAllowed,charsAllowed,level])

  useEffect(() => {
    genfun()
  }, [numbersAllowed,charsAllowed])
  
  
  return (
    <>
     
      <div className="scaler">
        <div className="min-w-screen min-h-screen bg-gray-700 flex justify-center items-center flex-col">
          <div className="text-2xl mb-6 text-sky-50 ">Password Generator</div>
          <div>
            <input
              value={Password}
              className="min-w-2xs bg-white rounded-l-3xl p-2"
              type="text"
              placeholder="your generated passowrd"
              name=""
              id="password"
            />
            <button className=" text-white bg-blue-400 p-2 rounded-r-3xl "
            onClick={()=>{
              navigator.clipboard.writeText(Password);
               setCopyText("Copied");
               passfield.select();
            }}>
              {copyText}
            </button>
          </div>
          <div className="space-x-2 mt-4">
            <input type="range" name="level" id="level"
            min= "8" max= "30"
           value={level}
           step="1"
             onChange={(e)=>{
              setLevel(e.target.value);
              genfun();
            }}
            title={level}/>
            <label htmlFor="numbers"
            className="text-white">
              <input type="checkbox" name="numbers" id="numbers"
              onChange={()=>{
                setNumbersAllowed(!numbersAllowed)
                
              }}
              checked={numbersAllowed} />
              {" "}Numbers
            </label>
            <label htmlFor="characters" className="text-white">
              <input
              onChange={()=>{
                setCharsAllowed(!charsAllowed)
        
              }}
              checked={charsAllowed}
              type="checkbox" name="characters" id="characters" />
              {" "}Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
