import React, { useEffect, useRef, useClickAway } from 'react'

const Dropdown = (props) => {
  const dropdownRef = useRef()

  const handleClick = (event) => {
    //console.log(event.target)
    // if (
    //   dropdownRef &&
    //   dropdownRef.current.contains(event.target) &&
    //   props.onClose
    // ) {
    //   props.onClose()
    // }
    if (dropdownRef && !dropdownRef.current.contains(event.target)) {
      if (props.onClose) props.onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true })

    return () => {
      document.removeEventListener('click', handleClick, { capture: true })
    }
  })

  return (
    <div
      ref={dropdownRef}
      className='dropdown'
      style={{
        position: 'absolute',
        top: '100%',
        right: '0',
      }}
    >
      {props.children}
    </div>
  )
}

export default Dropdown
