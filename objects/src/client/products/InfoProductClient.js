import React from 'react'
import Nav from '../common/Nav'
import Footer from '../common/Footer'

const InfoProductClient = ({ socket }) => {
    return (
        <div>
            <Nav socket={socket} />
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
                                <label className='info-product__detail-label'>Giá sản phẩm:</label>
                                <div className='info-product__detail-price'>
                                    <label className='info-product__detail-current-price'>19.200.129 đ</label>
                                    <label className='info-product__detail-old-price'>20,000,000 đ</label>
                                    <label className='info-product__detail-percent'>-12%</label>
                                </div>
                                    <label className='info-product__detail-installment'>Trả góp 0%</label>
                                <div className='info-product__detail-option'>
                                    <div className='info-product__detail-option-item'></div>
                                </div>
                                <div className='info-product__detail-option'>
                                    <div className='info-product__detail-option-item'></div>
                                </div>
                                <div className='info-product__detail-promote'>
                                    <div className='info-product__detail-promote-item'></div>
                                </div>
                                <div className='info-product__detail-payment'>
                                    <button className='info-product__detail-payment-item'>MUA NGAY</button>
                                </div>
                            </div>
                        </div>

                        <div className='info-product__similar'>

                        </div>

                        <div className='info-product__review-container'>
                            <div className='info-product__review'>
                                <label className="info-product__review-header"></label>
                                <div className="info-product__review-box">
                                    <p className="info-product__review-star"></p>
                                    <p className="info-product__review-star-icon"></p>
                                    <p className="info-product__review-number"></p>
                                </div>

                                <ul className="info-product__review-list">
                                    <li className="info-product__review-item">
                                        <div className="info-product__review-item-title">
                                            <div className='info-product__review-item-info'>
                                                <div className='info-product__review-item-avatar'></div>
                                                <div className='info-product__review-item-fullname'></div>
                                            </div>
                                            <p className='info-product__review-item-time'></p>
                                        </div>
                                        <div className='info-product__review-item-vote'>
                                            <label className='info-product__review-item-vote-title'>Đánh giá sản phẩm:
                                                <span className='info-product__review-item-vote-start'>4 star</span>
                                            </label>
                                            <p className='info-product__review-item-vote-content'>4 star</p>
                                        </div>
                                    </li>
                                </ul>

                            </div>
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