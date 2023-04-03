import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav';
import Footer from '../common/Footer';
import Breadcrumbs from '../common/Breadcrumbs';

const ContactPage = () => {


    return (
        <div>
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            <Nav />
            <Breadcrumbs />
            <div className="container">
                <div className='grid wide'>
                    <div className='contact__box'>
                        <label className='contact__box-title'>LIÊN HỆ VỚI SHOPTECH</label>
                        <form className='contact__box-form'>
                            <input style={{
                                color: "green",
                                fontWeight: "bold",
                            }}
                                required
                                className='contact__box-form-input'
                                type='text'
                                placeholder='Điền họ tên của bạn ...'
                            />
                            <input required className='contact__box-form-input' type='email' placeholder='Điền email ...' />
                            <select required className='contact__box-form-select'>
                                <option className='contact__box-form-option' value='...'>Chọn vấn đề góp ý</option>
                                <option className='contact__box-form-option' value='...'>Vấn đề tài khoản</option>
                                <option className='contact__box-form-option' value='...'>Vấn đề khuyến mãi</option>
                                <option className='contact__box-form-option' value='...'>Cải thiện hệ thống</option>
                                <option className='contact__box-form-option' value='...'>Vấn đề khác</option>
                            </select>
                            <label className='contact__box-form-label'>Nội dung</label>
                            <textarea required className='contact__box-form-textbox' type='text' />
                            <button className='contact__box-form-btn'>Gửi góp ý</button>
                        </form>
                    </div>

                    <ul className="contact__info-list">
                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-location"></i>
                            <label className="contact__info-item-title"></label>
                            <p className="contact__info-item-content"></p>
                        </li>
                    </ul>
                </div>
            </div>

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    );
}

export default ContactPage;