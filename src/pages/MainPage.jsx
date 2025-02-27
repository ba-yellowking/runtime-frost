import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
import FilterSection from "../components/filterSection/FilterSection.jsx"
import ProductsGrid from "../components/productsGrid/ProductsGrid.jsx"
import PageNavigation from "../components/pageNavigation/PageNavigation.jsx"
import { useState } from "react"
import UserProfile from "./UserProfile.jsx"
import { useDispatch } from "react-redux"
import { setCurrentPage } from "../slices/filterSlice.jsx"

function MainPage() {
  const dispatch = useDispatch()

  // <PageNavigation/> – current and total pages
  const onPageChange = function (pageNumber) {
    dispatch(setCurrentPage(pageNumber))
  }

  // State for profile
  const [isProfilePage, setIsProfilePage] = useState(undefined)

  return (
    <div className={`main-page dark:bg-[#393939]`}>
      {isProfilePage ? (
        <UserProfile />
      ) : (
        <>
          <Header />

          <div className="products">
            <FilterSection />
            <ProductsGrid />
            <PageNavigation onPageChange={onPageChange} />
          </div>

          <Footer />
        </>
      )}
    </div>
  )
}

export default MainPage
