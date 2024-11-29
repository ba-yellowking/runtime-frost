import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import FilterSection from "../components/filterSection/FilterSection.jsx";
import ProductsComponent from "../components/productsComponent/ProductsComponent.jsx";
import PageNavComponent from "../components/pageNav/PageNavComponent.jsx";
import {useState } from 'react';
import ProfileComponent from "../components/profileComponent/ProfileComponent.jsx";
import {useDispatch} from "react-redux";
import {setCurrentPage} from "../slices/filterSlice.jsx";
import TypedJS from "../components/typed/TypedJS.jsx";

function MainPage() {

  const dispatch = useDispatch();

  // <PageNavComponent/> – current and total pages
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
        <ProfileComponent/>
      ) : (
        <>
          <Header
            openProfilePage={openProfilePage}
          />

          {/*<TypedJS/>*/}

          <div className="products-container">
            <FilterSection/>
            <ProductsComponent/>
            <PageNavComponent
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