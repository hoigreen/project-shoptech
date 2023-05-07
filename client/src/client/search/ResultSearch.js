import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../common/Nav';
import Footer from '../common/Footer';
import Breadcrumbs from '../common/Breadcrumbs';

const ResultSearch = ({ socket }) => {
    const { keySearch } = useParams()
    const [products, setProducts] = useState([])
    const [countProducts, setCountProducts] = useState()

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
        const listProducts = document.querySelector(".search-list__container")
        const listArray = []
        products.map((product, index) => {
            if ((String(product.name).toLowerCase()).includes(keySearch.toLowerCase())) {
                listArray.push(product)
                listProducts.innerHTML = `
                ${loading ? <p>Đang kết nối đến server ... </p> : listArray.map((p, i) => (
                    `
                    <li
                    class="product__sell-item"
                    key=${index}
                    style='display:block;
                    margin: 0 5px 12px;'
                    >

                    <img src=${p.imageLink} class='home__flash-sale-item-img' />
                    <label class='product__sell-item-label'>${p.name}</label>
                    <label class='product__sell-item-price'>${Number(p.price).toLocaleString()} ₫</label>
                    <span class='product__sell-item-percent'>${(Number(p.price) * 1.065).toLocaleString()}đ</span>
                    <label class='product__sell-item-sold'>
                        Đánh giá: 
                        <span class='product__sell-item-star-icon'>${handleFormatStarProduct(p.star)}</span>
                    </label>
                </li>
                    `
                ))}
                `
            }
        })
        setCountProducts(listArray.length)
        const options = document.querySelectorAll(".product__sell-item--tablet")
        options.forEach((option, index) => {
            option.onclick = () => {
                window.location.href = `/product/${listArray[index].id}/${listArray[index].name}`
            }
        })
    }

    const handleClickSearchByType = (productType) => {
        const listProducts = document.querySelector(".search-list__container")
        const listArray = []
        products.map((product, index) => {
            if ((String(product.name).toLowerCase()).includes(keySearch.toLowerCase()) && product.enType === productType) {
                listArray.push(product)
                listProducts.innerHTML = `
                ${loading ? <p>Đang kết nối đến server ... </p> : listArray.map((p, i) => (
                    `
                    <li
                    class="product__sell-item--tablet"
                    key=${index}
                    style='display:block;
                    margin: 10px 10px 12px;'>

                    <img src=${p.imageLink} class='home__flash-sale-item-img' />
                    <label class='product__sell-item-label'>${p.name}</label>
                    <label class='product__sell-item-price'>${Number(p.price).toLocaleString()} ₫</label>
                    <span class='product__sell-item-percent'>${(Number(p.price) * 1.065).toLocaleString()}đ</span>
                    <label class='product__sell-item-sold'>
                        Đánh giá: 
                        <span class='product__sell-item-star-icon'>${handleFormatStarProduct(p.star)}</span>
                    </label>
                </li>
                    `
                ))}
                `
            }
        })
        document.querySelector('.search-header__count-number').innerHTML = `${listArray.length}`
        if (listArray.length === 0) {
            listProducts.innerHTML = `
            <div class="search-list--empty"></div>`
        }
        // listArray.splice(0, listArray.length)
        const btnList = document.querySelector(".search-control");
        const btnItems = btnList.querySelectorAll('.search-control__btn')
        btnItems.forEach((btnItem, index) => {
            btnItem.onclick = () => {
                const btnItemActive = btnList.querySelector(".search-control__btn.search-control__btn--active")
                if (btnItemActive) {
                    btnItemActive.classList.remove("search-control__btn--active")
                    btnItem.classList.add('search-control__btn--active')
                } else {
                    btnItem.classList.add('search-control__btn--active')
                }
            }
        })
        const options = document.querySelectorAll(".product__sell-item--tablet")
        options.forEach((option, index) => {
            option.onclick = () => {
                window.location.href = `/product/${listArray[index].id}/${listArray[index].name}`
            }
        })
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

    const handleClickProduct = (productType, productName) => {
        handLoadingPage(1)
        window.setTimeout(() => {
            window.location.href = `/product/${productType}/${productName}`
        }, 1000)
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
                        <div className="modal__loading-spinner"></div>
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
                            <p className='search-header__count'>Đã tìm thấy <span style={{ fontWeight: "bold", fontStyle: "normal" }} className='search-header__count-number'>{countProducts || 0}</span> kết quả phù hợp</p>
                        </div>

                        <div className="search-control">
                            <button className="search-control__btn search-control__btn--active" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000)
                            }}>Tất cả</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    handleClickSearchByType("smartphone")
                                }, 2000)
                            }}>Điện thoại</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    handleClickSearchByType("tablet")
                                }, 2000)
                            }}>Máy tính bảng</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    handleClickSearchByType("laptop")
                                }, 2000)
                            }}>Máy tính xách tay</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    handleClickSearchByType("accessories")
                                }, 2000)
                            }}>Phụ kiện</button>
                        </div>

                        <ul className="search-list__container">
                            <div className="search-list--empty">
                            </div>

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