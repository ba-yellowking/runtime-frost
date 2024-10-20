import { useEffect, useState } from "react";
import "./DropDown.css";
// import {useDispatch} from "react-redux";
// import {selectedBrandId, setSelectedBrand} from "../../slices/filterSlice.jsx";

function DropDown({ defaultOption, options = [], selectHandler, style }) {

  // const dispatch = useDispatch();

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
    // dispatch(selectedBrandId(option.id || 0));
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
    <div className="dropdown-wrap">
      <div className="dropdown-header" onClick={openMenu} style={style}>
        {selectedOption}
      </div>

      {isOpen && <div className="dropdown-list">{renderOptions()}</div>}
    </div>
  );
}

export default DropDown;
