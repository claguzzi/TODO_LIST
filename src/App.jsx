import { useState, useEffect } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input.trim(), completed: false }]);
    setInput('');
  };

  const toggleComplete = (i) => {
    const updated = [...tasks];
    updated[i].completed = !updated[i].completed;
    setTasks(updated);
  };

  const handleDelete = (i) => {
    const updated = tasks.filter((_, index) => index !== i);
    setTasks(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          📝 To-Do List
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribí una tarea..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Agregar
          </button>
        </div>

        <ul className="space-y-2">
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg"
            >
              <span
                onClick={() => toggleComplete(i)}
                className={`flex-1 cursor-pointer ${
                  task.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-500 hover:text-red-700 text-xl"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
