import React, { useState, useEffect } from 'react';
import ModalLoading from './ModalLoading';

const Nav = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [countQuantity, setCountQuantity] = useState()
    const [keySearch, setKeySearch] = useState("")

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
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
    })

    const handleLoggout = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                handLoadingPage(1, "login")
            }
        })
    }

    const handLoadingPage = (second, link) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            window.location.href = link;
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div>
            <ModalLoading />
            <div className="nav-container">
                <nav className="navbar grid wide">
                    <div className="header--logo" onClick={(e) => {
                        e.preventDefault();
                        handLoadingPage(1, '/home')
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
                                handLoadingPage(1, `/search/${keySearch}`)
                            }
                        }>
                            <i className="fa ti-search"></i>
                        </button>
                    </div>

                    <div className="header__btn-group">
                        <button className="header-btn header-btn__cart" onClick={() => { handLoadingPage(1, '/cart') }}>
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
                                handLoadingPage(1, "/login")
                            }
                        }}>
                            <i className="header--btn-icon fa-solid fa-user"></i>
                            <p className="header--btn-name">Thành viên</p>
                        </button>
                        <button className="header-btn hide-on-mobile-tablet" onClick={() => { handLoadingPage(1, "/order") }}>
                            <i className="header--btn-icon fa-solid fa-history"></i>
                            <p className="header--btn-name">Đơn hàng</p>
                        </button>
                        <button className="header-btn hide-on-mobile-tablet" onClick={() => { handLoadingPage(1, "/contact") }}>
                            <i className="header--btn-icon fa-solid fa-question"></i>
                            <p className="header--btn-name">Liên hệ</p>
                        </button>
                    </div>

                    <ul className="nav__option-box">
                        <li className="nav__option-item" onClick={() => { handLoadingPage(1, "/account") }}>Tài khoản của bạn</li>
                        <li className="nav__option-item" style={{ color: "red" }} onClick={handleLoggout}>Đăng xuất</li>
                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default Nav;