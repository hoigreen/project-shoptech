import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const InfoPromote = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')

    const { id } = useParams()

    const [promotes, setPromotes] = useState([])

    const [imageLink, setImageLink] = useState('')
    const [namePromote, setNamePromote] = useState('')
    const [timeStartPromote, setTimeStartPromote] = useState('')
    const [timeEndPromote, setTimeEndPromote] = useState('')
    const [percentPromote, setPercentPromote] = useState()
    const [applyPromote, setApplyPromote] = useState('')

    const [imageLinkEdit, setImageLinkEdit] = useState('')
    const [namePromoteEdit, setNamePromoteEdit] = useState('')
    const [timeStartPromoteEdit, setTimeStartPromoteEdit] = useState('')
    const [timeEndPromoteEdit, setTimeEndPromoteEdit] = useState('')
    const [percentPromoteEdit, setPercentPromoteEdit] = useState()
    const [applyPromoteEdit, setApplyPromoteEdit] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            });

            fetch("http://localhost:4000/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
            });
        }
        fetchAPI()
    }, [])

    const handleNevigateDashboard = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/dashboard`);
        }, 1000)
    }
    const handleNevigateCustomer = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/customer`)
        }, 1000)
    }
    const handleNevigateProduct = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/product`)
        }, 1000)
    }
    const handleNevigatePromote = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/promote`)
        }, 1000)
    }
    const handleNevigateFeedback = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/feedback`)
        }, 1000)
    }
    const handleNevigateInfo = () => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/info-admin/${adminID}`)
        }, 1000)
    }

    const LogOut = () => {
        window.localStorage.removeItem('adminNameLogin')
        handLoadingPage(1)
        window.setTimeout(() => {
            window.location.href = `/admin`
        }, 1000)
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

        // show thông tin sản phẩm
        promotes.map((promote, index) => {
            if (promote.id === id) {
                setImageLink(promote.imageLink);
                setNamePromote(promote.name);
                setTimeStartPromote(promote.timeStart);
                setTimeEndPromote(promote.timeEnd);
                setPercentPromote(promote.percent);
                setApplyPromote(promote.apply);
            }
        })
    })

    const handleConfirmChange = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn cập nhật thông tin chương trình khuyến mãi này?") == true) {
            socket.emit("editInfoPromote", {
                id,
                name: namePromoteEdit,
                timeStart: timeStartPromoteEdit,
                timeEnd: timeEndPromoteEdit,
                percent: Number(percentPromoteEdit),
                apply: applyPromoteEdit
            })
            window.alert("Cập nhật thông tin thành công!")
            handLoadingPage(1)
            window.setTimeout(() => {
                navigate(`/admin/promote`)
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
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>
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
                    <div className="sidebar__component-item" onClick={handleNevigatePromote}>
                        <i className="sidebar__component-item-icon fa fa-tag" aria-hidden="true"></i>
                        Khuyến mãi
                    </div>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigateFeedback}>
                        <i className="sidebar__component-item-icon fa fa-comments" aria-hidden="true"></i>
                        Ý kiến khách hàng
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
                    <div className="info-promote__header">Chỉnh sửa thông tin sản phẩm</div>

                    <div className="info-promote__body">
                        <div className="info-promote__avatar">
                            <div className="info-promote__avatar-img"
                                style={{ backgroundImage: `url(${imageLink})` }
                                }></div>
                        </div>
                        <label style={{ fontWeight: "600" }} className="info-page__user-id">{id}</label>

                        <label style={{ textAlign: "center", fontWeight: "600" }} className="info-page__label">Tên chương trình khuyến mãi</label>
                        <input style={{ fontWeight: 'bold', color: "green" }} className='info-promote__input-name' defaultValue={namePromote} onChange={(e) => { setNamePromoteEdit(e.target.value); }} />

                        <div className="info-promote__box-info">
                            <div className="info-promote__col-1">
                                <label className="info-promote__label">Thời gian bắt đầu</label>
                                <input type="date" className='info-promote__input' defaultValue={timeStartPromote} onChange={(e) => { setTimeStartPromoteEdit(e.target.value); }} />

                                <label className="info-promote__label">Đến ngày</label>
                                <input type="date" className='info-promote__input' defaultValue={timeEndPromote} onChange={(e) => { setTimeEndPromoteEdit(e.target.value); }} />
                            </div>

                            <div className="info-promote__col-2">
                                <label style={{ fontWeight: 'bold', color: "red" }} className="info-promote__label">Phần trăm (%) giảm</label>
                                <input type="number" className='info-promote__input' defaultValue={percentPromote} onChange={(e) => { setPercentPromoteEdit(e.target.value); }} />

                                <label className="info-promote__label">Khuyến mãi áp dụng cho</label>
                                <input className='info-promote__input' defaultValue={applyPromote} onChange={(e) => { setApplyPromoteEdit(e.target.value); }} />
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
}

export default InfoPromote