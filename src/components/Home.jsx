import React, { useState } from 'react';

const Home = () => {

    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Go Home",
            isComplete: false
        },
        {
            id: 2,
            title: "Learn Javascript",
            isComplete: false
        },
        {
            id: 3,
            title: "Drink Plenty of Water",
            isComplete: false
        },
    ])




    const [todoTitle, setTodoTitle] = useState("");

    const addTodoHandler = () => {
        setTodos(prevTodos => [...todos, { id: todos.length + 1, title: todoTitle, isComplete: false }])
        setTodoTitle("");
    }

    const todoDeleteHandler = (id) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }


    const todoStatusHandler = (id) => {


        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isComplete: (!todo.isComplete) } : todo))

    }

    return (
        <main className='w-full h-screen bg-black flex justify-center'>
            <div className='w-100 rounded-4xl bg-white my-24 p-4'>
                <div className='flex flex-col items-center bg-[#EDEFFC] h-full px-4 rounded-2xl'>
                    <h1 className='py-6 text-5xl font-serif'>Task-Flow</h1>

                    <div className='flex my-4'>
                        <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} className='bg-gray-50 text-lg border border-gray-400 rounded-l-md flex-1 py-3 px-4' type="text" name="" id="" placeholder='Enter your todo...' />
                        <button onClick={addTodoHandler} className='bg-blue-400 px-4 rounded-r-md'>Add</button>
                    </div>

                    <div className='flex gap-2 mb-8'>
                        <button className='bg-gray-400/30 px-4 py-0.5 rounded'>All</button>
                        <button className='bg-gray-400/30 px-4 py-0.5 rounded'>Active</button>
                        <button className='bg-gray-400/30 px-4 py-0.5 rounded'>Completed</button>
                    </div>

                    <div className='space-y-3 w-full'>
                        {
                            todos.map((todo) => (
                                <div key={todo.id} className='bg-white p-4 rounded hover:shadow text-xl w-full flex gap-2 items-center justify-between'>
                                    <div className='flex gap-4'>
                                        <input onClick={() => {
                                            todoStatusHandler(todo.id)
                                        }} type="checkbox" checked={todo.isComplete} />
                                        <p className={`${todo.isComplete ? "line-through" : ""}`}>{todo.title}</p>
                                    </div>

                                    <div onClick={() => todoDeleteHandler(todo.id)} className='cursor-pointer hover:bg-gray-300/40 p-1 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Home;

