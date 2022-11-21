import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

export const Success = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="/images/items/orderOk.jpeg" alt="Success!" width="200" height="200" />

                    <h2>Your order has been registered successfully, we will be in touch soon</h2>

                    <Link to="/">Back to Home</Link>
                </div>

            </div>

        </Fragment>
    )
}
export default Success;