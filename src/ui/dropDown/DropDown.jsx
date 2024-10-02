import {useEffect, useState} from "react";
import "./DropDown.css";


function DropDown({ defaultOption, options=[], clickHandler, style }) {


  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);


  useEffect(function () {
    setSelectedOption(defaultOption)
  }, [options])


  const allOptions = [defaultOption, ...options];


  function openMenu() {
    setIsOpen(!isOpen);
  }


  // {id: ..., name: ...} -> { text: name, value: id }
  // {countryCode: ..., countryName: ..., ...} -> { text: countryName, value: countryCode }
  // Если информация с сервера разнится, лучше всего преобразовывать ее через map по вышеуказанному шаблону


  function selectOption(option) {
    setSelectedOption(option.name || option);
    setIsOpen(false);
    clickHandler(option.id);
  }


  function renderOptions() {
    return (
      allOptions.map(function(option, index) {
        if (isOpen && selectedOption !== (option.name || option)) {
          return (
            <div
              className="dropdown-option"
              key={index}
              onClick={function() {
                selectOption(option)
              }}
            >
              {option.name || option}
            </div>
          )
        }
      })
    )
  }


  return(
    <div className="dropdown-wrap">

      <div
        className="dropdown-header"
        onClick={openMenu}
        style={style}
      >
        {selectedOption}
      </div>

      <div className="dropdown-list">
        {renderOptions()}
      </div>

    </div>
  )
}


export default DropDown;