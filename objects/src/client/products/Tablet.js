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
            <Nav socket={socket} />
            <div className=''>
                {/* <HotPromote socket={socket} /> */} {/* ảnh background shop tech */}
                <section className="event">
                    <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Tm/Tm_picture_986/tab-samsung_694_1200.png.webp" alt="" className="event-image" />
                    <div class= "grid-img">
                    <img src="https://cdn.tgdd.vn/2023/03/banner/iPad-9800-200-800x200-1.png" alt="" className="event-image-2" ></img>
                    <img src="https://cdn.tgdd.vn/2023/04/banner/lenovo-tab800-200-800x200.png" alt="" className="event-image-2" ></img>
                    <img src="https://cdn.tgdd.vn/2023/04/banner/gatab-800-200-800x200.png" alt="" className="event-image-2" ></img>
                    <img src="https://cdn.tgdd.vn/2023/04/banner/Nokia-T20800-200-800x200.png" alt="" className="event-image-2" ></img>
                    </div>
                    

                    <img className="event-imagegif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>



                    {/* <a href="https://shoptech.com/pages/khuyen-mai" target="_blank" id="IMAGE550" className="ladi-element"
                        data-replace-href="https://shoptech.com/pages/khuyen-mai">
                        <div className="ladi-image">
                            <div className="ladi-image-background"></div>
                        </div>
                    </a> */}
                    <div className="ladi-image">
                        <div className="ladi-image-background"></div>
                    </div>

                    <a href="https://shoptech.com/pages/khuyen-mai" target="_blank" id="IMAGE551" className="ladi2-element"
                        data-replace-href="https://shoptech.com/pages/khuyen-mai">
                        <div className="ladi2-image">
                            <div className="ladi2-image-background"></div>
                        </div>
                    </a>
                    <div className="ladi2-image">
                        <div className="ladi2-image-background"></div>
                    </div>


                    <div className="event-content">

                    </div>
                </section>

                <div className="grid wide">
                    {/* <div className="home__container">

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
                    </div> */}
                    {/* <div className="container-productbox"> */}
                    <div className='home__featured-banner-tablet' onClick={(e) => { navigate('/tablet') }}></div>
                            <div className="home__featured-type " onClick={(e) => { navigate('/tablet') }}>MÁY TÍNH BẢNG</div>
                            <div className="home__featured-brand-list">
                                <button className="home__product-brand-item">Apple</button>
                                <button className="home__product-brand-item">Samsung</button>
                                <button className="home__product-brand-item">Xiaomi</button>
                                <button className="home__product-brand-item">Oppo</button>
                                <button className="home__product-brand-item">Lenovo</button>
                                <button className="home__product-brand-item">Masstel</button>
                                <button className="home__product-brand-item">Realme</button>
                            </div>
                    <ul className="listproduct">
                        <li className='product'>
                            <div className="item-label">
                            </div>
                            <div className="tablet-item">
                                
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/247517/iPad-9-wifi-trang-600x600.jpg" alt="" ></img>
                                
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                            </div>
                            <h3>
                                Oppo 9 WiFi
                            </h3>
                            <div className="item-compare gray-bg">
                                <span>Retina IPS LCD</span>
                                <span>10.2"</span>
                            </div>

                            <ul>
                                <li className="merge-item-selected">64GB</li>
                                <li className="merge-item ">256GB</li>
                            </ul>

                            <div className="box-p">
                                <p className="price-old black">9.990.000₫</p>
                                <span className="percent">-15%</span>
                            </div>
                            <strong className="price">8.490.000₫</strong>
                            <div className="item-rating">
                                <p>
                                    <i className="icon-star"></i>
                                    <i className="icon-star"></i>
                                    <i className="icon-star"></i>
                                    <i className="icon-star"></i>
                                    <i className="icon-star-half"></i>
                                </p>
                                <p className="item-rating-total"> 158 Đánh giá</p>
                            </div>
                        </li>
                        <li>
                            <a>
                                <div className="item-label">
                                </div>
                                <div className="tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/294103/iPad-Gen-10-Pink-thumb-1-600x600.jpg" alt="" ></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                                </div>

                                <h3>
                                    Oppo 10 WiFi
                                </h3>
                                <div className="item-compare gray-bg">
                                    <span>Retina IPS LCD</span>
                                    <span>10.9"</span>
                                </div>

                                <ul>
                                    <li className="merge-item-selected">64GB</li>
                                    <li className="merge-item ">256GB</li>
                                </ul>

                                <div className="box-p">
                                    <p className="price-old black">12.990.000₫</p>
                                    <span className="percent">-3%</span>
                                </div>
                                <strong className="price">12.490.000₫</strong>
                                <div className="item-rating">
                                    <p>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star-half"></i>
                                    </p>
                                    <p className="item-rating-total">17 Đánh giá</p>
                                </div>

                            </a>
                            <div className="item-bottom">
                                <a href="#" className="shiping"></a>
                            </div>

                        </li>
                        <li>
                            <a>
                                <div className="item-label">
                                </div>
                                <div className="tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/269328/ipad-pro-m1-11-inch-wifi-2tb-2021-xam-thumb-600x600.jpeg" alt="" ></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"></img>
                                </div>

                                <h3>
                                    iPad Pro M1 11 inch WiFi
                                </h3>
                                <div className="item-compare gray-bg">
                                    <span>Liquid Retina</span>
                                    <span>11"</span>
                                </div>

                                <ul>
                                    <li className="merge-item-selected">512GB</li>
                                    <li className="merge-item ">2TB</li>
                                </ul>

                                <div className="box-p">
                                    <p className="price-old black">25.990.000₫</p>
                                    <span className="percent">-9%</span>
                                </div>
                                <strong className="price">23.490.000₫</strong>
                                <div className="item-rating">
                                    <p>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                    </p>
                                    <p className="item-rating-total">8 Đánh giá</p>
                                </div>

                            </a>
                            <div className="item-bottom">
                                <a href="#" className="shiping"></a>
                            </div>

                        </li>

                        <li >
                            <a >
                                <div className="item-label">
                                </div>
                                <div className="tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/248091/ipad-mini-6-wifi-starlight-1-600x600.jpg" alt="" ></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                </div>


                                <h3>
                                    Realme mini 6 WiFi 64GB
                                </h3>
                                <div className="item-compare gray-bg">
                                    <span>LED-backlit IPS LCD</span>
                                    <span>8.3"</span>
                                </div>
                                <div className="box-p">
                                    <p className="price-old black">14.990.000₫</p>
                                    <span className="percent">-13%</span>
                                </div>
                                <strong className="price">12.990.000₫</strong>
                                <div className="item-rating">
                                    <p>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star-half"></i>
                                    </p>
                                    <p className="item-rating-total">32 Đánh giá</p>
                                </div>

                            </a>
                            <div className="item-bottom">
                                <a href="#" className="shiping"></a>
                            </div>

                        </li>
                        <li >
                            <a>
                                <div className="item-label">
                                </div>
                                <div className="tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/238649/ipad-pro-2021-129-inch-gray-600x600.jpg" alt="" ></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                </div>

                                <h3>
                                    iPad Pro M1 12.9 inch 5G
                                </h3>
                                <div className="item-compare gray-bg">
                                    <span>Liquid Retina XDR</span>
                                    <span>12.9"</span>
                                </div>

                                <ul>
                                    <li className="merge-item-selected">512GB</li>
                                    <li className="merge-item">1TB</li>
                                    <li className="merge-item ">2TB</li>
                                </ul>

                                <div className="box-p">
                                    <p className="price-old black">34.990.000₫</p>
                                    <span className="percent">-16%</span>
                                </div>
                                <strong className="price">29.290.000₫</strong>
                                <div className="item-rating">
                                    <p>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star-dark"></i>
                                    </p>
                                    <p className="item-rating-total">19 Đánh giá</p>
                                </div>

                            </a>
                            <div className="item-bottom">
                                <a href="#" className="shiping"></a>
                            </div>


                        </li>
                        <li>
                <a>
                    <div class="item-label">
                        <span class="lb-tragop">Trả góp 0%</span>
                    </div>
                    <div class="tablet-item">
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            > </img>  */}
                        <img class="thumb " alt="Samsung Galaxy Tab A8 (2022)" src="https://cdn.tgdd.vn/Products/Images/522/251704/samsung-galaxy-tab-a8-thumb-1-600x600.jpg"></img>
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>
                    <h3>
                        Samsung Galaxy Tab A8 (2022)
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>TFT LCD</span>
                        <span>10.5"</span>
                    </div>
                    <strong class="price">6.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-half"></i>
                        </p>
                        <p class="item-rating-total">95 đánh giá</p>
                    </div>

                </a>
                <div class="item-bottom">
                    <a href="#" class="shiping"></a>
                </div>


            </li>
            <li>
                <a>
                    <div class="item-label">
                        <span class="lb-tragop">Trả góp 0%</span>
                    </div>
                    <div class="tablet-item">
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="thumb " alt="Samsung Galaxy Tab A8 (2022)" src="https://cdn.tgdd.vn/Products/Images/522/222806/lenovo-tab-a22-xam-600x600.jpg"></img>
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_BH_2nam.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>
                    <h3>
                        Lenovo Tab A8
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>IPS LCD</span>
                        <span>8"</span>
                    </div>
                    <strong class="price">2.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-half"></i>
                        </p>
                        <p class="item-rating-total">15 đánh giá</p>
                    </div>

                </a>
                <div class="item-bottom">
                    <a href="#" class="shiping"></a>
                </div>


            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" alt="Samsung Galaxy Tab S8 Ultra 5G" src="https://cdn.tgdd.vn/Products/Images/522/247513/samsung-tab-s8-ultra-thumb-600x600.jpg"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        Samsung S8 Ultra 5G
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Super AMOLED</span>
                        <span>14.6"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">30.990.000₫</p>
                        <span class="percent">-9%</span>
                    </div>
                    <strong class="price">27.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">9 đánh giá</p>
                    </div>

                </a>
                <div class="item-bottom">
                    <a href="#" class="shiping"></a>
                </div>


            </li>
            
            <li>
                <a>
                    <div class="item-label">
                        <span class="lb-tragop">Trả góp 0%</span>
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/256559/Samsung-Galaxy-Tab-S7-FE-Wifi-green-1-660x600.jpg" alt="Samsung Galaxy Tab S7 FE"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>
                    <h3>
                        Samsung Galaxy Tab S7 FE
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>TFT LCD</span>
                        <span>12.4"</span>
                    </div>

                    <ul>
                        <li class="merge-item-selected">64GB</li>
                        <li class="merge-item ">128GB</li>
                    </ul>

                    <strong class="price">11.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-half"></i>
                        </p>
                        <p class="item-rating-total">10 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb ls-is-cached lazyloaded" alt="iPad Pro M2 12.9 inch WiFi Cellular 128GB"
                            src="https://cdn.tgdd.vn/Products/Images/522/238624/ipad-pro-2021-11-inch-silver-600x600.jpg"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        iPad Pro M2 Cellular
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Liquid Retina XDR</span>
                        <span>12.9"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">35.990.000₫</p>
                        <span class="percent">-1%</span>
                    </div>
                    <strong class="price">35.490.000₫</strong>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/237699/ipad-pro-m1-129-inch-wifi-sliver-600x600.jpg" alt="iPad Pro M1 11 inch 5G"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_BH_2nam.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        iPad Pro M1 11 inch 5G
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Liquid Retina</span>
                        <span>11"</span>
                    </div>
                    <ul>
                        <li class="merge-item-selected">128GB</li>
                        <li class="merge-item ">256GB</li>
                    </ul>

                    <div class="box-p">
                        <p class="price-old black">26.990.000₫</p>
                        <span class="percent">-3%</span>
                    </div>
                    <strong class="price">25.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">3 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/294104/ipad-pro-m2-11-wifi-bac-thumb-600x600.jpg" alt="iPad Pro M1 12.9 inch WiFi"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>

                    <h3>
                        iPad Pro M1 12.9 inch WiFi
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Liquid Retina XDR</span>
                        <span>12.9"</span>
                    </div>
                    <ul>
                        <li class="merge-item-selected">64GB</li>
                        <li class="merge-item ">128GB</li>
                    </ul>
                    <div class="box-p">
                        <p class="price-old black">30.990.000₫</p>
                        <span class="percent">-17%</span>
                    </div>
                    <strong class="price">25.490.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                        </p>
                        <p class="item-rating-total">17 đánh giá</p>
                    </div>

                </a>

            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/250734/ipad-mini-6-wifi-cellular-pink-1-600x600.jpg" alt="iPad mini 6 WiFi Cellular 64GB"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>

                    <h3>
                        Realme mini 6 Cellular
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>LED-backlit IPS LCD</span>
                        <span>8.3"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">19.990.000₫</p>
                        <span class="percent">-20%</span>
                    </div>
                    <strong class="price">15.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                        </p>
                        <p class="item-rating-total">12 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/266337/nokia-tab-t20-wifi-thumb-600x600-1-600x600.jpeg" alt="iPad 10 WiFi + Cellular 64GB"></img>
                        {/* <img class="hotIcon"
                            src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"
                            align="right"> </img> */}
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_01-05.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        Nokia Tab T20 WIFI
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Retina IPS LCD</span>
                        <span>10.4"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">5.690.000₫</p>
                        <span class="percent">-26%</span>
                    </div>
                    <strong class="price">4.190.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-half"></i>
                        </p>
                        <p class="item-rating-total">70 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="lazyload thumb" src="https://cdn.tgdd.vn/Products/Images/522/248096/ipad-air-5-wifi-grey-thumb-600x600.jpg" alt="iPad Air 5 M1 Wifi 64GB"></img>
                        
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_BH_2nam.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        iPad Air 5 M1
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Retina IPS LCD</span>
                        <span>10.9"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">16.990.000₫</p>
                        <span class="percent">-8%</span>
                    </div>
                    <strong class="price">15.490.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                        </p>
                        <p class="item-rating-total">11 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="lazyload thumb" src="https://cdn.tgdd.vn/Products/Images/522/285039/lenovo-tab-m10-gen-3-1-2-600x600.jpg" alt="Samsung Galaxy Tab S6 Lite"></img>
                       
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        Samsung Galaxy Tab S6 Lite
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>PLS LCD</span>
                        <span>10.4"</span>
                    </div>
                    <strong class="price">9.490.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">32 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="thumb" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Apro/Apro_product_32087/may-tinh-bang-i_main_878_450.png.webp" alt="iPad Pro M1 11 inch 5G"></img>
                        <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/Label_BH_2nam.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        iPad Pro M 
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>Liquid Retina</span>
                        <span>11.5"</span>
                    </div>
                    <ul>
                        <li class="merge-item-selected">128GB</li>
                        <li class="merge-item ">256GB</li>
                    </ul>

                    <div class="box-p">
                        <p class="price-old black">25.990.000₫</p>
                        <span class="percent">-3%</span>
                    </div>
                    <strong class="price">24.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">12 đánh giá</p>
                    </div>

                </a>
            </li>
            <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                        <img class="lazyload thumb" src="https://cdn.tgdd.vn/Products/Images/522/291769/Redmi-Pad-Sliver-thumb-org-1-2-600x600.jpg" alt="Samsung Galaxy Tab S6 Lite"></img>
                       
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        Xiaomi Redmi Pad (4GB/128GB)
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>IPS LCD</span>
                        <span>10.6"</span>
                    </div>
                    <strong class="price">6.490.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">19 đánh giá</p>
                    </div>

                </a>
            </li>

                        
                        
                        

                        
                       
                       
                       
                        <li >
                            <a >
                                <div className="item-label">
                                </div>
                                <div className="tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/259939/masstel-tab-10s-%C4%91en-1-1-2-3-4-600x600.jpg" alt="" ></img>
                                </div>


                                <h3>
                                    Masstel Tab 10A
                                </h3>
                                <div className="item-compare gray-bg">
                                    <span>LED-backlit IPS LCD</span>
                                    <span>8.3"</span>
                                </div>
                                <div className="box-p">
                                    <p className="price-old black">4.990.000₫</p>
                                    <span className="percent">-13%</span>
                                </div>
                                <strong className="price">2.990.000₫</strong>
                                <div className="item-rating">
                                    <p>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star"></i>
                                        <i className="icon-star-half"></i>
                                    </p>
                                    <p className="item-rating-total">9 Đánh giá</p>
                                </div>

                            </a>
                            <div className="item-bottom">
                                <a href="#" className="shiping"></a>
                            </div>

                        </li>
                        <li>
                <a>
                    <div class="item-label">
                    </div>
                    <div class="tablet-item">
                      
                        <img class="thumb" alt="Samsung Galaxy Tab A7 Lite" src="https://cdn.tgdd.vn/Products/Images/522/281633/Redmi-Pad-green-thumb-org-600x600.jpg"></img>
                        <img class="temBH" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_27/webp_700_71-71-icon-vn-apple_601.png"></img>\
                        <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                    </div>


                    <h3>
                        Xiaomi Galaxy A7 Lite
                    </h3>
                    <div class="item-compare gray-bg">
                        <span>TFT LCD</span>
                        <span>8.7"</span>
                    </div>
                    <div class="box-p">
                        <p class="price-old black">4.490.000₫</p>
                        <span class="percent">-11%</span>
                    </div>
                    <strong class="price">3.990.000₫</strong>
                    <div class="item-rating">
                        <p>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star"></i>
                            <i class="icon-star-dark"></i>
                        </p>
                        <p class="item-rating-total">152 đánh giá</p>
                    </div>

                </a>
                <div class="item-bottom">
                    <a href="#" class="shiping"></a>
                </div>

            </li>
                        
           
            







                    </ul>
                    
                </div>
            </div >
            <Footer socket={socket} />
        </div>

    );

};

export default Tablet;