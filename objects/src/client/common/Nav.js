import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


const Nav = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

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

                <button className="header-btn">
                    <i className="header--btn-icon fa-solid fa-shopping-cart"></i>
                    <p className="header--btn-name">Giỏ hàng</p>
                </button>
                <button className="header-btn" onClick={(e) => {
                    if (window.localStorage.getItem('statusLogged') === "Đã đăng nhập") {
                        navigate("/account")
                    }
                    else {
                        navigate("/login")
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
                    <p className="header--btn-name">Hỗ trợ</p>
                </button>
            </nav>
        </div>

    );
};

export default Nav;