import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import ProductCardComponent from "../components/productCardComponent/ProductCardComponent.jsx";

function ProductCardPage() {

  const params = useParams();

  const [productCardData, setProductCardData] = useState([]);

  const [reviews, setReviews] = useState([]);

  // Запрос на получение сетки товаров
  useEffect(function() {

    axios
      .get(`https://frost.runtime.kz/api/products/${params.productId}`)

      .then(function(response) {
        console.log(response.data.available,)
        const productData = {
          id: response.data.id,
          name: response.data.name,
          code: response.data.code,
          manufacturer: response.data.manufacturer,
          description: response.data.description,
          price: response.data.price,
          available: response.data.available,
          brand: response.data.brand.name,
          model: response.data.model.name,
          generation: response.data.generation.name,
        };
        setProductCardData(productData)
      })
  }, []);

  // Запрос на получение отзывов
  const updateReviews = function() {
    axios
      .get(`https://frost.runtime.kz/api/reviews?productId=${params.productId}`)
      .then(function(response) {
        setReviews(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(function() {
    updateReviews();
  }, []);

  return (

    <div className="main-page-container">
      <Header/>

      <div className="product-card-component">
        <ProductCardComponent
          productCardData={productCardData}
          reviewData={reviews}
          updateReviews={updateReviews}
        />
      </div>

      <Footer/>
    </div>
  )
}

export default ProductCardPage;