import Header from "../components/header/Header.jsx"
import Footer from "../components/footer/Footer.jsx"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import ProductDetails from "../components/productDetails/ProductDetails.jsx"
import { useDispatch, useSelector } from "react-redux"
import { setLoading } from "../slices/loadingSlice.jsx"

function ProductCardPage() {
  const params = useParams()

  const [productCardData, setProductCardData] = useState([])

  const [reviews, setReviews] = useState([])

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.loading.isLoading)

  // Запрос на получение сетки товаров
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        dispatch(setLoading(true))
        const response = await axios.get(`https://frost.runtime.kz/api/products/${params.productId}`)

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
        }

        setProductCardData(productData)

        dispatch(setLoading(false))
      } catch (error) {
        console.error(error)
      }
    }
    fetchProductData()
  }, [dispatch])

  // Запрос на получение отзывов
  const updateReviews = function () {
    axios
      .get(`https://frost.runtime.kz/api/reviews?productId=${params.productId}`)
      .then(function (response) {
        setReviews(response.data)
      })
      .catch((error) => console.error(error))
  }

  useEffect(function () {
    updateReviews()
  }, [])

  return (
    <div className="main-page">
      <Header />

      <div className="product-card dark:bg-[#393939]">
        <ProductDetails
          productCardData={productCardData}
          reviewData={reviews}
          updateReviews={updateReviews}
          isLoading={isLoading}
        />
      </div>

      <Footer />
    </div>
  )
}

export default ProductCardPage
