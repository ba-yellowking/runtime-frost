import { useState } from "react";
import useModal from "../../hooks/useModal.jsx";
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx";
import ReviewsComponent from "../reviewsComponent/ReviewsComponent.jsx";
import ProductInCartModal from "../modals/ProductInCartModal.jsx";
import "./ProductCardComponent.css";
import Spinner from "../../ui/spinner/Spinner.jsx";

// Карточка продукта по его ID http://localhost:5173/products/1

function ProductCardComponent({ productCardData, reviewData, updateReviews }) {

  // Объявляем хуки в начале компонента
  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal();
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductName, setCurrentProductName] = useState(null);
  const [currentProductPrice, setCurrentProductPrice] = useState(null);

  function handleClick() {
    setCurrentProductId(productCardData.id);
    setCurrentProductName(productCardData.name);
    setCurrentProductPrice(productCardData.price);
    openProductInCartModal();
  }

  return (
    <>
      {productCardData.price ? (
        <div className="product-card-wrapper">
          <div className="top-product-card">
            <div className="image-product-card">
              <div className="main-image-product-card"></div>
            </div>

            <div className="info-product-card">

              <div className="name-product-card">
                <b>{productCardData.name}</b>
              </div>

              <div className="code-product-card">
                <span><b>Артикул:</b></span> {productCardData.code}
              </div>

              <div className="manufacturer-product-card">
                <span><b>Производитель:</b></span> {productCardData.manufacturer}
              </div>

              <div className="description-product-card">
                <span><b>Описание:</b></span> {productCardData.description}
              </div>
            </div>

            <div className="add-info-product-card">
              <div className="add-info-product-card-wrap">
                <div className="price-product-card">
                  <b>{`${productCardData.price.toLocaleString("ru-RU")} ₸`}</b>
                </div>

                <div className="available-product-card">
                  {productCardData.available ? (
                    <>
                      <img src="/src/images/plus.png" className="available-logo" alt="available"/>
                      <span>В наличии</span>
                    </>
                  ) : (
                    <>
                      <img src="/src/images/minus.png" className="available-logo" alt="not available"/>
                      <span>Нет в наличии</span>
                    </>
                  )}
                </div>

                <ButtonStandard
                  name="Купить"
                  clickHandler={handleClick}
                  isDisabled={!productCardData.available}
                  style={{margin: "10px"}}
                />
              </div>
            </div>
          </div>

          <div className="bottom-product-card">
            <div className="review-product-card">
              <ReviewsComponent
                reviewData={reviewData}
                productId={productCardData.id}
                updateReviews={updateReviews}
              />
            </div>
          </div>

          <ProductInCartModal
            isOpen={isOpenProductInCartModal}
            close={closeProductInCartModal}
            newProductName={currentProductName}
            newProductPrice={currentProductPrice}
            newProductId={currentProductId}
          />
        </div>
      ) : (
        <div className="product-card-wrapper">
          <div className="product-card-component-center-spinner">
            <Spinner/>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCardComponent;
