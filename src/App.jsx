import { useEffect } from 'react'
import './App.css'
import Board from './components/Board/Board'
import { useState } from 'react'
import Editable from './components/Editable/Editable'
//import boarddata from '../data/boarddata'

function App() {
  const [boards, setBoards] = useState(
    JSON.parse(localStorage.getItem('kanban')) || [
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
    ]
  )

  const [dragTarget, setDragTarget] = useState({
    cid: '',
    bid: '',
  })

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
    tempBoards[bIndex].cards.splice(cIndex, 1)
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

  const handleDragEnter = (cid, bid) => {
    setDragTarget({
      cid,
      bid,
    })
  }

  const handleDragEnd = (cid, bid) => {
    let s_bIndex, s_cIndex, t_bIndex, t_cIndex
    s_bIndex = boards.findIndex((item) => item.id === bid)
    if (s_bIndex < 0) return

    s_cIndex = boards[s_bIndex].cards?.findIndex((item) => item.id === cid)
    if (s_cIndex < 0) return

    t_bIndex = boards.findIndex((item) => item.id === dragTarget.bid)
    if (t_bIndex < 0) return

    t_cIndex = boards[t_bIndex].cards?.findIndex(
      (item) => item.id === dragTarget.cid
    )
    if (t_cIndex < 0) return

    const tempBoards = [...boards]
    const tempCards = tempBoards[s_bIndex].cards[s_cIndex]
    tempBoards[s_bIndex].cards.splice(s_cIndex, 1)
    tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCards)

    setBoards(tempBoards)
  }

  const updateCard = (cid, bid, card) => {
    const bIndex = boards.findIndex((item) => item.id === bid)
    if (bIndex < 0) return

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid)
    if (cIndex < 0) return

    const tempBoards = [...boards]
    tempBoards[bIndex].cards[cIndex] = card
    setBoards(tempBoards)
  }

  useEffect(() => {
    localStorage.setItem('kanban', JSON.stringify(boards))
  }, [boards])

  return (
    <div className='app'>
      <div className='app_navbar'>
        <h2>Kanban</h2>
      </div>
      <div className='app_outer'>
        <div className='app_boards'>
          {boards.map((item) => (
            <Board
              key={item.id}
              board={item}
              removeBoard={removeBoard}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              updateCard={updateCard}
            />
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
