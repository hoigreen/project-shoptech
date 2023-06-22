import React, { useState, useEffect } from 'react';

import "./styles/login-style.css"

import { handleLoadingPage } from '../../Common';
import ToastMessage, { Toast } from '../../Common/ToastMessage';

const Login = () => {
    const [admins, setAdmins] = useState([])

    useEffect(() => {
        const fetchAdmins = () => {
            fetch("https://server-shoptech.onrender.com/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })
        }
        fetchAdmins()
    }, [])

    const [details, setDetails] = useState({ adminName: "", password: "" })

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        var boolCheck = false;
        admins.map((admin, index) => {
            if (details.adminName === admin.adminName &&
                details.password === admin.password) {
                window.localStorage.setItem('adminNameLogin', admin.adminName);
                alert("Đăng nhập thành công");
                handleLoadingPage(1)
                window.setTimeout(() => {
                    window.location.href = `/admin/dashboard`
                }, 1000)
                boolCheck = true;
            }
        })
        if (boolCheck === false) {
            showErrorToast();
        }
    };

    function showErrorToast() {
        Toast({
            title: 'Đăng nhập thất bại',
            message: 'Tên tài khoản hoặc mật khẩu không chính xác!',
            type: 'error',
            duration: 3000
        })
    }

    return (
        <div className='login--admin-container'>
            <ToastMessage />
            <div className="login__logo"></div>
            <div className="login__box">
                <label className="login__label-login">Đăng nhập tài khoản</label>
                <form className="login__form" onSubmit={handleSubmitLogin}>
                    <label className="login__label" htmlFor="adminName">Vui lòng nhập tên tài khoản</label>
                    <input
                        className="login__input"
                        //type="text"
                        name="username"
                        onChange={e => setDetails({ ...details, adminName: e.target.value })}
                        value={details.adminName}
                        required
                        minLength={5}
                        placeholder="Admin ..."
                    />

                    <label className="login__label login__label--password" htmlFor="password">Vui lòng nhập mật khẩu</label>
                    <input
                        className="login__input"
                        type="password"
                        name="password"
                        onChange={e => setDetails({ ...details, password: e.target.value })}
                        value={details.password}
                        required
                        minLength={6}
                        placeholder="Password ..."
                    />
                    <button className="login__btn">ĐĂNG NHẬP</button>
                </form>

            </div>
            <p className='app-copyright'
                style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)" }}
            >©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    );
};

export default Login;