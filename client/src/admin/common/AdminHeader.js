import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const AdminHeader = () => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')


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
                setFullname(admin.fullname);
                setAvatarUrlAdmin(admin.avatarUrl);
            }
        })
    })

    const navigate = useNavigate()

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
        <div>
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            <div className="admin__header">
                <div className="admin__header-title">Trang quản trị hệ thống ShopTECH</div>
                <div className="admin__header-admin">
                    <div className="admin__header-info">
                        Hello,
                        <span className="admin__header-name">{fullname}</span>
                        --
                    </div>

                    <img src={avatarUrlAdmin} className="admin__header-avatar"></img>

                    <div className='admin__header-option'>
                        <div className="admin__header-option-item" onClick={handleNevigateInfo} >Thông tin cá nhân</div>
                        <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHeader