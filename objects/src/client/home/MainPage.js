import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"

const MainPage = () => {
    // State to store user name
    const [username, setUserName] = useState('');
    const [userBalance, setBalance] = useState(0)
    const [users, setUser] = useState([])
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api")
                .then(res => res.json())
                .then(data => {
                    setProducts(data.products)
                    setUser(data.users)
                    setLoading(false)
                })
                .catch(console.error);
        }
        fetchProducts()
    }, [])

    const handleClickRefresh = (e) => {
        e.preventDefault();
        window.location.href = window.location.href
    };

    const handleLogOut = (e) => {
        e.preventDefault();
        let text;
        if (window.confirm("Bạn muốn đăng xuất tài khoản này!") == true) {
            navigate("/")
        }
    }

    useEffect(() => {
        {
            users.map((user, index) => {
                if (user.username == window.localStorage.getItem('usernameLogged')) {
                    setUserName(user.username)
                    setBalance(user.balence)
                }
            })
        }
    })

    return (
        <div>
            <label className="user-login">
                <div className="user-login-info">
                    Xin chào, <div className="user-login-name">{username}</div>
                    <p className="user-login-name"></p>
                    - Số dư hiện tại: <div className="user-login-balence">{userBalance}</div>
                    <p className="user-login-balence"></p>
                    $
                    <i className="user-login-info-icon ti-reload" onClick={handleClickRefresh}></i>
                    <button className='logout-btn' onClick={handleLogOut}>Đăng xuất</button>
                </div>
            </label>
            <div className="main__container">
                <Link to="/list" className="main__items main__sidebar-one">
                    <div>
                        <label className="main__items-label">Danh sách sản phẩm</label>
                        <p className="main__items-description">Xem những sản phẩm tốt nhất dành cho bạn</p>
                    </div>
                </Link>

                <div className="main__content">
                    <Link to="/products" className="main__items main__sidebar-two">
                        <label className="main__items-label">Đấu giá</label>
                        <p className="main__items-description">Đưa ra giá mà bạn muốn có nó</p>
                    </Link>


                    <div className="main__sidebar-three">
                        <Link to="/fund" className="main__items main__fund" products={products} users={username}>
                            <label className="main__items-label">Nạp tiền</label>
                            <p className="main__items-description">Hãy lấp đầy ngân sách và chào mua những thứ mà bạn muốn</p>
                        </Link>

                        <Link to="/contact" className="main__items main__contact">
                            <label className="main__items-label">Liên hệ</label>
                            <p className="main__items-description">Liên hệ với chúng tôi khi bạn thấy muốn được giúp đỡ</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;