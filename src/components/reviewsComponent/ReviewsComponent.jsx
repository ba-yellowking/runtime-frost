import "./ReviewsComponent.css";
import {AuthContext} from "../../contexts/AuthContextProvider.jsx";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import ButtonStandard from "../../ui/buttonStandard/ButtonStandard.jsx";


function ReviewsComponent({ reviewData, productId, updateReviews }) {


  const [user, , , , ,] = useContext(AuthContext);

  const [existingFeedback, setExistingFeedBack] = useState(false);

  const [newReview, setNewReview] = useState();


  // Проверка на то, был ли оставлен отзыв на товар с заданным Id
  useEffect(function() {
    isExistedFeedback()
  }, [productId, existingFeedback])


  // Отзывы пользователей
  const renderReviewData = function() {

    return reviewData.map(function(reviewItem, index) {

      return (
        <div key={index} className="review-item">

          <div className="review-item-name">
            <b>{`${reviewItem.user.firstName} ${reviewItem.user.lastName}`}</b>
          </div>

          <div className="review-item-feedback">
            {reviewItem.review}
          </div>

        </div>
      );
    });
  };


  // Запрос на установку состояния, отправлял ли пользователь отзыв на товар с конкретным id
  // Если отправлял – true, если не отправлял – false

  const isExistedFeedback = function() {
    axios
      .get(`https://frost.runtime.kz/api/reviews/exists?productId=${productId}`)

      .then(function(response) {
        setExistingFeedBack(response.data);
      })

      .catch(function(error) {
        console.log(error);
      });
  }


  const handleNewReview = function(event) {
    setNewReview(event.target.value);
  }


  // Запрос на добавление нового отзыва
  const addNewFeedback = function() {

    console.log("Product ID:", productId);
    console.log("New Review:", newReview);

    axios
      .post("https://frost.runtime.kz/api/reviews", {
        product_id: productId,
        review: newReview
      })

      .then(function() {
        setExistingFeedBack(true);
        updateReviews();
      })

      .catch(function(error) {
        console.log(error)
      });
  }


  return (

    <>
      {existingFeedback === false ? (

        <div className="reviews-wrap">

          {user ? (
            <>
              <div className="reviews-top">

                <div className="reviews-divider">Напишите свой отзыв</div>

                <textarea
                  className="reviews-input"
                  rows="2"
                  cols="50"
                  placeholder="Введите комментарий"
                  onChange={handleNewReview}
                  maxLength="250"
                />

                <ButtonStandard
                  name="Добавить"
                  style={{width: "150px"}}
                  clickHandler={addNewFeedback}
                />

              </div>
            </>

          ) : (

            <>
              {`Чтобы оставить отзыв, `}
              <span
                className="reviews-sign-in"
                // onClick
              >
                {`войдите на сайт.`}
              </span>
            </>
          )}

          <div className="reviews-bottom">
            <div className="reviews-divider">Последние отзывы</div>
            {renderReviewData()}
          </div>

        </div>

      ) : (

        <>
          <div className="existing-review">
            <span>Вы уже оставили отзыв на данный товар.</span>
          </div>

          <div className="reviews-bottom">
            <div className="reviews-divider">Последние отзывы</div>
            {renderReviewData()}
          </div>
        </>

      )}
    </>
  );
}


export default ReviewsComponent;