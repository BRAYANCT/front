import { Formik } from "formik";
import { createTask, getTask, updateTask } from "../api/task.api.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const [task, setTask] = useState({ title: "", description: "" });
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const fetchTask = async () => {
        try {
          const resp = await getTask(params.id);
          setTask({
            title: resp.data.title,
            description: resp.data.description,
          });
        } catch (error) {
          console.error("Error fetching task:", error);
        }
      };
      fetchTask();
    }
  }, [params.id]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {params.id ? "Editar Tarea" : "Nueva Tarea"}
        </h1>

        <Formik
          initialValues={task}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            try {
              if (params.id) {
                await updateTask(params.id, values);
              } else {
                const getTasks = await createTask(values);
                console.log(getTasks);
                actions.resetForm();
              }
              window.location.href = "/";
            } catch (error) {
              console.error("Error al guardar la tarea:", error);
            }
          }}
        >
          {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Título
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="Escribe un título"
                  onChange={handleChange}
                  value={values.title}
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  name="description"
                  placeholder="Escribe una descripción"
                  onChange={handleChange}
                  value={values.description}
                  rows={4}
                  className="mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition disabled:opacity-50"
              >
                {isSubmitting ? "Guardando..." : params.id ? "Actualizar" : "Guardar"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TaskForm;
