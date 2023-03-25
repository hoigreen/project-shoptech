import React from 'react'
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import Breadcrumbs from '../common/Breadcrumbs'

const InfoProductClient = ({ socket }) => {
    return (
        <div>
            <Nav socket={socket} />
            <Breadcrumbs />
            <div className="container">
                <div className="grid wide">
                    <div className="info-product__container">
                        <div className="info-product__header">
                            <label className="info-product__header-name">Laptop Acer Swift 3 SF314 512 56QN i5 1240P/16GB/512GB/Win11 (NX.K0FSV.002)</label>
                            <p className="info-product__header-star">(4.1 ⭐)</p>
                            <p className="info-product__header-voters">(143 lượt bình chọn)</p>
                        </div>

                        <div className="info-product__box">
                            <div className="info-product__image-group">
                                <div className="info-product__image-primary"
                                    style={{
                                        backgroundImage: "url(https://cdn.tgdd.vn/Products/Images/44/285765/Slider/vi-vn-acer-swift-3-sf314-512-56qn-i5-nxk0fsv002-2.jpg)",
                                        backgroundPosition: "center center",
                                        backgroundColor: "transparent",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"
                                    }}></div>
                                <label className="info-product__image-label">Những hình ảnh của sản phẩm</label>
                                <ul className="info-product__image-list">
                                    <li className='info-product__image-item'></li>
                                    <li className='info-product__image-item'></li>
                                    <li className='info-product__image-item'></li>
                                    <li className='info-product__image-item'></li>
                                    <li className='info-product__image-item'></li>
                                </ul>
                                <div className="info-product__policy">
                                    <label className="info-product__policy-header">CHÍNH SÁCH CỦA SẢN PHẨM</label>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-wrench"></i>
                                        <p className="info-product__policy-item-content">
                                            Bảo hành chính hãng <span style={{ fontWeight: 'bold' }}>12 tháng </span> tại trung tâm bảo hành ủy quyền của hệ thống cửa hàng của ShopTech
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-refresh"></i>
                                        <p className="info-product__policy-item-content">
                                            <span style={{ fontWeight: 'bold' }}>1 ĐỔI 1 </span>trong vòng 30 ngày đầu sử dụng và <span style={{ fontWeight: 'bold' }}>HỎNG GÌ ĐỔI NẤY </span> trong 90 ngày
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-retweet"></i>
                                        <p className="info-product__policy-item-content">
                                            Chính sách <span style={{ fontWeight: 'bold' }}>Trade-in lên đời </span> luôn hỗ trợ cho mọi sản phẩm
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='info-product__detail'>
                                <label className='info-product__detail-label info-product__detail-label-price'>Giá sản phẩm:</label>
                                <div className='info-product__detail-price'>
                                    <label className='info-product__detail-current-price'>19.200.129 đ</label>
                                    <label className='info-product__detail-old-price'>20,000,000 đ</label>
                                    <label className='info-product__detail-percent'>-12%</label>
                                </div>
                                <label className='info-product__detail-installment'>
                                    <i className="info-product__detail-installment-icon fa fa-tag"></i>
                                    Trả góp 0%
                                </label>
                                <div className='info-product__detail-option'>
                                    <label className='info-product__detail-label'>Chọn phiên bản:</label>
                                    <div className='info-product__detail-option-item info-product__detail-option-item--active'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                    <div className='info-product__detail-option-item'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                    <div className='info-product__detail-option-item'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                    <div className='info-product__detail-option-item'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                </div>
                                <div className='info-product__detail-option'>
                                    <label className='info-product__detail-label'>Chọn màu sắc:</label>
                                    <div className='info-product__detail-option-item info-product__detail-option-item--active'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                    <div className='info-product__detail-option-item'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                    <div className='info-product__detail-option-item'>
                                        <div className='info-product__detail-option-item-content'>16GB - 512GB</div>
                                        <div className='info-product__detail-option-item-price'>20.492.449 đ</div>
                                    </div>
                                </div>
                                <div className='info-product__detail-promote'>
                                    <label className='info-product__detail-promote-label'>
                                        <i className='info-product__detail-promote-label-icon fa fa-gift'></i>
                                        KHUYẾN MÃI RIÊNG CHO SẢN PHẨM
                                    </label>
                                    <div className='info-product__detail-promote-item'>
                                        <p className='info-product__detail-promote-item-index'>11</p>
                                        <label className='info-product__detail-promote-item-content'>
                                            Giảm ngay 1.800.000đ khi thanh toán qua QR bank
                                            <button className='info-product__detail-promote-item-content-btn'>(Xem chi tiết)</button>
                                        </label>
                                    </div>
                                    <div className='info-product__detail-promote-item'>
                                        <p className='info-product__detail-promote-item-index'>11</p>
                                        <label className='info-product__detail-promote-item-content'>
                                            Giảm ngay 1.800.000đ khi thanh toán qua QR bank
                                            <button className='info-product__detail-promote-item-content-btn'>(Xem chi tiết)</button>
                                        </label>
                                    </div>
                                    <div className='info-product__detail-promote-item'>
                                        <p className='info-product__detail-promote-item-index'>11</p>
                                        <label className='info-product__detail-promote-item-content'>
                                            Giảm ngay 1.800.000đ khi thanh toán qua QR bank
                                            <button className='info-product__detail-promote-item-content-btn'>(Xem chi tiết)</button>
                                        </label>
                                    </div>
                                </div>
                                <div className='info-product__detail-payment'>
                                    <button className='info-product__detail-payment-btn'>MUA NGAY</button>
                                    <button className='info-product__detail-payment-btn-cart'>
                                        <i className="info-product__detail-payment-btn-icon fa fa-cart-plus"></i>
                                        Thêm vào giỏ hàng
                                    </button>
                                    <button className='info-product__detail-payment-btn-installment'>
                                        <i className="info-product__detail-payment-btn-icon fa fa-credit-card"></i>
                                        MUA TRẢ GÓP 0%
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='info-product__similar'>
                            <div className="info-product__similar-label">SẢN PHẨM TƯƠNG TỰ</div>
                            <ul className="info-product__similar-list">
                                {/* {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
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
                                ))} */}
                            </ul>
                        </div>

                        <div className='info-product__review-container'>
                            <div className="info-product__rating-box">
                                <label className="info-product__rating-label">ĐÁNH GIÁ SẢN PHẨM</label>
                                <p className="info-product__rating-star">5.0/5</p>
                                <p className="info-product__rating-star-icon">★ ★ ★ ★ ☆</p>
                                <p className="info-product__rating-number">1 lượt đánh giá</p>
                            </div>

                            <ul className="info-product__review-list">
                                <label className="info-product__review-label">Nhận xét</label>
                                <li className="info-product__review-item">
                                    <div className="info-product__review-item-title">
                                        <div className='info-product__review-item-info'>
                                            <div className='info-product__review-item-avatar'></div>
                                            <div className='info-product__review-item-fullname'>Trương Quốc Hội</div>
                                        </div>
                                        <p className='info-product__review-item-time'>
                                            <i className='info-product__review-item-time-icon fa fa-clock'></i>
                                            2201.1212
                                        </p>
                                    </div>
                                    <div className='info-product__review-item-vote'>
                                        <label className='info-product__review-item-vote-title'>
                                            Đánh giá sản phẩm:
                                            <span className='info-product__review-item-vote-start'>4 star</span>
                                        </label>
                                        <label className='info-product__review-item-vote-title'>Nhận xét sản phẩm:</label>
                                        <div className='info-product__review-item-vote-box'>
                                            <p className='info-product__review-item-vote-content'>Chất lượng của nó như cái ghế vậy, vì nó không phải bàn!</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </div>

                </div>
            </div>
            <Footer socket={socket} />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    )
}

export default InfoProductClient;