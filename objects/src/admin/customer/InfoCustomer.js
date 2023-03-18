import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const InfoCustomer = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])
    const [adminID, setAdminID] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
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
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setUsers(data.users)
            })
        }
        fetchAPI()
    }, [])

    const navigate = useNavigate();

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
    const handleNevigateInfo = (e) => {
        e.preventDefault();
        navigate(`/admin/info-admin/${adminID}`)
    }

    const LogOut = () => {
        window.location.href = "/admin"
    }

    useEffect(() => {
        // show admin đăng nhập
        admins.map((admin, index) => {
            if (admin.adminName == window.localStorage.getItem('adminNameLogin')) {
                setAdminID(admin.adminID);
                setFullname(admin.fullname);
                setAvatarUrlAdmin(admin.avatarUrl);
            }
        })

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
    })

    const handleEdit = (e) => {
        const editBtns = document.querySelectorAll('.table__edit-btn')
        const modalCover = document.querySelector('.modal__cover')
        const modal = document.querySelector('.modal')
        const modalClose = document.querySelector('.modal__btn-close')

        const showEditInfo = () => {
            modalCover.classList.add('modal--open')
        }
        const hideEditInfo = () => {
            modalCover.classList.remove('modal--open')
        }

        for (const editBtn of editBtns) {
            editBtn.addEventListener('click', showEditInfo)
        }
        modalClose.addEventListener('click', hideEditInfo)
        modalCover.addEventListener('click', hideEditInfo)
        modal.addEventListener('click', (event) => {
            event.stopPropagation()
        })
        users.map((user, index) => {
            console.log(123)
        })
    }

    const handleConfirmChange = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn sửa đổi thông tin khách hàng!") == true) {
            socket.emit("editInfoCustomer", { userID, fullname: fullnameUserEdit, email: emailUserEdit, phone: phoneUserEdit, address: addressUserEdit })
            window.alert("Thành công!")
            window.location.href = window.location.href;
        }
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
                    <div className="sidebar__component-item" onClick={handleNevigateCustomer}>
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
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigateInfo}>
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
                            <div className="admin__header-option-item" onClick={handleNevigateInfo} >Thông tin cá nhân</div>
                            <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>

                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý khách hàng</label>
                </div>

                <div className='info-page__group'>
                    <div className="info-page__header">Chỉnh sửa thông tin khách hàng</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <div className="info-page__avatar-img"
                                    style={{ backgroundImage: `url(${avatarUrl})` }
                                    }></div>
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