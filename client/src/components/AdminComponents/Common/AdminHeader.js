import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import { handleLoadingPage } from '../../Common';


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
        admins.map((admin, index) => {
            if (admin.adminName == window.localStorage.getItem('adminNameLogin')) {
                setAdminID(admin.adminID);
                setFullname(admin.fullname);
                setAvatarUrlAdmin(admin.avatarUrl);
            }
        })
    }, [admins])

    const navigate = useNavigate()

    const handleNevigateInfo = () => {
        handleLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/info-admin/${adminID}`)
        }, 1000)
    }

    const LogOut = () => {
        window.localStorage.removeItem('adminNameLogin')
        handleLoadingPage(1)
        window.setTimeout(() => {
            window.location.href = `/admin`
        }, 1000)
    }

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}

export default AdminHeader