import "./CheckBox.css";
import {useDispatch, useSelector} from "react-redux";
import {setIsChecked} from "../../slices/filterSlice.jsx";

function CheckBox({ onChangeCheckBox }) {

  const dispatch = useDispatch();
  const isChecked = useSelector(state => state.filter.isChecked);

  const checkBox = function() {
    dispatch(setIsChecked(!isChecked));
    onChangeCheckBox(!isChecked);
  }

  return (
    <div className="available-container">
      <div
        className={`available-checkBox ${isChecked ? "is-checked" : ""}`}
        onClick={checkBox}
      >
      </div>
      <span className="available-text">В наличии</span>
    </div>
  )
}

export default CheckBox;