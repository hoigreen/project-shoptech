import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Nav from '../common/Nav';
import Breadcrumbs from '../common/Breadcrumbs';

const AccountOrderDetail = ({ socket }) => {
    const { orderID } = useParams()
    const [users, setUsers] = useState([])

    const [orders, setOrders] = useState([])
    const [owner, setOwner] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState("")
    const [time, setTime] = useState("")
    const [status, setStatus] = useState("")
    const [listProduct, setListProduct] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            })

            fetch("http://localhost:4000/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        // Show thông tin đơn hàng của khách hàng
        orders.map((order, index) => {
            if (order.orderID === orderID) {
                setOwner(order.owner)
                setFullName(order.fullname)
                setEmail(order.email)
                setPhone(order.phone)
                setAddress(order.address)
                setPrice(order.price)
                setTime(order.time)
                setListProduct(order.lists)
                setStatus(order.status)
            }
        })

        if (status === "Giao hàng thành công") {
            document.querySelector(".order-detail__btn").style.display = "none"
        }
    })

    const navigate = useNavigate()

    const handleLoggout = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                window.location.href = ("/login")
            }
        })
    }

    const handleConfirmReceived = (e) => {
        e.preventDefault()
        orders.map((item, index) => {
            if (item.orderID === orderID) {
                socket.emit("setStatusOrder", { orderID: item.orderID, status: "Giao hàng thành công" })
                handLoadingPage(2)
                setTimeout(() => {
                    alert("Xác nhận đã nhận hàng thành công!")
                    window.location.reload()
                })
            }
        })
    }

    window.onload = () => {

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
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <div className="account__sidebar">
                            <ul className="account__sidebar-list">
                                <li className="account__sidebar-item" onClick={(e) => { navigate('/account') }}>
                                    <i className="account__sidebar-item-icon fa fa-home"></i>
                                    <label className="account__sidebar-label">Trang chủ</label>
                                </li>
                                <li className="account__sidebar-item" onClick={(e) => {
                                    handLoadingPage(1)
                                    window.setTimeout(() => {
                                        navigate('/account/info');
                                    }, 1000)
                                }}>
                                    <i className="account__sidebar-item-icon fa fa-user"></i>
                                    <label className="account__sidebar-label">Thông tin cá nhân</label>
                                </li>
                                <li className="account__sidebar-item" onClick={(e) => {
                                    handLoadingPage(1)
                                    window.setTimeout(() => {
                                        navigate('/cart');
                                    }, 1000)
                                }}>
                                    <i className="account__sidebar-item-icon fa fa-shopping-cart"></i>
                                    <label className="account__sidebar-label">Giỏ hàng</label>
                                </li>
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => {
                                    handLoadingPage(1)
                                    window.setTimeout(() => {
                                        navigate('/account/history');
                                    }, 1000)
                                }}>
                                    <i className="account__sidebar-item-icon fa fa-history"></i>
                                    <label className="account__sidebar-label">Lịch sử mua hàng</label>
                                </li>
                                <li className="account__sidebar-item" onClick={handleLoggout}>
                                    <i className="account__sidebar-item-icon fa fa-sign-out"></i>
                                    <label className="account__sidebar-label">Đăng xuất tài khoản</label>
                                </li>
                            </ul>
                        </div>

                        <div className="account__box">
                            <div className="account__box-info">
                                <label className="account__box-info-header">THÔNG TIN ĐƠN HÀNG</label>

                                <label className="order-detail__title">Thông tin đơn hàng</label>
                                <div className="order-detail">
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">Mã đơn hàng:</label>
                                        <p style={{ color: 'red', fontWeight: "bold" }} className="order-detail__content">{orderID}</p>
                                    </div>
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">Thời gian đặt hàng:</label>
                                        <p className="order-detail__content">{time}</p>
                                    </div>
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">Trạng thái đơn hàng</label>
                                        <p style={{ color: 'purple', fontWeight: "600" }} className="order-detail__content">{status}</p>
                                    </div>
                                </div>

                                <label className="order-detail__title">Thông tin giao nhận hàng</label>
                                <div className="order-detail">
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">
                                            <i className="order-detail__label-icon fa fa-user"></i>
                                            Họ và tên người nhận:
                                        </label>
                                        <p className="order-detail__content">{fullName}</p>
                                    </div>
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">
                                            <i className="order-detail__label-icon fa fa-phone"></i>
                                            Số điện thoại:</label>
                                        <p className="order-detail__content">{phone}</p>
                                    </div>
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">
                                            <i className="order-detail__label-icon fa fa-envelope"></i>
                                            Địa chỉ email:</label>
                                        <p className="order-detail__content">{email}</p>
                                    </div>
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">
                                            <i className="order-detail__label-icon fa fa-map"></i>
                                            Địa chỉ nhận hàng:</label>
                                        <p className="order-detail__content">{address}</p>
                                    </div>
                                </div>

                                <label className="order-detail__title">Danh sách sản phẩm</label>
                                <ul className='order-detail__list'>
                                    {loading ? <p>Loading...</p> : listProduct.map((item, index) => (
                                        <li className='order-detail__item' key={index}>
                                            <img src={item.imageLink} className='order-detail__item-img' />
                                            <div className='order-detail__item-info'>
                                                <label className='order-detail__item-name'>{item.productName}</label>
                                                <label className='order-detail__item-content'>{item.option}</label>
                                                <label className='order-detail__item-content'>{item.color}</label>
                                                <label className='order-detail__item-quantity'>x{item.quantity}</label>
                                                <p className='order-detail__item-price'>{Number(item.price).toLocaleString()} đ</p>
                                            </div>
                                            <button className='order-detail__item-btn' onClick={e => {
                                                e.preventDefault();
                                                navigate(`/account/history/detail-id=${orderID}/vote`)
                                            }}>Đánh giá</button>
                                        </li>
                                    ))}
                                    <div className="order-detail__group">
                                        <label className="order-detail__label">Tổng giá trị đơn hàng</label>
                                        <p style={{ color: 'green', fontWeight: "600" }} className="order-detail__content">{Number(price).toLocaleString()} đ</p>
                                    </div>
                                </ul>

                                <button className='order-detail__btn' onClick={handleConfirmReceived}>Đã nhận được hàng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountOrderDetail