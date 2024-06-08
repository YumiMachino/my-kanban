import React, { useEffect, useState, useContext } from 'react';
import { ListContext } from '../context/ListContext';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import Card from './Card';
import Button from './Button';
import { BASE_URL, KEY, TOKEN } from '../Network';

const List = ({ id, list }) => {
  const { setLists, lists } = useContext(ListContext);
  const { name } = list;
  const [cards, setCards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editList, setEditList] = useState(name);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const getAllCardsUrl = () => {
      return `${BASE_URL}lists/${id}/cards?key=${KEY}&token=${TOKEN}`
    }
    const fetchCards = async() => {
      try {
        const cardsUrl = getAllCardsUrl();
        const res = await axios.get(cardsUrl)

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
    if(isMounted) {
      setCards(cards);
    }

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

  const onEditClick = () => {
    setIsEditing(!isEditing);
  }

  const handleEdit = (e) => {
    const { value } = e.target;
    setEditList(value);
  }


  const editListName = async(name) => {
    if(name === '') return;

    const editedName = name;

    const geteditListUrl = () => {
      return `${BASE_URL}lists/${id}?key=${KEY}&token=${TOKEN}&name=${editedName}`
    }
    const editListUrl = geteditListUrl();
    try {
      const res = await axios.put(editListUrl)

    if(res.status !== 200) {
      throw new Error('Network response was not ok')
    }
    const { data: { name }} = res;
    setEditList(name);
    
    } catch(error) {
      console.log('error:', error);
    }
}



  const handleEditSubmit = (e) => {
    e.preventDefault();
    if(editList === '' || editList === name) {
      setIsEditing(false);
      return
    }
    // Edit the list here
    editListName(editList);
    // false to setEdit List here
    setIsEditing(false);    
  }

  const deleteList = async (name) => {

    const getDeleteListUrl = () => {
      return `${BASE_URL}lists/${id}?key=${KEY}&token=${TOKEN}&name=${name}&closed=true`
    }
    try {
      const deleteListUrl = getDeleteListUrl();
      const res = await axios.put(deleteListUrl);

    const filteredLists = lists.filter((list) => {
      return list.name !== editList
    })
    setLists(filteredLists)

      if(res.status !== 200) {
        throw new Error('Network response was not ok')
      }

    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleDelete = () => {
    deleteList(editList);
  }

  const toggleIsAdding = () => {
    setIsAddingCard(!isAddingCard);
  }

  const addCard = async() => {
    if(newCard === '') return
    const getAddCardUrl = () => {
        return `${BASE_URL}cards?name=${newCard}&idList=${id}&key=${KEY}&token=${TOKEN}`
    }
    try {
      const addCardUrl = getAddCardUrl();
      const res = await axios.post(addCardUrl)

    if(res.status !== 200) {
      throw new Error('Network response was not ok')
    }
    const { data } = res;
    setCards([...cards, data]);

    } catch (error) {
      console.log('error:', error);
    }
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    addCard()
    setIsAddingCard(false)
  }

  const handleAddChange = (e) => {
    const { value } = e.target;
    setNewCard(value);    
  }

    return (
    <div className='rounded-xl p-10 lg:h-full flex-1 lg:min-w-16'>
      <div className='bg-white border-blue p-4 h-4/6 rounded-xl lg:h-5/6 relative min-w-36 pb-20'>
        <div className='flex flex-row justify-between w-full'>
          {
        isEditing ? (
          <form className='flex flex-row justify-between bg-dark-blue' onSubmit={handleEditSubmit}>
          <input type='text' id='edit' name='edit' value={editList} onChange={handleEdit} className='border border-gray rounded-sm' />
          <Button primary text='Save' type='submit' />
          </form>
        ) : (
          <h2 className='text-dark-blue font-bold text-center'>{editList}</h2>
        )
      }
        <div className='flex flex-row'>
          <FaEdit onClick={onEditClick}/>
          <FaRegTrashAlt onClick={handleDelete}/>
        </div>
      </div>
      { 
        cards.map((card) => (
          <Card key={`${card.id}${card.name}`} id={card.id} card={card} />
        ))
      }
      {
          isAddingCard ? (
            <form className='flex flex-row justify-between' onSubmit={handleAddCard}>
              <input type='text' id='name' name='name' className='p-1 border border-gray m-1 rounded-sm text-dark-blue w-full' onChange={handleAddChange} />
              <Button primary={true} text='Add' type='submit'/>
            </form>
          ) : (
            <div></div>
          )
      } 
        <Button primary={false} text='Add an item' action={toggleIsAdding} />
      </div> 
    </div>
  )
}

export default List