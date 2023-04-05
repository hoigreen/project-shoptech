import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import Breadcrumbs from '../common/Breadcrumbs';

const ResultSearch = ({ socket }) => {
    const { keySearch } = useParams()
    const [products, setProducts] = useState([])

    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {

        handleSearch()
        handleFormatCrumbs()
    })

    const handleFormatCrumbs = () => {
        const crumbLinks = document.querySelectorAll(".crumb-link");
        crumbLinks.forEach(crumbLink => {
            if (crumbLink.innerHTML.includes("=")) {
                crumbLink.style.display = "none"
            }
        })
    }

    const handleSearch = () => {
        const listProducts = document.querySelector(".home__featured-list")
        products.map((product, index) => {
            if ((product.name).includes(keySearch)) {
                listProducts.innerHTML = `
                ${loading ? <p>Đang kết nối đến server ... </p> : products.map((product, i) => (
                    `
                    <li
                    class="product__sell-item--tablet"
                    key=${index}
                    style='display:block;'>

                    <div style='
                        background-image: url(${product.imageLink});
                        background-color: transparent;
                        background-position: center center;
                        background-size: 95%;
                        background-repeat: no-repeat;
                        ' 
                        class='product__sell-item-img'></div>
                    <label class='product__sell-item-label'>${product.name}</label>
                    <label class='product__sell-item-price'>${Number(product.price).toLocaleString()} ₫</label>
                    <span class='product__sell-item-percent'>${(Number(product.price) * 1.065).toLocaleString()}đ</span>
                    <label class='product__sell-item-sold'>
                        Đánh giá:
                        <span class='product__sell-item-star'>${product.star}</span>
                        <span class='product__sell-item-star-icon'>⭐</span>
                    </label>
                </li>
                    `
                ))}
                `
            }
        })
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
            <Nav />
            <Breadcrumbs />
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            <div className='container'>
                <div className="grid wide">
                    <div className="search-container">
                        <div className="search-header">
                            <label className="search-header__label">Kết quả tìm kiếm cho từ khóa:
                                <span className='search-header__label-key'>"{keySearch}"</span>
                            </label>
                            <p className='search-header__count'>Đã thấy <span style={{ fontWeight: "bold", fontStyle: "normal" }}>1000</span> kết quả phù hợp</p>
                        </div>

                        <div className="search-control">
                            <button className="search-control__btn search-control__btn--active">Tất cả</button>
                            <button className="search-control__btn">Điện thoại</button>
                            <button className="search-control__btn">Máy tính bảng</button>
                            <button className="search-control__btn">Máy tính xách tay</button>
                            <button className="search-control__btn">Phụ kiện</button>
                        </div>

                        <ul className="home__featured-list">
                            {/* {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                <li
                                    className="product__sell-item--tablet"
                                    key={index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handLoadingPage(1)
                                        window.setTimeout(() => {
                                            window.location.href = `/ product / ${product.enType} /${product.name}`
                                        }, 1000)
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
                                </li >
                            ))} */}

                        </ul >
                        <button className='search-control__show-more'>Xem thêm sản phẩm</button>
                    </div >

                </div >
            </div >

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div >
    );

};

export default ResultSearch;