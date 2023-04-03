import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import Breadcrumbs from '../common/Breadcrumbs';

const AccountClientInfo = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [username, setUsername] = useState('')
    const [userID, setUserID] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')

    const [fullnameEdit, setFullnameEdit] = useState('')
    const [emailEdit, setEmailEdit] = useState('')
    const [phoneEdit, setPhoneEdit] = useState('')
    const [addressEdit, setAddressEdit] = useState('')


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setUserID(user.userID)
                setUsername(user.username);
                setFullname(user.fullname);
                setAvatarUrl(user.avatarUrl);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);
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
                    window.location.href = ('/login');
                }, 1000)
            }
        })
    }

    const handleEditInfo = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn sửa đổi thông tin cá nhân!") == true) {
            socket.emit("editInfoCustomer", { userID: userID, fullname: fullnameEdit, email: emailEdit, phone: phoneEdit, address: addressEdit })
            window.alert("Thành công!")
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }

    const navigate = useNavigate();

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

            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <div className="account__sidebar">
                            <ul className="account__sidebar-list">
                                <li className="account__sidebar-item" onClick={(e) => {
                                    handLoadingPage(1)
                                    window.setTimeout(() => {
                                        window.location.href = ('/account/');
                                    }, 1000)
                                }}>
                                    <i className="account__sidebar-item-icon fa fa-home"></i>
                                    <label className="account__sidebar-label">Trang chủ</label>
                                </li>
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => {
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
                                <label className="account__box-info-header">THÔNG TIN CÁ NHÂN</label>

                                <label className="account__box-info-title">Họ và tên đầy đủ:</label>
                                <input className="account__box-info-input"
                                    defaultValue={fullname}
                                    name="fullname"
                                    onChange={(e) => { setFullnameEdit(e.target.value) }}
                                />

                                <label className="account__box-info-title">Email:</label>
                                <input className="account__box-info-input"
                                    defaultValue={email}
                                    name="emai"
                                    onChange={(e) => { setEmailEdit(e.target.value) }}
                                />

                                <label className="account__box-info-title">Số điện thoại:</label>
                                <input className="account__box-info-input"
                                    type="number"
                                    defaultValue={phone}
                                    name="phone"
                                    onChange={(e) => { setPhoneEdit(e.target.value) }}
                                />

                                <label className="account__box-info-title">Địa chỉ liên hệ:</label>
                                <input className="account__box-info-input"
                                    defaultValue={address}
                                    name="address"
                                    onChange={(e) => { setAddressEdit(e.target.value) }}
                                />


                                <button className="account__box-info-btn" onClick={handleEditInfo}>Cập nhật thông tin</button>



                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountClientInfo