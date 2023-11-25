import { BodyProps } from "@/types";
import { api } from "./axiosConfig";

export const getTodos = async() => await api.get("/todo/alltodos")

export const createNewTodo = (body:BodyProps) => api.post("/todo/newtodo",body)

export const deleteTodoItem = (id:string) => api.delete(`/todo/deletetodo/${id}`)

export const completeTodo = async (id:string,body:{completed:number}) => await api.put(`/todo/completed/${id}`,body)