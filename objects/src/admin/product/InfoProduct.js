import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import AdminHeader from '../common/AdminHeader';

const InfoProduct = ({ socket }) => {
    const [admins, setAdmins] = useState([])
    const [adminID, setAdminID] = useState('')
    const [fullname, setFullname] = useState('')
    const [avatarUrlAdmin, setAvatarUrlAdmin] = useState('')

    const [products, setProducts] = useState([])
    const { id, price } = useParams()

    const [imageLink, setImageLink] = useState('')
    const [nameProduct, setNameProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState()
    const [colorProduct, setColorProduct] = useState([])
    const [statusProduct, setStatusProduct] = useState('')

    const [nameProductEdit, setNameProductEdit] = useState('')
    const [typeProductEdit, setTypeProductEdit] = useState('')
    const [enType, setEnType] = useState('')
    const [priceProductEdit, setPriceProductEdit] = useState(0)
    const [colorProductEdit, setColorProductEdit] = useState([])
    const [statusProductEdit, setStatusProductEdit] = useState('')
    const [boolHotDeal, setBoolHotDeal] = useState(true)
    const [boolFeatured, setBoolFeatured] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
            })

            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
            })
        }
        fetchAPIs()
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
        products.map((product, index) => {
            if (product.id === id) {
                setImageLink(product.imageLink)
                setNameProduct(product.name);
                setTypeProduct(product.type);
                setPriceProduct(product.price);
                setColorProduct(product.color);
                setStatusProduct(product.status);
            }
        })
    })

    const handleConfirmChange = (e) => {
        e.preventDefault()
        var boolFeaturedEdit;
        var boolHotDealEdit;
        if (boolFeatured === "true") {
            boolFeaturedEdit = boolFeatured === "true"
        }
        else {
            boolFeaturedEdit = boolFeatured.toLowerCase() === "False"
        }

        if (boolHotDeal === "true") {
            boolHotDealEdit = boolHotDeal === "true"
        }
        else {
            boolHotDealEdit = boolHotDeal.toLowerCase() === "False"
        }

        if (window.confirm("Bạn muốn cập nhật thông tin sản phẩm?") == true) {
            socket.emit("editInfoProduct", {
                id: id,
                name: nameProductEdit,
                type: typeProductEdit,
                enType: enType,
                price: priceProductEdit,
                color: colorProductEdit,
                hotDeal: boolHotDealEdit,
                featured: boolFeaturedEdit,
                status: statusProductEdit
            })
            window.alert("Thành công!")
            handLoadingPage(1)
            window.setTimeout(() => {
                navigate(`/admin/product/info/${id}/${priceProductEdit}`)
            }, 1000)
        }
    }

    const handleShowColors = (colorArray) => {
        var colors = ""
        colorArray.map((color, index) => {
            colors += `${color}, `;
        })
        return colors
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
                    <div className="sidebar__component-item" onClick={handleNevigateProduct}>
                        <i className="sidebar__component-item-icon fa fa-table" aria-hidden="true"></i>
                        Sản phẩm
                    </div>
                    <div className="sidebar__component-item sidebar__component-item--disable" onClick={handleNevigatePromote}>
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
                <AdminHeader />
                
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý khách hàng</label>
                </div>

                <div className='info-page__group'>
                    <div className="info-page__header">Chỉnh sửa thông tin sản phẩm</div>

                    <div className="info-page__body">
                        <div className="info-page__col-1">
                            <div className="info-page__avatar">
                                <img className="info-page__avatar-img info-page__avatar-img--no-round" src={imageLink}></img>
                            </div>
                            <label className="info-page__user-id">{id}</label>

                            <label className="info-page__label">Tên sản phẩm</label>
                            <input style={{ fontWeight: 'bold' }} className='info-page__input' defaultValue={nameProduct} onChange={(e) => { setNameProductEdit(e.target.value); }} />
                        </div>

                        <div className='info-page__col-2'>
                            <div className="info-page__box-info">
                                <label className="info-page__label">Loại sản phẩm</label>
                                <select style={{ fontWeight: '500' }} className='info-page__input' onChange={(e) => {
                                    setTypeProductEdit(e.target.value);
                                    switch ((e.target.value).toLowerCase()) {
                                        case "điện thoại":
                                            setEnType("smartphone");
                                            break;
                                        case "máy tính bảng":
                                            setEnType("tablet");
                                            break;
                                        case "máy tính xách tay":
                                            setEnType("laptop");
                                            break;
                                        case "phụ kiện":
                                            setEnType("accessories");
                                            break;
                                    }
                                }} value={typeProductEdit} defaultValue={typeProduct}>
                                    <option value="Điện thoại">Điện thoại di động</option>
                                    <option value="Máy tính xách tay">Máy tính xách tay</option>
                                    <option value="Máy tính bảng">Máy tính bảng</option>
                                    <option value="Phụ kiện">Phụ kiện công nghệ</option>
                                </select>

                                <label className="info-page__label">Màu sắc</label>
                                <input type='text' className='info-page__input' onChange={(e) => {
                                    var arrayColor = (e.target.value).split(", ")
                                    setColorProductEdit(arrayColor)
                                }} placeholder="(Mỗi màu sắc được ngăn cách bằng dấu phẩy). Vd: Đỏ, Vàng, ..." defaultValue={handleShowColors(colorProduct)} />


                                <label className="info-page__label">Giá sản phẩm</label>
                                <input type="number" className='info-page__input' defaultValue={price} onChange={(e) => { setPriceProductEdit(e.target.value); }}
                                    style={{ fontWeight: 'bold', color: 'red' }} />

                                <label className="info-page__label" style={{ fontWeight: 'bold', color: 'green' }}>Thêm vào sản phẩm nổi bật</label>
                                <select className='info-page__input' onChange={(e) => { setBoolFeatured(e.target.value); }} value={boolFeatured}>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-page__label" style={{ fontWeight: 'bold', color: 'red' }}>Thêm vào sản phẩm khuyến mãi khung giờ vàng</label>
                                <select className='info-page__input' onChange={(e) => { setBoolHotDeal(e.target.value); }} value={boolHotDeal}>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-page__label">Trạng thái sản phẩm</label>
                                <select className='info-page__input' onChange={(e) => { setStatusProductEdit(e.target.value); }} value={statusProductEdit}>
                                    <option value="Sẵn hàng">Sẵn hàng</option>
                                    <option value="Cháy hàng">Cháy hàng</option>
                                </select>
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