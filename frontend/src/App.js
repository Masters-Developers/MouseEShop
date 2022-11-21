
import './App.css';
import React, { useEffect } from 'react';
import Header from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';
import { Home } from './components/Home';
import { useSelector } from 'react-redux';
import shop from "./Shop";
import ItemDetails from './components/items/ItemDetails';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NewItem from './components/management/NewItem.js';
import DashBoard from './components/management/Dashboard';
import ItemsList from './components/management/ItemsList';
import Cart from './components/cart/Cart';
import { Login } from './components/user/Login';
import { Registration } from './components/user/Registration';
import { loadUser } from './actions/userActions';
import { Profile } from './components/user/Profile';
import ProtectedRoute from './routes/ProtectedRoute';
import { UpdateProfile} from "./components/user/UpdateProfile";
import { UpdatePassword } from './components/user/UpdatePassword';
import { ForgotPassword } from "./components/user/ForgotPassword"
import { NewPassword } from './components/user/NewPassword';
import {UpdateItem} from './components/management/UpdateItem';
import { Shipping } from './components/cart/Shipping';
import { ConfirmOrder } from './components/cart/ConfirmOrder';
import { Payment } from './components/cart/Payment';
import { Success } from './components/cart/Succes';
import UpdateUser from './components/management/UpdateUser'
import ListOrder from './components/order/ListOrder';
import { OrderDetails } from './components/order/OrderDetails';
import OrdersList from './components/management/OrderList';
import ProccessOrder from './components/management/ProccessOrder'
import UsersList from './components/management/UserList';
import ItemReviews from './components/management/ItemReviews';
function App() {
  useEffect(()=>{
    shop.dispatch(loadUser());
   },[])
   const {user, isAuthenticated, loading} = useSelector(state => state.auth);
  return (
    <Router>
    <div className="App">
      <Header />
      <div className='container container-fluid'>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/Home" element={<Home />}/>
            <Route path="/items/:id" element={<ItemDetails />}/>
            <Route path="/dashboard" element={<DashBoard />}/>
            <Route path="/itemslist" element={<ItemsList />}/>
            <Route path="/newitem" element={<NewItem />}/>
            <Route path="/search/:keyword" element={<Home />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/myprofile" element={<Profile />}/>
            <Route path="/myprofile/update" element={<UpdateProfile />}/>
            <Route path="/password/update" element={<UpdatePassword />}/>
            <Route path="/password/forgot" element={<ForgotPassword />}/>
            <Route path="/resetPassword/:token" element={<NewPassword />}/>
            <Route path="/shipping" element={<Shipping />}/>
            <Route path="/updateItem/:id" element={<UpdateItem />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
            <Route path="/myOrders" element={<ListOrder />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/management/orders" element={<OrdersList />} />
            <Route path="/management/order/:id" element={<ProccessOrder />} />
            <Route path="/management/users" element={<UsersList />} />
            <Route path="/management/user/:id" element={<UpdateUser />} />
            <Route path="/management/reviews" element={<ItemReviews />} />

            {/*Protected Route*/}
            <Route path="/dashboard" 
            element={<ProtectedRoute isManagement={true}><DashBoard /></ProtectedRoute>}/>
          </Routes>
        </div>{!loading && (!isAuthenticated || user.role!=="management") &&(
        <Footer />
       )}
      
    </div>
    </Router>
  );
}
export default App;
