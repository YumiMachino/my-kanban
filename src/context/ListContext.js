import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { FETCH_ALL_LIST_URL, BASE_URL, BOARD_ID, KEY, TOKEN } from '../Network';

const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all the list on load
    useEffect(() => {
    let isMounted = true;
    const fetchLists = async() => {
      try {
        const res = await axios.get(FETCH_ALL_LIST_URL)
        if(res.status !== 200) {
          throw new Error('Network response was not ok')
        }
        const { data } = res;
        if(isMounted) {
          
          setLists(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error.message)
        setError(error);
      }
    }

    fetchLists();

    return () => {
      isMounted = false;
    }
  },[]);

  // Create a list
  const addList = async (name) => {
    if(name === '') return;
      const newListItem = name;
      const getAddListUrl = (list) => {
        return `${BASE_URL}lists?name=${list}&idBoard=${BOARD_ID}&key=${KEY}&token=${TOKEN}`
      }
      try {
        const addListUrl = getAddListUrl(newListItem);
        const res = await axios.post(addListUrl);
        if(res.status !== 200) {
          throw new Error('Network response was not ok')
        }
        const { data: { id, name } } = res;
        // add new list to lists
        const newList = { id, name }
        setLists([...lists, newList]);
      } catch (error) {
        console.log('error:', error)
        setError(error)
      }
  }

  return (
    <ListContext.Provider value={{ lists, setLists, isLoading, setIsLoading, error, setError, addList }}>
      { children }
    </ListContext.Provider>
  )

}

export { ListContext, ListProvider }