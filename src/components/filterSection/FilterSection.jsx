import "./FilterSection.css";
import DropDown from "../../ui/dropDown/DropDown.jsx";
import { useEffect } from "react";
import CheckBox from "../../ui/checkBox/CheckBox.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  fetchBrands,
  fetchGenerations,
  fetchModels,
  setAvailable,
  setSelectedBrand,
  setSelectedGeneration,
  setSelectedModel
} from "../../slices/filterSlice.jsx";

function FilterSection() {

  const dispatch = useDispatch()
  const brands = useSelector(state => state.filter.brand);
  const models = useSelector(state => state.filter.model);
  const generations = useSelector(state => state.filter.generation);

  const selectedBrand = useSelector(state => state.filter.selectedBrand);
  const selectedModel = useSelector(state => state.filter.selectedModel);

  useEffect(() => {
    dispatch(fetchBrands());
  }, [dispatch]);

  // Re-rendering models depending on the chosen brand
  useEffect(() => {
    if (selectedBrand > 0) {
      dispatch(fetchModels(selectedBrand));
    }
  }, [dispatch, selectedBrand]);

  // Re-rendering generations depending on the chosen model
  useEffect(() => {
    if (selectedModel > 0 && models.length > 0) {
      dispatch(fetchGenerations(selectedModel));
    }
  }, [dispatch, selectedModel]);

  const changeBrand = function(brandId) {
    if (brandId > 0) {
      dispatch(setSelectedBrand(brandId));
      dispatch(fetchModels(brandId));
    } else {
      dispatch(setSelectedBrand(0));
    }
    dispatch(setSelectedModel(0));
    dispatch(setSelectedGeneration(0));
  }

  const changeModel = function(modelId) {
    if (modelId > 0) {
      dispatch(setSelectedModel(modelId));
      dispatch(fetchGenerations(modelId));
    } else {
      dispatch(setSelectedModel(0));
    }
    dispatch(setSelectedGeneration(0));
  }

  const changeGeneration = function(generationId) {
    if (generationId > 0) {
      dispatch(setSelectedGeneration(generationId));
    }
  }

  const onChangeCheckBox = function(availableBoolean) {
    dispatch(setAvailable(availableBoolean ? 1 : 0));
  }

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="filter-dropdowns">
          <div className="filter-brands">
            <DropDown
              defaultOption="Все марки"
              options={brands}
              selectHandler={changeBrand}
            />
          </div>

          <div className="filter-models">
            {selectedBrand ? (
              <DropDown
                defaultOption="Все модели"
                options={models}
                selectHandler={changeModel}
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
                selectHandler={changeGeneration}
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
              onChangeCheckBox={onChangeCheckBox}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection;