import "./FilterSection.css";
import DropDown from "../../ui/dropDown/DropDown.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckBox from "../../ui/checkBox/CheckBox.jsx";

function FilterSection({ currentBrandId, currentModelId, currentGenerationId, currentAvailableBoolean, isChecked, setIsChecked }) {

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [generations, setGenerations] = useState([]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);

  // Запрос на марки
  useEffect(function() {
    axios
      .get("https://frost.runtime.kz/api/brands")
      .then(function(response) {
        setBrands(response.data.map(function(brand) {
          return { name: brand.name, id: brand.id }
        }))
      })
  }, [])

  // Запрос на модели
  useEffect(function() {
    if (selectedBrand > 0) {
      axios
        .get(`https://frost.runtime.kz/api/models?brandId=${selectedBrand}`)
        .then(function(response) {
          setModels(response.data.map(function(model) {
            return { name: model.name, id: model.id }
          }));
        });
    }
  }, [selectedBrand]);

  // Запрос на поколения
  useEffect(function() {
    if (selectedModel > 0) {
      axios
        .get(`https://frost.runtime.kz/api/generations?modelId=${selectedModel}`)
        .then(function(response) {
          setGenerations(response.data.map(function(generation) {
            return { name: generation.name, id: generation.id }
          }))
        });
    }
  }, [selectedModel]);

  const changeBrand = function(brandId) {
    setSelectedBrand(brandId);
    currentBrandId(brandId);
    setModels([]);
    setGenerations([]);
  }

  const changeModel = function(modelId) {
    setSelectedModel(modelId);
    currentModelId(modelId);
    setGenerations([]);
  }

  const changeGeneration = function(generationId) {
    currentGenerationId(generationId);
  }

  const onChangeCheckBox = function(availableBoolean) {
    currentAvailableBoolean(availableBoolean);
  }

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="filter-dropdowns">
          <div className="filter-brands">
            <DropDown
              defaultOption="Все марки"
              options={brands}
              clickHandler={changeBrand}
            />
          </div>

          <div className="filter-models">
            {selectedBrand ? (
              <DropDown
                defaultOption="Все модели"
                options={models}
                clickHandler={changeModel}
              />
            ) : (
              <DropDown
                defaultOption="Все модели"
                style={{width: "220px", height: "33px", backgroundColor: "#cccccc", cursor: "default"}}
              />
            )}
          </div>

          <div className="filter-generations">
            {selectedModel && selectedBrand ? (
              <DropDown
                defaultOption="Все поколения"
                options={generations}
                clickHandler={changeGeneration}
              />
            ) : (
              <DropDown
                defaultOption="Все поколения"
                style={{width: "220px", height: "33px", backgroundColor: "#cccccc", cursor: "default"}}
              />
            )}
          </div>

          <div className="filter-available">
            <CheckBox
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              onChangeCheckBox={onChangeCheckBox}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection;