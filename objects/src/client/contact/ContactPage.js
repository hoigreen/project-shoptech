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
                    <div className='contact'>
                        <div className='contact__container'>
                            <label className='contact__item contact__title'>Thông tin liên hệ</label>
                            <label className='contact__item contact__description'>Bất kì câu hỏi hoặc nhận xét nào! Hãy liên hệ với Nhóm 3 chúng tôi qua những cách dưới đây.
                                Sự hài lòng của bạn là vinh dự cho chúng tôi</label>
                            <div className='contact__item contact__phone'>
                                <i className='contact__icon ti-mobile'></i>
                                (+84) 28 123456789
                            </div>
                            <div className='contact__item contact__email'>
                                <i className='contact__icon ti-email'></i>
                                nhom3_ltm@gmail.com</div>
                            <div className='contact__item contact__address'>
                                <i className='contact__icon ti-location-pin'></i>
                                70 Tô Ký, P.Tân Chánh Hiệp, Q.12, TPHCM</div>
                            <div className='contact__item contact__social'>
                                <i className='contact__social-icon ti-facebook'></i>
                                <i className='contact__social-icon ti-instagram'></i>
                                <i className='contact__social-icon ti-twitter-alt'></i>
                                <i className='contact__social-icon ti-dropbox'></i>
                                <i className='contact__social-icon ti-sharethis'></i>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <Footer />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    );
}

export default ContactPage;