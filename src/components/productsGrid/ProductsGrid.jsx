import React, { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../../ui/productCard/ProductCard.jsx"
import "./ProductsGrid.css"
import Spinner from "../../ui/spinner/Spinner.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../../slices/loadingSlice.jsx"
import { setTotalPages } from "../../slices/filterSlice.jsx"

function ProductsGrid() {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)
  const selectedBrandId = useSelector((state) => state.filter.selectedBrand)
  const selectedModelId = useSelector((state) => state.filter.selectedModel)
  const selectedGenerationId = useSelector((state) => state.filter.selectedGeneration)
  const available = useSelector((state) => state.filter.available)
  const currentPage = useSelector((state) => state.filter.currentPage)
  const [products, setProducts] = useState([])
  const [isInitialLoad, setIsInitialLoad] = useState(true) // Для отслеживания первой загрузки

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(setLoading(true))
      setIsInitialLoad(true) // Начинаем загрузку
      try {
        const response = await axios.get(`https://frost.runtime.kz/api/products`, {
          params: {
            page: currentPage,
            size: 9,
            brandId: selectedBrandId,
            modelId: selectedModelId,
            generationId: selectedGenerationId,
            available: available,
          },
        })

        setProducts(response.data.items)
        dispatch(setTotalPages(response.data.totalPages))
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setLoading(false))
        setIsInitialLoad(false) // Завершаем загрузку
      }
    }

    fetchProducts()
  }, [currentPage, selectedBrandId, selectedModelId, selectedGenerationId, available, dispatch])

  return (
    <>
      {isLoading || isInitialLoad ? ( // Условие для отображения спиннера
        <div className="products-component-container">
          <div className="spinner-container">
            <div className="spinner-wrapper">
              <Spinner />
            </div>
          </div>
        </div>
      ) : products.length > 0 ? (
        <div className="products-component-container">
          <div className="products-component-wrapper">
            {products.map((product) => (
              <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} />
            ))}
          </div>
        </div>
      ) : (
        <div className="empty-products">
          <p>No items available</p>
        </div>
      )}
    </>
  )
}

export default ProductsGrid
