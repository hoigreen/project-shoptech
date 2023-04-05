import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditButtonProduct from '../others/EditButtonProduct';

const ProductPage = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')
    const [adminName, setAdminName] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')
    const [fullname, setFullname] = useState('')

    const [products, setProducts] = useState([])
    const [countProduct, setCountProduct] = useState(0)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setLoading(false)
            })

            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })
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

        // show số lượng sản phẩm
        products.map((product, index) => {
            index = index + 1;
            if (index = products.length) {
                setCountProduct(index);
            }
        })
    })

    const handleClickBtnAdd = (e) => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate("/admin/product/add")
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
        <div className='product__container'>
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
                    <div className="sidebar__component-item" onClick={handleNevigateProduct}>
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
                        <div style={{ backgroundImage: `url(${avatarUrl})` }} className="admin__header-avatar"></div>
                        <div className='admin__header-option'>
                            <div className="admin__header-option-item" onClick={handleNevigateInfo} >Thông tin cá nhân</div>
                            <div className="admin__header-option-item" onClick={LogOut} style={{ color: 'red', fontWeight: 600 }}>Đăng xuất</div>
                        </div>
                    </div>
                </div>
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý sản phẩm</label>
                </div>

                <div className='product__group'>
                    <div className='product__header'>
                        <label className='product__header-title'>Danh sách sản phẩm</label>
                        <div className='product__header-counting'> Tổng số lượng sản phẩm:
                            <span className='customer__header-counting-number'>{countProduct}</span>
                        </div>
                    </div>

                    <div className='admin__list'>
                        {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                            <div className='admin__item'>
                                <label className='admin__item-id'>{product.id}</label>
                                <div className='product__item-avatar'>
                                    <div style={{
                                        backgroundImage: `url(${product.imageLink})`
                                    }}
                                        className='product__item-img'></div>
                                </div>
                                <label
                                    style={{
                                        fontSize: "1.8rem",
                                        fontWeight: "bold",
                                        lineHeight: "2rem",
                                        textAlign: "left",
                                        width: "100%"
                                    }} className='admin__item-admin-name'>{product.name}</label>

                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Loại sản phẩm:</label>
                                    <p className='admin__item-info-content'>{product.type}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Màu sắc:</label>
                                    <p className='admin__item-info-content'>{product.color || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Tùy chọn:</label>
                                    <p className='admin__item-info-content'> {product.option || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Trạng thái:</label>
                                    <p className='admin__item-info-content'> {product.status || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info--last'>

                                    <div className='admin__item-info-price'>
                                        <p style={{
                                            fontSize: "1.8rem",
                                            fontWeight: "bold",
                                            color: "red",
                                            textAlign: "right",
                                            width: "100%"
                                        }} className='admin__item-info-content'>
                                            {product.price || "Trống!"} VNĐ </p>
                                    </div>
                                    <div className='admin__item-eidt'>
                                        <p style={{
                                            fontSize: "2rem",
                                            fontWeight: "bold",
                                            color: "red",
                                            textAlign: "right",
                                            width: "100%",
                                        }} className='admin__item-info-content'>
                                            <EditButtonProduct product={product} /></p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='product__btn-container'>
                        <button className='product__btn-add' onClick={handleClickBtnAdd}>Thêm sản phẩm mới</button>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ProductPage;