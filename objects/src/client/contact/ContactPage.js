import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

import Nav from '../common/Nav';
import Footer from '../common/Footer';
import Breadcrumbs from '../common/Breadcrumbs';

const ContactPage = ({ socket }) => {
    const [feedbacks, setFeedbacks] = useState([])

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [type, setType] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        const fecthApiFeedbacks = () => {
            fetch("http://localhost:4000/api/feedbacks").then(res => res.json()).then(data => {
                setFeedbacks(data.feedbacks)
            })
        }
        fecthApiFeedbacks()
    }, [])

    const form = useRef();

    const handleSend = (e) => {
        e.preventDefault();
        console.log(name, email, type, content)
        if (window.confirm('Bạn chắc chắn muốn gửi những thông tin bạn nhập vào cho đội ngũ quản trị viên!') === true) {
            socket.emit("sendFeedbackFromGuest", {
                name: name,
                email: email,
                type: type,
                content: content,
            });
            emailjs.sendForm('service_tz648gc', 'template_2tugvgr', form.current, 'zD-R_dG5L23lbkbpU')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload()
            }, 1000)
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
                    <ul className="contact__info-list">
                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-map-marker"></i>
                            <label className="contact__info-item-title">Trụ sở chính</label>
                            <p className="contact__info-item-content">70 Tô Ký, phường Tân Chánh Hiệp, quận 12, TPHCM</p>
                        </li>

                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-phone"></i>
                            <label className="contact__info-item-title">Đường dây nóng</label>
                            <p className="contact__info-item-content">(+84) 38 551 1320</p>
                        </li>

                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-envelope"></i>
                            <label className="contact__info-item-title">Thư điện tử</label>
                            <p className="contact__info-item-content">contact@shoptech.uth</p>
                        </li>

                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-headphones"></i>
                            <label className="contact__info-item-title">Tổng đài viên</label>
                            <p className="contact__info-item-content">Hỗ trợ 24/7</p>
                        </li>

                        <li className="contact__info-item">
                            <i className="contact__info-item-icon fa fa-fax"></i>
                            <label className="contact__info-item-title">Fax</label>
                            <p className="contact__info-item-content">212-222-2932</p>
                        </li>
                    </ul>

                    <div className='contact__box'>
                        <label className='contact__box-title'>LIÊN HỆ VỚI SHOPTECH</label>
                        <form ref={form} className='contact__box-form' onSubmit={handleSend}>
                            <input style={{
                                color: "green",
                                fontWeight: "bold",
                            }}
                                required
                                name='name'
                                className='contact__box-form-input'
                                type='text'
                                placeholder='Điền họ tên của bạn ...'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                            <input
                                required
                                className='contact__box-form-input'
                                type='email'
                                name='email'
                                placeholder='Điền email ...'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                            <select required
                                className='contact__box-form-select'
                                onChange={(e) => {
                                    setType(e.target.value)
                                }}
                                name='type'
                                value={type}
                            >

                                <option className='contact__box-form-option' value='...'>Chọn vấn đề góp ý</option>
                                <option className='contact__box-form-option' value='Vấn đề tài khoản'>Vấn đề tài khoản</option>
                                <option className='contact__box-form-option' value='Vấn đề khuyến mãi'>Vấn đề khuyến mãi</option>
                                <option className='contact__box-form-option' value='Cải thiện hệ thống'>Cải thiện hệ thống</option>
                                <option className='contact__box-form-option' value='Vấn đề khác'>Vấn đề khác</option>
                            </select>

                            <label className='contact__box-form-label'>Nội dung</label>

                            <textarea required
                                className='contact__box-form-textbox'
                                type='text'
                                name='content'
                                onChange={(e) => setContent(e.target.value)}
                                value={content} />
                            <button className='contact__box-form-btn'>Gửi góp ý</button>
                        </form>
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