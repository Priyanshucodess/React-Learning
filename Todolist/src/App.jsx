// src/App.jsx
import React, { useState } from "react";
import TodoTable from "./TodoTable.jsx";

function App() {
 
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [deleteCount, setDeleteCount] = useState(0);
  const [taskId , setId] = useState(1);

  function makeNewTask(text) {
  const now = new Date();
  setId((taskId) => taskId + 1);
  return {
    id: taskId,                 
    text: text.trim(),
    createdOn: now.toLocaleString(),
    done: false,
  };
}
 
  function addTask() {
    const t = text.trim();
    if (!t) return;                        
    const newTask = makeNewTask(t);
    setTasks(tasks => [...tasks, newTask]); 
    setText("");                            
  }

  function onToggle(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function onDelete(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setDeleteCount((count) => count + 1);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") {
      addTask();
    }
  }

  
  return (
    <div className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-center text-3xl font-bold">ToDo List</h1>

     
      <div className="mb-4 flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="What do you want to do?"
          className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTask}
          className="rounded-md bg-green-600 px-4 py-2 font-medium text-white hover:bg-green-700"
        >
          Add
        </button>
      </div>

     
      <TodoTable tasks={tasks} onToggle={onToggle} onDelete={onDelete} />

      
      <div className="mt-3 text-sm text-gray-700">
        Total: {tasks.length} • Done: {tasks.filter((t) => t.done).length} • Pending:{tasks.filter((t) => !t.done).length}
        • Deleted: {deleteCount}

      </div>
    </div>
  );
}

export default App;
