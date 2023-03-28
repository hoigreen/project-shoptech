import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = ({ socket }) => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPI()
    }, [])

    const navigate = useNavigate();

    return (
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

                <button className="header-btn header-btn__cart" onClick={e => { window.location.href = ("/cart") }}>
                    <div className="header-btn__red-dot">0</div>
                    <i className="header--btn-icon fa-solid fa-shopping-cart"></i>
                    <p className="header--btn-name">Giỏ hàng</p>
                </button>
                <button className="header-btn" onClick={(e) => {
                    if (window.localStorage.getItem('statusLogged') === "Đã đăng nhập") {
                        const elementNavOption = document.querySelector('.nav__option-box');
                        elementNavOption.style.display = 'block';
                        navigate("/account")
                    }
                    else {
                        window.location.href = ("/login")
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
                    <li className="nav__option-item">Thông tin tài khoản</li>
                    <li className="nav__option-item">Đăng xuất</li>
                </ul>
            </nav>
        </div>

    );
};

export default Nav;