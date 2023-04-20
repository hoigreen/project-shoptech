import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import socketIO from 'socket.io-client';

// Admin components
import Login from './admin/Login';

import Dashboard from './admin/Dashboard';

import InfoAdmin from './admin/info-admin/InfoAdmin';

import CustomerPage from './admin/customer/CustomerPage';
import InfoCustomer from './admin/customer/InfoCustomer';

import ProductPage from './admin/product/ProductPage';
import InfoProduct from './admin/product/InfoProduct';
import AddProduct from './admin/product/AddProduct';

import PromotePage from './admin/promote/PromotePage';
import InfoPromote from './admin/promote/InfoPromote';
import AddPromote from './admin/promote/AddPromote';

import FeedbackPage from './admin/feedback/FeedbackPage';

// Client components
import Home from './client/home/Home';

import RegisterClient from './client/login-register/RegisterClient';
import LoginClient from './client/login-register/LoginClient';
import AccountClient from './client/info-client/AccountClient';
import AccountClientInfo from './client/info-client/AccountClientInfo';
import AccountHistory from './client/info-client/AccountHistory';
import AccountOrderDetail from './client/info-client/AccountOrderDetail';
import VoteProductInOrder from './client/info-client/VoteProductInOrder';

import SmartPhone from './client/products/SmartPhone';
import Laptop from './client/products/Laptop';
import Tablet from './client/products/Tablet';
import Accessories from './client/products/Accessories';
import InfoProductClient from './client/products/InfoProductClient';

import ResultSearch from './client/search/ResultSearch';

import Cart from './client/cart/Cart';
import CartInfo from './client/cart/CartInfo'
import Giftcode from './client/cart/Giftcode';
import CartConfirm from './client/cart/CartConfirm'
import Payment from './client/cart/Payment';

import OrderLookup from './client/order/OrderLookup';


import ContactPage from './client/contact/ContactPage';

const socket = socketIO.connect('http://localhost:4000');

function App() {
    return (
        <Router>
            <div>
                {/* <Nav socket={socket} /> */}

                {/* ------------------------------------- Route Admin ------------------------------------- */}
                <Routes>
                    <Route path="/admin" element={<Login socket={socket} />} />

                    <Route path="/admin/dashboard" element={<Dashboard socket={socket} />} />

                    <Route path="/admin/info-admin/:adminID" element={<InfoAdmin socket={socket} />} />

                    <Route path="/admin/customer" element={<CustomerPage socket={socket} />} />
                    <Route path="/admin/customer/info/:userID/:username" element={<InfoCustomer socket={socket} />} />

                    <Route path="/admin/product" element={<ProductPage socket={socket} />} />
                    <Route path="/admin/product/add" element={<AddProduct socket={socket} />} />
                    <Route path="/admin/product/info/:id/:price" element={<InfoProduct socket={socket} />} />

                    <Route path="/admin/promote" element={<PromotePage socket={socket} />} />
                    <Route path="/admin/promote/add" element={<AddPromote socket={socket} />} />
                    <Route path="/admin/promote/info/:id" element={<InfoPromote socket={socket} />} />

                    <Route path="/admin/feedback" element={<FeedbackPage socket={socket} />} />
                </Routes>



                {/* ------------------------------------- Route Client ------------------------------------- */}
                <Routes>
                    {/* Login - Register */}
                    <Route path="/login" element={<LoginClient socket={socket} />} />
                    <Route path="/register" element={<RegisterClient socket={socket} />} />

                    {/* Home */}
                    <Route path="/" element={<Home socket={socket} />} />
                    <Route path="/home" element={<Home socket={socket} />} />
                    <Route path="/product" element={<Home socket={socket} />} />

                    {/* Product */}
                    <Route path="/product/smartphone" element={<SmartPhone socket={socket} />} />
                    <Route path="/product/laptop" element={<Laptop socket={socket} />} />
                    <Route path="/product/tablet" element={<Tablet socket={socket} />} />
                    <Route path="/product/accessories" element={<Accessories socket={socket} />} />
                    <Route path="/product/:enType/:name" element={<InfoProductClient socket={socket} />} />


                    {/* Account */}
                    <Route path="/account" element={<AccountClient socket={socket} />} />
                    <Route path="/account/info" element={<AccountClientInfo socket={socket} />} />
                    <Route path="/account/history" element={<AccountHistory socket={socket} />} />
                    <Route path="/account/history/detail-id=:orderID" element={<AccountOrderDetail socket={socket} />} />
                    <Route path="/account/history/detail-id=:orderID/vote-:productID" element={<VoteProductInOrder socket={socket} />} />

                    {/* Search Product */}
                    <Route path="/search/key=:keySearch" element={<ResultSearch socket={socket} />} />


                    {/* Cart and Payment */}
                    <Route path="/cart" element={<Cart socket={socket} />} />
                    <Route path="/cart/info" element={<CartInfo socket={socket} />} />
                    <Route path="/cart/info/giftcode" element={<Giftcode socket={socket} />} />
                    <Route path="/cart/info/giftcode/confirm" element={<CartConfirm socket={socket} />} />
                    <Route path="/cart/info/giftcode/confirm/payment" element={<Payment socket={socket} />} />

                    {/* Order */}
                    <Route path="/order" element={<OrderLookup socket={socket} />} />

                    {/* Contact */}
                    <Route path="/contact" element={<ContactPage socket={socket} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;