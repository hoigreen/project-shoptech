import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import "./styles/info-style.css" 

import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';

const InfoCustomer = ({ socket }) => {
    const [users, setUsers] = useState([])
    const { userID, username } = useParams()

    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullnameUser, setFullnameUser] = useState('')
    const [emailUser, setEmailUser] = useState('')
    const [phoneUser, setPhoneUser] = useState('')
    const [addressUser, setAddressUser] = useState('')

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            });
        }
        fetchAPI()
        handleLoadOptionSelected(1)
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
    }, [users])

    const handleConfirmChange = (e) => {
        e.preventDefault()
        const inputElements = document.querySelectorAll(".info-page__input");
        if (window.confirm("Bạn muốn sửa đổi thông tin khách hàng!") == true) {
            socket.emit("editInfoCustomer", { userID, fullname: inputElements[1].value, email: inputElements[2].value, phone: inputElements[3].value, address: inputElements[4].value })
            handleLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload();
            }, 1000)
        }
    }

    return (
        <>
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
                                <input className='info-page__input' defaultValue={fullnameUser} />

                                <label className="info-page__label">Email</label>
                                <input className='info-page__input' defaultValue={emailUser} />

                                <label className="info-page__label">Số điện thoại</label>
                                <input className='info-page__input' defaultValue={phoneUser} />

                                <label className="info-page__label">Địa chỉ</label>
                                <input className='info-page__input' defaultValue={addressUser} />

                            </div>
                        </div>
                    </div>

                    <div className="info-page__footer">
                        <button className="info-page__btn" onClick={handleConfirmChange}>Xác nhận<i className="ti-check"></i></button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoCustomer;