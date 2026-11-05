import React, {useState,useEffect,useRef} from 'react';

interface GreetingProps { // Define props interface
  name: string;
}

interface InputProps{
  onInputChange:(value:string) => void
}

interface InputPropsNums{
  onInputChange:(value:number) => void
}

const Greeting: React.FC<GreetingProps> = (props) => { // Use React.FC and type props
  return <h1>Hello, {props.name}!</h1>;


};


const InputComponentNum: React.FC<InputPropsNums> = (props) =>{
  const handleInputChange  = (event: React.ChangeEvent<HTMLInputElement>) =>{
    props.onInputChange(Number(event.target.value))
  }

  return (
    <input
    type = "number"
    onChange = {handleInputChange}
    placeholder = "only numbers"
    />
  )
}












const InputComponent: React.FC<InputProps> = (props) =>{
   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onInputChange(event.target.value)
   };

   return (
    <input
      type = "text"
      onChange = {handleInputChange}
      placeholder = "type something"
    />
   )
  }


function Parent() {
  const handleChange = (text: string) => {
    console.log("User typed", text)
  }

  return<InputComponent onInputChange={handleChange}/>
}

function Parent2()
{
  const [text,setText] = useState("")

  const handleChange = (text: string) => {
    console.log("User typed", text)
  }

  return<>
  <InputComponent  onInputChange = {setText}/>
  <p>Typing: {text}</p>
  </>

}

function CaseConvert(){
  const [text,setText] = useState("")

  const handleCase = (value:string) =>
    {
      setText(value.toUpperCase())
    } 

    return<>
    <InputComponent  onInputChange = {handleCase}/>
    <p>Uppercase-Text: {text}</p>
    </>
}


function NumberOnly(){
  const [text,setText] = useState("")

  const handleChange = (value: string) =>
  {
  const onlyNumbers = value.replace(/[^0-9]/g, '');
    if(onlyNumbers.length <=10){ 
      setText(onlyNumbers);
    }
  }

  return<>
  <InputComponent  onInputChange = {handleChange} />

  <p>NumberOnly: {text}</p>
  </>
}

function passwordMatch(){
  const [pass, setpass] = useState("")
  const [conf,setconf] = useState("")

  const match = pass === conf && pass !==""

  return <>
    <InputComponent onInputChange = {setpass}/>
    <InputComponent onInputChange = {setconf}/>

    {match ? <p>Good password</p> :<p>Passwords do not match</p>}

  </>


}



//Debounce
function  upDelay(){
  const [text,setText] = useState("")
  const timeoutref = useRef<ReturnType<typeof setTimeout> |null>(null)

  const handleChange = (value:string) =>{
    // if(timeoutref.current) clearTimeout(timeoutref.current)


    timeoutref.current = setTimeout(() => {
      setText(value)
    }, 500);

  }

  return <><InputComponent onInputChange={handleChange}/>
    <p>{text}</p>
  </>

}

//Search filter
//Navigation something

function Filter()
{
  const items = ["banana","apple", "grape","teorange"]
  const [query,setquery] = useState("")

  const timeout = useRef<ReturnType<typeof setTimeout> |null>(null)





  const filtered = items.filter( (item) => item.toLowerCase().includes(query.toLowerCase()) )

  return <>
    <InputComponent  onInputChange = {setquery}/>
    <ul>
      {
        filtered.map( (item) =>
        <li key = {item}>{item}</li>  )
      }
    </ul>

  </>



}

//Live Search Bar

function LiveSearch()
{

  const results = ["911 Carrera","911 Carrera T","911 Carrera S", "911 Carrera 4S", "911 Carrera GTS", "911 Carrera Cabriolet", "911 Carrera T Cabriolet", "911 GT3", "911 GT3 RS"]
  const [Porsche, setPorsche] = useState("")
  const timeout = useRef<ReturnType<typeof setTimeout> |null>(null)

  const handleChange = (value:string) =>{
    if (timeout.current) clearTimeout(timeout.current)

    timeout.current = setTimeout( () =>{
      setPorsche(value)
    },500 )
  }


  const filtered = results.filter( (item) => item.toLowerCase().includes(Porsche.toLowerCase()) )

  return <>
  
    <InputComponent   onInputChange = {handleChange}/>
    <ul>
      {

        filtered.map( (item) =>
        <li key={item}>{item}</li> )
      }

    </ul>

  </>

}


export default LiveSearch;