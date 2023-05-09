import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const AdminSidebar = () => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        // show admin đăng nhập
        admins.map((admin, index) => {
            if (admin.adminName == window.localStorage.getItem('adminNameLogin')) {
                setAdminID(admin.adminID);
            }
        })
    })

    const navigate = useNavigate()

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
        <div id="sidebar">
            <div className="sidebar__logo" onClick={(e) => {
                e.preventDefault();
                window.location.href = '/admin/dashboard'
            }}></div>
            <div className="sidebar__component-item" onClick={handleNevigateDashboard}>
                <i className="sidebar__component-item-icon fa fa-home" aria-hidden="true"></i>
                Thống kê
            </div>
            <div className="sidebar__component">
                <label className="sidebar__component-label">Quản lý dữ liệu</label>
                <div className="sidebar__component-item" onClick={handleNevigateCustomer}>
                    <i className="sidebar__component-item-icon fa fa-users" aria-hidden="true"></i>
                    Khách hàng
                </div>
                <div className="sidebar__component-item" onClick={handleNevigateProduct}>
                    <i className="sidebar__component-item-icon fa fa-table" aria-hidden="true"></i>
                    Sản phẩm
                </div>
                <div className="sidebar__component-item" onClick={handleNevigatePromote}>
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
                <div className="sidebar__component-item" onClick={handleNevigateInfo}>
                    <i className="sidebar__component-item-icon fa fa-user" aria-hidden="true"></i>
                    Thông tin cá nhân
                </div>
                <div className="sidebar__component-item" onClick={LogOut}>
                    <i className="sidebar__component-item-icon fa fa-sign-out" aria-hidden="true"></i>
                    Đăng xuất
                </div>
            </div>
        </div>

    )
}

export default AdminSidebar