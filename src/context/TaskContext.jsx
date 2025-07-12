import { createContext, useContext ,useState} from "react";
import { deleteTask, getTasks, updateTask,togdoneTask } from "../api/task.api.js";
// import TaskProvaider from "./TaskProvaider1.jsx";
const TaskContext = createContext();
const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskContextProvider");
  }
  return context;
};
const TaskContextProvider = ({ children }) => {
   const [tasks, setTasks] = useState([]);
    async function loadTask() {
      const response = await getTasks();
        console.log(response.data);
      setTasks(response.data);
    }
    const handleDelete = async (id) => {
    try {
     const reponce= await deleteTask(id);
    //  tasks.filter((task) => task.id !== id);
     setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const toggleDoneTask=async (id) => {
    try {
      const response = tasks.find((task) => task.id === id);
      console.log(response);
    await togdoneTask(id,response.done == 0 ? true : false );
    tasks.map((task) => {
        if (task.id === id) {
          task.done = task.done === 0 ? 1 : 0; // Toggle done status
        }   
        return task;
      });
      setTasks([...tasks]);

    }catch (error) {
      console.error("Error toggling task done status:", error);
    }
    
  };  
  const handleEdit=async (id,newData) => {
    // Implement the edit functionality here
    const response =await updateTask(id,newData);
    console.log(response.data);
  };
    return (
    <TaskContext.Provider value={{ tasks,loadTask,handleDelete ,handleEdit,toggleDoneTask}}>
      {children}
    </TaskContext.Provider>
  );
};
export { TaskContext, useTasks, TaskContextProvider };
