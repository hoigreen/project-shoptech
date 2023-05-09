import React from 'react'

const HomeList = () => {

    const handLoadingPage = (second, link) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
        setTimeout(() => {
            window.location.href = link
        }, second * 1000)
    }

    return (
        <div id="home__list" className='hide-on-mobile'>
            <div className="home__list-label">Danh mục sản phẩm</div>
            <ul className="home__list-product">
                <li className='home__list-product-item' onClick={(e) => { handLoadingPage(1.5, "/product/smartphone") }}>
                    <div className="home__list-product-img-1" ></div>
                    <p className="home__list-product-name">Điện thoại di động</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => { handLoadingPage(1.5, "/product/laptop") }}>
                    <div className="home__list-product-img-2"></div>
                    <p className="home__list-product-name">Máy tính xách tay</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => { handLoadingPage(1.5, "/product/tablet") }}>
                    <div className="home__list-product-img-3" ></div>
                    <p className="home__list-product-name">Máy tính bảng</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => { handLoadingPage(1.5, "/product/accessories") }}>
                    <div className="home__list-product-img-4"></div>
                    <p className="home__list-product-name">Phụ kiện đỉnh chóp</p>
                </li>
            </ul>
        </div>
    )
}

export default HomeList