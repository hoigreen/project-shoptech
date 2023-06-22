import React, { useState, useEffect } from 'react';

import { Breadcrumbs, Nav } from '../Common';
import SidebarAccount, { handleLoadOptionSidebar } from './SidebarAccount';
import { handleLoadingPage } from '../../Common';

const AccountHistory = ({ socket }) => {
    const [orders, setOrders] = useState([])

    const [countOrder, setCountOrder] = useState()
    const [countPriceOrder, setCountPriceOrder] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
                setLoading(false)
            })
        }
        fetchAPIs()
        handleLoadOptionSidebar(3)
    }, [])

    useEffect(() => {
        // Show danh sách đơn hàng của khách hàng
        orders.map((order, index) => {
            const elementRowTable = document.querySelectorAll(".table__row-loading")[index]
            if (order.owner != window.localStorage.getItem("userLogged")) {
                elementRowTable.style.display = "none";
            }
        })

        // Show thông tin số đơn hàng đã mua và số tiền mua hàng tích lũy
        let sumCountOrder = 0;
        let sumCountPriceOrder = 0
        orders.map((order, index) => {
            if (order.owner == window.localStorage.getItem("userLogged")) {
                sumCountOrder += 1;
                sumCountPriceOrder += Number(order.price);
                setCountOrder(sumCountOrder)
                setCountPriceOrder(sumCountPriceOrder)
            }
        })
    }, [orders])

    const handleClickIsDelivering = (e) => {
        e.preventDefault();
        const btnFillter = document.querySelectorAll(".account__box-info-fillter-btn");
        btnFillter[1].classList.add("account__box-info-fillter-btn--active")
        btnFillter[0].classList.remove("account__box-info-fillter-btn--active")
        btnFillter[2].classList.remove("account__box-info-fillter-btn--active")

        orders.map((order, index) => {
            const elementRowTable = document.querySelectorAll(".table__row-loading")[index]
            if (order.status === "Giao hàng thành công") {
                elementRowTable.style.display = "none";
            }
        })
    }

    const handleClickDeliveried = (e) => {
        e.preventDefault();
        const btnFillter = document.querySelectorAll(".account__box-info-fillter-btn");
        btnFillter[2].classList.add("account__box-info-fillter-btn--active")
        btnFillter[1].classList.remove("account__box-info-fillter-btn--active")
        btnFillter[0].classList.remove("account__box-info-fillter-btn--active")

        orders.map((order, index) => {
            const elementRowTable = document.querySelectorAll(".table__row-loading")[index]
            if (order.status === "Đang giao hàng") {
                elementRowTable.style.display = "none";
            }
        })
    }

    return (
        <>
            <Nav />
            <Breadcrumbs />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <SidebarAccount socket={socket} />
                        <div className="account__box">
                            <div className="account__box-info">
                                <label className="account__box-info-header">LỊCH SỬ MUA HÀNG</label>
                                <div className='account__box-info-counting'>
                                    <div className='account__box-info-counting-item'>
                                        <div className='account__box-info-counting-icon account__box-info-counting-icon--purchased'></div>
                                        <div className='account__box-info-counting-title'>SẢN PHẨM ĐÃ MUA</div>
                                        <div className='account__box-info-counting-number'>{countOrder || 0} đơn hàng</div>
                                    </div>

                                    <div className='account__box-info-counting-item'>
                                        <div className='account__box-info-counting-icon account__box-info-counting-icon--shopping'></div>
                                        <div className='account__box-info-counting-title'>TỔNG GIÁ TRỊ TÍCH LŨY</div>
                                        <div className='account__box-info-counting-number'>{Number(countPriceOrder).toLocaleString() || 0} đ</div>
                                    </div>
                                </div>

                                <div className='account__box-info-fillter-container'>
                                    <div className='account__box-info-fillter'>
                                        <button className='account__box-info-fillter-btn account__box-info-fillter-btn--active' onClick={(e) => {
                                            e.preventDefault()
                                            window.location.reload()
                                        }}>Tất cả</button>
                                        <button className='account__box-info-fillter-btn' onClick={handleClickIsDelivering}>Đang giao hàng</button>
                                        <button className='account__box-info-fillter-btn' onClick={handleClickDeliveried}>Đã giao hàng</button>
                                    </div>
                                </div>

                                <table className='table'>
                                    <thead>
                                        <tr className='table__thead-primary'>
                                            <td>Thời gian</td>
                                            <td>Mã đơn hàng</td>
                                            <td>Sản phẩm</td>
                                            <td>Tổng tiền</td>
                                            <td>Tình trạng</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody className='table__tbody-primary'>
                                        {loading ? <tr><td>Loading...</td></tr> : orders.map((order, index) => (
                                            <tr className='table__row-loading' key={index}>
                                                <td style={{ backgroundColor: "", fontSize: "1.4rem" }}>{order.time}</td>
                                                <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700, fontSize: "1.5rem" }}>{order.orderID}</td>
                                                <td style={{ color: "red", textAlign: 'left' }}>
                                                    {
                                                        order.lists.map((list, i) => (
                                                            <div className="table-td-element" key={i}>
                                                                <img className="table-td__img" src={list.imageLink} ></img>
                                                                <label style={{ fontSize: "1.4rem" }} className="table-td__label">{list.productName}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </td>
                                                <td style={{ fontWeight: 600, textAlign: "center", fontSize: "1.6rem", color: "red" }}>{Number(order.price).toLocaleString() || "None"} đ</td>
                                                <td style={{ backgroundColor: "", fontWeight: 700, fontSize: "1.4rem" }}>{order.status}</td>
                                                <td><button className="account-history__btn-detail" onClick={(e) => {
                                                    handleLoadingPage(1);
                                                    setTimeout(() => {
                                                        window.location.href = `/account/history/${order.orderID}`
                                                    })
                                                }}>Xem chi tiết</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountHistory