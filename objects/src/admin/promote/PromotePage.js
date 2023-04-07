import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EditButtonPromote from '../others/EditButtonPromote';

const PromotePage = () => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])
    const [adminID, setAdminID] = useState('')
    const [adminName, setAdminName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullname, setFullname] = useState('')

    const [promotes, setPromotes] = useState([])
    const [promote, setPromote] = useState([])


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setLoading(false)
            });

            fetch("http://localhost:4000/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
                setLoading(false)
            });
        }
        fetchAPI()
    }, [])

    const navigate = useNavigate();

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
                setAdminName(admin.adminName);
                setFullname(admin.fullname);
                setAvatarUrl(admin.avatarUrl);
            }
        })
    })

    const handleAddPromote = (event) => {
        event.preventDefault()
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate("/admin/promote/add")
        }, 1000)

    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div className='promote__container'>
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
                    <div className="sidebar__component-item " onClick={handleNevigatePromote}>
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

                        <div style={{ backgroundImage: `url(${avatarUrl})` }} className="admin__header-avatar"></div>

                        <div className='admin__header-option'>
                            <div className="admin__header-option-item" onClick={handleNevigateInfo} >Thông tin cá nhân</div>
                            <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>

                <div className="admin__title">
                    <label className='admin__tilte-label'>Chào một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý chương trình khuyến mãi</label>
                </div>



                <div className='promote__group'>
                    <div className='promote__header'>
                        <label className='promote__header-title'>Danh sách chương trình khuyến mãi</label>
                    </div>

                    <div className='promote__btn-container'>
                        <button className='promote__btn-add' onClick={handleAddPromote}>Thêm chương trình khuyến mãi</button>
                    </div>

                    <table className='table'>
                        <thead>
                            <tr className='table__thead-primary'>
                                <td>Mã KM</td>
                                <td>Tên chương trình</td>
                                <td>Từ ngày</td>
                                <td>Đến ngày</td>
                                <td>% giảm</td>
                                <td>Áp dụng cho</td>
                                <td>Chỉnh sửa</td>
                            </tr>
                        </thead>
                        <tbody className='table__tbody-primary'>
                            {loading ? <tr><td>Loading...</td></tr> : promotes.map((promote, index) => (
                                <tr className='table__row-loading' key={index}>
                                    <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700 }}>{promote.id}</td>
                                    <td style={{ color: "red", fontWeight: 700, textAlign: 'left' }}>{promote.name}</td>
                                    <td style={{ backgroundColor: "#e0f1d4" }}>{promote.timeStart}</td>
                                    <td style={{ backgroundColor: "#d5a2f7", fontWeight: 700 }}>{promote.timeEnd}</td>
                                    <td style={{ fontWeight: 600, textAlign: "center", fontSize: "2.4rem", color: "red" }}>{promote.percent || "None"} %</td>
                                    <td style={{ backgroundColor: "#fff2c1" }}>{promote.apply}</td>
                                    <td>
                                        <div className='table__edit-btn'>
                                            {<EditButtonPromote promote={promote} />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    );
};

export default PromotePage;