"use client";
import { useState, useEffect } from "react";
import { Button, CustomInput } from "@/components";
import {
  completeTodo,
  createNewTodo,
  deleteTodoItem,
  getTodos,
} from "@/utlis/services";
import { io } from "socket.io-client";

export default function Home() {

  const [data, setNewData] = useState({
    item_name: "",
    date: "",
  });

  const [changed, setChanged] = useState(false);
  const [received, setReceived] = useState([]);
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    async function fetchTodos() {
      const todos = await getTodos();
      setReceived(todos.data);
    }
    fetchTodos();
  }, [changed]);

  useEffect(() => {
    const newSocket = io("http://localhost:8800", {
      withCredentials: true,
    }); 

   
    setSocket(newSocket);

   
    return () => {
      newSocket.disconnect();
    };
  }, []);

  //socket connection,
  socket?.on("todoChange", () => {
    setChanged(!changed);
  });

  //handle input change
  const handleChange = (e: any) => {
    setNewData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  //create new to do item
  const addNewTask = async () => {
    try {
      const newItems = await createNewTodo(data);
      setNewData({
        item_name: "",
        date: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete a to do item
  const deleteTask = async (id: string) => {
    const deleteItem = await deleteTodoItem(id);
  };

  //mark an item as completed
  const handlecheckbox = async (id: string, completed: number) => {
    const body = {
      completed,
    };
    const completeItem = await completeTodo(id, body);
  };
  return (
    <main className="flex  flex-col items-center justify-between p-10 relative ">
      <h1 className="text-2xl">To-do List</h1>
      <div className="  w-screen md:w-1/2  h-96 border-white-900 border-2 relative overflow-y-auto ">
        <div className="flex flex-wrap justify-center md:justify-between gap-y-2  align-middle w-full h-auto  bg-white p-1">
          <CustomInput
            type="text"
            name="item_name"
            value={data.item_name}
            setData={handleChange}
            containerStyles="w-full md:w-1/3 bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500"
            placeholder="Task.."
            required={true}
          />
          <CustomInput
            type="date"
            name="date"
            value={data.date}
            setData={handleChange}
            min={new Date().toISOString().split("T")[0]}
            containerStyles="w-full md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500"
            placeholder="Task.."
            required={true}
          />
          <Button
            containerStyles="   text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white-800"
            isDisabled={false}
            handleClick={addNewTask}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </Button>
        </div>
        {received?.map((item: any) => (
          <div
            key={item.id}
            className=" flex items-center justify-between rounded-md  p-2 bg-white mt-2 m-2 h-auto"
          >
            <CustomInput
              type="checkbox"
              name="completed"
              setData={() => handlecheckbox(item.id, item.completed)}
              checked={item.completed ? true : false}
              containerStyles="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300 hover:cursor-pointer"
            />
              <h4
                className={`text-black text-lg ml-2 truncate overflow-hidden  hover:overflow-visible hover:whitespace-normal ${
                  item.completed ? "line-through" : ""
                }`}
              >
                {item.item_name}
              </h4>


            <h6 className="text-black text-md">
              {" "}
              {new Date(item.date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </h6>


            <Button
              containerStyles="text-white bg-red-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center   "
              isDisabled={false}
              handleClick={() => deleteTask(item.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Button>
          </div>
        ))}
      </div>
    </main>
  );
}
