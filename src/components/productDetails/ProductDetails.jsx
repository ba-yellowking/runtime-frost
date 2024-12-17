import React, { useEffect, useState } from "react"
import useModal from "../../hooks/useModal.jsx"
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx"
import Reviews from "../reviews/Reviews.jsx"
import AddProductModal from "../modals/addProductModal/AddProductModal.jsx"
import "./ProductDetails.css"
import Spinner from "../../ui/spinner/Spinner.jsx"
import { useNavigate } from "react-router-dom"
import engine from "./../../images/engine.png"

// Карточка продукта по его ID http://localhost:5173/products/1

function ProductDetails({ productCardData, reviewData, updateReviews, isLoading }) {
  // Объявляем хуки в начале компонента
  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal()
  const [currentProductId, setCurrentProductId] = useState(null)
  const [currentProductName, setCurrentProductName] = useState(null)
  const [currentProductPrice, setCurrentProductPrice] = useState(null)

  function handleClick() {
    setCurrentProductId(productCardData.id)
    setCurrentProductName(productCardData.name)
    setCurrentProductPrice(productCardData.price)
    openProductInCartModal()
  }

  const navigate = useNavigate()
  useEffect(() => {
    if (!productCardData.id) {
      const timer = setTimeout(() => {
        navigate("/")
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [productCardData.id, navigate])

  return (
    <div className="product-card-wrapper">
      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          {productCardData ? (
            <>
              <div className="top-product-card">
                <div className="image-product-card">
                  <div className="main-image-product-card">
                    <img className="engine-image" src={engine} alt="image" />
                  </div>
                </div>

                <div className="info-product-card">
                  <div className="name-product-card">
                    <b>{productCardData.name}</b>
                  </div>

                  <div className="code-product-card">
                    <span>
                      <b>Артикул:</b>
                    </span>{" "}
                    {productCardData.code}
                  </div>

                  <div className="manufacturer-product-card">
                    <span>
                      <b>Производитель:</b>
                    </span>{" "}
                    {productCardData.manufacturer}
                  </div>

                  <div className="description-product-card">
                    <span>
                      <b>Описание:</b>
                    </span>{" "}
                    {productCardData.description}
                  </div>
                </div>

                <div className="add-info-product-card">
                  <div className="add-info-product-card-wrap">
                    <div className="price-product-card">
                      <b>
                        {typeof productCardData.price === "number" &&
                          `${productCardData.price.toLocaleString("ru-RU")} ₸`}
                      </b>
                    </div>

                    <div className="available-product-card">
                      {productCardData.available ? (
                        <>
                          <img src="/src/images/plus.png" className="available-logo" alt="available" />
                          <span>В наличии</span>
                        </>
                      ) : (
                        <>
                          <img src="/src/images/minus.png" className="available-logo" alt="not available" />
                          <span>Нет в наличии</span>
                        </>
                      )}
                    </div>

                    <ButtonStandard
                      name="Купить"
                      clickHandler={handleClick}
                      isDisabled={!productCardData.available}
                      className="productCardComponent"
                    />
                  </div>
                </div>
              </div>

              <div className="bottom-product-card">
                <div className="review-product-card">
                  <Reviews reviewData={reviewData} productId={productCardData.id} updateReviews={updateReviews} />
                </div>
              </div>

              <AddProductModal
                isOpen={isOpenProductInCartModal}
                close={closeProductInCartModal}
                newProductName={currentProductName}
                newProductPrice={currentProductPrice}
                newProductId={currentProductId}
              />
            </>
          ) : (
            <div className="product-card-wrapper">
              <div className="error404">
                <p className="error404-text">This page does not exist. Returning to the home page.</p>
                <Spinner />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default ProductDetails
