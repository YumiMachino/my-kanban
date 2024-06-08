import React, { useState } from 'react';
import axios from 'axios';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Button from './Button';
import { BASE_URL, KEY, TOKEN } from '../Network';

const Card = ({ card: { id, name } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editCard, setEditCard] = useState(name);
  const [card, setCard] = useState(name);
 
  const handleEditCard = async () => {
    if(editCard === '') return

    console.log('id:', id);
    const getEditCardUrl = () => {
        return `${BASE_URL}cards/${id}?key=${KEY}&token=${TOKEN}&name=${editCard}`
    }
    const editCardUrl = getEditCardUrl();
    try {
      const res = await axios.put(editCardUrl)

    if(res.status !== 200) {
      throw new Error('Network response was not ok')
    }
    const { data } = res;    
    setCard(data.name)
    } catch (error) {
      console.log('error:', error);
    }
  }

  const submitEdit = (e) => {
    e.preventDefault();
    if(editCard === '' || editCard === name) {
      setIsEditing(false);
      return
    }
    handleEditCard();

    setIsEditing(false);
  }


  const onEditClick = (e) => {
    const { value } = e.target;
    setEditCard(value)
  }

  const deleteCard = async () => {

    const getDeleteCardUrl = () => {
        return `${BASE_URL}cards/${id}?key=${KEY}&token=${TOKEN}`
    }
    const deleteCardUrl = getDeleteCardUrl();
    try {
      const res = await axios.delete(deleteCardUrl);
      if(res.status !== 200) {
        throw new Error('Network response was not ok')
      }
      setCard('')

    } catch (error) {
      console.log('error:', error)
    }
  }

  const handleDelete = () => {
    deleteCard()
  }

  if(card) {
    return (
    <div className='flex flex-row justify-between w-full'>
    <div className='p-1 border border-gray m-1 rounded-sm w-full'>
      {
        isEditing ? (
          <form onSubmit={submitEdit}>
            <input type='text' id='edit' name='edit' value={editCard} onChange={onEditClick} className='border border-gray rounded-sm' />
            <Button primary text='Save' type='submit' />
          </form>
        ) : (
          <p className='text-dark-blue'>{card}</p>
        )
      }
    </div>
    <div className='flex flex-row self-center'>
        <FaEdit onClick={() => setIsEditing(!isEditing)}/>
        <FaRegTrashAlt onClick={handleDelete}/>
        </div>
    </div>
  )
  } 
}

export default Card