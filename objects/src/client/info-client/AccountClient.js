import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Breadcrumbs from '../common/Breadcrumbs';


const AccountClient = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [orders, setOrders] = useState([])
    const [countOrderDriving, setCountOrderDriving] = useState()
    const [countOrder, setCountOrder] = useState()
    const [countPriceOrder, setCountPriceOrder] = useState()

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

    const navigate = useNavigate();

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setUsername(user.username);
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
    })

    const handleLoggout = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                handLoadingPage(1)
                window.setTimeout(() => {
                    window.location.href = ("/login")
                }, 1000)
            }
        })
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
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => { navigate('/account') }}>
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
                                <li className="account__sidebar-item" onClick={(e) => {
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
                                <div style={{
                                    backgroundImage: `url(${avatarUrl})`,
                                    backgroundSize: 'cover'
                                }} className="account__box-info-avatar"></div>
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