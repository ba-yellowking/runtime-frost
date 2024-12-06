import React from "react";
import ButtonStandard from "../buttonStandard/ButtonStandard.jsx";
import useModal from "../../hooks/useModal.jsx";
import AddProductModal from "../../components/modals/addProductModal/AddProductModal.jsx";
import "./ProductCard.css";
import {useNavigate} from "react-router-dom";
import engine from "../../images/engine.png";
import engine1 from "../../images/engine1.png";
import engine2 from "../../images/engine2.png";
import engine3 from "../../images/engine3.png";
import engine4 from "../../images/engine4.png";

function ProductCard({ id, name, price }) {

  const [isOpenProductInCartModal, openProductInCartModal, closeProductInCartModal] = useModal();

  const handleClick = () => {
    openProductInCartModal();
  };

  const navigate = useNavigate();
  function productCard() {
    return navigate(`/products/${id}`);
  }

  const imagesArr = {
    0: engine,
    1: engine1,
    2: engine2,
    3: engine3,
    4: engine4,
  }

  const productImage = imagesArr[id] || engine;

  return (
    <div className="product-container">
      <div className="product-wrapper">
        <div className="product-image">
          <img className="engine-image" src={productImage} alt={name}/>
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
        </div>
      </div>

      <AddProductModal
        isOpen={isOpenProductInCartModal}
        close={closeProductInCartModal}
        newProductName={name}
        newProductPrice={price}
        newProductId={id}
      />
    </div>
  );
}

export default ProductCard;
