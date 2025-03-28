import { useState,useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid'
import { FaRegEdit } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";


function App() {
  const [todo, settodo] = useState("")
  const [list, setlist] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  
  useEffect(() => {
    let todoString = localStorage.getItem("list")
    if(todoString){
      let list = JSON.parse(todoString) 
      setlist(list)
    }
}, [])

const saveToLS = () => {
    localStorage.setItem("list", JSON.stringify(list))
}





  const handleAdd = ()=>{
    // lists mai jo pehle se hai usko rehne deta hu aur new tasks add kr deta hu
    setlist([...list , {id:uuidv4() ,todo , isCompleted:false}])
    settodo("")
    saveToLS()
  }

  const handleEdit = (item,id)=>{
    let t = list.filter(i=>i.id===id)
    settodo(t[0].todo)
    // OR
    // let t = list.find((i) => i.id === id);
    // settodo(t.todo);
    const newList = list.filter(e => e.id !== id);
    setlist(newList);
    saveToLS()
  }

  const handleDelete = (item, id) => {
    if (confirm("Are you sure you want to delete this?")) {
      const newList = list.filter(e => e.id !== id);
      setlist(newList); 
      saveToLS()
    }
  };
  

  const handleChange =(e)=>{
    settodo(e.target.value)
  }


  const handleCheckBox =(e)=>{
   let id = e.target.name
  //  console.log(id); 
   let index = list.findIndex(e=>{
    return e.id===id;
   })
  //  console.log(index);
   let newList = [...list]; //uif we write inly list then the refernce willl remain the same and hence the state rendering will not happen
   newList[index].isCompleted = !newList[index].isCompleted;
   setlist(newList)
   saveToLS()
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished)
  }
  

 
  return (
    <>
    <Navbar/>

      <div className='container md:mx-auto bg-violet-200 my-5 p-5 rounded-xl min-h-[85vh] md:w-2/3'>
      <h1 className='font-bold text-2xl text-center'>Manage your day to day tasks here</h1>
        <div className="addtodo my-3 flex flex-col gap-4">
          <h2 className='text-xl font-bold'>Add your Task</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-full border-1 rounded-lg bg-white px-4 py-1' />
          <button onClick={handleAdd} disabled={todo.length<1} className='bg-violet-700 hover:bg-violet-900 rounded-md py-1 text-white text-sm font-bold disabled:bg-red-600'>Save</button>
        </div>

        <input type="checkbox" name="" id="" checked={showFinished} onChange={toggleFinished} className='my-4'/>Show All tasks
        <hr className='my-2 w-[80%] mx-auto' />
        <h2 className='font-bold text-xl'>Your Tasks</h2>
        {list.length===0 && <div className='font-semibold text-xl text-violet-950 ml-10 mt-5'>No tasks to display friend !</div>}
        {list.map(e=>{
        return  (showFinished || !e.isCompleted) && <div key={e.id} className="allTodos flex justify-between 2xl:w-1/2 mt-1 items-center w-full ">
          <div className='flex gap-5'>
            <input onChange={handleCheckBox} type="checkbox" checked={e.isCompleted} name={e.id} id="" />
            <div className={`${e.isCompleted ? "line-through" : ""} text-lg max-w-xs break-words`}>{e.todo}</div>
          </div>
          <div className="btns flex h-full">
            <button onClick={(item)=>{handleEdit(item,e.id)}} className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'><FaRegEdit /></button>
            <button onClick={(item)=>{handleDelete(item,e.id)}} className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'><AiTwotoneDelete /></button>
          </div>
        </div>
        })}
      </div>



    </>
  )
}

export default App

