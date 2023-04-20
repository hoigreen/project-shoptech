import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav';
import HotPromote from './HotPromote';
import ModalLoading from '../common/ModalLoading';
import HomeList from './HomeList';
import Footer from '../common/Footer';
import SideBanner from './SideBanner';

const Home = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(1)
    const [timeEnd, setTimeEndSale] = useState(4)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })

            fetch("http://localhost:4000/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        // show thông tin sản phẩm hot deal
        products.map((product, index) => {
            const infoProductHotDeal = document.querySelectorAll('.home__flash-sale-item')[index];
            if (product.hotDeal === true) {
                infoProductHotDeal.style.display = "inline-block";
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

        handleSetWidthBanner()
    })

    window.onload = () => {
        var countDownDate = new Date(`5 ${timeEnd}, 2023 00:00:00`).getTime();
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

        handleLoadBanner()
    }

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

    var indexBanner = 0;
    const handleSetWidthBanner = () => {
        const bannerGroup = document.querySelector(".home-promote__group")
        const bannerList = document.querySelectorAll(".home-promote__item")
        if (bannerList.length > 0) {
            bannerGroup.style.width = `${Number(bannerList.length) * 600}px`
        }
    }

    const handleLoadBanner = () => {
        const bannerGroup = document.querySelector(".home-promote__group")
        const bannerList = document.querySelectorAll(".home-promote__item")
        setInterval(() => {
            indexBanner += 1;
            bannerGroup.style.transform = `translateX(-${(indexBanner - 1) * 600}px)`

            if (indexBanner > bannerList.length - 1 || indexBanner === bannerList.length) {
                bannerGroup.style.transform = "translateX(0)"
                indexBanner = 0;
            }
            else {
                bannerGroup.style.transform = `translateX(-${indexBanner * 600}px)`
            }
        }, 4000)
    }

    const handleTransitionNextBanner = () => {
        const bannerGroup = document.querySelector(".home-promote__group")
        const bannerList = document.querySelectorAll(".home-promote__item")
        indexBanner += 1;

        if (indexBanner >= bannerList.length - 1) {
            bannerGroup.style.transform = "translateX(0)"
            indexBanner = 0;
            return;
        }
        bannerGroup.style.transform = `translateX(-${indexBanner * 600}px)`
    }

    const handleTransitionPrevBanner = () => {
        const bannerGroup = document.querySelector(".home-promote__group")
        const bannerList = document.querySelectorAll(".home-promote__item")
        indexBanner -= 1;

        if (indexBanner < 1) {
            indexBanner = bannerList.length;
            bannerGroup.style.transform = `translateX(-${(bannerList.length - 1) * 600}px)`
            return;
        }
        bannerGroup.style.transform = `translateX(-${indexBanner * 600 - 600}px)`
    }

    var indexSlide = 0;
    const handleTransitionSlideDown = () => {
        if (indexSlide < 0) indexSlide = 0;
        const slideGroup = document.querySelector(".home-flash-sale__group")
        const slideList = document.querySelectorAll(".home__flash-sale-item")
        indexSlide += 1;
        if (indexSlide > (slideList.length - (slideList.length % 10)) / 10) {
            indexSlide = (slideList.length - (slideList.length % 10)) / 10
            return;
        }
        else {
            slideGroup.style.transform = `translateY(-${indexSlide * 744}px)`
        }
    }

    const handleTransitionSlideUp = () => {
        if (indexSlide < 0) indexSlide = 0;
        const slideGroup = document.querySelector(".home-flash-sale__group")
        const slideList = document.querySelectorAll(".home__flash-sale-item")
        indexSlide -= 1;
        console.log(indexSlide)
        console.log((slideList.length - (slideList.length % 10)) / 10)
        if (indexSlide < 0) return;
        else {
            slideGroup.style.transform = `translateY(-${(indexSlide + 1) * 744 - 744}px)`
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
            <ModalLoading />
            <Nav socket={socket} />
            <HotPromote socket={socket} />
            <div className="grid wide">
                <div className="home__container">
                    <SideBanner />
                    <ul id="home-promote">
                        <button className='home-promote__pre' onClick={handleTransitionPrevBanner}>
                            <i className='home-promote__icon fa fa-arrow-left'></i>
                        </button>
                        <button className='home-promote__next' onClick={handleTransitionNextBanner}>
                            <i className='home-promote__icon fa fa-arrow-right'></i>
                        </button>

                        <div className='home-promote__group'>
                            {loading ? <p>Đang kết nối đến server...</p> : promotes.map((promote, index) => (
                                <img src={promote.imageLink} className='home-promote__item' alt='' key={index}>
                                </img>
                            ))}
                        </div>
                    </ul>

                    <HomeList />

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
                                    <div className='home__flash-sale-time-valid'>{timeStart}/4/2023 - {timeEnd}/5/2023</div>
                                </div>
                            </div>

                            <button className="home__flash-sale-btn" onClick={handleTransitionSlideUp}>
                                <i className="home__flash-sale-btn-icon fa-solid fa-chevron-up" ></i>
                            </button>
                            <ul className="home__flash-sale-list">
                                <div className="home-flash-sale__group">
                                    {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                        <li
                                            className="home__flash-sale-item"
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handLoadingPage(1)
                                                window.setTimeout(() => {
                                                    window.location.href = `/product/${product.enType}/${product.name}`
                                                }, 1000)
                                            }}>
                                            <img src={product.imageLink} className='home__flash-sale-item-img'></img>
                                            <label className='home__flash-sale-item-label'>{product.name}</label>
                                            <label className='home__flash-sale-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                            <span className='home__flash-sale-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                            <label className='home__flash-sale-item-sold'>
                                                Đã bán
                                                <span className='home__flash-sale-item-number'>{Math.floor((Number((Math.random() % 100 * (99 - 1)))))}</span>
                                            </label>
                                            <div className='home__flash-sale-item-tag'>Giảm {product.percent}%</div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                            <button className="home__flash-sale-btn" onClick={handleTransitionSlideDown}>
                                <i className="home__flash-sale-btn-icon fa-solid fa-chevron-down" ></i>
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
                        <ul className="home__featured-list">
                            {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                <li
                                    className="product__sell-item--smartphone"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            window.location.href = `/product/${product.enType}/${product.name}`
                                        }, 1000)
                                    }}
                                >
                                    <img src={product.imageLink}
                                        className='home__flash-sale-item-img'>
                                    </img>
                                    <label className='product__sell-item-label'>{product.name}</label>
                                    <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                    <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                    <label className='product__sell-item-sold'>
                                        Đánh giá:
                                        <span className='product__sell-item-star-icon'>{handleFormatStarProduct(product.star)}</span>
                                    </label>
                                    <div className='home__flash-sale-item-tag'>Giảm {product.percent}%</div>
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
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            window.location.href = `/product/${product.enType}/${product.name}`
                                        }, 1000)
                                    }}
                                >
                                    <img src={product.imageLink}
                                        className='home__flash-sale-item-img'>
                                    </img>
                                    <label className='product__sell-item-label'>{product.name}</label>
                                    <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                    <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                    <label className='product__sell-item-sold'>
                                        Đánh giá:
                                        <span className='product__sell-item-star-icon'>{handleFormatStarProduct(product.star)}</span>
                                    </label>
                                    <div className='home__flash-sale-item-tag'>Giảm {product.percent}%</div>

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
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            window.location.href = `/product/${product.enType}/${product.name}`
                                        }, 1000)
                                    }}
                                >
                                    <img src={product.imageLink}
                                        className='home__flash-sale-item-img'>
                                    </img>
                                    <label className='product__sell-item-label'>{product.name}</label>
                                    <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                    <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                    <label className='product__sell-item-sold'>
                                        Đánh giá:
                                        <span className='product__sell-item-star-icon'>{handleFormatStarProduct(product.star)}</span>
                                    </label>
                                    <div className='home__flash-sale-item-tag'>Giảm {product.percent}%</div>
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
                                    className="product__sell-item--accessories .hotIcons"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            window.location.href = `/product/${product.enType}/${product.name}`
                                        }, 1000)
                                    }}
                                >
                                    <img src={product.imageLink}
                                        className='home__flash-sale-item-img'>
                                    </img>
                                    <label className='product__sell-item-label'>{product.name}</label>
                                    <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                    <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                    <label className='product__sell-item-sold'>
                                        Đánh giá:
                                        <span className='product__sell-item-star-icon'>{handleFormatStarProduct(product.star)}</span>
                                    </label>
                                    <div className='home__flash-sale-item-tag'>Giảm {product.percent}%</div>
                                </li>
                            ))}
                        </ul>

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