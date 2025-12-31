import { useEffect, useState } from "react";

export default function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState("");

  /* ================== LOCAL STORAGE ================== */
  useEffect(() => {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
      setTareas(JSON.parse(tareasGuardadas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
  }, [tareas]);

  /* ================== HANDLERS ================== */
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!texto.trim()) return;

    setTareas([
      ...tareas,
      {
        id: Date.now(),
        texto,
        completada: false,
      },
    ]);

    setTexto("");
  };

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          📝 To-Do List
        </h1>

        {/* FORM */}
        <form onSubmit={agregarTarea} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Nueva tarea..."
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Agregar
          </button>
        </form>

        {/* LISTA */}
        <ul className="space-y-2">
          {tareas.length === 0 && (
            <li className="text-center text-gray-400">
              No hay tareas
            </li>
          )}

          {tareas.map((tarea) => (
            <li
              key={tarea.id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
            >
              <span
                onClick={() => toggleTarea(tarea.id)}
                className={`cursor-pointer select-none ${
                  tarea.completada
                    ? "line-through text-gray-400"
                    : "text-gray-800"
                }`}
              >
                {tarea.texto}
              </span>

              <button
                onClick={() => eliminarTarea(tarea.id)}
                className="text-red-500 hover:text-red-700 font-bold"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
