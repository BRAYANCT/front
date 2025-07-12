import { useEffect } from "react";
import TasckCard from "../components/TasckCard.jsx";
import { useTasks } from "../context/TaskContext.jsx";

function Taslpages() {
    const {tasks,loadTask}=useTasks(); // Ensure context is used
  // console.log(tasks);
  useEffect(() => {
     loadTask();
  }, []);
  function renderMain() {
    if (tasks.length === 0)
      return <h1 className="text-3xl text-center">No hay tareas</h1>;
  return tasks.map((task) => (
        <TasckCard key={task.id} task={task} />
      ))
  }
  return (
    <div className=" ">
      <h1>Tasl Pages</h1>
      <div className="grid grid-cols-3 paddinfg-10 gap-8 ">

      {renderMain()}
      </div>
    </div>
  );
}
export default Taslpages;
