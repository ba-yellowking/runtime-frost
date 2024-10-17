import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import FilterSection from "../components/filterSection/FilterSection.jsx";
import ProductsComponent from "../components/productsComponent/ProductsComponent.jsx";
import PageNavComponent from "../components/pageNav/PageNavComponent.jsx";
import {useState } from 'react';
import ProfileComponent from "../components/profileComponent/ProfileComponent.jsx";
import {useSelector} from "react-redux";

function MainPage() {

  const totalCount = useSelector((state) => state.counter.counter);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [currentBrandId, setCurrentBrandId] = useState(null);
  const [currentModelId, setCurrentModelId] = useState(null);
  const [currentGenerationId, setCurrentGenerationId] = useState(null);

  const [currentAvailableId, setCurrentAvailableId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  // <PageNavComponent/> – current and total pages
  const onPageChange = function(pageNumber) {
    setCurrentPage(pageNumber);
  }

  // Для связи между компонентами необходим родительский компонент
  // Поэтому информация приходит сначала из FilterSection в MainPage, а затем из MainPage в ProductsComponents
  const brandId = function(brandId) {
    setCurrentBrandId(brandId)
    setCurrentModelId(null);
    setCurrentGenerationId(null);
    setIsChecked(false);
    setCurrentAvailableId(0);
    setCurrentPage(1);
  }

  const modelId = function(modelId) {
    setCurrentModelId(modelId);
    setCurrentGenerationId(null);
    setIsChecked(false);
    setCurrentAvailableId(0);
    setCurrentPage(1);
  }

  const generationId = function(generationId) {
    setCurrentGenerationId(generationId);
    setIsChecked(false);
    setCurrentAvailableId(0);
    setCurrentPage(1);
  }

  // Обработчик чекбокса. 0 - показать все товары, 1 - показать товары в наличии
  const availableBoolean = function(availableBoolean) {
    if (availableBoolean === true) {
      setCurrentAvailableId(1);
      setCurrentPage(1);
    } else {
      setCurrentAvailableId(0);
      setCurrentPage(1);
    }
  }

  // Состояние для открытия личного кабинета
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
            totalCount={totalCount}
          />

          <div className="products-container">
            <FilterSection
              currentBrandId={brandId}
              currentModelId={modelId}
              currentGenerationId={generationId}
              currentAvailableBoolean={availableBoolean}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
            />

            <ProductsComponent
              currentPage={currentPage}
              setTotalPages={setTotalPages}
              currentBrandId={currentBrandId}
              currentModelId={currentModelId}
              currentGenerationId={currentGenerationId}
              currentAvailableId={currentAvailableId}
            />

            <PageNavComponent
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              // isLoading={isLoading}
            />
          </div>

          <Footer/>
        </>
      )}
    </div>
  )
}

export default MainPage;