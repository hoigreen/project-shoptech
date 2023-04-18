import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Breadcrumbs from '../common/Breadcrumbs';
import ModalLoading from '../common/ModalLoading';
import SidebarAccount from './SidebarAccount';


const AccountClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [fullname, setFullname] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [orders, setOrders] = useState([])
    const [countOrderDriving, setCountOrderDriving] = useState()
    const [countOrder, setCountOrder] = useState()
    const [countPriceOrder, setCountPriceOrder] = useState()

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })

            fetch("http://localhost:4000/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
            })
        }
        fetchAPIs()
    }, [])


    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setFullname(user.fullname)
                setAvatarUrl(user.avatarUrl)
            }
        })

        // Show thông tin số đơn hàng đang giao
        let sumCountOrderDriving = 0;
        orders.map((order, index) => {
            if (order.owner == window.localStorage.getItem("userLogged")) {
                if (order.status === "Đang giao hàng") {
                    sumCountOrderDriving++;
                    setCountOrderDriving(sumCountOrderDriving)
                }
            }
        })

        // Show thông tin số đơn hàng đã mua và số tiền mua hàng tích lũy
        let sumCountOrder = 0;
        let sumCountPriceOrder = 0;
        orders.map((order, index) => {
            if (order.owner == window.localStorage.getItem("userLogged")) {
                sumCountOrder += 1;
                sumCountPriceOrder += Number(order.price);
                setCountOrder(sumCountOrder)
                setCountPriceOrder(sumCountPriceOrder)
            }
        })
        handleLoadOptionSidebar(0)
    })

    const handleLoadOptionSidebar = (index) => {
        const optionItems = document.querySelectorAll('.account__sidebar-item')
        const optionItemActive = document.querySelector(".account__sidebar-item.account__sidebar-item--active")
        optionItems.forEach((item, i) => {
            if (optionItemActive) {
                optionItemActive.classList.remove("account__sidebar-item--active")
            }
        })
        optionItems[index].classList.add("account__sidebar-item--active")
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <ModalLoading />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <SidebarAccount />

                        <div className="account__box">
                            <div className="account__box-info">
                                <img src={avatarUrl} className="account__box-info-avatar"></img>
                                <label className="account__box-info-label">Xin chào</label>
                                <label className="account__box-info-fullname">{fullname}</label>
                                <div className='account__box-info-list'>
                                    <div className='account__box-info-item'>
                                        <label className='account__box-info-item-label'>Đơn hàng đang giao</label>
                                        <i className='account__box-info-item-icon fa fa-cart-arrow-down'></i>
                                        <p className='account__box-info-item-data'>{countOrderDriving || "0"}</p>
                                    </div>

                                    <div className='account__box-info-item'>
                                        <label className='account__box-info-item-label'>Đơn hàng đã hoàn thành</label>
                                        <i className='account__box-info-item-icon fa fa-list-alt'></i>
                                        <p className='account__box-info-item-data'>{countOrder || 0}</p>
                                    </div>

                                    <div className='account__box-info-item'>
                                        <label className='account__box-info-item-label'>Tổng giá trị mua hàng tại website</label>
                                        <i className='account__box-info-item-icon fa fa-credit-card'></i>
                                        <p style={{ color: 'red' }} className='account__box-info-item-data'>{Number(countPriceOrder).toLocaleString()} đ</p>
                                    </div>
                                </div>
                            </div>

                            <div className='account__box-option'>
                                <div className='account__box-option-item account__box-option-item--color-pink'>
                                    <div className='account__box-option-item-img account__box-option-item-img--cart'>1</div>
                                    <label className='account__box-option-item-title'>Thông tin giỏ hàng</label>
                                    <button className='account__box-option-item-btn' onClick={(e) => {
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            navigate('/cart');
                                        }, 1000)
                                    }}>Xem chi tiết</button>
                                </div>

                                <div className='account__box-option-item account__box-option-item--color-yellow'>
                                    <div className='account__box-option-item-img account__box-option-item-img--order'></div>
                                    <label className='account__box-option-item-title'>Đơn hàng của bạn</label>
                                    <button className='account__box-option-item-btn' onClick={(e) => {
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            navigate('/order');
                                        }, 1000)
                                    }}>Xem chi tiết</button>
                                </div>

                                <div className='account__box-option-item account__box-option-item--color-green'>
                                    <div className='account__box-option-item-img account__box-option-item-img--history'>1</div>
                                    <label className='account__box-option-item-title'>Lịch sử mua hàng</label>
                                    <button className='account__box-option-item-btn' onClick={(e) => {
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            navigate('/account/history');
                                        }, 1000)
                                    }}>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountClient;