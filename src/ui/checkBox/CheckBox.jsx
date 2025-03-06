import "./CheckBox.css"
import { useDispatch, useSelector } from "react-redux"
import { setIsChecked } from "../../slices/filterSlice.jsx"
import { useTranslation } from "../../hooks/useTranslation.jsx"

function CheckBox({ onChangeCheckBox }) {
  const dispatch = useDispatch()
  const isChecked = useSelector((state) => state.filter.isChecked)

  const checkBox = function () {
    dispatch(setIsChecked(!isChecked))
    onChangeCheckBox(!isChecked)
  }

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="checkbox rounded-[4px] flex h-[33px] w-[220px] items-center justify-start bg-[#7fb364] pl-4">
      <input
        id="checkBox"
        // prettier-ignore
        className="
          mr-2
          h-4
          w-4
          border-white
          rounded-sm
          checked:accent-white
          cursor-pointer
        "
        type="checkBox"
        onClick={checkBox}
      />
      <label className="text-white" htmlFor="checkBox">
        {t("checkBoxAvailable")}
      </label>
    </div>

    // <div className="available-container">
    //   <div className={`available-checkBox ${isChecked ? "is-checked" : ""}`} onClick={checkBox}></div>
    //   <span className="available-text">В наличии</span>
    // </div>
  )
}

export default CheckBox
