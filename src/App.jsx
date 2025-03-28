import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() { 
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleEdit = (id) => {
    let t = todos.find((i) => i.id === id);
    setTodo(t.todo);
    setTodos(todos.filter((item) => item.id !== id));
    saveToLS();
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this?")) {
      setTodos(todos.filter((item) => item.id !== id));
      saveToLS();
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
    saveToLS();
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className='container md:mx-auto bg-violet-200 my-5 p-5 rounded-xl min-h-[85vh] md:w-2/3'>
        <h1 className='font-bold text-2xl text-center'>Manage your day-to-day tasks</h1>
        <div className='addtodo my-3 flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>Add a Task</h2>
          <input
            type='text'
            onChange={handleChange}
            value={todo}
            className='w-full border-1 rounded-lg bg-white px-4 py-1'
          />
          <button
            onClick={handleAdd}
            disabled={todo.length < 1}
            className='bg-violet-700 hover:bg-violet-900 rounded-md py-1 text-white text-sm font-bold disabled:bg-red-600'>
            Save
          </button>
        </div>

        <input type='checkbox' checked={showFinished} onChange={toggleFinished} className='my-4' /> Show Finished Tasks
        <hr className='my-2 w-[80%] mx-auto' />
        <h2 className='font-bold text-xl'>Your Tasks</h2>
        {todos.length === 0 && (
          <div className='font-semibold text-xl text-violet-950 ml-10 mt-5'>No tasks to display!</div>
        )}
        {todos.map((item) => {
          return (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className='allTodos flex justify-between 2xl:w-1/2 mt-1 items-center w-full'>
                <div className='flex gap-5'>
                  <input
                    type='checkbox'
                    checked={item.isCompleted}
                    name={item.id}
                    onChange={handleCheckbox}
                  />
                  <div className={`${item.isCompleted ? "line-through" : ""} text-lg max-w-xs break-words`}>
                    {item.todo}
                  </div>
                </div>
                <div className='btns flex h-full'>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'>
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-violet-900 rounded-md px-2 py-1 mx-1 text-white text-sm font-bold'>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
}

export default App;
