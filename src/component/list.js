import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card';
import Button from './button';

const List = ({ id, list }) => {
  const { name } = list;
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true;
    const fetchCards = async() => {
      try {
        const res = await axios.get(`https://api.trello.com/1/lists/${id}/cards?key=8cf7ff1641dc00b4bc65f9349e45d98f&token=ATTA6687d6e04c6796dd658a51d2a9298beee21a3b0732b085038a8df8520d3a12b2EBFADE3D`)

        if(res.status !== 200) {
          throw new Error('Network response was not ok')
        }
        const { data } = res;
        if(isMounted) {
          setCards(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error.message);
        setError(error);
      }
    }

    fetchCards();

    return () => {
      isMounted = false;
    }
  },[id]);

  

  if(loading) {
    return <h1>Card Loading...</h1>
  }

  if(error) {
    return <h1>Error: {error.message}</h1>
  }


    return (
    <div className='rounded-xl p-10 h-full flex-1 lg:h-full'>
      <div className='bg-white border-blue p-4 h-4/6 rounded-xl lg:h-5/6 relative min-w-36'>
      <h2 className='text-dark-blue font-bold'>{name}</h2>
      { 
        cards.map((card) => (
          <Card key={card.id} id={card.id} card={card} />
        ))
      }
      {/* <form>
        <input type='text' name='card' /> */}
        <Button primary={false} text='Add an item' />
      {/* </form> */}
      </div>
    </div>
  )
}

export default List