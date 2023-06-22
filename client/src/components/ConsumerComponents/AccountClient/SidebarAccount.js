import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLoadingPage } from '../../Common';

const handleLoadOptionSidebar = (index) => {
    const optionItems = document.querySelectorAll('.account__sidebar-item')
    const optionItemActive = document.querySelector(".account__sidebar-item.account__sidebar-item--active")
    optionItems.forEach((item, i) => {
        if (optionItemActive) {
            optionItemActive.classList.remove("account__sidebar-item--active")
        }
    })
    optionItems[index].classList.add("account__sidebar-item--active")
}

const SidebarAccount = ({ socket }) => {
    const [users, setUsers] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPIs()
    }, [])

    const handleLoggout = () => {
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: "Chưa đăng nhập" })
                window.localStorage.removeItem("userLogged")
                window.localStorage.removeItem("statusLogged")
                handleLoadingPage(1)
                window.setTimeout(() => {
                    window.location.href = `/login`
                }, 1000)
            }
        })
    }

    return (
        <div className="account__sidebar">
            <ul className="account__sidebar-list">
                <li className="account__sidebar-item" onClick={(e) => {
                    handleLoadingPage(1)
                    window.setTimeout(() => {
                        window.location.href = ('/account/');
                    }, 1000)
                }}>
                    <i className="account__sidebar-item-icon fa fa-home"></i>
                    <label className="account__sidebar-label">Trang chủ</label>
                </li>
                <li className="account__sidebar-item" onClick={(e) => {
                    handleLoadingPage(1)
                    window.setTimeout(() => {
                        navigate('/account/info');
                    }, 1000)
                }}>
                    <i className="account__sidebar-item-icon fa fa-user"></i>
                    <label className="account__sidebar-label">Thông tin cá nhân</label>
                </li>
                <li className="account__sidebar-item" onClick={(e) => {
                    handleLoadingPage(1)
                    window.setTimeout(() => {
                        navigate('/cart');
                    }, 1000)
                }}>
                    <i className="account__sidebar-item-icon fa fa-shopping-cart"></i>
                    <label className="account__sidebar-label">Giỏ hàng</label>
                </li>
                <li className="account__sidebar-item" onClick={(e) => {
                    handleLoadingPage(1)
                    window.setTimeout(() => {
                        navigate('/account/history');
                    }, 1000)
                }}>
                    <i className="account__sidebar-item-icon fa fa-history"></i>
                    <label className="account__sidebar-label">Lịch sử mua hàng</label>
                </li>
                <li className="account__sidebar-item" onClick={e => { handleLoggout(e) }}>
                    <i className="account__sidebar-item-icon fa fa-sign-out"></i>
                    <label className="account__sidebar-label">Đăng xuất tài khoản</label>
                </li>
            </ul>
        </div>
    )
}

export default SidebarAccount;
export { handleLoadOptionSidebar }