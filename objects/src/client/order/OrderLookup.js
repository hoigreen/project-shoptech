import React from 'react'
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'
import Footer from '../common/Footer'

const OrderLookup = () => {
    return (
        <div>
            <Nav />
            <Breadcrumbs />
            <div className="container">
                <div className="grid wide">
                    <div className="order-lookup__box">
                        <img className="order-lookup__box-logo" />
                        <div className="order-lookup__box-col">
                            <label className="order-lookup__box-label">Nhập số điện thoại</label>
                            <input className="order-lookup__box-input" type="text"></input>
                        </div>
                        <img className="order-lookup__box-img" />
                    </div>

                    <div className="order-result__box">
                        <div className="order-result__">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderLookup