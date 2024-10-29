import {useEffect, useRef, useState} from "react";
import "./DropDown.css";
import {useClickOutsideDropDown} from "../../hooks/useClickOutsideDropDown.jsx";

function DropDown({ defaultOption, options = [], selectHandler, style }) {

  const dropDownRef = useRef()
  useClickOutsideDropDown(dropDownRef, function() {
    setIsOpen(false)
  })

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);

  useEffect(() => {
    setSelectedOption(defaultOption);
  }, [options]);

  const allOptions = [defaultOption, ...options];

  function openMenu() {
    setIsOpen(!isOpen);
  }

  function selectOption(option) {
    setSelectedOption(option.name || option);
    setIsOpen(false);
    selectHandler(option.id || 0);
  }

  function renderOptions() {
    return allOptions.map((option, index) => {
      if (isOpen && selectedOption !== (option.name || defaultOption)) {
        return (
          <div
            className="dropdown-option"
            key={index}
            onClick={() => selectOption(option)}
          >
            {option.name || defaultOption}
          </div>
        );
      }
    });
  }

  return (
    <div className="dropdown-wrap" >
      <div className="dropdown-header" onClick={openMenu} style={style} ref={dropDownRef}>
        {selectedOption}
      </div>

      {isOpen && <div className="dropdown-list">{renderOptions()}</div>}
    </div>
  );
}

export default DropDown;