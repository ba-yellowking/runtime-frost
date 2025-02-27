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
    <div className="product-details dark:border-[#252525] dark:bg-[#252525]">
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
              <div className="product-details__header dark:bg-[#252525]">
                <div className="product-details__image-container">
                  <div className="product-details__image dark:bg-[#252525]">
                    <img className="engine" src={engine} alt="image" />
                  </div>
                </div>

                <div className="product-details__info">
                  <div className="product-details__name">
                    <b>{productCardData.name}</b>
                  </div>

                  <div className="product-details__code dark:text-white">
                    <span>
                      <b>{t("productDetailsItemNumber")}</b>
                    </span>{" "}
                    {productCardData.code}
                  </div>

                  <div className="product-details__manufacturer dark:text-white">
                    <span>
                      <b>{t("productDetailsProducer")}</b>
                    </span>{" "}
                    {productCardData.manufacturer}
                  </div>

                  <div className="product-details__description dark:text-white">
                    <span>
                      <b>{t("productDetailsDescription")}</b>
                    </span>{" "}
                    {productCardData.description}
                  </div>
                </div>

                <div className="product-details__additional dark:bg-[#252525]">
                  <div className="product-details__wrapper dark:bg-[#393939]">
                    <div className="product_details__price">
                      <b>
                        {typeof productCardData.price === "number" &&
                          `${productCardData.price.toLocaleString("ru-RU")} ₸`}
                      </b>
                    </div>

                    <div className="product-details__availability">
                      {productCardData.available ? (
                        <>
                          <img src="/src/images/plus.png" className="logo_available" alt="available" />
                          <span>{t("productDetailsAvailable")}</span>
                        </>
                      ) : (
                        <>
                          <img src="/src/images/minus.png" className="logo_available" alt="not available" />
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

              <div className="product-details__bottom">
                <div className="product-details__review">
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
            <div className="product-details">
              <div className="product-details__error">
                <p className="product-details__error-message">{t("productDetails404")}</p>
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
