import React, { use, useEffect, useState } from 'react';

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
            isComplete: true
        },
        {
            id: 3,
            title: "Drink Plenty of Water",
            isComplete: false
        },
    ])

    const [filteredTodos, setFilteredTodos] = useState(todos);
    const [todoTitle, setTodoTitle] = useState("");
    const [activeFilterButton, setActiveFilterButton] = useState("all");

    useEffect(() => {
        if (activeFilterButton === "active") {
            setFilteredTodos(
                todos.filter(todo => !todo.isComplete)
            );

        } else if (activeFilterButton === "completed") {
            setFilteredTodos(
                todos.filter(todo => todo.isComplete)
            );

        } else {
            setFilteredTodos(todos);
        }

    }, [todos, activeFilterButton]);


    const addTodoHandler = () => {
        if (todoTitle != "") {
            setTodos(prevTodos => [...todos, { id: todos.length + 1, title: todoTitle, isComplete: false }])
            setTodoTitle("");
        } else {
            alert("You must have to enter some text!")
        }
    }

    const todoDeleteHandler = (id) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }

    const filterHandler = (filterType) => {
        setActiveFilterButton(filterType);
    }

    const todoStatusHandler = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isComplete: (!todo.isComplete) } : todo))
    }

    return (
        <main className='w-full h-screen flex justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-black'>
            <div className='w-110 rounded-4xl bg-white/10 border border-white/20 my-24 p-4'>
                <div className='flex flex-col items-center bg-[#EDEFFC]/10 h-full px-4 pt-10 rounded-2xl'>

                    <div className="text-center mb-6">
                        <h1 className="text-5xl font-bold tracking-tight text-white">
                            Task-Flow
                        </h1>
                        <p className="text-slate-400 mt-2">
                            Organize your task beautifully
                        </p>
                    </div>

                    <div className='flex my-4'>
                        <input value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} className='bg-gray-50 focus:outline-blue-500 text-lg border border-gray-400 rounded-l-md flex-1 py-3 px-4' type="text" name="" id="" placeholder='Enter your todo...' />
                        <button
                            onClick={addTodoHandler}
                            className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-6 py-4 rounded-r-xl font-medium transition-all duration-200 shadow-md"
                        >
                            Add
                        </button>
                    </div>

                    <div className='flex gap-2 mb-8'>
                        <button onClick={() => filterHandler("all")} className={`px-4 py-0.5 rounded transition ${activeFilterButton === "all" ? "bg-blue-500 text-white" : "bg-gray-400/30 text-white"}`}>
                            All
                        </button>
                        <button onClick={() => filterHandler("active")} className={`px-4 py-0.5 rounded transition ${activeFilterButton === "active" ? "bg-blue-500 text-white" : "bg-gray-400/30 text-white"}`}>
                            Active
                        </button>
                        <button onClick={() => filterHandler("completed")} className={`px-4 py-0.5 rounded transition ${activeFilterButton === "completed" ? "bg-blue-500 text-white" : "bg-gray-400/30 text-white"}`}>
                            Completed
                        </button>
                    </div>

                    <div className='space-y-3 h-full w-full scrollbar-thumb-sky-700 scrollbar-track-sky-300/20 overflow-y-scroll'>
                        {
                            filteredTodos &&
                            filteredTodos.map((todo) => (
                                <div key={todo.id} className='bg-white p-4 rounded hover:shadow text-xl w-full flex gap-2 items-center justify-between'>

                                    <div className='flex min-w-0'>
                                        <input onChange={() => {
                                            todoStatusHandler(todo.id)
                                        }} type="checkbox" checked={todo.isComplete} />

                                        <p className={`${todo.isComplete ? "line-through text-gray-500" : ""} break-words whitespace-normal w-full px-3`}>{todo.title}</p>
                                    </div>

                                    <div onClick={() => todoDeleteHandler(todo.id)} className='cursor-pointer hover:bg-gray-300/40 p-1 rounded'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>                                   </div>
                                </div>
                            ))
                        }

                        {Object.keys(filteredTodos).length === 0 ? <div className='flex items-center text-lg justify-center h-full'>
                            <p>No items found.</p>
                        </div> : ""}
                    </div>

                    <footer className='w-full bg-slate-500/30 h-20'>
                        <h1>{Object.keys(filteredTodos).length}</h1>
                    </footer>

                </div>


            </div>
        </main>
    );
};

export default Home;

