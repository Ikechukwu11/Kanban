import { useState } from 'react'
import './Board.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown'

const Board = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_title'>
          {props.board?.title}
          <span className='mr-2'> {props.board?.cards?.length} </span>
        </p>

        <div className='board_top_more' onClick={() => setShowDropdown(true)}>
          <FiMoreHorizontal />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className='board_dropdown'>
                <p onClick={() => props.removeBoard(props.board?.id)}>
                  Delete Board
                </p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className='board_cards '>
        {props.board?.cards?.map((item) => (
          <Card
            key={item.id}
            card={item}
            removeCard={props.removeCard}
            boardId={props.board?.id}
            handleDragEnter={props.handleDragEnter}
            handleDragEnd={props.handleDragEnd}
            updateCard={props.updateCard}
          />
        ))}
        <Editable
          text='Add Card'
          placeholder='Enter card title'
          onSubmit={(value) => props.addCard(value, props.board?.id)}
        />
      </div>
    </div>
  )
}

export default Board
