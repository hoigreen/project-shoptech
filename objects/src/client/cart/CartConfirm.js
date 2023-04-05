import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'

const CartConfirm = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [cartUser, setCartUser] = useState([])
    const [totalPriceOld, setTotalPriceOld] = useState()
    const [countTotalPrice, setCountTotalPrice] = useState()

    const [countTotalPriceEdit, setCountTotalPriceEdit] = useState()
    const [giftcodes, setGiftcodes] = useState([])
    const [orderID, setOrderID] = useState('')

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            })

            fetch("http://localhost:4000/api/giftcodes").then(res => res.json()).then(data => {
                setGiftcodes(data.giftcodes)
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
        let countTotalPriceOld = 0
        cartUser.map((cartItem, index) => {
            if (cartItem) {
                countTotalPriceOld += Number(cartItem.price) * (100 + cartItem.percent) / 100 * cartItem.quantity;
                countPriceAll += Number(cartItem.price) * cartItem.quantity;
            }

        })
        setTotalPriceOld(countTotalPriceOld)
        setCountTotalPrice(countPriceAll)
    })

    window.onload = () => {
        setOrderID(makeID(10))
    }

    const makeID = (length) => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    const handleNextStep = () => {
        if (countTotalPriceEdit) {
            window.localStorage.setItem("countTotalPriceCache", countTotalPriceEdit)
            window.localStorage.setItem('orderIDCache', orderID)
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm/payment"
            }, 1000)
        }
        else {
            window.localStorage.setItem("countTotalPriceCache", countTotalPrice)
            window.localStorage.setItem('orderIDCache', orderID)
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm/payment"
            }, 1000)
        }
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }


    return (
        <div>
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <div className="grid wide">
                <div className="container">
                    <div className="cart__container" style={{ display: "flex", width: "60%" }}>
                        <div className="cart__header">
                            <button className="cart__btn-cancel" onClick={() => { window.location.href = "/cart/info/giftcode" }}>
                                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở lại trang trước</button>
                            <h1 className="cart__title">XÁC NHẬN ĐƠN HÀNG</h1>

                            <ul className="cart-confirm__list-info">
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Mã đơn hàng của bạn:
                                        <span className="cart-confirm__label-span">(Hãy lưu lại mã đơn hàng nhé)</span>
                                    </label>
                                    <p className='cart-confirm__data' style={{ color: 'red' }}>{orderID}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Người đặt hàng:</label>
                                    <p className='cart-confirm__data' style={{ color: 'green' }}>{window.localStorage.getItem("fullnameCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Email:</label>
                                    <p className='cart-confirm__data'>{window.localStorage.getItem("emailCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Số điện thoại:</label>
                                    <p className='cart-confirm__data'>{window.localStorage.getItem("phoneCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Hình thức nhận hàng:</label>
                                    <p className='cart-confirm__data'>{window.localStorage.getItem("methodCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Địa chỉ nhận hàng:</label>
                                    <p className='cart-confirm__data'>{window.localStorage.getItem("addressCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Ghi chú:</label>
                                    <p className='cart-confirm__data' style={{ fontSize: "1.6rem", fontWeight: "400", fontStyle: "italic" }}>"{window.localStorage.getItem("noteCache")}"</p>
                                </li>
                            </ul>

                            <ul className='cart-confirm__list'>
                                <label className="detail-price__header">Chi tiết sản phẩm</label>
                                {loading ? <p>Đang kết nối đến server ... </p> : cartUser.map((product, i) => (
                                    <li className="cart-confirm__item-product" key={i}>
                                        <img className='cart-confirm__item-product-img' src={product.imageLink}></img>
                                        <div className='cart-confirm__item-product-info'>
                                            <label className='cart-confirm__item-product-info-label'>{product.productName}</label>
                                            <p className='cart-confirm__item-product-info-quantity'>x{product.quantity}</p>
                                            <p className='cart-confirm__item-product-info-price'>{product.quantity} x {Number(product.price).toLocaleString()} đ = {Number(product.quantity * product.price).toLocaleString()} đ</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <ul className='cart-confirm__list'>
                                <label className="detail-price__header">Chi tiết đơn hàng</label>
                                <li className='detail-price__item'>
                                    <label className="detail-price__item-label">Tổng giá trị giỏ hàng: </label>
                                    <span className="detail-price__item-price">{Number(totalPriceOld).toLocaleString()} đ</span>
                                </li>

                                {loading ? <p>Đang kết nối đến server ... </p> : cartUser.map((product, i) => (
                                    <li className='detail-price__item' key={i}>
                                        <label className="detail-price__item-label">Khuyến mãi giảm cho sản phẩm #{i + 1}: </label>
                                        <span className="detail-price__item-price">- {Number(product.percent)}% = {Number(product.percent / 100 * product.price).toLocaleString()} đ</span>
                                    </li>
                                ))}

                                <li className='detail-price__item'>
                                    <label className="detail-price__item-label">Áp dụng mã giảm giá <span style={{ color: "red", fontWeight: "600" }}>{window.localStorage.getItem('giftcodeApply')}</span>:</label>
                                    <span className="detail-price__item-price">- {Number(window.localStorage.getItem("percentApply"))}% = {Number(Number(window.localStorage.getItem("percentApply")) / 100 * Number(countTotalPrice)).toLocaleString()} đ</span>
                                </li>

                                <li className='detail-price__item'>
                                    <label className="detail-price__item-label">Phí vận chuyển:</label>
                                    <span className="detail-price__item-price">29,000 đ</span>
                                </li>
                                <li className='detail-price__item'>
                                    <label className="detail-price__item-label">Giảm giá phí vận chuyển:</label>
                                    <span className="detail-price__item-price">- 100% = - 29,000 đ</span>
                                </li>

                                <li className='detail-price__item detail-price__item-total'>
                                    <label className="detail-price__item-label">Thành tiền</label>
                                    <span className="detail-price__item-price" style={{ color: 'red' }}>{Number(window.localStorage.getItem("countTotalPriceCache")).toLocaleString()} đ</span>
                                </li>
                                <p className='detail-price__item-describe'>Vui lòng hoàn tất thanh toán đơn hàng với giá trị
                                    <span style={{ color: 'red', margin: "0 4px" }} >{Number(Number(window.localStorage.getItem("countTotalPriceCache")).toFixed(0)).toLocaleString()} đ</span>
                                    trước khi nhận hàng</p>
                            </ul>
                        </div>
                        <div className="cart-info__group">
                            <div className="cart-info__input-radio-container">
                                <input name="info-default" type="checkbox" className="cart-info__input-radio"></input>
                                <label className='cart-info__input-radio-describe' style={{ fontSize: "2rem", color: "red", fontWeight: "bold" }}>Vui lòng xác nhận thông tin bạn nhập vào là chính xác</label>
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="block-process" style={{ marginTop: "20px" }}>
                    <li className="block-process__item block-process__item--active">
                        <i className='block-process__item-icon block-process__item-icon--active fa fa-shopping-cart '></i>
                        <label className='block-process__item-label'>Chọn sản phẩm</label>
                    </li>
                    <i className='block-process__item-arrow block-process__item-arrow--active'>↓</i>

                    <li className="block-process__item block-process__item--active">
                        <i className='block-process__item-icon fa fa-user block-process__item-icon--active'></i>
                        <label className='block-process__item-label'>Thông tin đơn hàng</label>
                    </li>
                    <i className='block-process__item-arrow block-process__item-arrow--active'>↓</i>

                    <li className="block-process__item block-process__item--active">
                        <i className='block-process__item-icon fa fa-tag block-process__item-icon--active'></i>
                        <label className='block-process__item-label '>Mã khuyến mãi</label>
                    </li>
                    <i className='block-process__item-arrow block-process__item-arrow--active'>↓</i>

                    <li className="block-process__item block-process__item--active">
                        <i className='block-process__item-icon fa fa-check block-process__item-icon--active'></i>
                        <label className='block-process__item-label'>Xác nhận đơn hàng</label>
                    </li>
                    <i className='block-process__item-arrow block-process__item-arrow--active'>↓</i>

                    <li className="block-process__item">
                        <i className='block-process__item-icon fa fa-credit-card'></i>
                        <label className='block-process__item-label'>Thanh toán</label>
                    </li>
                </ul>

                <div className="cart__control-container">
                    <div className='cart__control-box'>
                        <button className="cart__control-btn cart__control-btn--payment" onClick={(e) => { handleNextStep() }}>Xác nhận & Tiến hành thanh toán</button>
                        <button className="cart__control-btn cart__control-btn--more" style={{ width: "100%" }} onClick={(e) => { window.location.href = "/cart/" }}>Quay lại trang thông tin giỏ hàng</button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default CartConfirm;