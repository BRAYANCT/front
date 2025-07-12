import axios from 'axios';

const BACK_URL = import.meta.env.VITE_BACK_URL || 'http://localhost:3040';
export const createTask = async (task) => {
   return await axios.post(`${BACK_URL}/task`, task)
}
export const getTasks = async () => {
   return await axios.get(`${BACK_URL}/task`)
}
export const deleteTask = async (id) => {
   return await axios.delete(`${BACK_URL}/task/${id}`)
}
export const updateTask = async (id, task) => {
   return await axios.put(`${BACK_URL}/task/${id}`, task)
} 
export const getTask = async (id) => {
   return await axios.get(`${BACK_URL}/task/${id}`)
}
export const togdoneTask = async (id,done) => {
   return await axios.put(`${BACK_URL}/taskdone/${id}`, {
      done: done
   })
}