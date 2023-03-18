import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

const InfoProduct = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [admin, setAdmin] = useState([])
    const [adminID, setAdminID] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])
    const { id, price } = useParams()

    const [imageLink, setImageLink] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState()
    const [optionProduct, setOptionProduct] = useState('')
    const [colorProduct, setColorProduct] = useState('')
    const [statusProduct, setStatusProduct] = useState('')

    const [nameProductEdit, setNameProductEdit] = useState('')
    const [typeProductEdit, setTypeProductEdit] = useState('')
    const [priceProductEdit, setPriceProductEdit] = useState(0)
    const [optionProductEdit, setOptionProductEdit] = useState('')
    const [colorProductEdit, setColorProductEdit] = useState('')
    const [statusProductEdit, setStatusProductEdit] = useState('')

    const optionsTypeProduct = ['Điện thoại di động', 'Máy tính bảng', 'Máy tính xách tay', 'Phụ kiện']

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setProducts(data.products)
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

        // show thông tin sản phẩm
        products.map((product, index) => {
            if (product.id === id) {
                setImageLink(product.imageLink)
                setNameProduct(product.name);
                setTypeProduct(product.type);
                setPriceProduct(product.price);
                setPriceProduct(product.price);
                setOptionProduct(product.option);
                setColorProduct(product.color);
                setStatusProduct(product.status);
            }
        })
    })

    const handleConfirmChange = (e) => {
        e.preventDefault()
        if (window.confirm("Bạn muốn cập nhật thông tin sản phẩm?") == true) {
            socket.emit("editInfoProduct", {
                id, name: nameProductEdit, type: typeProductEdit, price: priceProductEdit, option: optionProductEdit, color: colorProductEdit,
                status: statusProductEdit
            })
            window.alert("Thành công!")
            navigate(`/admin/product/info/${id}/${priceProductEdit}`, { product })
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
                    <div className="info-page__header">Chỉnh sửa thông tin sản phẩm</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <div className="info-page__avatar-img info-page__avatar-img--no-round "
                                    style={{ backgroundImage: `url(${imageLink})` }
                                    }></div>
                            </div>
                            <label className="info-page__user-id">{id}</label>
                        </div>

                        <div className='info-page__col-2'>
                            <div className="info-page__box-info">
                                <label className="info-page__label">Tên sản phẩm</label>
                                <input style={{ fontWeight: 'bold' }} className='info-page__input' defaultValue={nameProduct} onChange={(e) => { setNameProductEdit(e.target.value); }} />

                                <label className="info-page__label">Loại sản phẩm</label>
                                <input className='info-page__input' defaultValue={typeProduct} onChange={(e) => { setTypeProductEdit(e.target.value); }} />

                                <label className="info-page__label">Tùy chọn sản phẩm</label>
                                <input className='info-page__input' defaultValue={optionProduct} onChange={(e) => { setOptionProductEdit(e.target.value); }} />

                                <label className="info-page__label">Màu sắc</label>
                                <input className='info-page__input' defaultValue={colorProduct} onChange={(e) => { setColorProductEdit(e.target.value); }} />

                                <label className="info-page__label">Trạng thái sản phẩm</label>
                                <input className='info-page__input' defaultValue={statusProduct} onChange={(e) => { setStatusProductEdit(e.target.value); }} />

                                <label className="info-page__label">Giá sản phẩm</label>
                                <input type="number" className='info-page__input' defaultValue={price} onChange={(e) => { setPriceProductEdit(e.target.value); }}
                                    style={{ fontWeight: 'bold', color: 'red' }} />

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

export default InfoProduct