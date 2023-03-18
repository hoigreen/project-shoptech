import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])
    const [adminID, setAdminID] = useState('')
    const [adminName, setAdminName] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [countAdmin, setCountAdmin] = useState(0)

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const [countProduct, setCountProduct] = useState(0)

    const [users, setUsers] = useState([])
    const [user, setUser] = useState([])
    const [customer, setCustomers] = useState(0)

    const [promotes, setPromotes] = useState([])
    const [promote, setPromote] = useState([])
    const [countPromotes, setCountPromotes] = useState(0)

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setUsers(data.users)
                setProducts(data.products)
                setPromotes(data.promotes)
                setLoading(false)
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
                setAdminName(admin.adminName);
                setFullname(admin.fullname);
                setAvatarUrl(admin.avatarUrl);
            }
        })

        // show số lượng khách hàng
        users.map((user, index) => {
            index = index + 1;
            if (index = users.length) {
                setCustomers(index);
            }
        })

        // show số lượng sản phẩm
        products.map((product, index) => {
            index = index + 1;
            if (index = products.length) {
                setCountProduct(index);
            }
        })

        // show số lượng quản trị viên
        promotes.map((promote, index) => {
            index = index + 1;
            if (index = promotes.length) {
                setCountPromotes(index);
            }
        })

        // show số lượng quản trị viên
        admins.map((admin, index) => {
            index = index + 1;
            if (index = admins.length) {
                setCountAdmin(index);
            }
        })
    })

    return (
        <div className='admin__container'>
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
                        <div style={{backgroundImage: `url(${avatarUrl})`}} className="admin__header-avatar"></div>

                        <div className='admin__header-option'>
                            <div className="admin__header-option-item" onClick={handleNevigateInfo} >Thông tin cá nhân</div>
                            <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>

                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang thống kê</label>
                </div>

                <div className="dash__counting">
                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "red" }}>{customer}</div>
                            <div className='dash__counting-describe'>Số lượng khách hàng</div>
                        </div>
                        <i className='dash__counting-icon fa fa-users'></i>

                    </div>

                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "green" }}>{countProduct}</div>
                            <div className='dash__counting-describe'>Số lượng sản phẩm</div>
                        </div>
                        <i className='dash__counting-icon fa fa-list'></i>

                    </div>

                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "blue" }}>{countPromotes}</div>
                            <div className='dash__counting-describe'>Số lượng khuyến mãi</div>
                        </div>
                        <i className='dash__counting-icon fa fa-tag'></i>

                    </div>

                    <div className="dash__counting-item dash__counting-item--none-border">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "violet" }}>{countAdmin}</div>
                            <div className='dash__counting-describe'>Quản trị viên</div>
                        </div>
                        <i className='dash__counting-icon fa fa-user'></i>
                    </div>
                </div>

                <div className='admin__group'>
                    <label className='dash__group-title'>Danh sách quản trị viên</label>

                    <div className='admin__list'>
                        {loading ? <p>Đang kết nối đến server ... </p> : admins.map((admin, index) => (
                                <div className='admin__item'>
                                <label className='admin__item-id'>{admin.adminID}</label>
                                <div className='admin__item-avatar'>
                                    <div style={{
                                        backgroundImage: `url(${admin.avatarUrl})`
                                    }}
                                        className='admin__item-img'></div>
                                </div>
                                <label className='admin__item-admin-name'>{admin.adminName}</label>
    
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Họ và tên:</label>
                                    <p className='admin__item-info-content'>{admin.fullname}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Email:</label>
                                    <p className='admin__item-info-content'>{admin.email || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Số điện thoại: </label>
                                    <p className='admin__item-info-content'>+84 {admin.phone || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Địa chỉ:</label>
                                    <p className='admin__item-info-content'>{admin.address || "Trống!"} </p>
                                </div>
                            </div>
                            ))}
                    </div>
                    
                </div>
            </div>
        </div>

    );
};

export default Dashboard;