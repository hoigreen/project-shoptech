import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'

const CartInfo = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [countTotalPrice, setCountTotalPrice] = useState()

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setCartUser(user.cart);
            }
        })

        // show thông tin tổng tiền giỏ hàng
        let countPriceAll = 0
        cartUser.map((cartItem, index) => {
            if (cartItem) countPriceAll += Number(cartItem.price) * cartItem.quantity;
        })
        setCountTotalPrice(countPriceAll)

    })

    const handleSubmit = () => { }


    return (
        <div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <div className="grid wide">
                <div className="container">
                    <div className="cart__container" style={{ display: "flex", width: "64%" }}>
                        <div className="cart__header">
                            <button className="cart__btn-cancel" onClick={() => { window.location.href = "/cart" }}>
                                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở lại giỏ hàng</button>
                            <h1 className="cart__title">THÔNG TIN ĐẶT HÀNG CỦA BẠN</h1>
                        </div>


                        <div className="form cart-info__form" id="form-info-cart">
                            <div className="spacer"></div>

                            <div className="cart-info__group">
                                <label className="cart-info__label">Thông tin cá nhân</label>
                                <div className="form-group">
                                    <input style={{ color: "green", fontWeight: "500" }}
                                        id="fullname"
                                        name="fullname"
                                        type="text"
                                        placeholder="Họ và tên của bạn ... (Không được bỏ trống)"
                                        //onChange={(e) => setUsernameRegister(e.target.value)}
                                        //value={usernameRegister}
                                        className="form-control cart-info__input">
                                    </input>
                                    <span className="form-message"></span>
                                </div>
                                <div className="form-group">
                                    <input
                                        id="email"
                                        name="email"
                                        type="text"
                                        placeholder="Email ... (Không được bỏ trống)"
                                        //onChange={(e) => setUsernameRegister(e.target.value)}
                                        //value={usernameRegister}
                                        className="form-control cart-info__input">
                                    </input>
                                    <span className="form-message"></span>
                                </div>
                                <div className="form-group">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="number"
                                        placeholder="Nhập số điện thoại (Không được để trống)"
                                        //onChange={(e) => setUsernameRegister(e.target.value)}
                                        //value={usernameRegister}
                                        className="form-control cart-info__input">
                                    </input>
                                    <span className="form-message"></span>
                                </div>
                                <div className="cart-info__input-radio-container">
                                    <input name="info-default" type="checkbox" className="cart-info__input-radio"></input>
                                    <label className='cart-info__input-radio-describe' style={{ color: 'blue' }}>Sử dụng thông tin cá nhân mặc định</label>
                                </div>
                            </div>

                            <div className="cart-info__group">
                                <label className="cart-info__label">Chọn hình thức nhận hàng</label>
                                <div className="cart-info__input-radio-container">
                                    <input name="info-default" type="radio" className="cart-info__input-radio"></input>
                                    <label className='cart-info__input-radio-describe'>Nhận tại cửa hàng</label>
                                </div>
                                
                                <div className="cart-info__input-radio-container">
                                    <input name="info-default" type="radio" className="cart-info__input-radio"></input>
                                    <label className='cart-info__input-radio-describe'>Giao hàng tận nơi (Trong vòng 1h)</label>
                                </div>
                                <div className="form-group">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        placeholder="Nhập địa chỉ nhận hàng (Bắt buộc)"
                                        //onChange={(e) => setUsernameRegister(e.target.value)}
                                        //value={usernameRegister}
                                        className="form-control cart-info__input">
                                    </input>
                                    <span className="form-message"></span>
                                </div>
                                <div className="cart-info__input-radio-container">
                                    <input name="info-default" type="checkbox" className="cart-info__input-radio"></input>
                                    <label className='cart-info__input-radio-describe' style={{ color: 'blue' }}>Sử dụng thông tin địa chỉ mặc định</label>
                                </div>
                            </div>

                            <div className="cart-info__group">
                                <label className="cart-info__label">Ghi chú thêm</label>
                                <div className="form-group">
                                    <input
                                        id="note"
                                        name="note"
                                        type="text"
                                        placeholder="Ghi chú (Tùy chọn)"
                                        //onChange={(e) => setUsernameRegister(e.target.value)}
                                        //value={usernameRegister}
                                        className="form-control cart-info__input">
                                    </input>
                                    <span className="form-message"></span>
                                </div>
                                <div className="cart-info__input-radio-container">
                                    <input name="info-default" type="checkbox" className="cart-info__input-radio"></input>
                                    <label className='cart-info__input-radio-describe'>Xác nhận thông tin bạn nhập là chính xác</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cart__control-container">
                    <div className="cart__control-total">
                        <label className="cart__control-total-label">Tổng tiền giỏ hàng:</label>
                        <p className="cart__control-total-price">{Number(countTotalPrice).toLocaleString() || 0} đ</p>
                    </div>
                    <div className='cart__control-box'>
                        <button className="cart__control-btn cart__control-btn--payment" onClick={(e) => { window.location.href = "/cart/info" }}>Bước tiếp theo</button>
                        <button className="cart__control-btn cart__control-btn--more" style={{ width: "100%" }} onClick={(e) => { window.location.href = "/cart/" }}>Quay lại trang thông tin giỏ hàng</button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default CartInfo;