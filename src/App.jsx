import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid'


function App() {
  const [todo, settodo] = useState("")
  const [list, setlist] = useState([])

  const handleAdd = ()=>{
    // lists mai jo pehle se hai usko rehne deta hu aur new tasks add kr deta hu
    setlist([...list , {id:uuidv4() ,todo , isCompleted:false}])
    settodo("")
  }

  const handleEdit = ()=>{

  }

  const handleDelete = ()=>{
    
  }

  const handleChange =(e)=>{
    settodo(e.target.value)
  }

  const handleCheckBox =(e)=>{
   let id = e.target.name
   console.log(id);
   
   let index = list.findIndex(e=>{
    return e.id===id;
   })
   console.log(index);
   
   let newList = [...list]; //uif we write inly list then the refernce willl remain the same and hence the state rendering will not happen
   newList[index].isCompleted = !newList[index].isCompleted;
   setlist(newList)
  }

 
  return (
    <>
    <Navbar/>

      <div className='container mx-auto bg-violet-200 my-5 p-5 rounded-xl min-h-[85vh] w-5/6'>
        <div className="addtodo my-4">
          <h2 className='text-lg font-bold'>Add your Task</h2>
          <input type="text" onChange={handleChange} value={todo} className='w-1/2 border-1 rounded-md bg-white pl-2' />
          <button onClick={handleAdd} className='bg-violet-700 hover:bg-violet-900 rounded-md px-2 py-1 mx-6 text-white text-sm font-bold'>Add</button>
        </div>

        <h2 className='font-bold text-lg'>Your Tasks</h2>

        {list.map(e=>{
        return <div key={e.id} className="allTodos flex justify-between w-1/2 mt-1 ">
          <input onChange={handleCheckBox} type="checkbox" value={e.isCompleted} name={e.id} id="" />
          <div className={`${e.isCompleted ? "line-through" : ""} text-lg`}>{e.todo}</div>
          <div className="btns">
            <button onClick={handleEdit} className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'>Edit</button>
            <button onClick={handleDelete} className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'>Delete</button>
          </div>
        </div>
        })}
      </div>



    </>
  )
}

export default App
