import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import Nav from '../common/Nav'
import Footer from '../common/Footer'
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Laptop = ({ socket }) => {

    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();



    return (
        <div>
            <Nav socket="socket"> </Nav>
            <div className='container' style={{ backgroundColor: "#acf7d5", marginTop: "60px", paddingTop: "50px" }}>
                <div className="laptop__ladi-image">
                    <div className="laptop__ladi-image-background">
                        <img src="https://theme.hstatic.net/1000026716/1000440777/14/stk-bn-right.png?v=35665"></img>
                    </div>
                </div>
                <div className="laptop__ladi2-image">
                    <div className="laptop__ladi2-image-background">
                        <img src="https://theme.hstatic.net/1000026716/1000440777/14/xxxbannerxxx2.png?v=35665"></img>
                    </div>
                </div>
                <div className='grid wide'>
                    <section className="laptop__event">
                        <div className='laptop__event-background'>
                            <img src="https://w.ladicdn.com/s2150x850/5bf3dc7edc60303c34e4991f/ldp_lpgame-20230331071844-5-0ry.jpg" ></img>

                            <div className='laptop__event-animation'>
                                <img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/19nx-20200507075647.gif"></img>
                            </div>
                            <div className='laptop__event-animation2'>
                                <img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/19nx-20200507075647.gif"></img>
                            </div>
                            <div className='laptop__event-animation3'>
                                <img src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/19nx-20200507075647.gif" className="laptop__event-animation3"></img>
                            </div>
                        <div className='laptop__event-image'>

                                <img src="https://w.ladicdn.com/s2150x850/5bf3dc7edc60303c34e4991f/pnggame1-20230331072031-ikhg6.png" alt="" className="laptop__event-image" ></img>
                            </div>
                        <div className='laptop__event-image2'>
                            <img src="https://w.ladicdn.com/s900x850/5bf3dc7edc60303c34e4991f/ldp_lpgame-03-20230331073034-1n1td.png"></img>
                        </div>
                        </div>

                        <div class="laptop__event-list">
                            <img src="https://laptop88.vn/media/banner/08_Mar1d47a608c5346ac1803f841e33159012.jpg" alt="" className="laptop__event-item" ></img>
                            <img src="https://laptop88.vn/media/banner/28_Mar1afda50bd4d44657db9789eb5f79d7fa.jpg" alt="" className="laptop__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/04/banner/MSI-1200-300-1200x300.png" alt="" className="laptop__event-item" ></img>
                            <img src="https://images.fpt.shop/unsafe/fit-in/1200x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/3/13/638143268520737829_F-C1_1200x300@2x.png" alt="" className="laptop__event-item" ></img>
                        </div>

                        <img className="laptop__event-image-gif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>



                        <div className="laptop__event-content">
                        </div>
                    </section>

                    <h3 class="laptop__title-brand">THƯƠNG HIỆU ĐỈNH CHÓP</h3>
                    <div className='laptop__home-sort-list-brand'>
                        <div className='laptop__home-sort-brand'>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-macbook-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-asus-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-lenovo-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-msi-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-hp-149x40-1.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-dell-149x40.png"></img>
                            </button>

                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-acer-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-surface-149x40-1.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/logo-itel-149x40.png"></img>
                            </button>
                            <button className='laptop__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Masstel42-b0-200x48-1.png"></img>
                            </button>

                        </div>

                    </div>



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
                        


                    <div className='laptop__product-container' >
                        <ul className="laptop__list-product">
                            <li className='laptop__product'>
                                <div className="laptop__item-label"></div>
                                <div className="laptop__tablet-item">
                                    <img class="thumb" src="https://images.fpt.shop/unsafe/fit-in/240x215/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2023/2/28/638131993065748874_msi-gaming-katana-15-b13vek-den-dd-moi.jpg" alt="" ></img>
                                    <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                    <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                                </div>
                                <h3>
                                    Oppo 9 WiFi
                                </h3>
                                <div className="laptop__item-compare gray-bg">
                                    <span>Retina IPS LCD</span>
                                    <span>10.2"</span>
                                </div>

                                <ul>
                                    <li className="laptop__merge-item-selected">64GB</li>
                                    <li className="laptop__merge-item ">256GB</li>
                                </ul>

                                <div className="laptop__box-p">
                                    <p className="laptop__price-old black">9.990.000₫</p>
                                    <span className="laptop__percent">-15%</span>
                                </div>
                                <strong className="laptop__price">8.490.000₫</strong>
                                <div className="laptop__item-rating">
                                    <p>
                                        <span class="product__sell-item-star-icon">★★★★☆</span>
                                    </p>
                                    <p className="laptop__item-rating-total"> 158 Đánh giá</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >

            <Footer socket={socket}></Footer>

        </div>
    );

};

export default Laptop;