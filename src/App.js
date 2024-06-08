

import { useState, useContext } from "react";
import { ListContext } from "./context/ListContext";
import Button from "./component/Button";
import Lists from "./component/Lists";



// const API_KEY='8cf7ff1641dc00b4bc65f9349e45d98f'
// const ORIGIN='http://localhost:3000/'
// const SECRET='e4be656d77257f4f0f70fd0edd92d8f0360af57e9efe2c5e34434f99a7c52d05'


// Create a list  -- done
// Update a list  -- done  (need to update lists)
// delete a list   -- done (need to update lists)


// Create a card in a list  -- done
// Edit a card in a list   --  done
// Delete a card in a list  -- done

// Get lists on a board -- done
// Get cards in a list  -- done


// TO DO;

// 1. Create a card in a list  -- done
// 2. Edit a card in a list  --done
// 3. Delete a card in a list --done

// context API でdata flow をひとつにする!! --done


function App() {
  const { addList } = useContext(ListContext);
  const [newList, setNewList] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setNewList(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newList) return
    addList(newList);
  }

  return (
    <div className="w-screen bg-dark-blue min-h-screen h-fit">
      <header className='container mx-auto'>
      <h1 className="text-3xl font-bold text-white py-10">
        My Board
      </h1>
      </header>
      <main className='container mx-auto h-fit lg:h-5/6 flex flex-col items-center'>
        <form className="flex flex-row  justify-center w-4/5 lg:w-full" onSubmit={handleSubmit}> 
          <input className="rounded-sm p-2 border border-white text-white bg-dark-blue w-4/5" type="text" id='name' value={newList} onChange={handleChange}/>
          <Button primary text='Add a list' type="submit" />
        </form>
        <div className='container mx-auto flex flex-col lg:flex-row flex-wrap lg:h-4/6'>
          <Lists  />
        </div>
      </main>
    </div>
  );
}

export default App;
