import "./PageNavComponent.css";
import PageNavButton from "../../ui/pageNavButton/PageNavButton.jsx";
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "../../slices/filterSlice.jsx";

function PageNavComponent() {

// totalPages - общее количество страниц из ProductsComponent
// onPageChange - функция, передаваемая в PageNavButton
// currentPage - текущая страница

  const dispatch = useDispatch();

  const onPageChange = function(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  const currentPage = useSelector((state) => state.filter.currentPage);
  const totalPages = useSelector(state => state.filter.totalPages);

  const pageForward = function () {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  const pageBack = function () {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }

  const showFirstPage = function () {
    return (
      <PageNavButton
        isActive={currentPage === 1}
        index={1}
        clickHandler={function () {
          onPageChange(1)
        }}
      />
    );
  }

  const showLastPage = function () {
    if (totalPages !== 1) {
      return (
        <PageNavButton
          isActive={currentPage === totalPages}
          index={totalPages}
          clickHandler={function () {
            onPageChange(totalPages)
          }}
        />
      )
    }
  }

  const threePages = [];

  // Перебор всех кнопок в навигации
  const renderPageButtons = function () {

    for (let i = 2; i <= totalPages - 1; i++) {
      const pageNavButton = (
        <PageNavButton
          isActive={i === currentPage}
          key={i}
          index={i}
          clickHandler={function () {
            onPageChange(i);
          }}
        />
      )

      if (currentPage <= 3 && i <= 4 || currentPage >= totalPages - 2 && i >= totalPages - 3) {
        threePages.push(pageNavButton);
      } else if (i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
        threePages.push(pageNavButton);
      }
    }

    return threePages;
  };

  return (
    <div className="page-nav-container">

      <ButtonStandard
        name="Назад"
        clickHandler={function () {
          pageBack()
        }}
        isDisabled={currentPage === 1}
        className="pageNavComponentBack"
      />

      {showFirstPage()}
      {renderPageButtons()}
      {showLastPage()}

      <ButtonStandard
        name="Вперед"
        clickHandler={function () {
          pageForward()
        }}
        isDisabled={currentPage === totalPages}
        className="pageNavComponentForward"
      />
    </div>
  );
}

export default PageNavComponent;
