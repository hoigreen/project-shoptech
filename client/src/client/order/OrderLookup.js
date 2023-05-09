import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'
import Footer from '../common/Footer';

const OrderLookup = () => {
    const [orders, setOrders] = useState([])

    const [phone, setPhone] = useState('')
    const [orderID, setOrderID] = useState('')

    const [lists, setLists] = useState([])
    const [totalPriceOld, setTotalPriceOld] = useState()
    const [countTotalPrice, setCountTotalPrice] = useState()
    const [percentApply, setPercentApply] = useState('')


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        orders.map((order, i) => {
            if (phone === order.phone && orderID === order.orderID)
                setLists(order.lists)
            setPercentApply(order.giftcodeApply)
        })

        // show thông tin tổng tiền giỏ hàng
        let countTotalPriceOld = 0
        let countPriceAll = 0
        lists.map((item, index) => {
            if (item) {
                countTotalPriceOld += Number(item.price) * (100 + item.percent) / 100 * item.quantity;
                countPriceAll += Number(item.price) * item.quantity;
            }

        })
        setTotalPriceOld(countTotalPriceOld)
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

    const showErrorToast = () => {
        toast({ title: 'Tìm kiếm thất bại', message: 'Không tìm thấy đơn hàng mà bạn muốn!', type: 'error', duration: 3000 })
    }

    const handleLookup = (e) => {
        e.preventDefault()
        handLoadingPage(3)
        setTimeout(() => {
            var boolCheck = false;
            const result = document.querySelector(".order-result__box")
            orders.map((order, index) => {
                if (phone === order.phone && orderID === order.orderID) {
                    document.querySelector(".order-lookup__box").style.display = "none"
                    boolCheck = true;
                    result.style.animation = "fadeIn 0.2s linear"
                    result.innerHTML = `
                <div class="cart__container" style="display: flex;, width: 60%">
                    <div class="cart__header">
                    <h1 class="cart__title" style='padding: 30px 0'>THÔNG TIN ĐƠN HÀNG</h1>

                    <ul class="cart-confirm__list-info">
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Mã đơn hàng của bạn:</label>
                            <p class='cart-confirm__data' style='color: red'>${orderID}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Người đặt hàng:</label>
                            <p class='cart-confirm__data' style='color: green'>${order.fullname}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Email:</label>
                            <p class='cart-confirm__data' style='font-weight: 400'>${order.email}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Số điện thoại:</label>
                            <p class='cart-confirm__data' style='font-weight: 600'>${order.phone}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Hình thức nhận hàng:</label>
                            <p class='cart-confirm__data' style='font-weight: 400'>${order.method}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Địa chỉ nhận hàng:</label>
                            <p class='cart-confirm__data' style='font-weight: 400'>${order.address}</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Ghi chú:</label>
                            <p class='cart-confirm__data' style='font-size: 1.6rem; font-weight: 400; font-style: italic;'>"${order.note}"</p>
                        </li>
                        <li class="cart-confirm__item">
                            <label class='cart-confirm__label'>Trạng thái đơn hàng:</label>
                            <p class='cart-confirm__data' style="font-weight: 600; color: blue">${order.status}</p>
                        </li>
                    </ul>

                    <ul class='cart-confirm__list'>
                        <label class="detail-price__header">Chi tiết sản phẩm</label>
                       ${loading ? <p>Đang kết nối đến server ... </p> : lists.map((item, i) => (
                        `<li class="cart-confirm__item-product" key="${i}">
                                <img class='cart-confirm__item-product-img' src="${item.imageLink}"></img>
                                <div class='cart-confirm__item-product-info'>
                                    <label class='cart-confirm__item-product-info-label'>${item.productName}</label>
                                    <p class='cart-confirm__item-product-info-quantity'>x${item.quantity}</p>
                                    <p class='cart-confirm__item-product-info-price'>${item.quantity} x ${Number(item.price).toLocaleString()} đ = ${Number(item.quantity * item.price).toLocaleString()} đ</p>
                                </div>
                            </li>`
                    ))}
                    </ul>

                    <ul class='cart-confirm__list'>
                        <label class="detail-price__header">Chi tiết đơn hàng</label>
                        <li class='detail-price__item'>
                            <label class="detail-price__item-label">Tổng giá trị đơn hàng: </label>
                            <span class="detail-price__item-price">${Number(totalPriceOld).toLocaleString()} đ</span>
                        </li>

                        ${loading ? <p>Đang kết nối đến server ... </p> : lists.map((item, i) => (
                        `<li class='detail-price__item' key="${i}">
                                <label class="detail-price__item-label">Khuyến mãi giảm cho sản phẩm #${i + 1}: </label>
                                <span class="detail-price__item-price">- ${Number(item.percent)}% = ${Number(item.percent / 100 * item.price).toLocaleString()} đ</span>
                            </li>`
                    ))}

                        <li class='detail-price__item'>
                            <label class="detail-price__item-label">Áp dụng mã giảm giá:</label>
                            <span class="detail-price__item-price">- ${Number(percentApply)}% = ${Number(Number(percentApply) / 100 * Number(countTotalPrice)).toLocaleString()} đ</span>
                        </li>

                        <li class='detail-price__item'>
                            <label class="detail-price__item-label">Phí vận chuyển:</label>
                            <span class="detail-price__item-price">29,000 đ</span>
                        </li>
                        <li class='detail-price__item'>
                            <label class="detail-price__item-label">Giảm giá phí vận chuyển:</label>
                            <span class="detail-price__item-price">- 100% = - 29,000 đ</span>
                        </li>

                        <li class='detail-price__item detail-price__item-total'>
                            <label class="detail-price__item-label">Thành tiền</label>
                            <span class="detail-price__item-price" style="color:red">${Number(countTotalPrice).toLocaleString()} đ</span>
                        </li>
                    </ul>
                </div>
            </div>`
                }
            })
            if (boolCheck == false)
                showErrorToast();

        }, 3000)
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
                        <div>Đang tìm kiếm đơn hàng ...</div>
                    </div>
                </div>
            </div>
            <Nav />
            <Breadcrumbs />
            <div id="toast-with-navbar"></div>
            <div className="container">
                <div className="grid wide">
                    <div className="order-lookup__box">
                        <label className="order-lookup__box-header">TRA CỨU ĐƠN HÀNG</label>
                        <label className="order-lookup__box-label">Số điện thoại</label>
                        <input style={{ fontWeight: 'bold', color: 'green' }}
                            className="order-lookup__box-input" type="phone"
                            required
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                        >
                        </input>
                        <label className="order-lookup__box-label">Mã đơn hàng</label>

                        <input style={{ textTransform: "uppercase" }}
                            className="order-lookup__box-input"
                            type="text"
                            required
                            value={orderID}
                            onChange={(e) => { setOrderID(e.target.value) }}
                        >
                        </input>
                        <button className="order-lookup__box-btn" onClick={handleLookup}>TRA CỨU</button>
                    </div>

                    <div className="order-result__box">
                    </div>
                </div>
            </div>
            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>

    )
}

export default OrderLookup