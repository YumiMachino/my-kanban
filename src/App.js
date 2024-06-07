import List from "./component/list";
import Button from "./component/button";
import ListItems from "./component/listItems";
import axios from "axios";
import { useState, useEffect } from "react";

// const API_KEY='8cf7ff1641dc00b4bc65f9349e45d98f'
// const ORIGIN='http://localhost:3000/'
// const SECRET='e4be656d77257f4f0f70fd0edd92d8f0360af57e9efe2c5e34434f99a7c52d05'


// Create a list
// Update a list
// delete a list


// Create a card in a list
// Edit a card in a list
// Delete a card in a list

// Get lists on a board
// Get cards in a list


function App() {
  const [lists, setLists] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newList, setNewList] = useState('');

    useEffect(() => {
    let isMounted = true;
    const fetchLists = async() => {
      try {
        const res = await axios.get('https://api.trello.com/1/boards/66638486a47a6fb946ffa564/lists?key=8cf7ff1641dc00b4bc65f9349e45d98f&token=ATTA6687d6e04c6796dd658a51d2a9298beee21a3b0732b085038a8df8520d3a12b2EBFADE3D');
        console.log('res', res);
        if(res.status !== 200) {
          throw new Error('Network response was not ok')
        }
        const { data } = res;
        console.log('res:', data);
        if(isMounted) {
          setLists(data);
          setLoading(false);
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


  const addList = async (name) => {
      try {
        const res = await axios.post('https://api.trello.com/1/lists?name=Completed&idBoard=66638486a47a6fb946ffa564&key=8cf7ff1641dc00b4bc65f9349e45d98f&token=ATTA6687d6e04c6796dd658a51d2a9298beee21a3b0732b085038a8df8520d3a12b2EBFADE3D', {
          name
        })

        console.log('add list?', res);

      } catch (error) {
        console.log('error:', error)
      }
  }

  if(loading) {
    return <h1>Loading...</h1>
  }

  if(error) {
    return <h1>Error: {error.message}</h1>
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setNewList(value);
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('form submitted');
    if(!newList) return
    // create new list herer
    addList()
  }


  return (
    <div className="w-screen bg-dark-blue min-h-screen h-screen">
      <header className='container mx-auto'>
      <h1 className="text-3xl font-bold text-white py-10">
        My Board
      </h1>
      </header>
      <main className='container mx-auto lg:h-5/6'>
        <form className="flex flex-row w-full justify-center" onSubmit={handleSubmit}> 
          <input className="rounded-sm p-2 border border-white text-white bg-dark-blue w-4/5" type="text" id='name' value={newList} onChange={handleChange}/>
          <Button primary text='Add a list' type="submit" />
        </form>
        <div className='container mx-auto flex flex-col lg:flex-row flex-wrap lg:h-4/6'>
          <ListItems lists={lists} />
        </div>
      </main>
    </div>
  );
}

export default App;
