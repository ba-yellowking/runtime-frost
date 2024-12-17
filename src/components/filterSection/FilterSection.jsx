import "./FilterSection.css"
import DropDown from "../../ui/dropDown/DropDown.jsx"
import { useEffect, useState } from "react"
import CheckBox from "../../ui/checkBox/CheckBox.jsx"
import { useDispatch, useSelector } from "react-redux"
import { changeBrand, changeGeneration, changeModel, fetchBrands, setAvailable } from "../../slices/filterSlice.jsx"

function FilterSection() {
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.filter.brand)
  const models = useSelector((state) => state.filter.model)
  const generations = useSelector((state) => state.filter.generation)

  const selectedBrand = useSelector((state) => state.filter.selectedBrand)
  const selectedModel = useSelector((state) => state.filter.selectedModel)

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  // const changeGeneration = function(generationId) {
  //   if (generationId > 0) {
  //     dispatch(setSelectedGeneration(generationId));
  //   }
  // }

  const onChangeCheckBox = function (availableBoolean) {
    dispatch(setAvailable(availableBoolean ? 1 : 0))
  }

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        <div className="filter-dropdowns">
          <div className="filter-brands">
            <DropDown
              defaultOption="Все марки"
              options={brands}
              selectHandler={function (brandId) {
                dispatch(changeBrand(brandId))
              }}
            />
          </div>

          <div className="filter-models">
            {selectedBrand ? (
              <DropDown
                defaultOption="Все модели"
                options={models}
                selectHandler={function (modelId) {
                  dispatch(changeModel(modelId))
                }}
              />
            ) : (
              <DropDown defaultOption="Все модели" isDropdownDisabled={true} className="dropdown-disabled" />
            )}
          </div>

          <div className="filter-generations">
            {selectedModel && selectedBrand ? (
              <DropDown
                defaultOption="Все поколения"
                options={generations}
                selectHandler={function (generationId) {
                  dispatch(changeGeneration(generationId))
                }}
              />
            ) : (
              <DropDown defaultOption="Все поколения" isDropdownDisabled={true} className="dropdown-disabled" />
            )}
          </div>

          <div className="filter-available">
            <CheckBox onChangeCheckBox={onChangeCheckBox} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
