import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav';
import HotPromote from '../common/HotPromote';
import Footer from '../common/Footer';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Home = () => {
    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setProducts(data.products)
                setPromotes(data.promotes)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    const navigate = useNavigate();

    window.onload = () => {
        var countDownDate = new Date(`3 ${timeEnd}, 2023 00:00:00`).getTime();
        const countdown = setInterval(() => {
            var now = new Date().getTime();
            var timeleft = countDownDate - now;

            // Calculating the days, hours, minutes and seconds left
            var daysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
            var hoursLeft = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutesLeft = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
            var secondsLeft = Math.floor((timeleft % (1000 * 60)) / 1000);

            document.querySelector('.home__flash-sale-countdown-day').innerHTML = `<span>${daysLeft} ngày</span>`;
            document.querySelector('.home__flash-sale-countdown-hour').innerHTML = `<span>${hoursLeft}</span>`;
            document.querySelector('.home__flash-sale-countdown-minute').innerHTML = `<span>${minutesLeft}</span>`;
            document.querySelector('.home__flash-sale-countdown-second').innerHTML = `<span>${secondsLeft}</span>`;

            if (timeleft < 0) {
                clearInterval(countdown);
            }
        }, 1000)
    }


    useEffect(() => {
        // show thông tin sản phẩm hot deal
        products.map((product, index) => {
            const infoProductHotDeal = document.querySelectorAll('.home__flash-sale-item')[index];
            if (product.hotDeal === true) {
                infoProductHotDeal.style.display = "block";
            }
        })

        // show thông tin điện thoại nổi bật
        products.map((product, index) => {
            const infoProductFeaturedSmartphone = document.querySelectorAll('.product__sell-item--smartphone')[index];
            if (product.type === "Điện thoại" && product.featured === true) {
                infoProductFeaturedSmartphone.style.display = "block";
            }
        })

        // show thông tin laptop nổi bật
        products.map((product, index) => {
            const infoProductFeaturedLaptop = document.querySelectorAll('.product__sell-item--laptop')[index];
            if (product.type === "Máy tính xách tay" && product.featured === true) {
                infoProductFeaturedLaptop.style.display = "block";
            }
        })

        //  show thông tin tablet nổi bật
        products.map((product, index) => {
            const infoProductFeaturedTablet = document.querySelectorAll('.product__sell-item--tablet')[index];
            if (product.type === "Máy tính bảng" && product.featured === true) {
                infoProductFeaturedTablet.style.display = "block";
            }
        })

        //  show thông tin phụ kiện nổi bật
        products.map((product, index) => {
            const infoProductFeaturedAccessories = document.querySelectorAll('.product__sell-item--accessories')[index];
            if (product.type === "Phụ kiện" && product.featured === true) {
                infoProductFeaturedAccessories.style.display = "block";
            }
        })
    })

    return (
        <div>
            <Nav socket={socket} />
            <div className=''>
                <HotPromote socket={socket} />
                <div className="grid wide">
                    <div className="home__container">
                        <ul id="home-promote">
                            <button className='home-promote__pre'>
                                <i className='home-promote__icon fa fa-arrow-left'></i>
                            </button>
                            <button className='home-promote__next'>
                                <i className='home-promote__icon fa fa-arrow-right'></i>
                            </button>
                            {loading ? <p>Đang kết nối đến server...</p> : promotes.map((promote, index) => (
                                <li style={{
                                    background: `url(${promote.imageLink})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center center",
                                    backgroundSize: "cover"
                                }} className='home-promote__item' key={index}></li>
                            ))}
                        </ul>

                        <div id="home__list">
                            <div className="home__list-label">Danh mục sản phẩm</div>
                            <ul className="home__list-product">
                                <li className='home__list-product-item' onClick={(e) => { navigate('/smartphone') }}>
                                    <div className="home__list-product-img-1" ></div>
                                    <p className="home__list-product-name">Điện thoại di động</p>
                                </li>
                                <li className='home__list-product-item' onClick={(e) => { navigate('/laptop') }}>
                                    <div className="home__list-product-img-2"></div>
                                    <p className="home__list-product-name">Máy tính xách tay</p>
                                </li>
                                <li className='home__list-product-item' onClick={(e) => { navigate('/tablet') }}>
                                    <div className="home__list-product-img-3" ></div>
                                    <p className="home__list-product-name">Máy tính bảng</p>
                                </li>
                                <li className='home__list-product-item' onClick={(e) => { navigate('/accessories') }}>
                                    <div className="home__list-product-img-4"></div>
                                    <p className="home__list-product-name">Phụ kiện đỉnh chóp</p>
                                </li>
                            </ul>
                        </div>

                        <div id="home__flash-sale">
                            <div className="home__flash-sale-label">Khuyến mãi cực <span>HOT</span> - 🔥🔥🔥</div>
                            <div className='home__flash-sale-banner'></div>
                            <div className="home__flash-sale-container">
                                <div className="home__flash-sale-header">
                                    <div className="home__flash-sale-background"></div>
                                    <div className='home__flash-sale-header-col'>
                                        <div className="home__flash-sale-title">Giờ vàng săn DEAL</div>
                                        <div className="home__flash-sale-countdown">Kết thúc trong:</div>
                                        <div className="home__flash-sale-countdown-day"></div>
                                        <span className="home__flash-sale-countdown-sepetate">:</span>
                                        <div className="home__flash-sale-countdown-hour"></div>
                                        <span className="home__flash-sale-countdown-sepetate">:</span>
                                        <div className="home__flash-sale-countdown-minute"></div>
                                        <span className="home__flash-sale-countdown-sepetate">:</span>
                                        <div className="home__flash-sale-countdown-second"></div>
                                    </div>
                                    <div className='home__flash-sale-header-col'>
                                        <div className="home__flash-sale-time">Thời gian khuyến mãi</div>
                                        <div className='home__flash-sale-time-valid'>{timeStart} - {timeEnd}/3/2023</div>
                                    </div>
                                </div>

                                <ul className="home__flash-sale-list">
                                    {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                        <li
                                            className="home__flash-sale-item"
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                window.location.href = `/${product.enType}/${product.name}`
                                            }}
                                        >
                                            <div style={{
                                                background: `url(${product.imageLink})`,
                                                backgroundColor: "transparent",
                                                backgroundPosition: "center center",
                                                backgroundSize: "95%",
                                                backgroundRepeat: "no-repeat"
                                            }} className='home__flash-sale-item-img'></div>
                                            <label className='home__flash-sale-item-label'>{product.name}</label>
                                            <label className='home__flash-sale-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                            <span className='home__flash-sale-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                            <label className='home__flash-sale-item-sold'>
                                                Đã bán
                                                <span className='home__flash-sale-item-number'>{Math.floor((Number((Math.random() % 100 * (99 - 1)))))}</span>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div id="home__featured">
                            <div className="home__featured-label">⚡⚡⚡ Sản phẩm nổi bật ⚡⚡⚡</div>

                            <div className='home__featured-banner-phone'></div>
                            <div className="home__featured-type" onClick={(e) => { navigate('/smartphone') }}>ĐIỆN THOẠI</div>
                            <div className="home__featured-brand-list">
                                <button className="home__product-brand-item">Apple</button>
                                <button className="home__product-brand-item">Samsung</button>
                                <button className="home__product-brand-item">Xiaomi</button>
                                <button className="home__product-brand-item">Oppo</button>
                                <button className="home__product-brand-item">Vivo</button>
                                <button className="home__product-brand-item">Huewei</button>
                                <button className="home__product-brand-item">Realme</button>
                            </div>
                            <ul className="home__featured-list">
                                {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                    <li
                                        className="product__sell-item--smartphone"
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/${product.enType}/${product.name}`
                                        }}
                                    >
                                        <div style={{
                                            background: `url(${product.imageLink})`,
                                            backgroundColor: "transparent",
                                            backgroundPosition: "center center",
                                            backgroundSize: "95%",
                                            backgroundRepeat: "no-repeat"
                                        }} className='product__sell-item-img'></div>
                                        <label className='product__sell-item-label'>{product.name}</label>
                                        <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                        <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                        <label className='product__sell-item-sold'>
                                            Đánh giá:
                                            <span className='product__sell-item-star'>{product.star}</span>
                                            <span className='product__sell-item-star-icon'>⭐</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>

                            <div className='home__featured-banner-tablet' onClick={(e) => { navigate('/tablet') }}></div>
                            <div className="home__featured-type " onClick={(e) => { navigate('/tablet') }}>MÁY TÍNH BẢNG</div>
                            <div className="home__featured-brand-list">
                                <button className="home__product-brand-item">Apple</button>
                                <button className="home__product-brand-item">Samsung</button>
                                <button className="home__product-brand-item">Xiaomi</button>
                                <button className="home__product-brand-item">Oppo</button>
                                <button className="home__product-brand-item">Vivo</button>
                                <button className="home__product-brand-item">Huewei</button>
                                <button className="home__product-brand-item">Realme</button>
                            </div>
                            <ul className="home__featured-list">
                                {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                    <li
                                        className="product__sell-item--tablet"
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/${product.enType}/${product.name}`
                                        }}
                                    >
                                        <div style={{
                                            background: `url(${product.imageLink})`,
                                            backgroundColor: "transparent",
                                            backgroundPosition: "center center",
                                            backgroundSize: "95%",
                                            backgroundRepeat: "no-repeat"
                                        }} className='product__sell-item-img'></div>
                                        <label className='product__sell-item-label'>{product.name}</label>
                                        <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                        <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                        <label className='product__sell-item-sold'>
                                            Đánh giá:
                                            <span className='product__sell-item-star'>{product.star}</span>
                                            <span className='product__sell-item-star-icon'>⭐</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>

                            <div className='home__featured-banner-laptop' onClick={(e) => { navigate('/laptop') }}></div>
                            <div className="home__featured-type" onClick={(e) => { navigate('/laptop') }}>MÁY TÍNH XÁCH TAY</div>
                            <div className="home__featured-brand-list">
                                <button className="home__product-brand-item">Apple Macbook</button>
                                <button className="home__product-brand-item">ASUS</button>
                                <button className="home__product-brand-item">Lenovo</button>
                                <button className="home__product-brand-item">MSI</button>
                                <button className="home__product-brand-item">HP</button>
                                <button className="home__product-brand-item">DELL</button>
                                <button className="home__product-brand-item">Acer</button>
                            </div>
                            <ul className="home__featured-list">
                                {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                    <li
                                        className="product__sell-item--laptop"
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/${product.enType}/${product.name}`
                                        }}
                                    >
                                        <div style={{
                                            background: `url(${product.imageLink})`,
                                            backgroundColor: "transparent",
                                            backgroundPosition: "center center",
                                            backgroundSize: "95%",
                                            backgroundRepeat: "no-repeat"
                                        }} className='product__sell-item-img'></div>
                                        <label className='product__sell-item-label'>{product.name}</label>
                                        <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                        <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                        <label className='product__sell-item-sold'>
                                            Đánh giá:
                                            <span className='product__sell-item-star'>{product.star}</span>
                                            <span className='product__sell-item-star-icon'>⭐</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>

                            <div className='home__featured-banner-acc' onClick={(e) => { navigate('/accessories') }}></div>
                            <div className="home__featured-type" onClick={(e) => { navigate('/accessories') }}>PHỤ KIỆN CÔNG NGHỆ</div>
                            <div className="home__featured-brand-list">
                                <button className="home__product-brand-item">Tai nghe</button>
                                <button className="home__product-brand-item">Cáp sạc</button>
                                <button className="home__product-brand-item">Sạc dự phòng</button>
                                <button className="home__product-brand-item">Ốp lưng</button>
                                <button className="home__product-brand-item">Chuột</button>
                                <button className="home__product-brand-item">Webcam</button>
                            </div>
                            <ul className="home__featured-list">
                                {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                    <li
                                        className="product__sell-item--accessories"
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/${product.enType}/${product.name}`
                                        }}
                                    >
                                        <div style={{
                                            background: `url(${product.imageLink})`,
                                            backgroundColor: "transparent",
                                            backgroundPosition: "center center",
                                            backgroundSize: "95%",
                                            backgroundRepeat: "no-repeat"
                                        }} className='product__sell-item-img'></div>
                                        <label className='product__sell-item-label'>{product.name}</label>
                                        <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                        <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                        <label className='product__sell-item-sold'>
                                            Đánh giá:
                                            <span className='product__sell-item-star'>{product.star}</span>
                                            <span className='product__sell-item-star-icon'>⭐</span>
                                        </label>
                                    </li>
                                ))}
                            </ul>

                        </div>
                    </div>
                </div>
            </div >

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div >



    );
};

export default Home;