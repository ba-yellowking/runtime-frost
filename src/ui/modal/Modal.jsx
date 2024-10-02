import "./Modal.css"


function Modal(props) {

  const handleContentClick = function(event) {
    event.stopPropagation();
  };

  return (

    <div className={`modal-wrap ${props.open ? "visible" : ""}`}>

      <div
        className="modal-shade"
        onClick={props.close}
      >

        <div className="modal-content" onClick={handleContentClick}>
          {props.children}
          <span className="close" onClick={props.close}>&times;</span>
        </div>

      </div>
    </div>
  );
}


export default Modal;