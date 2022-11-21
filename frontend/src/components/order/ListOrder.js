import React, { Fragment, useEffect } from 'react'
import MetaData from "../layouts/MetaData"
import { MDBDataTable } from "mdbreact"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { fixErrors, viewMyOrders } from '../../actions/orderActions'
import { Link } from "react-router-dom"

export const ListOrder = () => {
    const { loading, error, orders } = useSelector(state => state.myOrders)
    const alert = useAlert();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewMyOrders())

        if (error) {
            alert.error(error)
            dispatch(fixErrors())
        }
    }, [dispatch, alert, error])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Date",
                    field: "date",
                    sort: "asc"
                },
                {
                    label: "Order's Id",
                    field: "id",
                    sort: "asc"
                },
                {
                    label: "Item's Amount",
                    field: "itemsAmount",
                    sort: "asc"
                },
                {
                    label: "Cost",
                    field: "cost",
                    sort: "asc"
                },
                {
                    label: "State",
                    field: "state",
                    sort: "asc"
                },
                {
                    label: "Actions",
                    field: "actions",
                    sort: "asc"
                },
            ],
            rows: []
        }
        orders.forEach(order => {
            var date = new Date(order.creationDate).toLocaleDateString()
            data.rows.push({
                date: date,
                id: order._id,
                itemsAmount: order.items.length,
                cost: `$${order.totalPrice}`,
                state: order.orderState && String(order.orderState).includes("Delivered")
                    ? <p style={{ color: "green" }}>{order.orderState}</p>
                    : <p style={{ color: "red" }}>{order.orderState}</p>,
                actions :
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className='fa fa-eye'></i></Link>
            })
        })
        return data;
    }

    return (
        <Fragment>

            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>

            {loading ? <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}

        </Fragment>
    )
}
export default ListOrder