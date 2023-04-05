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

    // window.onload = () => {
    //     var countDownDate = new Date(`3 ${timeEnd}, 2023 00:00:00`).getTime();
    //     const countdown = setInterval(() => {
    //         var now = new Date().getTime();
    //         var timeleft = countDownDate - now;

    //         // Calculating the days, hours, minutes and seconds left
    //         var daysLeft = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    //         var hoursLeft = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //         var minutesLeft = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    //         var secondsLeft = Math.floor((timeleft % (1000 * 60)) / 1000);

    //         document.querySelector('.home__flash-sale-countdown-day').innerHTML = `<span>${daysLeft} ngày</span>`;
    //         document.querySelector('.home__flash-sale-countdown-hour').innerHTML = `<span>${hoursLeft}</span>`;
    //         document.querySelector('.home__flash-sale-countdown-minute').innerHTML = `<span>${minutesLeft}</span>`;
    //         document.querySelector('.home__flash-sale-countdown-second').innerHTML = `<span>${secondsLeft}</span>`;

    //         if (timeleft < 0) {
    //             clearInterval(countdown);
    //         }
    //     }, 1000)
    // }

    return (
        <div>
            <Nav socket={socket} />
            <div className='container'>
                <div className='grid wide'>
                    <section className="tablet__event">
                        <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Tm/Tm_picture_986/tab-samsung_694_1200.png.webp" alt="" className="tablet__event-image" />
                        <div class="tablet__event-list">
                            <img src="https://cdn.tgdd.vn/2023/03/banner/iPad-9800-200-800x200-1.png" alt="" className="tablet__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/lenovo-tab800-200-800x200.png" alt="" className="tablet__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/gatab-800-200-800x200.png" alt="" className="tablet__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/Nokia-T20800-200-800x200.png" alt="" className="tablet__event-item" ></img>
                        </div>

                        <img className="tablet__event-image-gif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>


                        <div className="tablet__ladi-image">
                            <div className="tablet__ladi-image-background"></div>
                        </div>

                        <a href="https://shoptech.com/pages/khuyen-mai" target="_blank" id="IMAGE551" className="tablet__ladi2-element"
                            data-replace-href="https://shoptech.com/pages/khuyen-mai">
                            <div className="tablet__ladi2-image">
                                <div className="tablet__ladi2-image-background"></div>
                            </div>
                        </a>
                        <div className="tablet__ladi2-image">
                            <div className="tablet__ladi2-image-background"></div>
                        </div>
                        <div className="tablet__event-content">
                        </div>
                    </section>

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
        
                    <ul className="tablet__list-product">
                        <li className='product'>
                            <div className="tablet__item-label"></div>
                            <div className="tablet__tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/522/247517/iPad-9-wifi-trang-600x600.jpg" alt="" ></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                            </div>
                            <h3>
                                Oppo 9 WiFi
                            </h3>
                            <div className="tablet__item-compare gray-bg">
                                <span>Retina IPS LCD</span>
                                <span>10.2"</span>
                            </div>

                            <ul>
                                <li className="tablet__merge-item-selected">64GB</li>
                                <li className="tablet__merge-item ">256GB</li>
                            </ul>

                            <div className="tablet__box-p">
                                <p className="tablet__price-old black">9.990.000₫</p>
                                <span className="tablet__percent">-15%</span>
                            </div>
                            <strong className="tablet__price">8.490.000₫</strong>
                            <div className="tablet__item-rating">
                                <p>
                                    <i className="tablet__icon-star"></i>
                                    <i className="tablet__icon-star"></i>
                                    <i className="tablet__icon-star"></i>
                                    <i className="tablet__icon-star"></i>
                                    <i className="tablet__icon-star-half"></i>
                                </p>
                                <p className="tablet__item-rating-total"> 158 Đánh giá</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div >

            <Footer socket={socket} />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>

    );

};

export default Tablet;