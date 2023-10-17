import React from 'react'
import "./Modal.scss"

function Modal({title, withCloseButton = true, children, onCloseButtonClick}) {
  return (
    <div className="modal-wrapper">
      <div className="modal-content">
        <div className='modal-top-row'>
          <h3 className='modal-top-row-text'>{title}</h3>
         {withCloseButton && <i className='fa fa-x' onClick={onCloseButtonClick} />}
        </div>
        {/* <div className='sseparator' /> */}
        <div className='modal-fields-wrapper'>
          {children}
       </div>
      </div>
  </div>
  )
}

export default Modal
