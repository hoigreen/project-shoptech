import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const InfoAdmin = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])
    const [adminName, setAdminName] = useState('')
    const [adminID, setAdminID] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')
    const [fullname, setFullname] = useState('')
    const [emailAdmin, setEmailAdmin] = useState('')
    const [phoneAdmin, setPhoneAdmin] = useState('')
    const [addressAdmin, setAddressAdmin] = useState('')

    const [fullnameEdit, setFullnameEdit] = useState('')
    const [emailAdminEdit, setEmailAdminEdit] = useState('')
    const [phoneAdminEdit, setPhoneAdminEdit] = useState('')
    const [addressAdminEdit, setAddressAdminEdit] = useState('')

    const [error, setError] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })
        }
        fetchAPI()
    }, [])

    const handleNevigateDashboard = (e) => {
        e.preventDefault();
        navigate(`/admin/dashboard`);
    }
    const handleNevigateCustomer = (e) => {
        e.preventDefault();
        navigate(`/admin/customer`);
    }
    const handleNevigateProduct = (e) => {
        e.preventDefault();
        navigate(`/admin/Product`);
    }
    const handleNevigatePromote = (e) => {
        e.preventDefault();
        navigate(`/admin/Promote`);
    }


    const LogOut = () => {
        window.location.href = "/admin"
    }

    useEffect(() => {
        // show thông tin admin đăng nhập
        admins.map((admin, index) => {
            if (admin.adminName == window.localStorage.getItem('adminNameLogin')) {
                setAdminID(admin.adminID);
                setAdminName(admin.adminName);
                setFullname(admin.fullname);
                setAvatarUrlAdmin(admin.avatarUrl);
                setEmailAdmin(admin.email);
                setPhoneAdmin(admin.phone);
                setAddressAdmin(admin.address);
            }
        })
    })

    const handleConfirmChange = (e) => {
        e.preventDefault()
        socket.emit("editInfoAdmin", { adminID, fullname: fullnameEdit, email: emailAdminEdit, phone: phoneAdminEdit, address: addressAdminEdit })
        window.location.href = window.location.href;
    }

    return (
        <div className='customer__container'>
            <div id="sidebar">
                <div className="sidebar__logo" onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/admin/dashboard'
                }}></div>
                <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigateDashboard}>
                    <i className="sidebar__component-item-icon fa fa-home" aria-hidden="true"></i>
                    Thống kê
                </div>
                <div className="sidebar__component">
                    <label className="sidebar__component-label">Quản lý dữ liệu</label>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigateCustomer}>
                        <i className="sidebar__component-item-icon fa fa-users" aria-hidden="true"></i>
                        Khách hàng
                    </div>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigateProduct}>
                        <i className="sidebar__component-item-icon fa fa-table" aria-hidden="true"></i>
                        Sản phẩm
                    </div>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigatePromote}>
                        <i className="sidebar__component-item-icon fa fa-tag" aria-hidden="true"></i>
                        Khuyến mãi
                    </div>
                </div>

                <div className="sidebar__component">
                    <label className="sidebar__component-label">Tùy chọn</label>
                    {/* onClick={handleNevigateInfo} */}
                    <div className="sidebar__component-item" >
                        <i className="sidebar__component-item-icon fa fa-user" aria-hidden="true"></i>
                        Thông tin cá nhân
                    </div>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={LogOut}>
                        <i className="sidebar__component-item-icon fa fa-sign-out" aria-hidden="true"></i>
                        Đăng xuất
                    </div>
                </div>
            </div>

            <div id="admin-box">
                <div className="admin__header">
                    <div className="admin__header-title">Trang quản trị hệ thống ShopTECH</div>
                    <div className="admin__header-admin">
                        <div className="admin__header-info">
                            Hello,
                            <span className="admin__header-name">{fullname}</span>
                            --
                        </div>
                        <div style={{ backgroundImage: `url(${avatarUrlAdmin})` }} className="admin__header-avatar"></div>

                        <div className='admin__header-option'>
                            <div className="admin__header-option-item" >Thông tin cá nhân</div>
                            <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chào một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang thông tin quản trị viên</label>
                </div>

                <div className='info-page__group'>
                    <div className="info-page__header">Chỉnh sửa thông tin Quản trị viên</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <div className="info-page__avatar-img"
                                    style={{ backgroundImage: `url(${avatarUrlAdmin})` }
                                    }></div>
                            </div>
                            <label className="info-page__user-id">{adminName}</label>
                        </div>

                        <div className='info-page__col-2'>
                            <label className="info-page__title">Thông tin cá nhân</label>

                            <div className="info-page__box-info">
                                <label className="info-page__label">Mã khách hàng</label>
                                <input style={{ fontWeight: 'bold' }}
                                    readOnly
                                    className='info-page__input info-page__input--readonly'
                                    value={adminID} />

                                <label className="info-page__label">Họ và tên đầy đủ</label>
                                <input className='info-page__input' defaultValue={fullname} onChange={(e) => { setFullnameEdit(e.target.value); }} />

                                <label className="info-page__label">Email</label>
                                <input className='info-page__input' defaultValue={emailAdmin} onChange={(e) => setEmailAdminEdit(e.target.value)} />

                                <label className="info-page__label">Số điện thoại</label>
                                <input className='info-page__input' minLength="10" maxLength="10" defaultValue={phoneAdmin} onChange={(e) => setPhoneAdminEdit(e.target.value)} />

                                <label className="info-page__label">Địa chỉ</label>
                                <input className='info-page__input' defaultValue={addressAdmin} onChange={(e) => setAddressAdminEdit(e.target.value)} />

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

export default InfoAdmin;