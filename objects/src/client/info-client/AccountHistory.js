import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';

const AccountHistory = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [orders, setOrders] = useState([])

    const [countOrder, setCountOrder] = useState()
    const [countPriceOrder, setCountPriceOrder] = useState()

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
                setOrders(data.orders)
                setLoading(false)
            })
        }
        fetchAPIs()
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
    })

    const handleLoggout = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                navigate("/login")
            }
        })
    }

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

    const navigate = useNavigate()

    return (
        <div>
            <Nav socket={socket} />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <div className="account__sidebar">
                            <ul className="account__sidebar-list">
                                <li className="account__sidebar-item" onClick={(e) => { navigate('/account') }}>
                                    <i className="account__sidebar-item-icon fa fa-home"></i>
                                    <label className="account__sidebar-label">Trang chủ</label>
                                </li>
                                <li className="account__sidebar-item" onClick={(e) => { navigate('/account/info') }}>
                                    <i className="account__sidebar-item-icon fa fa-user"></i>
                                    <label className="account__sidebar-label">Thông tin cá nhân</label>
                                </li>
                                <li className="account__sidebar-item" onClick={(e) => { navigate('/cart') }}>
                                    <i className="account__sidebar-item-icon fa fa-shopping-cart"></i>
                                    <label className="account__sidebar-label">Giỏ hàng</label>
                                </li>
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => { navigate('/account/history') }}>
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
                                <label className="account__box-info-header">LỊCH SỬ MUA HÀNG</label>
                                <div className='account__box-info-counting'>
                                    <div className='account__box-info-counting-item'>
                                        <div className='account__box-info-counting-icon account__box-info-counting-icon--purchased'></div>
                                        <div className='account__box-info-counting-title'>SẢN PHẨM ĐÃ MUA</div>
                                        <div className='account__box-info-counting-number'>{countOrder} đơn hàng</div>
                                    </div>

                                    <div className='account__box-info-counting-item'>
                                        <div className='account__box-info-counting-icon account__box-info-counting-icon--shopping'></div>
                                        <div className='account__box-info-counting-title'>TỔNG GIÁ TRỊ TÍCH LŨY</div>
                                        <div className='account__box-info-counting-number'>{Number(countPriceOrder).toLocaleString()} đ</div>
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
                                            <td>Mã đơn hàng</td>
                                            <td>Sản phẩm</td>
                                            <td>Thời gian</td>
                                            <td>Tình trạng</td>
                                            <td>Tổng tiền</td>
                                        </tr>
                                    </thead>
                                    <tbody className='table__tbody-primary'>
                                        {loading ? <tr><td>Loading...</td></tr> : orders.map((order, index) => (
                                            <tr className='table__row-loading' key={index}>
                                                <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700 }}>{order.orderID}</td>
                                                <td style={{ color: "red", textAlign: 'left' }}>
                                                    {
                                                        order.lists.map((list, index) => (
                                                            <div className="table-td-element">
                                                                <div className="table-td__img" style={{
                                                                    backgroundImage: `url(${list.imageLink})`,
                                                                    backgroundPosition: `center center`,
                                                                    backgroundSize: "cover",
                                                                    backgroupRepeat: "no-repeat"
                                                                }}></div>
                                                                <label className="table-td__label">{list.productName}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </td>
                                                <td style={{ backgroundColor: "" }}>{order.time}</td>
                                                <td style={{ backgroundColor: "", fontWeight: 700 }}>{order.status}</td>
                                                <td style={{ fontWeight: 600, textAlign: "center", fontSize: "2rem", color: "red" }}>{Number(order.price).toLocaleString() || "None"} đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountHistory