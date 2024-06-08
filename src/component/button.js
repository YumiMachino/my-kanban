import React from 'react'

const Button = ({ primary, text, action, ...props }) => {

  if(primary) {
    return   <button className='rounded-sm p-2 border border-white text-white hover:bg-white bg-dark-blue hover:text-dark-blue hover:border-dark-blue' onClick={action} {...props}>{text}</button>
  }


  return (
    <button className='rounded-sm p-2 text-dark-blue absolute bottom-2 w-10/12 hover:bg-dark-blue hover:text-white' onClick={action}>{text}</button>
  )
}

export default Button