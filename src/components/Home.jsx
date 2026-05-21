import React, { use, useEffect, useState } from 'react';

const Home = () => {

    const [todos, setTodos] = useState([
        {
            id: 1,
            title: "Buy Some Books",
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

    const [focused, setFocused] = useState(false);

    const todoDeleteHandler = (id) => {
        setTodos(todos.filter((todo) => todo.id != id))
    }

    const filterHandler = (filterType) => {
        setActiveFilterButton(filterType);
    }

    const todoStatusHandler = (id) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, isComplete: (!todo.isComplete) } : todo))
    }

    const clearCompleted = () => {
        setTodos(todos.filter((t) => t.isComplete != true))
    }

    return (
        <main className='w-full h-screen flex justify-center items-center bg-linear-to-br from-slate-950 via-slate-900 to-black'>
            <div className='w-120 rounded-3xl bg-white/5 border border-white/10 p-2'>

                <div className='flex flex-col h-160 items-center border border-white/5 px-6 py-8 rounded-2xl gap-0'>

                    <div className="text-center mb-7">
                        <h1 className="text-6xl font-medium text-white">Task-Flow</h1>
                        <p className="text-white/50 text-sm mt-1">Organize your tasks beautifully</p>
                    </div>

                    <div className={`flex w-full mb-5 bg-white/5 border-2 rounded-xl overflow-hidden transition-colors ${focused ? 'border-teal-400/80' : 'border-white/12'}`}>
                        <input
                            value={todoTitle}
                            onChange={e => setTodoTitle(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && addTodoHandler()}
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            className='flex-1 bg-transparent text-white text-lg px-4 py-3 outline-none placeholder:text-white/50'
                            placeholder='Add a new task…'
                        />
                        <button
                            onClick={addTodoHandler}
                            className="bg-teal-400 cursor-pointer hover:bg-teal-600 text-lg active:scale-95 text-black px-5 font-medium transition-all flex items-center gap-1.5"
                        >
                            Add
                        </button>
                    </div>

                    <div className='flex w-full gap-1.5 mb-6 bg-white/5 border border-white/10 rounded-xl p-1'>
                        {['all', 'active', 'completed'].map(status => (
                            <button
                                key={status}
                                onClick={() => filterHandler(status)}
                                className={`flex-1 py-1.5 rounded-lg text-sm transition-all cursor-pointer capitalize ${activeFilterButton === status
                                    ? 'bg-teal-400 text-black'
                                    : 'text-white/50 hover:text-white/70'
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <div className='w-full flex flex-col gap-2 flex-1 overflow-y-auto max-h-75 pr-0.5 scrollbar-thin scrollbar-thumb-teal-500/40 scrollbar-track-transparent'>
                        {filteredTodos.length === 0 ? (
                            <div className='text-white flex items-center justify-center text-md py-8 flex-1'>
                                No tasks found!
                            </div>
                        ) : filteredTodos.map(todo => (
                            <div
                                key={todo.id}
                                className={`flex items-center gap-2.5 bg-white/10 text-md rounded-xl px-3.5 py-3 transition-al}`}
                            >
                                <input
                                    type="checkbox"
                                    checked={todo.isComplete}
                                    onChange={() => todoStatusHandler(todo.id)}
                                    className="w-4 h-4 accent-teal-400 cursor-pointer shrink-0"
                                />
                                <p className={`flex-1 text-lg wrap-break-words ${todo.isComplete ? 'line-through text-white/70' : 'text-white'}`}>
                                    {todo.title}
                                </p>
                                <button
                                    onClick={() => todoDeleteHandler(todo.id)}
                                    className='text-white hover:text-red-500 cursor-pointer bg-white/5 hover:bg-red-500/15 p-1 rounded-md transition-all shrink-0'
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className='w-full flex justify-between items-center mt-4 pt-3.5 border-t border-teal-400/40'>
                        <span className='text-white/80'>{filteredTodos.filter(t => !t.isComplete).length} tasks left</span>
                        <button onClick={clearCompleted} className='text-white/80 cursor-pointer hover:text-red-500 bg-gray-500/20 hover:bg-red-500/10 py-1 px-2 rounded-sm transition-colors'>
                            Clear completed task
                        </button>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default Home;

