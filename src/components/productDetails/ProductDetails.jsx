import React, { useEffect, useState } from "react"
import useModal from "../../hooks/useModal.jsx"
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx"
import Reviews from "../reviews/Reviews.jsx"
import AddProductModal from "../modals/addProductModal/AddProductModal.jsx"
import "./ProductDetails.css"
import Spinner from "../../ui/spinner/Spinner.jsx"
import { useNavigate } from "react-router-dom"
import engine from "./../../images/engine.png"
import { useTranslation } from "../../hooks/useTranslation.jsx"

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

  // useTranslation.jsx
  const { t } = useTranslation()

  return (
    <div className="product-card-wrapper dark:border-[#252525] dark:bg-[#252525]">
      {isLoading ? (
        <div className="spinner-container dark:bg-[#252525]">
          <div className="spinner-wrapper">
            <Spinner />
          </div>
        </div>
      ) : (
        <>
          {productCardData ? (
            <>
              <div className="top-product-card dark:bg-[#252525]">
                <div className="image-product-card">
                  <div className="main-image-product-card dark:bg-[#252525]">
                    <img className="engine-image" src={engine} alt="image" />
                  </div>
                </div>

                <div className="info-product-card">
                  <div className="name-product-card">
                    <b>{productCardData.name}</b>
                  </div>

                  <div className="code-product-card dark:text-white">
                    <span>
                      <b>{t("productDetailsItemNumber")}</b>
                    </span>{" "}
                    {productCardData.code}
                  </div>

                  <div className="manufacturer-product-card dark:text-white">
                    <span>
                      <b>{t("productDetailsProducer")}</b>
                    </span>{" "}
                    {productCardData.manufacturer}
                  </div>

                  <div className="description-product-card dark:text-white">
                    <span>
                      <b>{t("productDetailsDescription")}</b>
                    </span>{" "}
                    {productCardData.description}
                  </div>
                </div>

                <div className="add-info-product-card dark:bg-[#252525]">
                  <div className="add-info-product-card-wrap dark:bg-[#393939]">
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
                          <span>{t("productDetailsAvailable")}</span>
                        </>
                      ) : (
                        <>
                          <img src="/src/images/minus.png" className="available-logo" alt="not available" />
                          <span>{t("productDetailsNotAvailable")}</span>
                        </>
                      )}
                    </div>

                    <ButtonStandard
                      name={t("buyButton")}
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
                <p className="error404-text">{t("productDetails404")}</p>
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
