import { Route, Routes } from "react-router-dom";
import "./App.css";
import Taslpages from "./pages/Taslpages";
import TaskForm from "./pages/TaskForm";
import NotFound from "./pages/NotFound";
import NavBar from "./components/Navbar";
import { TaskContextProvider } from "./context/TaskContext";

function App() {
  return (
    <>
    <div className="bg-gray-100 h-screen absolute inset-0 flex flex-col">

      <TaskContextProvider>
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Taslpages />} />
        <Route path="/task" element={<TaskForm />} />

        <Route path="/task/:id" element={<TaskForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </TaskContextProvider>
    </div>
    </>
  );
}

export default App;
