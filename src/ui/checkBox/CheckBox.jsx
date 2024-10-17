import "./CheckBox.css";

function CheckBox({ onChangeCheckBox, isChecked, setIsChecked }) {

  const checkBox = function() {
    setIsChecked(!isChecked);
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