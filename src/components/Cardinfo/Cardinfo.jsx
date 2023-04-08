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
  const [activeColor, setActiveColor] = useState('#cf61a1')
  const { title, labels, desc, date, tasks } = props.card

  const [values, setValues] = useState({ ...props.card })
  const tasksPercent = () => {
    if (values.tasks?.length === 0) return '0'
    const completed = values.tasks?.filter((item) => item.completed)?.length
    return (completed / values.tasks?.length) * 100
  }

  useEffect(() => {
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
                  onClose={() => console.log('close chip')}
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
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiCheckSquare /> Tasks
            </div>

            <div className='cardinfo_box_progress-bar'>
              <div
                className='cardinfo_box_progress'
                style={{ width: tasksPercent() + '%' }}
              ></div>
            </div>

            <div className='cardinfo_box_list'>
              {values.tasks?.map((item) => {
                ;<div key={item.id} className='cardinfo_task'>
                  <input type='checkbox' defaultValue={item.completed} />
                  <p>{item.text}</p>
                  <FiTrash2 />
                </div>
              })}
            </div>

            <div className='cardinfo_box_body'>
              <Editable
                text={'Enter task name'}
                placeholder='Enter task name'
                buttonText='Add Task'
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Cardinfo
