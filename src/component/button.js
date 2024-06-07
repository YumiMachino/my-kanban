import React from 'react'

const Button = ({ primary, text, action, ...props }) => {

  // const addList = () => {
  //   console.log('add')
  //   console.log(process.env.REACT_APP_API_KEY)
  // }

  if(primary) {
    return   <button className='rounded-sm p-2 border border-white text-white' onClick={action} {...props}>{text}</button>
  }

  return (
    <button className='text-dark-blue absolute bottom-2 w-10/12' onClick={action}>{text}</button>
  )
}

export default Button