import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'

const Giftcode = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [cartUser, setCartUser] = useState([])
    const [countTotalPrice, setCountTotalPrice] = useState()

    const [countTotalPriceEdit, setCountTotalPriceEdit] = useState()
    const [giftcodes, setGiftcodes] = useState([])
    const [giftcodeID, setGiftcodeID] = useState('')
    const [percentReduce, setPercentReduce] = useState()

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
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

    const toast = ({ title = "", message = "", type = "info", duration = 3000 }) => {
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

    const showSuccessMessage = () => {
        toast({ title: 'Áp dụng thành công', message: 'Giá của các sản phẩm đã được cập nhật!', type: 'success', duration: 5000 })
    }

    const showErrorMessage = () => {
        toast({ title: 'Bạn chưa nhập mã khuyến mãi', message: 'Vui lòng điền mã khuyến mãi mà bạn có!', type: 'error', duration: 5000 })
    }

    const handleCheckGiftcode = (e) => {
        if (giftcodeID == '')
            showErrorMessage()
        else {
            giftcodes.map((gf, i) => {
                if (giftcodeID === gf.id) {
                    var priceAppliedGiftcode = countTotalPrice * Number((100 - Number(gf.percentReduce)) / 100)
                    setCountTotalPriceEdit(priceAppliedGiftcode)
                    checkGiftcode()
                    document.querySelector(".cart__control-total-price").innerHTML = `<span>${Number(priceAppliedGiftcode).toLocaleString()} đ</span>`
                    showSuccessMessage()
                }
            })
        }
    }

    const checkGiftcode = () => {
        const main = document.querySelector(".detail-price__list");
        if (main) {
            handLoadingPage(1)
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
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm"
            }, 1000)

        }
        else {
            window.localStorage.setItem("countTotalPriceCache", countTotalPrice)
            window.localStorage.setItem("giftcodeApply", '')
            window.localStorage.setItem("percentApply", 0)
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.href = "/cart/info/giftcode/confirm"
            }, 1000)
        }
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        console.log(loading)
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
            <div id="toast-with-navbar"></div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <div className="grid wide">
                <div className="container">
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

        </div>
    );

};

export default Giftcode;