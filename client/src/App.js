import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import socketIO from 'socket.io-client';

// Admin components
import Login from './components/AdminComponents/Account/Login';
import InfoAdmin from './components/AdminComponents/Account/InfoAdmin';

import Dashboard from './components/AdminComponents/Dashboard/Dashboard';
import { CustomerPage, InfoCustomer } from './components/AdminComponents/Customer';
import { AddProduct, InfoProduct, ProductPage } from './components/AdminComponents/Product'
import { AddPromote, InfoPromote, PromotePage } from './components/AdminComponents/Promote';
import FeedbackPage from './components/AdminComponents/Feedback/FeedbackPage';

// Client components
import Home from './components/ConsumerComponents/Home/Home';
import { LoginClient, RegisterClient, AccountClient, AccountClientInfo, AccountHistory, AccountOrderDetail, VoteProductInOrder } from './components/ConsumerComponents/AccountClient';
import { Cart, CartConfirm, CartInfo, Giftcode, Payment } from './components/ConsumerComponents/Cart';
import { SmartPhone, Laptop, Tablet, Accessories, InfoProductClient } from './components/ConsumerComponents/Product';

import SearchProduct from './components/ConsumerComponents/SearchProduct/SearchProduct';
import OrderLookup from './components/ConsumerComponents/OrderLookup/OrderLookup';
import ContactPage from './components/ConsumerComponents/Contact/ContactPage';

import { ModalLoading, PageNotFound } from './components/Common/';

const socket = socketIO.connect('https://server-shoptech.onrender.com');

function App() {
    return (
        <ModalLoading>
            <Router>
                <Routes>
                    {/* ------------------------------------- Route Admin ------------------------------------- */}
                    <Route path="/admin" element={<Login socket={socket} />} />

                    <Route path="/admin/dashboard" element={<Dashboard socket={socket} />} />

                    <Route path="/admin/info-admin/:adminID" element={<InfoAdmin socket={socket} />} />

                    <Route path="/admin/customer" element={<CustomerPage socket={socket} />} />
                    <Route path="/admin/customer/info/:userID/:username" element={<InfoCustomer socket={socket} />} />

                    <Route path="/admin/product" element={<ProductPage socket={socket} />} />
                    <Route path="/admin/product/add" element={<AddProduct socket={socket} />} />
                    <Route path="/admin/product/info/:id" element={<InfoProduct socket={socket} />} />

                    <Route path="/admin/promote" element={<PromotePage socket={socket} />} />
                    <Route path="/admin/promote/add" element={<AddPromote socket={socket} />} />
                    <Route path="/admin/promote/info/:id" element={<InfoPromote socket={socket} />} />

                    <Route path="/admin/feedback" element={<FeedbackPage socket={socket} />} />


                    {/* ------------------------------------- Route Client ------------------------------------- */}
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
                    <Route path="/account/history/:orderID" element={<AccountOrderDetail socket={socket} />} />
                    <Route path="/account/history/:orderID/:productID" element={<VoteProductInOrder socket={socket} />} />

                    {/* Search Product */}
                    <Route path="/search/:keySearch" element={<SearchProduct socket={socket} />} />


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

                    {/* ----------------------------- Page not found ------------------------------ */}
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Router>
        </ModalLoading>
    );
}

export default App;