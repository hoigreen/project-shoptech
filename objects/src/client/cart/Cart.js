import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import Breadcrumbs from '../common/Breadcrumbs'

const Cart = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [products, setProducts] = useState([])
    const [imageLink, setImageLink] = useState('')
    const [option, setOption] = useState()
    const [color, setColor] = useState()
    
    const [price, setPrice] = useState('')
    const [percent, setPercent] = useState()
    const [quantity, setQuantity] = useState(1)

    const [loading, setLoading] = useState(true)

    const cartGuest = window.localStorage.getItem('cartGuest');

    window.onload = () => {
        if (cartGuest.length == 0) {
            document.querySelector('.cart__container--empty').style.display = 'flex';
            document.querySelector('.cart__container').style.display = 'none';
        }
    }

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                //setProducts(data.products)
                setUsers(data.users)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    return (
        <div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <div className="grid wide">
                <div className="container">
                    <div className="cart__container--empty">
                        <div className="cart__icon"></div>
                        <label className="cart__label--empty">Bạn chưa thêm sản phẩm nào vào trong giỏ hàng!</label>
                        <button className="cart__btn--empty" onClick={() => { window.location.href = "/home" }}>Quay lại trang mua sắm</button>
                    </div>

                    <div className="cart__container">
                        <div className="cart__header">
                            <button className="cart__btn-cancel" onClick={() => { window.location.href = "/home" }}>
                                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Quay lại</button>
                            <h1 className="cart__title">GIỎ HÀNG CỦA BẠN</h1>
                        </div>

                        <ul className="cart__list">
                            <li className="cart__item">
                                <div className="cart__item-img"></div>
                                <div className="cart__item-info">
                                    <label className="cart__item-info-name">Iphone 13 2023 - 256GB - Đen huyền bí</label>
                                    <p className="cart__item-info-price">12.222.112 đ</p>
                                    <p className="cart__item-info-old-price">112131231</p>
                                    <span className="cart__item-info-percent">-5%</span>
                                    <span className="cart__item-info-installment">
                                        <i className="cart__item-info-installment-icon fa fa-tag"></i>
                                        Trả góp 0%</span>
                                    <div className="cart__item-quantity">
                                        <button className="cart__item-quantity-edit">-</button>
                                        <input className="cart__item-quantity-input" defaultValue={1} readOnly />
                                        <button className="cart__item-quantity-edit">+</button>
                                    </div>
                                </div>
                                <button className="cart__item-remove">
                                    <i className="cart__item-remove-icon fa fa-trash"></i>
                                    Xóa
                                </button>
                            </li>
                        </ul>

                        <div className="cart__control-container">
                            <div className="cart__control-total">
                                <label className="cart__control-total-label">Tổng tiền giỏ hàng:</label>
                                <p className="cart__control-total-price">112213123213</p>
                            </div>
                            <div className='cart__control-box'>
                                <button className="cart__control-btn cart__control-btn--payment">Thanh toán giỏ hàng</button>
                                <button className="cart__control-btn cart__control-btn--more">Chọn thêm sản phẩm</button>
                                <button className="cart__control-btn cart__control-btn--remove-all">
                                    <i className="cart__control-icon fa fa-trash"></i>
                                    Xóa tất cả đơn hàng</button>
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

export default Cart;