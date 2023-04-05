import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'

const Payment = ({ socket }) => {
    const [users, setUsers] = useState([])

    const [cartUser, setCartUser] = useState([])

    const [orders, setOrders] = useState([])


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })

            fetch("http://localhost:4000/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
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
        toast({ title: 'ĐẶT HÀNG THÀNH CÔNG', message: 'Đơn hàng của bạn đã được xác nhận, vui lòng kiểm tra đơn hàng trong tài khoản của bạn nhé!', type: 'success', duration: 5000 })
    }
    const showErrorMessage = () => {
        toast({ title: 'ĐẶT HÀNG THẤT BẠI', message: 'Đơn hàng của bạn đã được xác nhận, Vui lòng tạo đơn hàng khác nhé!', type: 'error', duration: 5000 })
    }

    const handleSelectMethod = (e) => {
        const methodItems = document.querySelectorAll('.payment__item')
        methodItems.forEach((methodItem, index) => {
            methodItem.onclick = () => {
                const methodItemActive = document.querySelector(".payment__item.payment__item--active")
                if (methodItemActive) {
                    methodItemActive.classList.remove("payment__item--active")
                    methodItem.classList.add('payment__item--active')
                } else {
                    methodItem.classList.add('payment__item--active')
                }
            }
        })
    }

    const handleComplePayment = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        orders.map((order, i) => {
            if (order.orderID === window.localStorage.getItem("orderIDCache")) {
                showErrorMessage()
                return;
            }
            if (i === orders.length - 1) {
                socket.emit("addOrder", {
                    orderID: window.localStorage.getItem("orderIDCache"),
                    owner: window.localStorage.getItem("userLogged"),
                    fullname: window.localStorage.getItem("fullnameCache"),
                    email: window.localStorage.getItem("emailCache"),
                    phone: window.localStorage.getItem("phoneCache"),
                    method: window.localStorage.getItem("methodCache"),
                    address: window.localStorage.getItem("addressCache"),
                    note: window.localStorage.getItem("noteCache"),
                    price: window.localStorage.getItem("countTotalPriceCache"),
                    giftcodeApply: window.localStorage.getItem("percentApply"),
                    time: dateTime,
                    status: "Đang giao hàng",
                    lists: cartUser
                });
                handLoadingPage(2)
                setTimeout(() => {
                    completePayment()
                }, 2000)
                showSuccessMessage()
            }
        })
    }

    const completePayment = () => {
        localStorage.removeItem("orderIDCache");
        localStorage.removeItem("fullnameCache");
        localStorage.removeItem("emailCache");
        localStorage.removeItem("phoneCache");
        localStorage.removeItem("methodCache");
        localStorage.removeItem("addressCache");
        localStorage.removeItem("noteCache");
        localStorage.removeItem("countTotalPriceCache");
        localStorage.removeItem("giftcodeApply");
        localStorage.removeItem("percentApply");
        localStorage.removeItem("cartGuest");

        const paymentBox = document.querySelector(".cart__container")
        var countSeconds = 15;
        const x = setInterval(() => {
            var secondLeft = document.querySelector(".payment-done__redirect-second")
            countSeconds -= 1;
            console.log(countSeconds)
            secondLeft.innerHTML = `${countSeconds} giây`
            if (countSeconds <= 0) {
                window.location.href = "/home";
                clearInterval(x)
            }
        }, 1000)

        paymentBox.innerHTML = `
            <div class='payment-done__box'>
                <div class="payment-done__icon checkmark-circle">
                    <div class="background"></div>
                    <div class="checkmark draw"></div>
                </div>
                <label class='payment-done__label'>Thanh toán đơn hàng thành công</label>
                <p class='payment-done__describe'>Vui lòng đợi từ một chút để hệ thống xác nhận đơn hàng của bạn</p>
                <p class='payment-done__thanks'>Cám ơn bạn đã mua hàng và sử dụng dịch vụ của ShopTECH</p>
                <p class="payment-done__redirect"> Tự động chuyển hướng tới trang chủ sau <span class='payment-done__redirect-second'>${countSeconds} giây</span> ... </p>
            </div>
        `
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
            <div id="toast-with-navbar"></div>
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
                            <button className="cart__btn-cancel" onClick={() => { window.location.href = "/cart/info/giftcode/confirm" }}>
                                <i className="cart__btn-cancel-icon fa fa-arrow-left"></i>Trở lại trang trước</button>
                            <h1 className="cart__title">THANH TOÁN ĐƠN HÀNG</h1>

                            <ul className="cart-confirm__list-info">
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Mã đơn hàng của bạn:
                                        <span className="cart-confirm__label-span">(Hãy lưu lại mã đơn hàng nhé)</span>
                                    </label>
                                    <p className='cart-confirm__data' style={{ color: 'green' }}>{window.localStorage.getItem("orderIDCache")}</p>
                                </li>
                                <li className="cart-confirm__item">
                                    <label className='cart-confirm__label'>Tổng số tiền thanh toán:</label>
                                    <p className='cart-confirm__data' style={{ color: 'red' }}>{Number(window.localStorage.getItem("countTotalPriceCache")).toLocaleString()} đ</p>
                                </li>
                            </ul>

                            <ul className='cart-confirm__list'>
                                <label className="detail-price__header">Hình thức thanh toán</label>
                                <ul className='payment__list'>
                                    <li className="payment__item payment__item--active" onClick={handleSelectMethod}>
                                        <label className='payment__item-label'>Thanh toán khi nhận hàng</label>
                                        <img className='payment__item-img' src='https://cellphones.com.vn/cart/_nuxt/img/COD.7245762.png' alt=''></img>
                                    </li>

                                    <li className="payment__item" onClick={handleSelectMethod}>
                                        <label className='payment__item-label'>Thanh toán qua ZaloPay</label>
                                        <img className='payment__item-img' src='https://cellphones.com.vn/cart/_nuxt/img/zalopay.08ce522.png' alt=''></img>
                                    </li>

                                    <li className="payment__item" onClick={handleSelectMethod}>
                                        <label className='payment__item-label'>Thanh toán qua VNPay</label>
                                        <img className='payment__item-img' src='https://cellphones.com.vn/cart/_nuxt/img/vnpay.c0bd59b.png' alt=''></img>
                                    </li>
                                </ul>
                            </ul>
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

                    <li className="block-process__item block-process__item--active">
                        <i className='block-process__item-icon fa fa-credit-card block-process__item-icon--active'></i>
                        <label className='block-process__item-label'>Thanh toán</label>
                    </li>
                </ul>

                <div className="cart__control-container">
                    <div className='cart__control-box' style={{ paddingTop: "10px" }}>
                        <button className="cart__control-btn cart__control-btn--payment" onClick={(e) => { handleComplePayment() }}>Hoàn tất đặt hàng</button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Payment;