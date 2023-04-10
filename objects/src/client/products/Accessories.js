import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav';
import Footer from '../common/Footer';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

const Accessories = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        //  show thông tin phụ kiện nổi bật
        products.map((product, index) => {
            const infoProductFeaturedAccessories = document.querySelectorAll('.product__sell-item--accessories')[index];
            if (product.type === "Phụ kiện" && product.featured === true) {
                infoProductFeaturedAccessories.style.display = "block";
            }
        })
    })

    const handleFormatStarProduct = (starOfProduct) => {
        if (starOfProduct < 1) {
            return `☆☆☆☆☆`
        } else if (starOfProduct < 2) {
            return `★☆☆☆☆`
        } else if (starOfProduct < 3) {
            return `★★☆☆☆`
        } else if (starOfProduct < 4) {
            return `★★★☆☆`
        } else if (starOfProduct < 5) {
            return `★★★★☆`
        } else {
            return `★★★★★`
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
            <div className='container'>
                <Nav socket={socket} />
                <div className="accessories__ladi-image">
                    <div className="accessories__ladi-image-background">
                        <img src="https://theme.hstatic.net/1000026716/1000440777/14/xxxbannerxxx10.png?v=35349"></img>
                    </div>
                </div>
                <div className="accessories__ladi2-image">
                    <div className="accessories__ladi2-image-background">
                        <img src="https://theme.hstatic.net/1000026716/1000440777/14/xxxbannerxxx13.png?v=35349"></img>
                    </div>
                </div>
                <div className='grid wide'>
                    <section className="accessories__event">
                        {/* <img src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture//Tm/Tm_picture_986/tab-samsung_694_1200.png.webp" alt="" className="accessories__event-image" /> */}
                        <div class="accessories__event-list">
                            <img src="https://cdn.tgdd.vn/2023/04/banner/Frame-48002-800x200-3.jpg" alt="" className="accessories__event-item" ></img>
                            <img src="https://cdn.tgdd.vn/2023/03/banner/TN-800-200-800x200-1.png" alt="" className="accessories__event-item" ></img>

                        </div>

                        {/* <img className="accessories__event-image-gif" src="https://w.ladicdn.com/5bf3dc7edc60303c34e4991f/banner-ver-2023-8-11-20230214033025-h8scc.gif" alt="ảnh gif" ></img>
 */}


                        <div className="accessories__event-content">
                        </div>
                    </section>

                    <div class="accessories__group-cate">
                        <div class="accessories__group">
                            <div class="accessories__group group-iphone">
                                <div class="accessories__group-name">
                                    <p>Phụ Kiện</p>
                                    <p>Phone, Tablet</p>
                                </div>
                                <div class="arrow-filter"></div>
                            </div>

                        </div>

                        <div class="accessories__group">
                            <div class="accessories__group  group-laptop">
                                <div class="accessories__group-name">
                                    <p>Phụ Kiện</p>
                                    <p>Laptop, PC</p>
                                </div>
                                <div class="arrow-filter"></div>
                            </div>

                        </div>


                        <div class="accessories__group">
                            <div class="accessories__group group-sound">
                                <div class="accessories__group-name">
                                    <p>Thiết bị</p>
                                    <p>Âm thanh</p>
                                </div>
                                <div class="arrow-filter"></div>
                            </div>

                        </div>

                        <div class="accessories__group">
                            <div class="accessories__group group-tech">
                                <div class="accessories__group-name">
                                    <p>Phụ Kiện</p>
                                    <p>Công nghệ</p>
                                </div>
                                <div class="arrow-filter"></div>
                            </div>

                        </div>

                        <div class="accessories__group">
                            <div class="accessories__group group-maycu">
                                <a href="/may-doi-tra/phu-kien" target="_blank">
                                    <div class="accessories__group-name">
                                        <p>Phụ Kiện</p>
                                        <p>đã sử dụng</p>
                                        <p>giá rẻ</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>




                    <section>
                        <h3 class="accessories__title-category">PHỤ KIỆN ĐỈNH CHÓP</h3>
                        <div class="accessories__list-category">
                            <div class="accessories__group-category" data-index="1">
                                <a href="sac-dtdd">
                                    <img src="https://cdn.tgdd.vn/Category/57/5-Pinsạcdựphòng-120x120.png"></img>
                                    <h3>Sạc dự phòng</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="2">
                                <a href="sac-cap">
                                    <img src="https://cdn.tgdd.vn/Category/9518/10-Cápsạcchuyểndổi-120x120.png"></img>
                                    <h3>Sạc, cáp</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="3">
                                <a href="tai-nghe">
                                    <img src="https://cdn.tgdd.vn/Category/54/21-Tainghe-120x120.png"></img>
                                    <h3>Tai nghe</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="4">
                                <a href="loa-laptop">
                                    <img src="https://cdn.tgdd.vn/Category/2162/22-Loa2-120x120.png"></img>
                                    <h3>Loa</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="5">
                                <a href="thiet-bi-nha-thong-minh">
                                    <img src="https://cdn.tgdd.vn/Category/9458/thongminh-120x120.png"></img>
                                    <h3>Thiết bị thông minh </h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="6">
                                <a href="camera-giam-sat">
                                    <img src="https://cdn.tgdd.vn/Category/4728/17-Camerawebcam-120x120.png"></img>
                                    <h3>Camera, webcam</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="7">
                                <a href="thiet-bi-mang">
                                    <img src="https://cdn.tgdd.vn/Category/4727/16-Thiếtbịmạng-120x120.png"></img>
                                    <h3>Thiết bị mạng</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="8">
                                <a href="mieng-dan-op-lung">
                                    <img src="https://cdn.tgdd.vn/Category/9262/icon-mieng-dan-op-lung-100x100-1.png"></img>
                                    <h3>Ốp lưng, miếng dán</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="9">
                                <a href="chuot-may-tinh">
                                    <img src="https://cdn.tgdd.vn/Category/86/13-Chuộtmáytính-120x120.png"></img>
                                    <h3>Chuột máy tính</h3>
                                </a>
                            </div>
                            <div class="accessories__group-category" data-index="10">
                                <a href="ban-phim">
                                    <img src="https://cdn.tgdd.vn/Category/4547/19-Bànphím-120x120.png"></img>
                                    <h3>Bàn phím</h3>
                                </a>
                            </div>
                        </div>
                    </section>


                    <h3 class="title-brand">THƯƠNG HIỆU ĐỈNH CHÓP</h3>
                    <div className='accessories__home-sort-list-brand'>
                        <div className='accessories__home-sort-brand'>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Apple482-b_37.jpg"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/samsungnew-220x48-220x48-1.png"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Asus482-b_26.png"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/160-40-160x40-11-160x40.png"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Microsoft482-b_26.jpg"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/JBL-220x48-1.jpeg"></img>
                            </button>

                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Tp-link482-b_11.jpg"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/MSI-220x48-1-220x48-1.png"></img>
                            </button>
                            <button className='accessories__home-sort-brand-item'>
                                <img src="https://cdn.tgdd.vn/Brand/1/Linksys-220x48-1.jpeg"></img>
                            </button>

                        </div>

                    </div>




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
                    <div className='accessories__product-container' >
                    <ul className="accessories__list-product">
                        <li className='accessories__product'>
                            <div className="accessories__item-label"></div>
                            <div className="accessories__tablet-item">
                                <img class="thumb" src="http://localhost:4000/uploads/products/img-P008.png" alt="" ></img>
                                <img class="hotIcon" src="https://cdn11.dienmaycholon.vn/filewebdmclnew/DMCL21/Picture/Apro/Apro_icon_189/261-261-iconsalesapsant_625.gif"></img>
                                <img class="temBH" src="https://cdn.tgdd.vn/ValueIcons/icon_18t.png"></img>

                            </div>
                            <h3>
                                Bàn phím cơ MSI
                            </h3>
                            {/* <div className="accessories__item-compare gray-bg">
                                <span>Retina IPS LCD</span>
                                <span>10.2"</span>
                            </div> */}

                            <ul>
                                <li className="accessories__merge-item-selected">Dây cắm USB</li>
                                <li className="accessories__merge-item ">Bluetooth</li>
                            </ul>

                            <div className="accessories__box-p">
                                <p className="accessories__price-old black">9.990.000₫</p>
                                <span className="accessories__percent">-15%</span>
                            </div>
                            <strong className="accessories__price">8.490.000₫</strong>
                            <div className="accessories__item-rating">
                                <p>
                                <span class="product__sell-item-star-icon">★★★★☆</span>
                                </p>
                                <p className="accessories__item-rating-total"> 158 Đánh giá</p>
                            </div>
                        </li>
                    </ul>
                    </div>



                </div>
            </div >
            <Footer socket={socket} />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>

        </div>
    );

};

export default Accessories;