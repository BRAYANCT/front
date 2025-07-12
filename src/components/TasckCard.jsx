import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

function TaskCard({ task }) {
  const { handleDelete, toggleDoneTask } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toggleDoneTask(task.id);
  };

  return (
    <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white rounded-xl shadow-lg p-6 space-y-4 transition hover:shadow-2xl border border-zinc-700">
      {/* Título */}
      <h2 className="text-2xl font-semibold text-amber-400">{task.title}</h2>

      {/* Descripción */}
      <p className="text-gray-300">{task.description}</p>

      {/* Estado y fecha */}
      <div className="text-sm text-gray-400 space-y-1">
        <p>
          <span className="font-semibold text-gray-200">Estado:</span>{" "}
          {task.done == 1 ? (
            <span className="text-green-400">✅ Completado</span>
          ) : (
            <span className="text-yellow-400">⌛ Pendiente</span>
          )}
        </p>
        <p>
          <span className="font-semibold text-gray-200">Creado:</span>{" "}
          {new Date(task.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => handleDelete(task.id)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Eliminar
        </button>
        <button
          onClick={handleDone}
          className={`${
            task.done == 1
              ? "bg-yellow-500 hover:bg-yellow-600"
              : "bg-green-600 hover:bg-green-700"
          } text-white px-4 py-2 rounded-md text-sm font-medium`}
        >
          {task.done == 1 ? "Marcar como pendiente" : "Marcar como hecho"}
        </button>
        <button
          onClick={() => navigate(`/task/${task.id}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Editar
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
