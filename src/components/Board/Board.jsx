import './Board.css'
import { FiMoreHorizontal } from 'react-icons/fi'
import Card from '../Card/Card'
import Editable from '../Editable/Editable'

const Board = () => {
  return (
    <div className='board'>
      <div className='board_top'>
        <p className='board_top_title'>
          To Do <span className='mr-2'> 2 </span>
        </p>

        <FiMoreHorizontal />
      </div>
      <div className='board_cards'>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Editable />
      </div>
    </div>
  )
}

export default Board
