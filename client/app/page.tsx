"use client"
import {useState} from 'react'
import { Button, CustomInput } from "@/components";


export default function Home() {
  const [data,setData] = useState({
    item_name : '',
    date : ''
  })

  const handleChange = (e:any) =>{
    console.log(e.target.value)
    setData((prev)=>({
      ...prev,[e.target.name]:e.target.value
    }))


  }
  const addNewTask = () =>{
    console.log(data)
    
  }
  return (
    <main className="flex  flex-col items-center justify-between p-10 relative ">
      <h1 className="text-2xl">To-do List</h1>
      <div className=" w-screen md:w-1/2  h-96 border-white-900 border-2 relative ">
        <div className="flex flex-wrap justify-center md:justify-between gap-y-2  align-middle w-full h-auto absolute bg-white p-1">
          <CustomInput type="text" name="item_name" value={data.item_name} setData={handleChange} containerStyles="w-full md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" placeholder="Task.." required = {true}/>
          <CustomInput type="date" name="date" value={data.date} setData={handleChange} containerStyles="w-full md:w-1/3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500" placeholder="Task.." required = {true}/>
          <Button containerStyles="   text-white bg-blue-700 hover:bg-blue-800 focus:ring-1 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-white-800"
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
      </div>
    </main>
  );
}
