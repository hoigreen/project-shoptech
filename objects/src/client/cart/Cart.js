import React, { useState, useEffect } from 'react';
import Nav from '../common/Nav'
import Breadcrumbs from '../common/Breadcrumbs'

const Cart = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])
    const [countTotalPrice, setCountTotalPrice] = useState()

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
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


        // show điều kiện giỏ hàng
        for (let i = 0; i < 5; i++) {
            if (cartUser.length == 0) {
                document.querySelector('.cart__container--empty').style.display = 'flex';
                document.querySelector('.cart__control-container').style.display = 'none';
            }
            else {
                document.querySelector('.cart__container').style.display = 'flex';
                document.querySelector('.cart__control-container').style.display = 'flex';
                document.querySelector('.cart__container--empty').style.display = 'none'
            }
        }

    })

    const handleClickAddQuantity = (indexProduct) => {
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("addQuantityProductInCart",
                    {
                        userID: user.userID,
                    }, indexProduct
                )
            }
        })
        handLoadingPage(1)
        window.setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const handleClickMinusQuantity = (indexProduct) => {
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("minusQuantityProductInCart",
                    {
                        userID: user.userID,
                    }, indexProduct
                )
            }
        })
        handLoadingPage(1)
        window.setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const handleClickRemoveProduct = (indexProduct) => {
        users.map((user, index) => {
            if (window.localStorage.getItem("userLogged") === user.username) {
                socket.emit("removeProductInCart",
                    {
                        userID: user.userID,
                    }, indexProduct
                )
            }
        })
        handLoadingPage(1)
        window.setTimeout(() => {
            window.location.reload()
        }, 1000)
    }

    const handleClickRemoveAll = () => {
        if (window.confirm("Bạn có chắc muốn xóa toàn bộ sản phẩm trong giỏ hàng")) {
            users.map((user, index) => {
                if (window.localStorage.getItem("userLogged") === user.username) {
                    socket.emit("removeAllInCart",
                        {
                            userID: user.userID,
                        }
                    )
                }
            })
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload()
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
                <div className="container" style={{ paddingBottom: "200px" }}>
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
                            {loading ? <p>Đang kết nối đến server ... </p> : cartUser.map((p, index) => (
                                <li className="cart__item">
                                    <div className="cart__item-img" style={{
                                        background: `url(${p.imageLink})`,
                                        backgroundColor: "transparent",
                                        backgroundPosition: "center center",
                                        backgroundSize: "contain",
                                        backgroundRepeat: "no-repeat"
                                    }}></div>
                                    <div className="cart__item-info">
                                        <label className="cart__item-info-name">{p.productName} - {p.option} - {p.color}</label>
                                        <p className="cart__item-info-price">{Number(p.price).toLocaleString()} đ</p>
                                        <p className="cart__item-info-old-price">{(Number(p.price) * (100 + p.percent) / 100).toLocaleString()}đ</p>
                                        <span className="cart__item-info-percent">-{p.percent}%</span>
                                        <span className="cart__item-info-installment">
                                            <i className="cart__item-info-installment-icon fa fa-tag"></i>
                                            Trả góp 0%</span>
                                        <div className="cart__item-quantity">
                                            <button className="cart__item-quantity-edit" onClick={(e) => { handleClickMinusQuantity(index + 1) }}>-</button>
                                            <input className="cart__item-quantity-input" defaultValue={p.quantity} readOnly />
                                            <button className="cart__item-quantity-edit" onClick={(e) => { handleClickAddQuantity(index + 1) }}>+</button>
                                        </div>
                                    </div>
                                    <button className="cart__item-remove" onClick={(e) => { handleClickRemoveProduct(index + 1) }}>
                                        <i className="cart__item-remove-icon fa fa-trash"></i>
                                        Xóa
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="cart__control-container">
                    <div className="cart__control-total">
                        <label className="cart__control-total-label">Tổng tiền giỏ hàng:</label>
                        <p className="cart__control-total-price">{Number(countTotalPrice).toLocaleString() || 0} đ</p>
                    </div>
                    <div className='cart__control-box'>
                        <button className="cart__control-btn cart__control-btn--payment" onClick={(e) => {
                            handLoadingPage(1)
                            window.setTimeout(() => {
                                window.location.href = "/cart/info"
                            }, 1000)
                        }}>Tiến hành đặt hàng</button>
                        <button className="cart__control-btn cart__control-btn--more" onClick={(e) => { window.location.href = "/home" }}>Chọn thêm sản phẩm</button>
                        <button className="cart__control-btn cart__control-btn--remove-all" onClick={handleClickRemoveAll}>
                            <i className="cart__control-icon fa fa-trash"></i>
                            Xóa tất cả đơn hàng</button>
                    </div>
                </div>
            </div>

        </div>
    );

};

export default Cart;