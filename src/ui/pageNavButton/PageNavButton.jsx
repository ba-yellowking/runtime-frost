import "./PageNavButton.css"

function PageNavButton({ index, clickHandler, isActive }) {
  return (
    <button className={`page-nav-button ${isActive ? "active" : ""}`} type="button" key={index} onClick={clickHandler}>
      {index}
    </button>
  )
}

export default PageNavButton
