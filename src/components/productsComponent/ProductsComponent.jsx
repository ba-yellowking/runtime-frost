import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../ui/productCard/ProductCard.jsx";
import "./ProductsComponent.css";
import Spinner from "../../ui/spinner/Spinner.jsx";

function ProductsComponent(
  { currentPage,
    setTotalPages,
    currentBrandId,
    currentModelId,
    currentGenerationId,
    currentAvailableId,
    isLoading,
    setIsLoading
  }) {


  const [products, setProducts] = useState([]);


  useEffect(function() {
    setIsLoading(true);
    axios

      .get(`https://frost.runtime.kz/api/products`, {
      params: {
        page: currentPage,
        size: 9,
        brandId: currentBrandId,
        modelId: currentModelId,
        generationId: currentGenerationId,
        available: currentAvailableId,
      }
    })

      .then(response => {
        console.log(response)
        setProducts(response.data.items);
        setTotalPages(response.data.totalPages);
        setIsLoading(false);
    })

      .catch(function(error) {
        console.log(error);
        setIsLoading(false);
      })
  }, [currentPage, setTotalPages, currentBrandId, currentModelId, currentGenerationId, currentAvailableId]);


  return (
    <>
      {isLoading ? (
        <div className="products-component-center-spinner">
          <Spinner/>
        </div>
      ) : (
        <div className="products-component-container">
          <div className="products-component-wrapper">
            {products.length > 0 ? (
              products.map(function(product) {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    available={currentAvailableId}
                  />
                );
              })
            ) : (
              <div className="empty-products"></div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


export default ProductsComponent;
