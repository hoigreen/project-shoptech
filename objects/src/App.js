import React, { useState } from 'react';
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

import UploadImage from './admin/uploadImages/Uploads';
import ReceiveImage from './admin/uploadImages/ReceiveImage';


// Client components
import Home from './client/home/Home';

import RegisterClient from './client/info-client/RegisterClient';
import LoginClient from './client/info-client/LoginClient';
import AccountClient from './client/info-client/AccountClient';
import AccountClientInfo from './client/info-client/AccountClientInfo';
import AccountHistory from './client/info-client/AccountHistory';

import SmartPhone from './client/products/SmartPhone';
import Laptop from './client/products/Laptop';
import Tablet from './client/products/Tablet';
import Accessories from './client/products/Accessories';
import InfoProductClient from './client/products/InfoProductClient';

import ResultSearch from './client/search/ResultSearch';
import Cart from './client/cart/Cart';
import CartPayment from './client/cart/CartPayment';

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
                    <Route
                        path="/admin/info-admin/:adminID"
                        element={<InfoAdmin socket={socket}
                        />}
                    />
                    {/* Customer Route */}
                    <Route path="/admin/customer" element={<CustomerPage socket={socket} />} />
                    <Route
                        path="/admin/customer/info/:userID/:username"
                        element={<InfoCustomer socket={socket} />}
                    />
                    {/* Product Route */}
                    <Route path="/admin/product" element={<ProductPage socket={socket} />} />
                    <Route
                        path="/admin/product/info/:id/:price"
                        element={<InfoProduct socket={socket} />}
                    />
                    <Route
                        path="/admin/product/add"
                        element={<AddProduct socket={socket} />}
                    />
                    {/* Promote Route */}
                    <Route path="/admin/promote" element={<PromotePage socket={socket} />} />
                    <Route
                        path="/admin/promote/info/:id"
                        element={<InfoPromote socket={socket} />}
                    />
                    <Route
                        path="/admin/promote/add"
                        element={<AddPromote socket={socket} />}
                    />
                    <Route path="/admin/upload" element={<UploadImage socket={socket} />} />
                    <Route path="/admin/receive" element={<ReceiveImage socket={socket} />} />
                </Routes>



                {/* ------------------------------------- Route Client ------------------------------------- */}
                <Routes>
                    <Route path="/" element={<Home socket={socket} />} />
                    <Route path="/home" element={<Home socket={socket} />} />

                    <Route path="/smartphone" element={<SmartPhone socket={socket} />} />
                    <Route path="/laptop" element={<Laptop socket={socket} />} />
                    <Route path="/tablet" element={<Tablet socket={socket} />} />
                    <Route path="/accessories" element={<Accessories socket={socket} />} />
                    <Route
                        path="/product/:name"
                        element={<InfoProductClient socket={socket} />}
                    />

                    <Route path="/login" element={<LoginClient socket={socket} />} />
                    <Route path="/register" element={<RegisterClient socket={socket} />} />
                    <Route path="/account" element={<AccountClient socket={socket} />} />
                    <Route path="/account/info" element={<AccountClientInfo socket={socket} />} />
                    <Route path="/account/history" element={<AccountHistory socket={socket} />} />

                    <Route path="/result" element={<ResultSearch socket={socket} />} />

                    <Route path="/cart" element={<Cart socket={socket} />} />
                    <Route
                        path="/cart/payment"
                        element={<CartPayment socket={socket} />}
                    />
                    
                    <Route path="/contact" element={<ContactPage socket={socket} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;