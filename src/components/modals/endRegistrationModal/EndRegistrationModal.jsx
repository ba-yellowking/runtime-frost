import "./EndRegistrationModal.css";
import Modal from "../../../ui/modal/Modal.jsx";
import {useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContextProvider.jsx";


function EndRegistrationModal({isOpen, close, openLogIn}) {


  const [, signIn, , ,] = useContext(AuthContext);


  const modalHeight = "60px";


  return (

    <div className="modal-container">

      <Modal open={isOpen} close={close} modalHeight={modalHeight}>

        <div className="modal-content-top">
          <p>Вы успешно зарегистрировались!</p>
        </div>

        <div className="modal-content-bottom">
            <span>Подождите, идет авторизация</span>
        </div>

      </Modal>

    </div>
  )
}


export default EndRegistrationModal;