import "./FilterSection.css"
import DropDown from "../../ui/dropDown/DropDown.jsx"
import { useEffect } from "react"
import CheckBox from "../../ui/checkBox/CheckBox.jsx"
import { useDispatch, useSelector } from "react-redux"
import { changeBrand, changeGeneration, changeModel, fetchBrands, setAvailable } from "../../slices/filterSlice.jsx"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function FilterSection() {
  const dispatch = useDispatch()
  const brands = useSelector((state) => state.filter.brand)
  const models = useSelector((state) => state.filter.model)
  const generations = useSelector((state) => state.filter.generation)

  const selectedBrand = useSelector((state) => state.filter.selectedBrand)
  const selectedModel = useSelector((state) => state.filter.selectedModel)

  // useTranslation.jsx
  const { t } = useTranslation()

  useEffect(() => {
    dispatch(fetchBrands())
  }, [dispatch])

  const onChangeCheckBox = function (availableBoolean) {
    dispatch(setAvailable(availableBoolean ? 1 : 0))
  }

  return (
    <div className="filter dark:border-[#252525] dark:bg-[#252525]">
      <div className="filter__wrap">
        <div className="filter__dropdown">

          <DropDown
            defaultOption={t("filterAllBrands")}
            options={brands}
            selectHandler={function (brandId) {
              dispatch(changeBrand(brandId))
            }}
          />

          {selectedBrand ? (
            <DropDown
              defaultOption={t("filterAllModels")}
              options={models}
              selectHandler={function (modelId) {
                dispatch(changeModel(modelId))
              }}
            />
          ) : (
            <DropDown defaultOption={t("filterAllModels")} isDropdownDisabled={true} className="dropdown--disabled" />
          )}

          {selectedModel && selectedBrand ? (
            <DropDown
              defaultOption={t("filterAllGenerations")}
              options={generations}
              selectHandler={function (generationId) {
                dispatch(changeGeneration(generationId))
              }}
            />
          ) : (
            <DropDown
              defaultOption={t("filterAllGenerations")}
              isDropdownDisabled={true}
              className="dropdown--disabled"
            />
          )}

          <div className="filter__checkbox">
            <CheckBox onChangeCheckBox={onChangeCheckBox} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSection
