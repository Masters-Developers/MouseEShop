import React, { Fragment, useState, useEffect } from 'react'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getItemsReviews, deleteReview, fixErrors } from '../../actions/ItemsActions'
import { DELETE_REVIEW_RESET } from '../../constants/itemsConstants'

const ItemReviews = () => {

    const [itemId, setItemId] = useState('')

    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, opinions} = useSelector(state => state.itemReviews);
    const { isDeleted, error: deleteError } = useSelector(state => state.review)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(fixErrors())
        }

        if (deleteError) {
            alert.error(deleteError);
            dispatch(fixErrors())
        }

        if (itemId !== '') {
            dispatch(getItemsReviews(itemId))
        }

        if (isDeleted) {
            alert.success('Deleted Review Correctly');
            dispatch({ type: DELETE_REVIEW_RESET })
        }



    }, [dispatch, alert, error, itemId, isDeleted, deleteError])

    const deleteReviewHandler = (id) => {
        dispatch(deleteReview(itemId, id))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(getItemsReviews(itemId))
    }

    const setReviews = () => {
        const data = {
            columns: [
                {
                    label: 'Rating',
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: 'Comment',
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: 'User',
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        opinions.forEach(opinion => {
            data.rows.push({
                rating: opinion.rating,
                comment: opinion.comment,
                user: opinion.clientName,

                actions:
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteReviewHandler(opinion._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
            })
        })

        return data;
    }

    return (
        <Fragment>
            <MetaData title={'Items Opinions'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <div className="row justify-content-center mt-5">
                            <div className="col-5">
                                <form onSubmit={submitHandler}>
                                    <div className="form-group">
                                        <label htmlFor="itemId_field">Please Input The Item's Id'</label>
                                        <input
                                            type="text"
                                            id="itemId_field"
                                            className="form-control"
                                            value={itemId}
                                            onChange={(e) => setItemId(e.target.value)}
                                        />
                                    </div>

                                    <button
                                        id="search_button"
                                        type="submit"
                                        className="btn btn-primary btn-block py-2"
                                    >
                                        Search
                                    </button>
                                </ form>
                            </div>

                        </div>

                        {opinions&& opinions.length > 0 ? (
                            <MDBDataTable
                                data={setReviews()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        ) : (
                            <p className="mt-5 text-center"></p>
                        )}


                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default ItemReviews