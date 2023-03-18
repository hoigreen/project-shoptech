import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';

import Nav from '../common/Nav'

const LoginClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            })
        }
        fetchProducts()
    }, [])

    const [details, setDetails] = useState({ username: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // if (details.username == '123456' &&
        //     details.password == '123456') {
        //     navigate('/home');
        //     window.localStorage.setItem('usernameLogged', user.username);
        //     alert("Đăng nhập thành công");
        // }
        users.map((user, index) => {
            console.log(123)
        })
        //showErrorToast();
        console.log(users)
    };

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast");
        if (main) {
            const toast = document.createElement("div");

            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);

            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };

            const icons = {
                success: "ti-check-box",
                info: "ti-info",
                warning: "ti-close",
                error: "ti-close"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);

            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

            toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="ti-close"></i>
                      </div>
                  `;
            main.appendChild(toast);
        }
    }

    function showErrorToast() {
        toast({
            title: 'Đăng nhập thất bại',
            message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
            type: 'error',
            duration: 3000
        })
    }

    return (
        <div>
            <div id="toast"></div>
            <Nav socket={socket} />
            <div className='container'>
                <div className="grid wide">
                    <div className="login-client__box">
                    
                        <label className="login-client__title">ĐĂNG NHẬP TÀI KHOẢN THÀNH VIÊN SHOPTECH</label>
                        <div className="login-client__container">
                            <form className="login-client__form" onSubmit={handleSubmit}>
                                <label className="login-client__label-login">Đăng nhập tài khoản</label>
                                <label className="login-client__label" htmlFor="username">Vui lòng nhập tên tài khoản</label>
                                <input
                                    type="text"
                                    name="username"
                                    className="login-client__input"
                                    onChange={e => setDetails({ ...details, username: e.target.value })}
                                    value={details.username}
                                    required
                                    minLength={5}
                                    placeholder="Username ..."
                                />

                                <label className="login-client__label login-client__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
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
                                <button className="btn">ĐĂNG NHẬP</button>
                            </form>
                        <div className="login-client__direct">
                            <div>
                                <label className="login-client__question">Nếu bạn chưa có tài khoản trước đây?</label>
                                <a
                                    className="login-client__register"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = '/register';
                                    }}
                                >
                                    Đăng ký ngay</a>
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>


    );
};

export default LoginClient;