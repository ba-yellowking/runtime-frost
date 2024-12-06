import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import FilterSection from "../components/filterSection/FilterSection.jsx";
import ProductsGrid from "../components/productsGrid/ProductsGrid.jsx";
import PageNavigation from "../components/pageNavigation/PageNavigation.jsx";
import {useState } from 'react';
import UserProfile from "../components/userProfile/UserProfile.jsx";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../slices/filterSlice.jsx";
import Banner from "../ui/banner/Banner.jsx";

function MainPage() {

  const dispatch = useDispatch();

  // <PageNavigation/> – current and total pages
  const onPageChange = function(pageNumber) {
    dispatch(setCurrentPage(pageNumber));
  }

  // State for profile
  const [isProfilePage, setIsProfilePage] = useState(false);

  // Для <Header/>
  function openProfilePage() {
    setIsProfilePage(true);
  }

  return (
    <div className="main-page-container">
      {isProfilePage ? (
        <UserProfile/>
      ) : (
        <>
          <Header
            openProfilePage={openProfilePage}
          />

          <Banner/>

          <div className="products-container">
            <FilterSection/>
            <ProductsGrid/>
            <PageNavigation
              onPageChange={onPageChange}
            />
          </div>
          <Footer/>
        </>
      )}
    </div>
  )
}

export default MainPage;