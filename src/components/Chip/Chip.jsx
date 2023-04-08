import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import './Chip.css'

const Chip = (props) => {
  return (
    <div
      className='chip'
      style={{ color: props.textColor, backgroundColor: props.color }}
    >
      {props.text}
      {props.closed && (
        <AiOutlineClose
          onClick={() => (props.onClose ? props.onClose() : '')}
        />
      )}
    </div>
  )
}

export default Chip
