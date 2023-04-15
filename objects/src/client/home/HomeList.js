import React from 'react'

const HomeList = () => {

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div id="home__list">
            <div className="home__list-label">Danh mục sản phẩm</div>
            <ul className="home__list-product">
                <li className='home__list-product-item' onClick={(e) => {
                    handLoadingPage(1.5)
                    setTimeout(() => {
                        window.location.href = "/smartphone"
                    }, 1000)
                }}>
                    <div className="home__list-product-img-1" ></div>
                    <p className="home__list-product-name">Điện thoại di động</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => {
                    handLoadingPage(1.5)
                    setTimeout(() => {
                        window.location.href = "/laptop"
                    }, 1000)
                }}>
                    <div className="home__list-product-img-2"></div>
                    <p className="home__list-product-name">Máy tính xách tay</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => {
                    handLoadingPage(1.5)
                    setTimeout(() => {
                        window.location.href = "/tablet"
                    }, 1000)
                }}>
                    <div className="home__list-product-img-3" ></div>
                    <p className="home__list-product-name">Máy tính bảng</p>
                </li>
                <li className='home__list-product-item' onClick={(e) => {
                    handLoadingPage(1.5)
                    setTimeout(() => {
                        window.location.href = "/accessories"
                    }, 1000)
                }}>
                    <div className="home__list-product-img-4"></div>
                    <p className="home__list-product-name">Phụ kiện đỉnh chóp</p>
                </li>
            </ul>
        </div>
    )
}

export default HomeList