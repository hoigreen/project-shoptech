import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import ModalLoading from '../common/ModalLoading';
import AdminSidebar from '../common/AdminSidebar';
import AdminHeader from '../common/AdminHeader';

const InfoCustomer = ({ socket }) => {
    const [users, setUsers] = useState([])
    const { userID, username } = useParams()
    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullnameUser, setFullnameUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [phoneUser, setPhoneUser] = useState('')
    const [addressUser, setAddressUser] = useState('')

    const [fullnameUserEdit, setFullnameUserEdit] = useState('')
    const [emailUserEdit, setEmailUserEdit] = useState('')
    const [phoneUserEdit, setPhoneUserEdit] = useState('')
    const [addressUserEdit, setAddressUserEdit] = useState('')

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            });
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        // show thông tin user
        users.map((user, index) => {
            if (user.userID === userID) {
                setAvatarUrl(user.avatarUrl);
                setFullnameUser(user.fullname);
                setEmailUser(user.email);
                setPhoneUser(user.phone);
                setAddressUser(user.address);
            }
        })
        
        handleLoadOptionSelected(1)
    })

    const handleLoadOptionSelected = (index) => {
        const optionItems = document.querySelectorAll('.sidebar__component-item')
        const optionItemActive = document.querySelector(".sidebar__component-item.sidebar__component-item--active")
        optionItems.forEach((item, i) => {
            if (optionItemActive) {
                optionItemActive.classList.remove("sidebar__component-item--active")
            }
        })
        optionItems[index].classList.add("sidebar__component-item--active")
    }

    const handleConfirmChange = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn sửa đổi thông tin khách hàng!") == true) {
            socket.emit("editInfoCustomer", { userID, fullname: fullnameUserEdit, email: emailUserEdit, phone: phoneUserEdit, address: addressUserEdit })
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload();
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
        <div className='customer__container'>
            <ModalLoading />
            <AdminSidebar />
            <div id="admin-box">
                <AdminHeader />

                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý khách hàng</label>
                </div>

                <div className='info-page__group'>
                    <div className="info-page__header">Chỉnh sửa thông tin khách hàng</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <img src={avatarUrl} className="info-page__avatar-img"></img>
                            </div>
                            <label className="info-page__user-id">{username}</label>
                        </div>

                        <div className='info-page__col-2'>
                            <label className="info-page__title">Thông tin cá nhân</label>

                            <div className="info-page__box-info">
                                <label className="info-page__label">Mã khách hàng</label>
                                <input style={{ fontWeight: 'bold' }}
                                    readOnly
                                    className='info-page__input info-page__input--readonly'
                                    value={userID} />

                                <label className="info-page__label">Họ và tên khách hàng</label>
                                <input className='info-page__input' defaultValue={fullnameUser} onChange={(e) => { setFullnameUserEdit(e.target.value); }} />

                                <label className="info-page__label">Email</label>
                                <input className='info-page__input' defaultValue={emailUser} onChange={(e) => { setEmailUserEdit(e.target.value); }} />

                                <label className="info-page__label">Số điện thoại</label>
                                <input className='info-page__input' defaultValue={phoneUser} onChange={(e) => { setPhoneUserEdit(e.target.value); }} />

                                <label className="info-page__label">Địa chỉ</label>
                                <input className='info-page__input' defaultValue={addressUser} onChange={(e) => { setAddressUserEdit(e.target.value); }} />

                            </div>
                        </div>
                    </div>

                    <div className="info-page__footer">
                        <button className="info-page__btn" onClick={handleConfirmChange}>Xác nhận<i className="ti-check"></i></button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default InfoCustomer;