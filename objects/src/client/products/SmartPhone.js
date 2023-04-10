import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav'
import Footer from '../common/Footer'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const SmartPhone = ({ socket }) => {

    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
       
        // show thông tin điện thoại nổi bật
        products.map((product, index) => {
            const infoProductFeaturedSmartphone = document.querySelectorAll('.product__sell-item--smartphone')[index];
            if (product.type === "Điện thoại" && product.featured === true) {
                infoProductFeaturedSmartphone.style.display = "block";
            }
        })

        })
    
    return (
        <div>
            <Nav socket="socket"> </Nav>
            <div className='container' style={{ backgroundColor: "#c4eae8", marginTop: "60px", paddingTop: "50px" }}>
                <div className="smartphone__ladi-image">
                    <div className="smartphone__ladi-image-background">
                        <img src="https://w.ladicdn.com/s500x850/5bf3dc7edc60303c34e4991f/thang-3-deal-tha-ga-20230306042957-ev9xk.png"></img>
                    </div>
                </div>
                <div className="smartphone__ladi2-image">
                    <div className="smartphone__ladi2-image-background">
                        <img src="https://w.ladicdn.com/s500x850/5bf3dc7edc60303c34e4991f/banner_side-web-20230315064013-xgxik.png"></img>
                    </div>
                </div>
                <div className='grid wide'>
                    <section className="smartphone__event">
                        <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/4/5/638162927951359069_F-C1_1200x300.png" alt="" className="smartphone__event-image" ></img>
                        <div class="smartphone__event-list">
                            <img src="https://cdn.tgdd.vn/2023/04/banner/oppo-flip-800-200-800x200.png" alt="" className="smartphone__event-item" ></img>
                            <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/31/638158973592992097_F-C1_1200x300.png" alt="" className="smartphone__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/gatab-800-200-800x200.png" alt="" className="smartphone__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/Nokia-T20800-200-800x200.png" alt="" className="smartphone__event-item" ></img>
                        </div>

                        <img className="smartphone__event-image-gif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>



                        <div className="smartphone__event-content">
                        </div>
                    </section>

                    <h3 class="smartphone__title-brand">THƯƠNG HIỆU ĐỈNH CHÓP</h3>
                    <div className='smartphone__home-sort-list-brand'>
                        <div className='smartphone__home-sort-brand'>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-iphone-220x48.png"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-220x48-1.png"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-xiaomi-220x48-14-220x48.png"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/OPPO42-b5-220x48-6.jpg"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/vivo-logo-220-220x48-3.png"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://consumer.huawei.com/etc/designs/huawei-cbg-site/clientlib-campaign-v4/common-v4/images/logo.svg"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Masstel522-b_7.png"></img>
                            </button>

                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Realme42-b_37.png"></img>
                            </button>
                            <button className='smartphone__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Nokia42-b_21.jpg"></img>
                            </button>

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


                <div className='smartphone__product-container' >
                    <ul className="smartphone__list-product">
                        <li className='smartphone__product'>
                            <div className="smartphone__item-label"></div>
                            <div className="smartphone__tablet-item">
                                <img class="thumb" src="https://cdn.tgdd.vn/Products/Images/42/251192/iphone-14-pro-max-den-thumb-600x600.jpg" alt="" ></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                            </div>
                            <h3>
                                Oppo 9 WiFi
                            </h3>
                            <div className="smartphone__item-compare gray-bg">
                                <span>Retina IPS LCD</span>
                                <span>10.2"</span>
                            </div>

                            <ul>
                                <li className="smartphone__merge-item-selected">64GB</li>
                                <li className="smartphone__merge-item ">256GB</li>
                            </ul>

                            <div className="smartphone__box-p">
                                <p className="smartphone__price-old black">9.990.000₫</p>
                                <span className="smartphone__percent">-15%</span>
                            </div>
                            <strong className="smartphone__price">8.490.000₫</strong>
                            <div className="smartphone__item-rating">
                                <p>
                                <span class="product__sell-item-star-icon">★★★★☆</span>
                                </p>
                                <p className="smartphone__item-rating-total"> 158 Đánh giá</p>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div >
            <Footer socket={socket}></Footer>
        </div>
        </div>
    );

    };

export default SmartPhone;