import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import MetaData from '../layouts/MetaData'
import Sidebar from './Sidebar'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { allOrders, deleteOrder, fixErrors } from '../../actions/orderActions'
import { DELETE_ORDER_RESET } from '../../constants/ordersConstants'

const OrdersList = () => {
    const navigate= useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, orders } = useSelector(state => state.allOrders);
    const { isDeleted } = useSelector(state => state.order)

    useEffect(() => {
        dispatch(allOrders());

        if (error) {
            alert.error(error);
            dispatch(fixErrors())
        }

        if (isDeleted) {
            alert.success('Deleted Order Successfuly');
            navigate('/management/orders');
            dispatch({ type: DELETE_ORDER_RESET })
        }

    }, [dispatch, alert, error, isDeleted,navigate])


    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    sort: 'asc'
                },
                {
                    label: 'No. Order',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: '# Items',
                    field: 'itemsAmount',
                    sort: 'asc'
                },
                {
                    label: 'Total Value',
                    field: 'totalPrice',
                    sort: 'asc'
                },
                {
                    label: 'State',
                    field: 'orderState',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        orders.forEach(order => {
            var date= new Date(order.creationDate).toLocaleDateString()
            data.rows.push({
                date: date,
                id: order._id,
                itemsAmount: order.items.length,
                totalPirce: `$${order.totalPrice}`,
                state: order.orderState && String(order.orderState).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderState}</p>
                    : <p style={{ color: 'red' }}>{order.orderState}</p>,
                acciones: <Fragment>
                    <Link to={`/management/order/${order._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-eye"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteOrderHandler(order._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }


    return (
        <Fragment>
            <MetaData title={'All Orders'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">All Orders</h1>

                        {loading ? <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                            <MDBDataTable
                                data={setOrders()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}

                    </Fragment>
                </div>
            </div>

        </Fragment>
    )
}

export default OrdersList