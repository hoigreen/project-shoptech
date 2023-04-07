import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')
    const [adminName, setAdminName] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [feedbacks, setFeedbacks] = useState([])


    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setLoading(false)
            });

            fetch("http://localhost:4000/api/feedbacks").then(res => res.json()).then(data => {
                setFeedbacks(data.feedbacks)
                setLoading(false)
            });
        }
        fetchAPIs()
    }, [])

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

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }


    return (
        <div className='admin__container'>
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
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigatePromote}>
                        <i className="sidebar__component-item-icon fa fa-tag" aria-hidden="true"></i>
                        Khuyến mãi
                    </div>
                    <div className="sidebar__component-item" onClick={handleNevigateFeedback}>
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
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý ý kiến khách hàng</label>
                </div>



                <div className='promote__group'>
                    <label className='dash__group-title'>Danh sách ý kiến của khách hàng</label>

                    <div className='admin__list' style={{maxHeight:"none"}}>
                        <div style={{ marginLeft: "0", marginBottom: "20px"}} className="search-control">
                            <button className="search-control__btn search-control__btn--active" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2000)
                            }}>Tất cả</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {

                                }, 2000)
                            }}>Vấn đề tài khoản</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {

                                }, 2000)
                            }}>Vấn đề khuyến mãi</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {

                                }, 2000)
                            }}>Cải thiện hệ thống</button>
                            <button className="search-control__btn" onClick={(e) => {
                                handLoadingPage(2)
                                setTimeout(() => {

                                }, 2000)
                            }}>Vấn đề khác</button>
                        </div>

                        <table className='table'>
                            <thead>
                                <tr className='table__thead-primary'>
                                    <td>STT</td>
                                    <td>Họ tên khách hàng</td>
                                    <td>Email</td>
                                    <td>Loại góp ý</td>
                                    <td>Nội dung</td>
                                </tr>
                            </thead>
                            <tbody className='table__tbody-primary'>
                                {loading ? <tr><td>Loading...</td></tr> : feedbacks.map((feedback, index) => (
                                    <tr className='table__row-loading' key={index}>
                                        <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700 }}>{index + 1}</td>
                                        <td style={{ color: "#333", fontWeight: 700, textAlign: 'left' }}>{feedback.name}</td>
                                        <td>{feedback.email}</td>
                                        <td style={{ fontWeight: 700, color: "red" }}>{feedback.type}</td>
                                        <td style={{ fontWeight: 400, textAlign: "justify", fontSize: "1.4rem", fontStyle: "italic" }}>"{feedback.content || "None"}"</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </div>

    );
}

export default FeedbackPage