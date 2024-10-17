import { useState } from "react";
import "./ButtonStandard.css";

function ButtonStandard({ name, clickHandler, isDisabled, style }) {

  const [isActive, setIsActive] = useState(false);

  const handleMouseDown = function() {
    setIsActive(true);
  };

  const handleMouseUp = function() {
    setIsActive(false);
  };

  return (

    <button
      type="button"
      className={`button-standard ${isActive ? "active" : ""}`}
      onClick={clickHandler}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={isDisabled}
      style={style}
    >
      {name}
    </button>
  );
}

export default ButtonStandard;
