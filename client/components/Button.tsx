
import { ButtonProps } from '@/types'
import React from 'react'

const Button = ({containerStyles,handleClick,isDisabled,children}:ButtonProps) => {
  return (
    <button className={containerStyles} disabled={isDisabled} onClick={handleClick}>
        {children}
    </button>
  )
}

export default Button