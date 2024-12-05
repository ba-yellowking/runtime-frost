import React from "react";
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx";
import useModal from "../../hooks/useModal.jsx";
import AddProductModal from "../../components/modals/addProductModal/AddProductModal.jsx";
import "./ProductCard.css";
import {useNavigate} from "react-router-dom";

function ProductCard({ id, name, price }) {

  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal();

  const handleClick = () => {
    openProductInCartModal();
  };

  const navigate = useNavigate();
  function productCard() {
    return navigate(`/products/${id}`);
  }

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="product-image">
          {/*<p></p>*/}
        </div>

        <div
          className="product-name"
          onClick={productCard}
        >
          {name}
        </div>

        <div className="product-price-container">
          <div className="product-price">
            <b>{price.toLocaleString("ru-RU")} ₸</b>
          </div>

          <ButtonStandard
            name="Купить"
            clickHandler={handleClick}
          />

          <AddProductModal
            isOpen={isOpenProductInCartModal}
            close={closeProductInCartModal}
            newProductName={name}
            newProductPrice={price}
            newProductId={id}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
