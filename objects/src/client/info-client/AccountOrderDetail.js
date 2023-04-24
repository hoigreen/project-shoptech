import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Nav from '../common/Nav';
import Breadcrumbs from '../common/Breadcrumbs';
import ModalLoading from '../common/ModalLoading';
import SidebarAccount from './SidebarAccount';

const AccountOrderDetail = ({ socket }) => {
    const { orderID } = useParams()

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

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPIs = () => {
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

        handleFormatCrumbs()
        handleLoadOptionSidebar(3)
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

    const handleFormatCrumbs = () => {
        const crumbLinks = document.querySelectorAll(".crumb-link");
        crumbLinks.forEach(crumbLink => {
            if (crumbLink.innerHTML.includes("-id=")) {
                crumbLink.style.display = "none"
            }
        })
    }

    const checkVote = (itemVoted, itemID) => {
        if (itemVoted)
            return <button className='order-detail__item-btn order-detail__item-btn--disabled' disabled>Đã đánh giá </button>
        return (
            <button className='order-detail__item-btn' onClick={e => {
                e.preventDefault();
                if (status === "Giao hàng thành công")
                    navigate(`/account/history/detail-id=${orderID}/vote-${itemID}`);
                else {
                    alert("Đơn hàng đang trong trạng thái giao hàng nên chưa thể đánh giá sản phẩm!")
                }
            }}>Đánh giá</button>
        )
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
            <Nav />
            <Breadcrumbs />
            <ModalLoading />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <SidebarAccount />
                        <div className="account__box">
                            <div className="account__box-info">
                                <button className="cart__btn-cancel" onClick={() => { window.location.href = "/account/history" }}>
                                    <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở lại
                                </button>
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
                                        <p className="order-detail__content">{address || "Showroom 70 Tô Ký, p.Tân Chánh Hiệp, Q.12"}</p>
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
                                            <div className='order_detail__item-btn-box'>
                                                {checkVote(item.voted, item.id)}
                                            </div>
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