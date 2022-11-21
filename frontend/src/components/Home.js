
import React, { Fragment, useEffect,useState } from  "react";
import {MetaData} from "./layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getItems } from "../actions/ItemsActions";
import { Link, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'

export const Home = () => {
    const params = useParams();
    const keyword = params.keyword;
    const [currentPage,setCurrentPage] = useState(1)
    const [price,setPrice] = useState([1000,100000000])
    const { loading, items, error,resPerPage,itemsCount} = useSelector( state => state.items)
    const alert = useAlert();
    const dispatch = useDispatch();
    useEffect(() => {
        if (error){
            return alert.error(error)
        }
        dispatch(getItems(currentPage,keyword,price));
    },[dispatch,error,alert,currentPage,keyword,price])
    function setCurrentPageNo(pageNumber){
        setCurrentPage(pageNumber)
    }
    return (
        <Fragment>
            {loading ? <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i> :(
            <Fragment>
                    <MetaData title="Your Virtual Shop"></MetaData>
                    <h1 id="Header_items">New items</h1>
                    <section id="items" className='container mt-5'>
                        <div className='row'>
                            <Slider
                            range
                            className="t-slider"
                            marks={{
                                1000:`$1000`,
                                100000000:`$100000000`
                            }}
                            min={1000}
                            max={100000000}
                            defaultValue={[1000,100000000]}
                            tipFormatter = {value => `$${value}`}
                            tipProps={{
                                placement: 'top',
                                prefixCls: 'rc-slider-tooltip',
                                visible: true
                            }}
                            value={price}
                            onChange={price => setPrice(price)}>
                            </Slider>
                            {items && items.map (item => (
                                <div key={item._id} className='col-sm-12 col-md-6 col-lg-3 my-3'>
                                    <div className='card p-3 rounded'>
                                    <Link to = {`/items/${item._id}`}><img className='card-img-top mx-auto' src={item.image[0].url} alt={item.image[0].public_id}></img></Link>
                                        <div className='card-body d-flex flex-column'>
                                            <h5 id="title_item"><Link to={`/items/${item._id}`}>{item.name}</Link></h5>
                                        <div className='rating mt-auto'>
                                            <div className='rating-outer'>
                                                <div className='rating-inner' style={{width: `${(item.qualification/5)*100}%`}}></div>
                                            </div>
                                            <span id="qualifications"> {item.qualificationsNumber} Reviews</span>
                                        </div>
                                        <p className='card-text'>${item.price}</p><Link to={`/items/${item._id}`} id="view_btn" className='btn btn-block'>
                                            View Details
                                        </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                    <div className='d-flex justify-content-center mt-5' id ="pagination" >
                        <Pagination 
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={itemsCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Previous'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                        />

                    </div>
            </Fragment>
            )}
        </Fragment>
    )
}
export default Home;