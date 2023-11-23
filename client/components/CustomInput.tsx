import { InputProps } from '@/types'
import React from 'react'

const CustomInput = ({type,name,containerStyles,placeholder,required,value,setData}:InputProps) => {
  return (

    < >
    {/* <label  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label> */}
    <input type={type} name={name} value={value} onChange={setData}  className={containerStyles} placeholder={placeholder} required ={required}/>
</>
  )
}

export default CustomInput