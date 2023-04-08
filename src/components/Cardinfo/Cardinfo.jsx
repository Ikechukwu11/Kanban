import React, { useState, useEffect } from 'react'
import Modal from '../Modal/Modal'
import {
  FiType,
  FiList,
  FiCalendar,
  FiTag,
  FiCheckSquare,
  FiTrash,
  FiTrash2,
} from 'react-icons/fi'
import './Cardinfo.css'
import Editable from '../Editable/Editable'
import Chip from '../Chip/Chip'

const Cardinfo = (props) => {
  const colors = [
    '#a8193d',
    '#4fcc25',
    '#1ebffa',
    '#240959',
    '#cf61a1',
    '#8da377',
    '#9975bd',
  ]
  const randomColors = colors[Math.floor(Math.random() * colors.length)]

  const [activeColor, setActiveColor] = useState('#cf61a1')
  const { title, labels, desc, date, tasks } = props.card

  const [values, setValues] = useState({ ...props.card })

  //console.log(values)
  const tasksPercent = () => {
    if (values.tasks?.length === 0) return '0'
    const completed = values.tasks?.filter((item) => item.completed)?.length
    return (completed / values.tasks?.length) * 100
  }

  const addLabel = (value, color) => {
    const index = values.labels?.findIndex((item) => item.text === value)
    if (index > -1) return
    const label = {
      text: value,
      color,
    }
    setValues({ ...values, labels: [...values.labels, label] })
    setActiveColor('')
  }
  const removeLabel = (text) => {
    const tempLabels = values.labels?.filter((item) => item.text !== text)
    //console.log(index)
    //if (index < 0) return

    setValues({ ...values, labels: tempLabels })
  }

  const addTask = (value) => {
    const task = {
      id: Date.now() + Math.random(),
      text: value,
      completed: false,
    }
    setValues({ ...values, tasks: [...values.tasks, task] })
  }

  const removeTask = (id) => {
    const index = values?.tasks?.findIndex((item) => item.id === id)
    if (index < 0) return

    const tempTasks = values.tasks?.filter((item) => item.id !== id)
    setValues({ ...values, tasks: tempTasks })
  }

  const updateTask = (id, completed) => {
    const index = values?.tasks?.findIndex((item) => item.id === id)
    if (index < 0) return

    const tempTasks = [...values.tasks]
    tempTasks[index].completed = completed

    setValues({ ...values, tasks: tempTasks })
  }

  useEffect(() => {
    if (
      values.title === props.cards?.title &&
      values.date === props.cards?.date &&
      values.desc === props.cards?.desc &&
      values.labels?.length === props.cards?.labels?.length &&
      values.tasks?.length === props.cards?.tasks?.length
    )
      return
    props.updateCard(props.card.id, props.boardId, values)
  }, [values])

  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <div className='cardinfo'>
          <div className='cardinfo_box'>
            <div className='cardinfo_box_title'>
              <FiType /> Title
            </div>
            <div className='cardinfo_box_body'>
              <Editable
                text={values.title}
                default={values.title}
                placeholder='Enter Title'
                buttonText='Set Title'
                onSubmit={(value) => setValues({ ...values, title: value })}
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiList /> Description
            </div>
            <div className='cardinfo_box_body'>
              <Editable
                text={values.desc}
                default={values.desc}
                placeholder='Enter Description'
                buttonText='Set Description'
                onSubmit={(value) => setValues({ ...values, desc: value })}
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiCalendar /> Date
            </div>
            <div className='cardinfo_box_body'>
              <input
                type='date'
                //text={title}
                defaultValue={
                  values.date
                    ? new Date(values.date).toISOString().substr(0, 10)
                    : new Date().toISOString().substr(0, 10)
                }
                onChange={(e) => setValues({ ...values, date: e.target.value })}
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiTag /> Labels
            </div>

            <div className='cardinfo_box_labels'>
              {values.labels?.map((item, index) => (
                <Chip
                  onClose={() => {
                    removeLabel(item.text)
                  }}
                  key={item.text + index}
                  color={item.color}
                  text={item.text}
                  closed
                  textColor='#fff'
                />
              ))}
            </div>
            <div className='cardinfo_box_colors'>
              {colors.map((item, index) => (
                <li
                  key={index}
                  style={{ backgroundColor: item }}
                  className={item === activeColor ? 'active' : ''}
                  onClick={() => setActiveColor(item)}
                />
              ))}
            </div>
            <div className='cardinfo_box_body'>
              <Editable
                text={'Add Label'}
                placeholder='Enter label'
                buttonText='Add Label'
                onSubmit={(value) =>
                  addLabel(value, activeColor ? activeColor : randomColors)
                }
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiCheckSquare /> Tasks
            </div>

            <div className='cardinfo_box_progress-bar'>
              <div
                className={`cardinfo_box_progress ${
                  tasksPercent() === 100 ? 'cardinfo_box_progress-active' : ''
                }`}
                style={{ width: tasksPercent() + '%' }}
              ></div>
            </div>

            <div className='cardinfo_box_list'>
              {values.tasks?.map((item) => (
                <div key={item.id} className='cardinfo_task'>
                  <input
                    type='checkbox'
                    defaultChecked={item.completed}
                    onChange={(e) => updateTask(item.id, e.target.checked)}
                  />
                  <p>{item.text}</p>
                  <FiTrash2
                    onClick={(e) => {
                      removeTask(item.id)
                    }}
                  />
                </div>
              ))}
            </div>

            <div className='cardinfo_box_body'>
              <Editable
                text={'Enter task name'}
                placeholder='Enter task name'
                buttonText='Add Task'
                onSubmit={(value) => addTask(value)}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Cardinfo
