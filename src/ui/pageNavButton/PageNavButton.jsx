import "./PageNavButton.css";

// Принимаем пропсы index, функцию "clickHandler", которая пришла из MainPage для установления номера страницы
// а также isActive, чтобы показать активную страницу
function PageNavButton({ index, clickHandler, isActive }) {
  return (
    <button
      className={`page-nav-button ${isActive ? "active" : ""}`}
      type="button"
      key={index}
      onClick={clickHandler}
    >
      {index}
    </button>
  )
}

export default PageNavButton;
