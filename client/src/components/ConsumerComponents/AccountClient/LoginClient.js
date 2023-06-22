import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles/account-client.css"

import { Nav, Breadcrumbs } from '../Common';
import { Toast, handleLoadingPage } from '../../Common';


const LoginClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [statusLogin, setStatusLogin] = useState('')
    const [details, setDetails] = useState({ username: "", password: "" })

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchProducts()
    }, [])

    const showErrorToast = () => {
        Toast({ title: 'Đăng nhập thất bại', message: 'Tên tài khoản hoặc mật khẩu không chính xác!', type: 'error', duration: 3000 })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var boolCheck = false;
        users.map((user, index) => {
            if (details.username === user.username &&
                details.password === user.password) {
                window.localStorage.setItem('userLogged', user.username);
                window.localStorage.setItem('statusLogged', statusLogin);
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: statusLogin })
                alert("Đăng nhập thành công");
                handleLoadingPage(1)
                window.setTimeout(() => {
                    window.location.href = ('/account');
                }, 1000)
                boolCheck = true;
            }
        })
        if (boolCheck === false) {
            showErrorToast();
        }
    };

    return (
        <>
            <div id="toast-with-navbar"></div>
            <Nav />
            <Breadcrumbs />
            <div className='container'>
                <div className="grid wide">
                    <div className="login-client__box">
                        <div className="login-client__col-1">
                            <div className="login-client__panel">
                                <div className="login-client__panel-img"></div>
                                <label className="login-client__panel-title">Trở thành thành viên</label>
                                <p className="login-client__panel-desb">Tận hưởng trải nghiệm và ưu đãi tuyệt vời khi trở thành thành viên của gia đình ShopTECH!!!</p>
                            </div>
                            <div className="login-client__panel-controll">
                                <button className="login-client__panel-btn"></button>
                                <button className="login-client__panel-btn"></button>
                                <button className="login-client__panel-btn"></button>
                                <button className="login-client__panel-btn"></button>
                            </div>
                        </div>

                        <div className="login-client__col-2">
                            <div className="login-client__container">
                                <form className="login-client__form" onSubmit={handleSubmit}>
                                    <label className="login-client__label-login">Đăng nhập tài khoản</label>
                                    <label className="login-client__label" htmlFor="username">Vui lòng nhập tên tài khoản</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="login-client__input"
                                        onChange={e => {
                                            setDetails({ ...details, username: e.target.value });
                                            setStatusLogin("Đã đăng nhập")
                                        }}
                                        value={details.username}
                                        required
                                        minLength={5}
                                        placeholder="Username ..."
                                    />

                                    <label className="login-client__label" htmlFor="password">Vui lòng nhập mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="login-client__input"
                                        onChange={e => setDetails({ ...details, password: e.target.value })}
                                        value={details.password}
                                        required
                                        minLength={6}
                                        placeholder="Password ..."
                                    />
                                    <a href='' className="login-client__forgot">Bạn quên mật khẩu?</a>
                                    <button className="login-client__btn">ĐĂNG NHẬP</button>
                                </form>
                                <p className="login-client__label-or">__________hoặc__________</p>

                                <div className="login-client__direct">
                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' alt=''
                                            width='32' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Facebook</label>
                                    </button>

                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png' alt=''
                                            width='30' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Google</label>
                                    </button>

                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
                                            alt=''
                                            width='32' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Instagram</label>
                                    </button>
                                    <div>
                                        <label className="login-client__question">Nếu bạn chưa có tài khoản trước đây?</label>
                                        <a
                                            className="login-client__register"
                                            href='/login'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleLoadingPage(1)
                                                window.setTimeout(() => {
                                                    navigate('/register');
                                                }, 1000)
                                            }}
                                        >
                                            Đăng ký ngay</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>


    );
};

export default LoginClient;