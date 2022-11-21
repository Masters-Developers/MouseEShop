import React, { Fragment, useEffect, useState } from 'react'
import {MetaData} from "../layouts/MetaData"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-bootstrap'
import { useAlert} from 'react-alert'
import {getItemDetails,newReview, fixErrors } from '../../actions/ItemsActions'
import { addItemToCart } from '../../actions/cartActions'
import ListReviews from '../order/ListReviews'
import { NEW_REVIEW_RESET } from '../../constants/itemsConstants'
export const ItemDetails = () => {
  const params= useParams();
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, item } = useSelector(state => state.itemDetails)
  const { user } = useSelector(state => state.auth)
  const { error: reviewError, success } = useSelector(state => state.newReview)

  useEffect(() => {
      dispatch(getItemDetails(params.id))

      if (error) {
          alert.error(error);
          dispatch(fixErrors())
      }

      if (reviewError) {
          alert.error(reviewError);
          dispatch(fixErrors())
      }

      if (success) {
          alert.success('Opinion registrada correctamente')
          dispatch({ type: NEW_REVIEW_RESET })
      }

  }, [dispatch, alert, error, reviewError, params.id, success])

const increaseQty = () => {
  const counter = document.querySelector('.count')

  if (counter.valueAsNumber >= item.stock) return;

  const qty = counter.valueAsNumber + 1;
  setQuantity(qty)
}

const decreaseQty = () => {
  const counter = document.querySelector('.count')

  if (counter.valueAsNumber <= 1) return;

  const qty = counter.valueAsNumber - 1;
  setQuantity(qty)
}

const addToCart = () => {
  dispatch(addItemToCart(params.id, quantity));
  alert.success('Item Added to cart')
}

function setUserRatings() {
  const stars = document.querySelectorAll('.star');

  stars.forEach((star, index) => {
    star.starValue = index + 1;

    ['click', 'mouseover', 'mouseout'].forEach(function (e) {
      star.addEventListener(e, showRatings);
    })
  })

  function showRatings(e) {
    stars.forEach((star, index) => {
      if (e.type === 'click') {
        if (index < this.starValue) {
          star.classList.add('orange');

          setRating(this.starValue)
        } else {
          star.classList.remove('orange')
        }
      }

      if (e.type === 'mouseover') {
        if (index < this.starValue) {
          star.classList.add('yellow');
        } else {
          star.classList.remove('yellow')
        }
      }

      if (e.type === 'mouseout') {
        star.classList.remove('yellow')
      }
    })
  }
}
const reviewHandler = () => {
  const formData = new FormData();

  formData.set('rating', rating);
  formData.set('comment', comment);
  formData.set('itemId', params.id);

  dispatch(newReview(formData));
}


return (
  <Fragment>
    {loading ? <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
      <Fragment>
        <MetaData title={item.name}></MetaData>
        <div className='row d-flex justify-content-around'>
          <div className='col-12 col-lg-5 img-fluid' id="image_item">
            <Carousel pause='hover'>
              {item.image && item.image.map(img => (
                <Carousel.Item key={img.public_id}>
                  <img className="d-block w-100" src={img.url} alt={item.name}></img>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className='col-12 col-lg-5 mt-5'>
            <h3>{item.name}</h3>
            <p id="item_id">Item's Id {item._id}</p>
            <hr />

            <div className='rating-outer'>
              <div className="rating-inner" style={{ width: `${(item.qualification / 5) * 100}%` }}></div>
            </div>
            <span id="No_de_reviews">  ({item.qualificationsNumber} Reviews)</span>
            <hr />
            <p id="price_item">${item.price}</p>
            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
              <input type="number" className="form-control count d-inline" value={quantity} readOnly />
              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>
            <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" disabled={item.stock=== 0} onClick={addToCart}>Agregar al Carrito</button>
            <hr />
            <p>Estado: <span id="stock_stado" className={item.stock> 0 ? 'greenColor' : 'redColor'}>{item.stock> 0 ? "In Stock " : "Finished"}</span></p>
            <hr />
            <hr />
              <p id="category">Category: <strong>{item.category}</strong></p>
             <hr />
            <h4 className="mt-2">Description:</h4>
            <p>{item.description}</p>
            <hr />
            <p id="seller">Vendido por: <strong>{item.seller}</strong></p>

            {user ?
              <button id="btn_review" type="button" className="btn btn-primary mt-4"
                data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>Leave Your Opinion</button>
              :
              <div className="alert alert-danger mt-5" type="alert">Log In First to leave an opinion</div>
            }

            {/*Mensaje emergente para dejar opinion y calificacion*/}
            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div className="modal fade" id="ratingModal" tabIndex="-1" role="dialog"
                  aria-labelledby='ratingModalLabel' aria-hidden="true">
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">Send Review</h5>
                        <button type="button" className='close' data-dismiss="modal" aria-label='Close'>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star"><i className="fa fa-star"></i></li>
                          <li className="star"><i className="fa fa-star"></i></li>
                          <li className="star"><i className="fa fa-star"></i></li>
                          <li className="star"><i className="fa fa-star"></i></li>
                          <li className="star"><i className="fa fa-star"></i></li>
                        </ul>

                        <textarea name="review" 
                        id="review" 
                        className="form-control mt3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        <button className="btn my-3 float-right review-btn px-4 text-white"
                          onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Send</button>

                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {item.opinions && item.opinions.length > 0 && (
                      <ListReviews opinions={item.opinions} />
                  )}
      </Fragment>
    )}
  </Fragment>

)
}
export default ItemDetails;