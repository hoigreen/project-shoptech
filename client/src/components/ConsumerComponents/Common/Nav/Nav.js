import React, { useState, useEffect } from 'react';

import "./nav.css"

import { handleLoadingPage } from '../../../Common';

const Nav = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [countQuantity, setCountQuantity] = useState()
    const [keySearch, setKeySearch] = useState("")

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setCartUser(user.cart);
                setCountQuantity(cartUser.length)
            }
        })
    }, [users])

    const handleLoggout = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                handleLoadingPage(1)
                window.location.href = "/login"
            }
        })
    }

    return (
        <React.Fragment>
            <div className="nav-container">
                <div className="grid wide">
                    <nav className="navbar">
                        <div className="header--logo" onClick={(e) => {
                            e.preventDefault();
                            handleLoadingPage(1)
                            window.location.href = "/home"
                        }}>
                        </div>

                        <a href="Tel: 00000" className="header-btn header-btn__link hide-on-mobile-tablet">
                            <i className="header--btn-icon fa-solid fa-phone"></i>
                            <p className="header--btn-name">Hỗ trợ
                                <span className="header--btn-describe">1800.4433</span>
                            </p>
                        </a>
                        <div className="header-search">
                            <input className="header-search__input" placeholder="Tìm kiếm sản phẩm..." onChange={(e) => { setKeySearch(e.target.value) }}></input>
                            <button className="header-search__button" onClick={
                                (e) => {
                                    if (keySearch === '') {
                                        alert("Vui lòng điền từ khóa cần tìm!")
                                        return;
                                    }
                                    handleLoadingPage(1)
                                    window.location.href = `/search/${keySearch}`
                                }
                            }>
                                <i className="fa ti-search"></i>
                            </button>
                        </div>

                        <div className="header__btn-group">
                            <button className="header-btn header-btn__cart" onClick={() => {
                                handleLoadingPage(1); window.location.href = "/cart"
                            }}>
                                <div className="header-btn__red-dot">{countQuantity || 0}</div>
                                <i className="header--btn-icon fa-solid fa-shopping-cart"></i>
                                <p className="header--btn-name hide-on-mobile" >Giỏ hàng</p>
                            </button>

                            <button className="header-btn hide-on-mobile" onClick={(e) => {
                                if (window.localStorage.getItem('statusLogged') === "Đã đăng nhập") {
                                    const elementNavOption = document.querySelector('.nav__option-box');
                                    elementNavOption.style.display = 'block';
                                }
                                else {
                                    handleLoadingPage(1)
                                    window.location.href = "/login"
                                }
                            }}>
                                <i className="header--btn-icon fa-solid fa-user"></i>
                                <p className="header--btn-name">Thành viên</p>
                            </button>

                            <button className="header-btn hide-on-mobile-tablet" onClick={() => {
                                handleLoadingPage(1); window.location.href = "/order"
                            }}>
                                <i className="header--btn-icon fa-solid fa-history"></i>
                                <p className="header--btn-name">Đơn hàng</p>
                            </button>
                            <button className="header-btn hide-on-mobile-tablet" onClick={() => {
                                handleLoadingPage(1);
                                window.location.href = "/contact"
                            }}>
                                <i className="header--btn-icon fa-solid fa-question"></i>
                                <p className="header--btn-name">Liên hệ</p>
                            </button>
                        </div>

                        <ul className="nav__option-box">
                            <li className="nav__option-item" onClick={() => {
                                handleLoadingPage(1);
                                window.location.href = "/account"
                            }}>Tài khoản của bạn</li>
                            <li className="nav__option-item" style={{ color: "red" }} onClick={handleLoggout}>Đăng xuất</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </React.Fragment>

    );
};

export default Nav;