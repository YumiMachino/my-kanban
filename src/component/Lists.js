import React, { useContext } from 'react';
import { ListContext } from '../context/ListContext';
import List from "./List";





const Lists = () => {

  const { lists, loading, error } = useContext(ListContext);

  if(loading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h1>Error: {error.message}</h1>
  }

    return (
    <>
    {lists.map((list) => (
      <List key={`${list.id}${list.name}`} id={list.id} list={list}/>
    ))}
    </>
  )

  
}

export default Lists;