import React, { useState, useEffect } from 'react';

const Nav = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [countQuantity, setCountQuantity] = useState()

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
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
                handLoadingPage(1)
                window.setTimeout(() => {
                    window.location.href = `/login`
                }, 1000)
            }
        })
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        console.log(loading)
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
            <div className="nav-container">
                <nav className="navbar grid wide">
                    <div className="header--logo" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/home';
                    }}>
                    </div>

                    <div className="header-search">
                        <input className="header-search__input" placeholder="Tìm kiếm sản phẩm..."></input>
                        <button className="header-search__button">
                            <i className="fa ti-search"></i>
                        </button>
                    </div>

                    <button className="header-btn header-btn__cart" onClick={() => {
                        handLoadingPage(1)
                        window.setTimeout(() => {
                            window.location.href = `/cart`
                        }, 1000)
                    }}>
                        <div className="header-btn__red-dot">{countQuantity || 0}</div>
                        <i className="header--btn-icon fa-solid fa-shopping-cart"></i>
                        <p className="header--btn-name">Giỏ hàng</p>
                    </button>
                    
                    <button className="header-btn" onClick={(e) => {
                        if (window.localStorage.getItem('statusLogged') === "Đã đăng nhập") {
                            const elementNavOption = document.querySelector('.nav__option-box');
                            elementNavOption.style.display = 'block';
                        }
                        else {
                            handLoadingPage(1)
                            window.setTimeout(() => {
                                window.location.href = `/login`
                            }, 1000)
                        }
                    }}>
                        <i className="header--btn-icon fa-solid fa-user"></i>
                        <p className="header--btn-name">Thành viên</p>
                    </button>
                    <button className="header-btn">
                        <i className="header--btn-icon fa-solid fa-history"></i>
                        <p className="header--btn-name">Tra cứu đơn hàng</p>
                    </button>
                    <button className="header-btn">
                        <i className="header--btn-icon fa-solid fa-phone"></i>
                        <p className="header--btn-name">Hỏi đáp</p>
                    </button>
                    <ul className="nav__option-box">
                        <li className="nav__option-item" onClick={() => {
                            handLoadingPage(1)
                            window.setTimeout(() => {
                                window.location.href = `/account`
                            }, 1000)
                        }}>Tài khoản của bạn</li>
                        <li className="nav__option-item" style={{ color: "red" }} onClick={handleLoggout}>Đăng xuất</li>
                    </ul>
                </nav>
            </div>
        </div>

    );
};

export default Nav;