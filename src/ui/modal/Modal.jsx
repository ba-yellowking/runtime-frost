import "./Modal.css"

function Modal(props) {
  const handleContentClick = function (event) {
    event.stopPropagation()
  }

  return (
    <div className={`modal ${props.open ? "visible" : ""}`}>
      <div className="modal__shade" onClick={props.close}>
        <div
          className="modal__content dark:border-[#252525] dark:bg-[#252525]"
          onClick={handleContentClick}
        >
          {props.children}
          <span className="modal__close" onClick={props.close}>
            &times;
          </span>
        </div>
      </div>
    </div>
  )
}

export default Modal
