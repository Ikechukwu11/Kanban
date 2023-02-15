import { useState } from 'react'
import './Board.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'
import Dropdown from '../Dropdown/Dropdown'

const Board = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  return (
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_title'>
          To Do <span className='mr-2'> 2 </span>
        </p>

        <div className='board_top_more' onClick={() => setShowDropdown(true)}>
          <FiMoreHorizontal />
          {showDropdown && (
            <Dropdown onClose={() => setShowDropdown(false)}>
              <div className='board_dropdown'>
                <p> Delete Board</p>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
      <div className='board_cards'>
        <Card />
        <Card />
        <Editable />
      </div>
    </div>
  )
}

export default Board
