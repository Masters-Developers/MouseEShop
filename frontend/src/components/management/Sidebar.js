import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/DashBoard"><i className="fa fa-tachometer"></i> Management</Link>
                    </li>

                    <li>
                        <a href="#itemSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                            className="fa fa-product-hunt"></i> Items </a>
                        <ul className="collapse list-unstyled" id="itemSubmenu">
                            <li>
                                <Link to="/itemslist"><i className="fa fa-clipboard"></i> All Items</Link>
                            </li>

                            <li>
                                <Link to="/newitem"><i className="fa fa-plus"></i> Create new Item</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                        <Link to="/management/orders"><i className="fa fa-shopping-basket"></i> Orders </Link>
                    </li>

                    <li>
                        <Link to="/management/users"><i className="fa fa-users"></i> users</Link>
                    </li>

                    <li>
                        <Link to="/management/reviews"><i className="fa fa-star"></i> Opinions</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar