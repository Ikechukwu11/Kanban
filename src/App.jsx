import './App.css'
import Board from './components/Board/Board'
import { useState } from 'react'
import Editable from './components/Editable/Editable'
//import boarddata from '../data/boarddata'

function App() {
  const [boards, setBoards] = useState([
    {
      id: Date.now() + Math.random() * 2,
      title: 'To Do',
      cards: [
        {
          id: Date.now() + Math.random(),
          title: 'Card 1',
          tasks: [],
          labels: [
            {
              text: 'frontend',
              color: 'blue',
            },
          ],
          desc: 'This is Card 1',
          date: '',
        },

        {
          id: Date.now() + Math.random(),
          title: 'Card 2',
          tasks: [],
          labels: [
            {
              text: 'backend',
              color: 'black',
            },
          ],
          desc: 'This is Card 2',
          date: '',
        },

        {
          id: Date.now() + Math.random(),
          title: 'Card 3',
          tasks: [],
          labels: [
            {
              text: 'devops',
              color: 'teal',
            },
          ],
          desc: 'This is Card 3',
          date: '',
        },
      ],
    },
  ])

  const addCard = (title, bid) => {
    const card = {
      id: Date.now() + Math.random(),
      title,
      labels: [],
      tasks: [],
      desc: '',
      date: '',
    }

    const index = boards.findIndex((item) => item.id === bid)
    if (index < 0) return
    const tempBoards = [...boards]
    tempBoards[index].cards.push(card)
    setBoards(tempBoards)
  }

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return
    const tempBoards = [...boards]
    tempBoards[bindex].cards.splice(cIndex, 1)
    setBoards(tempBoards)
  }

  const addBoard = (title) => {
    setBoards([
      ...boards,
      {
        id: Date.now() + Math.random() * 2,
        title: title,
        cards: [],
      },
    ])
  }

  const removeBoard = (bid) => {
    const tempBoards = boards.filter((item) => item.id !== bid)
    setBoards(tempBoards)
  }

  return (
    <div className='app'>
      <div className='app_navbar'>
        <h2>Kanban</h2>
      </div>
      <div className='app_outer'>
        <div className='app_boards'>
          {boards.map((item) => (
            <Board key={item.id} board={item} removeBoard={removeBoard} />
          ))}
          <Editable
            displayClass='app_boards_board_add'
            buttonText='Add Board'
            text='Add Board'
            placeholder='Enter board title'
            onSubmit={(value) => addBoard(value)}
          />
        </div>
      </div>
    </div>
  )
}

export default App
