import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

import "./product.css"

import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';

const InfoProduct = ({ socket }) => {
    const [products, setProducts] = useState([])
    const { id } = useParams()

    const [imageLink, setImageLink] = useState('')
    const [imageBanner, setImageBanner] = useState('')
    const [imageList, setImageList] = useState([])
    const [nameProduct, setNameProduct] = useState('')
    const [priceProduct, setPriceProduct] = useState('')
    const [typeProduct, setTypeProduct] = useState('')
    const [colorProduct, setColorProduct] = useState([])

    const [enType, setEnType] = useState('')
    const [colorProductEdit, setColorProductEdit] = useState([])
    const [boolHotDeal, setBoolHotDeal] = useState(true)
    const [boolFeatured, setBoolFeatured] = useState(true)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            })
        }
        fetchAPIs()
        handleLoadOptionSelected(2)
    }, [])

    useEffect(() => {
        // show thông tin sản phẩm
        products.map((product, index) => {
            if (product.id === id) {
                setImageLink(product.imageLink)
                setImageBanner(product.imagePrimary)
                setImageList(product.imageList)
                setNameProduct(product.name);
                setPriceProduct(product.price);
                setTypeProduct(product.type);
                setColorProduct(product.color);
            }
        })
    }, [products])

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

    var indexImageItem = 0;
    const handleAddImageInList = () => {
        const imagesList = document.querySelector(".info-admin-product__image-list")
        if (imagesList) {
            const item = document.createElement("div");
            item.classList.add("info-admin-product__image-item")
            item.innerHTML = `
                    <img src="https://server-shoptech.onrender.com/public/img-product-empty.png" class="info-admin-product__image-item-img" src="">
                    <label for="image-list-${indexImageItem}" class="info-admin-product__image-item-btn--remove"></label>
                    <input type="file" class="image-list" id="image-list-${indexImageItem}" hidden/>
            `
            imagesList.appendChild(item);
            handleAddImage(Number(indexImageItem))
            indexImageItem = indexImageItem + 1;
        }
    }

    const handleAddImage = (index) => {
        const imageItems = document.querySelectorAll(".image-list");
        const preview = document.querySelectorAll(".info-admin-product__image-item-img")
        imageItems[index].onchange = () => {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                preview[index].src = reader.result;
            }, false)
            reader.readAsDataURL(imageItems[index].files[0])
        }
    }

    var arrayImageList = [];
    const handleConfirmEditList = () => {
        const imagesItems = document.querySelectorAll(".info-admin-product__image-item-img")
        if (imagesItems) {
            for (var i = 0; i < imagesItems.length; i++) {
                arrayImageList.push(imagesItems[i].src)
            }
        }
        console.log(arrayImageList)
        socket.emit("editImageListProduct", {
            id: id,
            imageList: arrayImageList
        })
        alert("Thay đổi danh sách hình ảnh hoàn tất")
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

        const inputElements = document.querySelectorAll(".info-admin-product__input");
        if (window.confirm("Bạn muốn cập nhật thông tin sản phẩm?") == true) {
            socket.emit("editInfoProduct", {
                id: id,
                name: inputElements[1].value,
                type: inputElements[2].value,
                enType: enType,
                price: inputElements[4].value,
                color: colorProductEdit,
                hotDeal: boolHotDealEdit,
                featured: boolFeaturedEdit,
                status: inputElements[7].value
            })
            window.alert("Thành công!")
            handleLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload()
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

    return (
        <div className='customer__container'>
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
                                <img className="info-admin-product__image-primary-img" src={imageLink || "https://server-shoptech.onrender.com/public/img-product-empty.png"}></img>
                                <input type='file' id="image-primary" value="" onChange={changeImagePrimary} hidden></input>
                                <div className="info-admin-product__image-controll">
                                    <label htmlFor="image-primary" className="info-admin-product__image-btn">Chỉnh sửa</label>
                                    <button className="info-admin-product__image-btn" style={{ backgroundColor: "#df8129", color: "#fff" }}
                                        onClick={e => {
                                            const imageLinkProduct = document.querySelector(".info-admin-product__image-primary-img").getAttribute("src")
                                            socket.emit("editImageLinkProduct", {
                                                id: id,
                                                imageLink: imageLinkProduct
                                            })
                                            alert("Thay đổi hình ảnh chính hoàn tất!")
                                        }}
                                    >Xác nhận</button>
                                </div>
                            </div>

                            <div className="info-admin-product__image-box">
                                <div className="info-admin-product__image-banner">
                                    <img className="info-admin-product__image-banner-img" src={imageBanner || "https://server-shoptech.onrender.com/public/img-product-empty.png"}></img>
                                    <input type='file' id="image-banner" value="" onChange={changeImageBanner} hidden></input>
                                    <div className="info-admin-product__image-controll">
                                        <label htmlFor="image-banner" className="info-admin-product__image-btn">Chỉnh sửa</label>
                                        <button className="info-admin-product__image-btn" style={{ backgroundColor: "#df8129", color: "#fff" }}
                                            onClick={e => {
                                                const imagePrimaryProduct = document.querySelector(".info-admin-product__image-banner-img").getAttribute("src")
                                                socket.emit("editImageBannerProduct", {
                                                    id: id,
                                                    imagePrimary: imagePrimaryProduct
                                                })
                                                alert("Thay đổi hình ảnh banner hoàn tất")
                                            }}>
                                            Xác nhận
                                        </button>
                                    </div>
                                </div>
                                <ul className="info-admin-product__image-list">
                                    <button className="info-admin-product__item-image-btn" onClick={handleAddImageInList}>+</button>
                                    {loading ? <p>Đang kết nối đến server...</p> : imageList.map((item, index) => (
                                        <div className="info-admin-product__image-item" key={index}>
                                            <img className="info-admin-product__image-item-img--existed" src={imageList[index]} />
                                        </div>
                                    ))}

                                </ul>

                                <button className="info-admin-product__image-btn" style={{ backgroundColor: "#df8129", color: "#fff", fontSize: "1.4rem", minWidth: "90px" }}
                                    onClick={e => {
                                        handleConfirmEditList()
                                    }}>
                                    Xác nhận
                                </button>
                            </div>
                        </div>

                        <div className='info-admin-product__col-2'>
                            <div className="info-admin-product__box-info">
                                <label className="info-admin-product__label">Mã sản phẩm</label>
                                <input style={{ fontWeight: 'bold', color: 'red' }} className='info-admin-product__input' value={id} readOnly />
                                <label className="info-admin-product__label">Tên sản phẩm</label>
                                <input style={{ fontWeight: 'bold' }} className='info-admin-product__input' defaultValue={nameProduct} />
                                <label className="info-admin-product__label">Loại sản phẩm</label>
                                <select style={{ fontWeight: '500' }} className='info-admin-product__input' defaultValue={typeProduct} onChange={(e) => {
                                    setTypeProduct(e.target.value);
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
                                }}>
                                    <option value="">Chọn loại sản phẩm...</option>
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
                                <input type="number" className='info-admin-product__input' defaultValue={priceProduct}
                                    style={{ fontWeight: 'bold', color: 'red' }} />

                                <label className="info-admin-product__label">Thêm vào sản phẩm nổi bật</label>
                                <select className='info-admin-product__input' onChange={(e) => { setBoolFeatured(e.target.value); }}>
                                    <option value="" selected >Chọn giá trị...</option>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-admin-product__label">Thêm vào sản phẩm khuyến mãi khung giờ vàng</label>
                                <select className='info-admin-product__input' style={{ fontWeight: 'bold', color: 'green' }} onChange={(e) => { setBoolHotDeal(e.target.value); }}>
                                    <option value="" selected >Chọn giá trị...</option>
                                    <option value="true">Có</option>
                                    <option value="False">Không</option>
                                </select>

                                <label className="info-admin-product__label">Trạng thái sản phẩm</label>
                                <select className='info-admin-product__input'>
                                    <option value="" selected >Chọn giá trị...</option>
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