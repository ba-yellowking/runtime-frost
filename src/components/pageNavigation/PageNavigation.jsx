import "./PageNavigation.css"
import PageNavButton from "../../ui/pageNavButton/PageNavButton.jsx"
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentPage } from "../../slices/filterSlice.jsx"

function PageNavigation() {
  // totalPages - общее количество страниц из ProductsGrid
  // onPageChange - функция, передаваемая в PageNavButton
  // currentPage - текущая страница

  const dispatch = useDispatch()

  const onPageChange = function (pageNumber) {
    dispatch(setCurrentPage(pageNumber))
  }

  const currentPage = useSelector((state) => state.filter.currentPage)
  const totalPages = useSelector((state) => state.filter.totalPages)

  const pageForward = function () {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const pageBack = function () {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const firstPage = function () {
    return currentPage > 3 ? (
      <div className="pageNavIndent">
        <PageNavButton
          isActive={currentPage === 1}
          index={1}
          clickHandler={function () {
            onPageChange(1)
          }}
        />
        <div className="pageNavEllipsis">...</div>
      </div>
    ) : (
      <PageNavButton
        isActive={currentPage === 1}
        index={1}
        clickHandler={function () {
          onPageChange(1)
        }}
      />
    )
  }

  const lastPage = function () {
    if (totalPages !== 1) {
      return currentPage < totalPages - 2 ? (
        <div className="pageNavIndent">
          <div className="pageNavEllipsis">...</div>
          <PageNavButton
            isActive={currentPage === totalPages}
            index={totalPages}
            clickHandler={function () {
              onPageChange(totalPages)
            }}
          />
        </div>
      ) : (
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

  const threePages = []

  // Перебор всех кнопок в навигации
  const renderPageButtons = function () {
    for (let i = 2; i <= totalPages - 1; i++) {
      const pageNavButton = (
        <PageNavButton
          isActive={i === currentPage}
          key={i}
          index={i}
          clickHandler={function () {
            onPageChange(i)
          }}
        />
      )

      if ((currentPage <= 3 && i <= 4) || (currentPage >= totalPages - 2 && i >= totalPages - 3)) {
        threePages.push(pageNavButton)
      } else if (i === currentPage || i === currentPage - 1 || i === currentPage + 1) {
        threePages.push(pageNavButton)
      }
    }

    return threePages
  }

  return (
    <div className="page-nav-container">
      {totalPages > 0 && (
        <>
          <ButtonStandard
            name="Назад"
            clickHandler={function () {
              pageBack()
            }}
            isDisabled={currentPage === 1}
            className="pageNavComponentBack"
          />

          {firstPage()}
          {renderPageButtons()}
          {lastPage()}

          <ButtonStandard
            name="Вперед"
            clickHandler={function () {
              pageForward()
            }}
            isDisabled={currentPage === totalPages}
            className="pageNavComponentForward"
          />
        </>
      )}
    </div>
  )
}

export default PageNavigation
