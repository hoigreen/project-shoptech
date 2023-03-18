import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = ({ socket, product }) => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [balence, setBalence] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("register", {
            username,
            password,
            balence,
        });
        window.confirm('Chúc mừng bạn đã đăng ký tài khoản thành công!')
        navigate('/');
    };

    return (
        <div>
            <label className="register__title">Đăng ký tài khoản mới</label>
            <div className="register__container">
                <form className="register__form" onSubmit={handleSubmit}>
                    <label className="register__label">Nhập vào tên tài khoản của bạn</label>
                    <input
                        type="text"
                        name="username"
                        className="register__input"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                        minLength={5}
                        placeholder="Username ..."
                    />

                    <label className="register__label home__label--password" htmlFor="password">Nhập vào mật khẩu của bạn</label>
                    <input
                        type="password"
                        name="password"
                        className="register__input"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        minLength={6}
                        placeholder="Password ..."
                    />

                    <label className="register__label home__label--password" htmlFor="password">Vui lòng xác nhận lại mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        className="register__input-retype"
                        required
                        minLength={6}
                        placeholder="Password ..."
                    />

                    <div className="register__accept">
                        <input type="checkbox" className="register__accept-btn" checked="checked"></input>
                        Bằng việc bấm vào nút đăng ký ở dưới, bạn đã đồng ý với <a>điều khoản</a> của trang web.
                    </div>
                    <button className="btn">Đăng ký ngay</button>
                </form>
            </div>
            <div className="register__direct">
                <div>
                    <label className="register__question">Nếu bạn đã có tài khoản rồi?</label>
                    <a
                        className="register__back-login"
                        onClick={(e) => {
                            e.preventDefault();
                            window.location.href = '/';
                        }}
                    >
                        Quay lại trang đăng nhập</a>
                </div>
            </div>
            <div className="register__copyright">
                <label>© Bản quyền thuộc Nhóm 3 - 2022</label>
            </div>
        </div>
    );

};

export default RegisterPage;