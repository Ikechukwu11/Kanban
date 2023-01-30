import React from 'react'
import './Card.css'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import { FiMoreHorizontal, FiClock } from 'react-icons/fi'
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
      <div className='card_title'>Card Data</div>
      <div className='card_footer'>
        <p>
          <FiClock />
          30 Jan,2023 12:44 pm
        </p>
        <p>
          <AiOutlineCheckSquare />
          1/4
        </p>
      </div>
    </div>
  )
}

export default Card
