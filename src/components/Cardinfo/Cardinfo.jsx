import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import { FiType, FiList, FiCalendar, FiTag } from 'react-icons/fi'
import './Cardinfo.css'
import Editable from '../Editable/Editable'

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
  return (
    <div>
      <Modal onClose={() => props.onClose()}>
        <div className='cardinfo'>
          <div className='cardinfo_box'>
            <div className='cardinfo_box_title'>
              <FiType /> Title No 1
            </div>
            <div className='cardinfo_box_body'>
              <Editable
                text={'Hello there'}
                placeholder='Enter Title'
                buttonText='Add Title'
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiList /> Description
            </div>
            <div className='cardinfo_box_body'>
              <Editable
                text={'Your Description'}
                placeholder='Enter Description'
                buttonText='Add Description'
              />
            </div>

            <div className='cardinfo_box_title'>
              <FiCalendar /> Date
            </div>
            <div className='cardinfo_box_body'>
              <input type='date' />
            </div>

            <div className='cardinfo_box_title'>
              <FiTag /> Labels
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
                text={'Your label'}
                placeholder='Enter label'
                buttonText='Add Label'
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Cardinfo
