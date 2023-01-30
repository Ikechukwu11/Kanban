import React from 'react'
import './Card.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Chip from '../Chip/Chip'
const Card = () => {
  return (
    <div className='card'>
      <div className='card_top'>
        <div className='card_top_labels'>
          <Chip text='Frontend' closed textColor='#fff' color='green' />
        </div>
        <FiMoreHorizontal />
      </div>
    </div>
  )
}

export default Card
