import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HotPromote from '../common/HotPromote';

import Nav from '../common/Nav'
import Footer from '../common/Footer'


const Tablet = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

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
    
    return (
        <div>
            <link rel="stylesheet" href="objects\src\css\tablet-client.css" />
            <Nav socket={socket} />
            <div className=''>
                {/* <HotPromote socket={socket} /> */} {/* ảnh background shop tech */}
                <section class="event">
                    <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Tm/Tm_picture_986/tab-samsung_694_1200.png.webp" alt="" class="event-image" />
                    <img class="event-imagegif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>
                    


                    <a href="https://shoptech.com/pages/khuyen-mai" target="_blank" id="IMAGE550" class="ladi-element"
                        data-replace-href="https://shoptech.com/pages/khuyen-mai">
                        <div class="ladi-image">
                            <div class="ladi-image-background"></div>
                        </div>
                    </a>
                    <div class="ladi-image">
                        <div class="ladi-image-background"></div>
                    </div>

                    <a href="https://shoptech.com/pages/khuyen-mai" target="_blank" id="IMAGE551" class="ladi2-element"
                        data-replace-href="https://shoptech.com/pages/khuyen-mai">
                        <div class="ladi2-image">
                            <div class="ladi2-image-background"></div>
                        </div>
                    </a>
                    <div class="ladi2-image">
                        <div class="ladi2-image-background"></div>
                    </div>


                    <div class="event-content">

                    </div>
                </section>
                <div className="grid wide">
                    <div className="home__container">

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
                                                window.location.href = `/product/${product.name}`
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
                                            window.location.href = `/product/${product.name}`
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
                                            window.location.href = `/product/${product.name}`
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
            <Footer socket={socket} />
        </div>

    );

};

export default Tablet;