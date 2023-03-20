import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../common/Footer';

import Nav from '../common/Nav'

const LoginClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [userID, setUserID] = useState('')
    const [statusLogin, setStatusLogin] = useState('')

    useEffect(() => {
        const fetchProducts = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchProducts()
    }, [])

    const [details, setDetails] = useState({ username: "", password: "" })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        users.map((user, index) => {
            if (details.username == user.username &&
                details.password == user.password) {
                setUserID(user.userID)
                window.localStorage.setItem('userLogged', user.username);
                window.localStorage.setItem('statusLogged', statusLogin);
                socket.emit("setStatusLoginUser", { userID: user.userID, statusLogin: statusLogin })
                alert("Đăng nhập thành công");
                navigate('/account');
            }
        })
        showErrorToast();
    };

    function toast({ title = "", message = "", type = "info", duration = 3000 }) {
        const main = document.getElementById("toast-with-navbar");
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
            <div id="toast-with-navbar"></div>
            <Nav socket={socket} />
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
                                            console.log(statusLogin);
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
                                    <a className="login-client__forgot">Bạn quên mật khẩu?</a>
                                    <button className="login-client__btn">ĐĂNG NHẬP</button>
                                </form>
                                <p className="login-client__label-or">__________hoặc__________</p>

                                <div className="login-client__direct">
                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png'
                                            width='32' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Facebook</label>
                                    </button>

                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png'
                                            width='30' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Google</label>
                                    </button>

                                    <button className='login-client__direct-btn'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png'
                                            width='32' className="login-client__direct-img" />
                                        <label className="login-client__direct-label">Instagram</label>
                                    </button>
                                    <div>
                                        <label className="login-client__question">Nếu bạn chưa có tài khoản trước đây?</label>
                                        <a
                                            className="login-client__register"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate('/register');
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

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>


    );
};

export default LoginClient;