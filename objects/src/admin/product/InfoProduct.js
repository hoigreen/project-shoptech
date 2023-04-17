import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import AdminHeader from '../common/AdminHeader';
import AdminSidebar from '../common/AdminSidebar';
import ModalLoading from '../common/ModalLoading';

const InfoProduct = ({ socket }) => {

    const [products, setProducts] = useState([])
    const { id, price } = useParams()

    const [imageLink, setImageLink] = useState('')
    const [imageBanner, setImageBanner] = useState('')
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
            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        // show thông tin sản phẩm
        products.map((product, index) => {
            if (product.id === id) {
                setImageLink(product.imageLink)
                setImageBanner(product.imagePrimary)
                setNameProduct(product.name);
                setTypeProduct(product.type);
                setPriceProduct(product.price);
                setColorProduct(product.color);
                setStatusProduct(product.status);
            }
        })
    })

    const changeImageBanner = () => {
        const preview = document.querySelector(".info-admin-product__image-banner-img")
        const imageAdmin = document.querySelector("#image-banner").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }

    const changeImagePrimary = () => {
        const preview = document.querySelector(".info-admin-product__image-primary-img")
        const imageAdmin = document.querySelector("#image-primary").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }


    const handleAddImageInList = () => {
        var indexImageItem = 0
        const imagesList = document.querySelector(".info-admin-product__image-list")
        if (imagesList) {
            const item = document.createElement("div");
            item.classList.add("info-admin-product__image-item")

            item.onclick = function (e) {
                if (e.target.closest(".info-admin-product__image-item--done")) {
                    // handleConfirmOption(item)
                }
            };
            item.innerHTML = `
                    <img class="info-admin-product__image-item-img" src="">
                    <label for="image-list-${indexImageItem}" class="info-admin-product__image-item-btn--remove"></label>
                    <input type="file" class="image-list" id="image-list-${indexImageItem}" hidden/>
            `;

            const imageElement = item.querySelectorAll(".image-list")[indexImageItem];
            imageElement.onchange = (event) => {
                const preview = imagesList.querySelectorAll(".info-admin-product__image-item-img");
                const image = imageElement.files[0]
                const reader = new FileReader()
                reader.addEventListener("load", () => {
                    preview[indexImageItem].src = reader.result;
                }, false)
                reader.readAsDataURL(image)

            };
            indexImageItem++;
            imagesList.appendChild(item);
        }


    }

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

        const imagePrimaryProduct = document.querySelector(".info-admin-product__image-banner-img").getAttribute("src")
        const imageLinkProduct = document.querySelector(".info-admin-product__image-primary-img").getAttribute("src")
        if (window.confirm("Bạn muốn cập nhật thông tin sản phẩm?") == true) {
            socket.emit("editInfoProduct", {
                imagePrimary: imagePrimaryProduct,
                imageLink: imageLinkProduct,
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
            <ModalLoading />
            <AdminSidebar />
            <div id="admin-box">
                <AdminHeader />
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý khách hàng</label>
                </div>

                <div className='info-admin-product__group'>
                    <div className="info-admin-product__header">CHỈNH SỬA THÔNG TIN SẢN PHẨM</div>

                    <div className="info-admin-product__body">
                        <div className="info-admin-product__col-1">
                            <div className="info-admin-product__image-primary">
                                <img className="info-admin-product__image-primary-img" src={imageLink}></img>
                                <input type='file' id="image-primary" value="" onChange={changeImagePrimary} hidden></input>
                                <label htmlFor="image-primary" className="info-admin-product__image-btn">Chỉnh sửa</label>
                            </div>

                            <div className="info-admin-product__image-box">
                                <div className="info-admin-product__image-banner">
                                    <img className="info-admin-product__image-banner-img" src={imageBanner}></img>
                                    <input type='file' id="image-banner" value="" onChange={changeImageBanner} hidden></input>
                                    <label htmlFor="image-banner" className="info-admin-product__image-btn">Chỉnh sửa</label>
                                </div>
                                <ul className="info-admin-product__image-list">
                                    <button className="info-admin-product__item-image-btn" onClick={handleAddImageInList}>+</button>
                                </ul>
                            </div>
                        </div>

                        <div className='info-admin-product__col-2'>
                            <div className="info-admin-product__box-info">
                                <label className="info-admin-product__label">Mã sản phẩm</label>
                                <input style={{ fontWeight: 'bold', color: 'red' }} className='info-admin-product__input' value={id} />
                                <label className="info-admin-product__label">Tên sản phẩm</label>
                                <input style={{ fontWeight: 'bold' }} className='info-admin-product__input' defaultValue={nameProduct} onChange={(e) => { setNameProductEdit(e.target.value); }} />
                                <label className="info-admin-product__label">Loại sản phẩm</label>
                                <select style={{ fontWeight: '500' }} className='info-admin-product__input' onChange={(e) => {
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
                                }} value={typeProductEdit}>
                                    <option value="Điện thoại">Điện thoại di động</option>
                                    <option value="Máy tính xách tay">Máy tính xách tay</option>
                                    <option value="Máy tính bảng">Máy tính bảng</option>
                                    <option value="Phụ kiện">Phụ kiện công nghệ</option>
                                </select>

                                <label className="info-admin-product__label">Màu sắc</label>
                                <input type='text' className='info-admin-product__input' onChange={(e) => {
                                    var arrayColor = (e.target.value).split(", ")
                                    setColorProductEdit(arrayColor)
                                }} placeholder="(Mỗi màu sắc được ngăn cách bằng dấu phẩy). Vd: Đỏ, Vàng, ..." defaultValue={handleShowColors(colorProduct)} />


                                <label className="info-admin-product__label">Giá sản phẩm</label>
                                <input type="number" className='info-admin-product__input' defaultValue={price} onChange={(e) => { setPriceProductEdit(e.target.value); }}
                                    style={{ fontWeight: 'bold', color: 'red' }} />

                                <label className="info-admin-product__label">Thêm vào sản phẩm nổi bật</label>
                                <select className='info-admin-product__input' onChange={(e) => { setBoolFeatured(e.target.value); }} value={boolFeatured}>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-admin-product__label">Thêm vào sản phẩm khuyến mãi khung giờ vàng</label>
                                <select className='info-admin-product__input' style={{ fontWeight: 'bold', color: 'green' }} onChange={(e) => { setBoolHotDeal(e.target.value); }} value={boolHotDeal}>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-admin-product__label">Trạng thái sản phẩm</label>
                                <select className='info-admin-product__input' onChange={(e) => { setStatusProductEdit(e.target.value); }} value={statusProductEdit}>
                                    <option value="Sẵn hàng">Sẵn hàng</option>
                                    <option value="Cháy hàng">Cháy hàng</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="info-admin-product__footer">
                        <button className="info-admin-product__btn" onClick={handleConfirmChange}>Xác nhận<i className="ti-check"></i></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoProduct