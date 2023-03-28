import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';

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
                window.location.href = ("/login")
            }
        })
    }

    const handleEditInfo = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn sửa đổi thông tin cá nhân!") == true) {
            socket.emit("editInfoCustomer", { userID: userID, fullname: fullnameEdit, email: emailEdit, phone: phoneEdit, address: addressEdit })
            window.alert("Thành công!")
            window.location.href = window.location.href;
        }
    }

    const navigate = useNavigate();
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
                                <li className="account__sidebar-item account__sidebar-item--active" onClick={(e) => { navigate('/account/info') }}>
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
            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    )
}

export default AccountClientInfo