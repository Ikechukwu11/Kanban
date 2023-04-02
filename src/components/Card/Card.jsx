import React, { useState } from 'react'
import './Card.css'
import { AiOutlineCheckSquare } from 'react-icons/ai'
import { FiMoreHorizontal, FiClock } from 'react-icons/fi'
import Chip from '../Chip/Chip'
import Dropdown from '../Dropdown/Dropdown'
import Cardinfo from '../Cardinfo/Cardinfo'

const Card = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showModal, setShowModal] = useState(false)
  return (
    <>
      {showModal && <Cardinfo onClose={() => setShowModal(false)} />}
      <div
        className='card'
        draggable
        onClick={() => setShowModal(true)}
        onDragEnter={() => props.handleDragEnter(props.card?.id, props.boardId)}
        onDragEnd={() => props.handleDragEnd(props.card?.id, props.boardId)}
      >
        <div className='card_top'>
          <div className='card_top_labels'>
            {props.card?.labels?.map((item, index) => (
              <Chip
                key={index}
                text={item.text}
                closed
                textColor='#fff'
                color={item.color}
              />
            ))}
          </div>
          <div className='card_top_more' onClick={() => setShowDropdown(true)}>
            <FiMoreHorizontal />

            {showDropdown && (
              <Dropdown onClose={() => setShowDropdown(false)}>
                <div className='card_dropdown'>
                  <p
                    onClick={() =>
                      props.removeCard(props.card?.id, props.boardId)
                    }
                  >
                    {' '}
                    Delete Card
                  </p>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
        <div className='card_title'>{props.card?.title}</div>
        <div className='card_footer'>
          {props.card?.date && (
            <p>
              <FiClock />
              {props.card?.date}
            </p>
          )}

          <p>
            <AiOutlineCheckSquare />
            1/4
          </p>
        </div>
      </div>
    </>
  )
}

export default Card
