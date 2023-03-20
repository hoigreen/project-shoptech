import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';


const AccountClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [userID, setUserID] = useState('')
    const [username, setUsername] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
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

    return (
        <div>
            <Nav socket={socket} />
            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <div className="account__sidebar">
                            <ul className="account__sidebar-list">
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => { navigate('/account') }}>
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
                                <li className="account__sidebar-item" onClick={(e) => { navigate('/account/history') }}>
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
                                        <label className='account__box-info-item-label'>Sản phẩm đã mua</label>
                                        <i className='account__box-info-item-icon fa fa-cart-arrow-down'></i>
                                        <p className='account__box-info-item-data'>5</p>
                                    </div>

                                    <div className='account__box-info-item'>
                                        <label className='account__box-info-item-label'>Đơn hàng đã hoàn thành</label>
                                        <i className='account__box-info-item-icon fa fa-list-alt'></i>
                                        <p className='account__box-info-item-data'>2</p>
                                    </div>

                                    <div className='account__box-info-item'>
                                        <label className='account__box-info-item-label'>Tổng giá trị mua hàng tại website</label>
                                        <i className='account__box-info-item-icon fa fa-credit-card'></i>
                                        <p className='account__box-info-item-data'>1.229.000 đ</p>
                                    </div>
                                </div>
                            </div>

                            <div className='account__box-option'>
                                <div className='account__box-option-item account__box-option-item--color-pink'>
                                    <div className='account__box-option-item-img account__box-option-item-img--cart'>1</div>
                                    <label className='account__box-option-item-title'>Thông tin giỏ hàng</label>
                                    <button className='account__box-option-item-btn'>Xem chi tiết</button>
                                </div>

                                <div className='account__box-option-item account__box-option-item--color-yellow'>
                                    <div className='account__box-option-item-img account__box-option-item-img--order'></div>
                                    <label className='account__box-option-item-title'>Đơn hàng của bạn</label>
                                    <button className='account__box-option-item-btn'>Xem chi tiết</button>
                                </div>

                                <div className='account__box-option-item account__box-option-item--color-green'>
                                    <div className='account__box-option-item-img account__box-option-item-img--history'>1</div>
                                    <label className='account__box-option-item-title'>Lịch sử mua hàng</label>
                                    <button className='account__box-option-item-btn'>Xem chi tiết</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    )
}

export default AccountClient;