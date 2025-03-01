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
          <div className="spinner-container__wrap">
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
                          <svg className="logo_available" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M11 13v3q0 .425.288.713T12 17t.713-.288T13 16v-3h3q.425 0 .713-.288T17 12t-.288-.712T16 11h-3V8q0-.425-.288-.712T12 7t-.712.288T11 8v3H8q-.425 0-.712.288T7 12t.288.713T8 13zm1 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"/></svg>                          <span>{t("productDetailsAvailable")}</span>
                        </>
                      ) : (
                        <>
                          <svg className="logo_available" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><circle cx="12" cy="11.999" r="9"/><path d="M9 12h6"/></g></svg>
                          <span>{t("productDetailsNotAvailable")}</span>
                        </>
                      )}
                    </div>

                    <ButtonStandard
                      name={productCardData.available === 1 ? t("buyButton") : t("notAvailableButton")}
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
