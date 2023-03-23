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

                            <label className="info-product__header-name">Iphone 13</label>
                            <p className="info-product__header-star">4.1 star</p>
                            <p className="info-product__header-voters">(143 lượt bình chọn)</p>
                        </div>

                        <div className="info-product__box">
                            <div className="info-product__image-group">
                                <div className="info-product__image-primary"></div>
                                <label className="info-product__image-label">Những hình ảnh của sản phẩm</label>
                                <ul className="info-product__image-list">
                                    <li className='info-product__image-item'></li>
                                </ul>
                                <div className="info-product__policy">
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon"></i>
                                        <p className="info-product__policy-item-conttent"></p>
                                        <button className="info-product__policy-item-btn">Xem chi tiết</button>
                                    </div>
                                </div>
                            </div>

                            <div className='info-product__detail'>
                                <label className='info-product__detail-label'></label>
                                <label className='info-product__detail-price'></label>
                                <label className='info-product__detail-old-price'></label>
                                <label className='info-product__detail-percent'></label>
                                <label className='info-product__detail-installment'></label>
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