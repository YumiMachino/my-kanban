import React, { useEffect, useState } from 'react';
import axios from 'axios';
import List from "./list";


// Get lists on a board

const ENDPOINT = 'ttps://api.trello.com/1/boards/';
const BOARD_ID = '66638486a47a6fb946ffa564'

const ListItems = ({ lists }) => {
  // const [lists, setLists] = useState(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null)
    
  // useEffect(() => {
  //   let isMounted = true;
  //   const fetchLists = async() => {
  //     try {
  //       const res = await axios.get('https://api.trello.com/1/boards/66638486a47a6fb946ffa564/lists?key=8cf7ff1641dc00b4bc65f9349e45d98f&token=ATTA6687d6e04c6796dd658a51d2a9298beee21a3b0732b085038a8df8520d3a12b2EBFADE3D');
  //       console.log('res', res);
  //       if(res.status !== 200) {
  //         throw new Error('Network response was not ok')
  //       }
  //       const { data } = res;
  //       console.log('res:', data);
  //       if(isMounted) {
  //         setLists(data);
  //         setLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error.message)
  //       setError(error);
  //     }
  //   }

  //   fetchLists();

  //   return () => {
  //     isMounted = false;
  //   }
  // },[]);

  // if(loading) {
  //   return <h1>Loading...</h1>
  // }

  // if(error) {
  //   return <h1>Error: {error.message}</h1>
  // }
 
    return (
    <>
    {lists.map((list) => (
      <List key={list.id} id={list.id} list={list}/>
    ))}
    </>
  )

  
}

export default ListItems;