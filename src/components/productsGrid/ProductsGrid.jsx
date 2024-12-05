import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../ui/productCard/ProductCard.jsx";
import "./ProductsGrid.css";
import Spinner from "../../ui/spinner/Spinner.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "../../slices/loadingSlice.jsx";
import {setTotalPages} from "../../slices/filterSlice.jsx";

function ProductsGrid() {

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const selectedBrandId = useSelector(state => state.filter.selectedBrand);
  const selectedModelId = useSelector(state => state.filter.selectedModel);
  const selectedGenerationId = useSelector(state => state.filter.selectedGeneration);
  const available = useSelector(state => state.filter.available);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const [products, setProducts] = useState([]);

  useEffect(function() {
    dispatch(setLoading(true));
    axios
      .get(`https://frost.runtime.kz/api/products`, {
      params: {
        page: currentPage,
        size: 9,
        brandId: selectedBrandId,
        modelId: selectedModelId,
        generationId: selectedGenerationId,
        available: available,
      }
    })

      .then(response => {
        setProducts(response.data.items);
        dispatch(setTotalPages(response.data.totalPages));
        dispatch(setLoading(false));
    })

      .catch(function(error) {
        console.error(error);
        dispatch(setLoading(false));
      })
  }, [currentPage, selectedBrandId, selectedModelId, selectedGenerationId, available, dispatch]);

  return (
    <>
      {isLoading ? (
        <div className="products-component-container">
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner/>
            </div>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="products-component-container">
          <div className="products-component-wrapper">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-products">
          <p>Товары по заданным параметрам отсутствуют</p>
        </div>
      )}
    </>
  );
}

export default ProductsGrid;
