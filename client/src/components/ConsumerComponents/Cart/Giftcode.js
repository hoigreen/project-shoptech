import React, { useState, useEffect } from 'react';
import { Toast, handleLoadingPage } from '../../Common';
import { Breadcrumbs, Nav } from '../Common';

const Giftcode = () => {
    const [users, setUsers] = useState([])

    const [cartUser, setCartUser] = useState([])
    const [countTotalPrice, setCountTotalPrice] = useState()

    const [countTotalPriceEdit, setCountTotalPriceEdit] = useState()
    const [giftcodes, setGiftcodes] = useState([])
    const [giftcodeID, setGiftcodeID] = useState('')
    const [percentReduce, setPercentReduce] = useState()

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })

            fetch("https://server-shoptech.onrender.com/api/giftcodes").then(res => res.json()).then(data => {
                setGiftcodes(data.giftcodes)
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

        // set thông tin % giảm cho khuyến mãi
        giftcodes.map((gf, i) => {
            if (giftcodeID === gf.id) {
                setPercentReduce(gf.percentReduce)
            }
        })

        // show thông tin tổng tiền giỏ hàng
        let countPriceAll = 0
        cartUser.map((cartItem, index) => {
            if (cartItem) countPriceAll += Number(cartItem.price) * cartItem.quantity;
        })
        setCountTotalPrice(countPriceAll)
    })

    const showSuccessMessage = () => {
        Toast({ title: 'Áp dụng thành công', message: 'Giá của các sản phẩm đã được cập nhật!', type: 'success', duration: 5000 })
    }

    const showErrorMessage = () => {
        Toast({ title: 'Bạn chưa nhập mã khuyến mãi', message: 'Vui lòng điền mã khuyến mãi mà bạn có!', type: 'error', duration: 5000 })
    }

    const showErrorGiftcodeIncorrect = () => {
        Toast({ title: 'Mã khuyến mãi không tồn tại hoặc không chính xác', message: 'Vui lòng kiểm tra lại mã khuyến mãi mà bạn có!', type: 'error', duration: 5000 })
    }

    const handleCheckGiftcode = (e) => {
        e.preventDefault()
        var boolCheckGiftcode = false;
        if (giftcodeID == '') showErrorMessage()
        else {
            giftcodes.map((gf, i) => {
                if (giftcodeID === gf.id) {
                    boolCheckGiftcode = true;
                    var priceAppliedGiftcode = countTotalPrice * Number((100 - Number(gf.percentReduce)) / 100)
                    setCountTotalPriceEdit(priceAppliedGiftcode)
                    checkGiftcode()
                    document.querySelector(".cart__control-total-price").innerHTML = `<span>${Number(priceAppliedGiftcode).toLocaleString()} đ</span>`
                    showSuccessMessage()
                    return;
                }
            })

            if (!boolCheckGiftcode) showErrorGiftcodeIncorrect()
        }
    }

    const checkGiftcode = () => {
        const main = document.querySelector(".detail-price__list");
        if (main) {
            handleLoadingPage(1)
            setTimeout(() => {
                main.style.animation = `fadeIn ease 1.5s`;
                main.innerHTML = `
                    <label class="detail-price__header">Chi tiết đơn hàng</label>
                    <li class='detail-price__item'>
                        <label class="detail-price__item-label">Tổng giá trị giỏ hàng hiện tại: </label>
                        <span class="detail-price__item-price">${Number(countTotalPrice).toLocaleString()} đ</span>
                    </li>
    
                    <li class='detail-price__item'>
                        <label class="detail-price__item-label">Áp dụng mã giảm giá:</label>
                        <span class="detail-price__item-price">-${percentReduce}% = -${(Number(countTotalPrice) * percentReduce / 100).toLocaleString()} đ</span>
                    </li>
    
                    <li class='detail-price__item detail-price__item-total'>
                        <label class="detail-price__item-label">Thành tiền</label>
                        <span class="detail-price__item-price" style={{ color: 'red' }}>${(Number(countTotalPrice) * (100 - percentReduce) / 100).toLocaleString()} đ</span>
                    </li>
                `
            }, 1000)
        }
    }

    const handleNextStep = () => {
        if (countTotalPriceEdit) {
            window.localStorage.setItem("countTotalPriceCache", countTotalPriceEdit)
            window.localStorage.setItem("percentApply", percentReduce)
            window.localStorage.setItem("giftcodeApply", giftcodeID)
            handleLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm"
            }, 1000)

        }
        else {
            window.localStorage.setItem("countTotalPriceCache", countTotalPrice)
            window.localStorage.setItem("giftcodeApply", '')
            window.localStorage.setItem("percentApply", 0)
            handleLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm"
            }, 1000)
        }
    }

    return (
        <>
            <Nav />
            <Breadcrumbs />
            <div id="toast-with-navbar"></div>
            <div className="grid wide">
                <div className="container" style={{ paddingBottom: "200px" }}>
                    <div className="cart__container" style={{ display: "flex", width: "64%" }}>
                        <div className="cart__header">
                            <button className="cart__btn-cancel" onClick={() => { window.location.href = "/cart/info" }}>
                                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở lại trang thông tin đơn hàng</button>
                            <h1 className="cart__title">MÃ KHUYẾN MÃI CỦA BẠN</h1>
                        </div>
                        <div className="form cart-info__form" id="form-info-cart">
                            <div className="spacer"></div>
                            <div className="cart-info__group">
                                <label className="cart-info__label">Nhập mã khuyến mãi của bạn vào đây (nếu có)</label>
                                <div className="form-group">
                                    <input style={{ color: "red", fontWeight: "500" }}
                                        id="giftcode"
                                        name="giftcode"
                                        type="text"
                                        placeholder="Mã khuyến mãi (tùy chọn)"
                                        onChange={(e) => setGiftcodeID(e.target.value)}
                                        defaultValue={window.localStorage.getItem("giftcodeApply")}
                                        className="form-control cart-info__input">
                                    </input>
                                </div>
                            </div>
                            <button className='giftcode__btn' onClick={handleCheckGiftcode}>Xác nhận</button>
                            <ul className='detail-price__list'>
                            </ul>
                        </div>

                    </div>
                </div>

                <ul className="block-process" style={{ marginTop: '25px' }}>
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

                    <li className="block-process__item">
                        <i className='block-process__item-icon fa fa-check'></i>
                        <label className='block-process__item-label'>Xác nhận đơn hàng</label>
                    </li>
                    <i className='block-process__item-arrow'>↓</i>

                    <li className="block-process__item">
                        <i className='block-process__item-icon fa fa-credit-card'></i>
                        <label className='block-process__item-label'>Thanh toán</label>
                    </li>
                </ul>

                <div className="cart__control-container">
                    <div className="cart__control-total">
                        <label className="cart__control-total-label">Tổng tiền giỏ hàng:</label>
                        <p className="cart__control-total-price">{Number(countTotalPrice).toLocaleString() || 0} đ</p>
                    </div>
                    <div className='cart__control-box'>
                        <button className="cart__control-btn cart__control-btn--payment" onClick={(e) => { handleNextStep() }}>Bước tiếp theo</button>
                        <button className="cart__control-btn cart__control-btn--more" style={{ width: "100%" }} onClick={(e) => { window.location.href = "/cart/" }}>Quay lại trang thông tin giỏ hàng</button>
                    </div>
                </div>
            </div>
        </>
    );

};

export default Giftcode;