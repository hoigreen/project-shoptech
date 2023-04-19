import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ socket }) => {
    const [products, setProducts] = useState([])

    const [id, setProductID] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState()
    const [enType, setEnType] = useState('')
    const [price, setPrice] = useState(0)
    const [option, setOption] = useState([])

    const [color, setColor] = useState([])
    const [status, setStatus] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
            })
        }
        fetchAPIs()
    }, [])

    const changeImage = () => {
        const preview = document.querySelector(".add-product__image")
        const imageAdmin = document.querySelector("#image-change").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }

    const handleAddOption = () => {
        const optionList = document.querySelector(".add__option-list")
        if (optionList) {
            const item = document.createElement("div");
            item.classList.add("add__option-item")

            item.onclick = function (e) {
                if (e.target.closest(".add__option-item--remove")) {
                    optionList.removeChild(item);
                }

                if (e.target.closest(".add__option-item--done")) {
                    handleConfirmOption(item)
                }
            };

            item.innerHTML = `
            <input class="add__option-item-input" placeholder='Tên ...' />
            <input class="add__option-item-input" type="number" placeholder="Giá..." />
            <button class="add__option-item--remove">
            <i class="fa fa-close"></i>
            <button class="add__option-item--done">
            <i class="fa fa-check"></i>
            </button>
        `;
            optionList.appendChild(item);
        }


    }

    const handleConfirmOption = (item) => {
        item.querySelectorAll(".add__option-item-input")
        const itemName = item.querySelectorAll(".add__option-item-input")[0].value
        const itemPrice = item.querySelectorAll(".add__option-item-input")[1].value
        var objItem =
        {
            data: itemName,
            price: Number(itemPrice)
        }

        item.innerHTML = `
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Tùy chọn:</label>
            <p style="font-weight: 400; line-height: 2rem">${itemName}</p>
        </div>
        <div class="add__option-item--confirm">
            <label class="add__option-item-label">Giá:</label>
            <p style="font-weight: 600; color: red;">${Number(itemPrice).toLocaleString()} đ</p>
        </div>
        `
        setOption([...option, objItem]);
    }

    const handleAddProduct = (e) => {
        e.preventDefault();
        const idProduct = document.querySelector(".add__input.add__input--readonly").value
        console.log(idProduct)
        const imageLinkProduct = document.querySelector(".add-product__image").getAttribute("src")
        socket.emit("addProduct", {
            imagePrimary: "",
            imageLink: imageLinkProduct,
            imageList: [],
            id,
            name,
            type,
            enType,
            price,
            option,
            color,
            status,
            star: 0,
            voter: 0,
            hotDeal: false,
            featured: true,
            percent: 0
        });
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate('/admin/product');
        }, 1000)
        alert("Thêm sản phẩm thành công")
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div className="add-product__container">
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>
            <div className="add__cover">
                <div className="add">
                    <div className="add__header">THÊM SẢN PHẨM MỚI</div>
                    <div className="add__body">
                        <div className="add__col-left">
                            <div className="add__avatar">
                                <img src="http://localhost:4000/public/img-product-empty.png" className="add-product__image"></img>
                                <input type='file' id="image-change" onChange={changeImage} hidden></input>
                                <label htmlFor="image-change" className="info-admin-product__image-btn">Thêm hình ảnh</label>
                            </div>

                        </div>
                        <div className="add__col-right">
                            <label className="add__title">Thông tin sản phẩm</label>
                            <label className="add__label">Mã sản phẩm tự khởi tạo</label>
                            <input style={{ fontWeight: "bold", color: "red" }} readOnly className='add__input add__input--readonly' value={"P00" + Number(products.length + 1)} />

                            <label className="add__label">Tên sản phẩm</label>
                            <input className='add__input' onChange={(e) => { setName(e.target.value); }} />

                            <label className="add__label">Loại sản phẩm</label>
                            <select style={{ fontWeight: '500' }} className='add__input' onChange={(e) => {
                                setType(e.target.value);
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
                            }} value={type}>
                                <option value="">Chọn loại sản phẩm ...</option>
                                <option value="Điện thoại">Điện thoại di động</option>
                                <option value="Máy tính xách tay">Máy tính xách tay</option>
                                <option value="Máy tính bảng">Máy tính bảng</option>
                                <option value="Phụ kiện">Phụ kiện công nghệ</option>
                            </select>

                            <label className="add__label">Tùy chọn sản phẩm</label>
                            <div className="add__option">
                                <ul className="add__option-list"></ul>
                                <button className="add__option-btn" onClick={handleAddOption}>+</button>
                            </div>

                            <label className="add__label">Màu sắc</label>
                            <input type='text' className='add__input' onChange={(e) => {
                                var arrayColor = (e.target.value).split(", ")
                                setColor(arrayColor)
                            }} placeholder="(Mỗi màu sắc được ngăn cách bằng dấu phẩy). Vd: Đỏ, Vàng, ..." />

                            <label className="add__label">Giá sản phẩm</label>
                            <input type='number' className='add__input' onChange={(e) => { setPrice(e.target.value); }} />

                            <label className="add__label">Tình trạng sản phẩm</label>
                            <input type='text' className='add__input' onChange={(e) => { setStatus(e.target.value); }} />
                        </div>


                    </div>

                    <div className="add__footer">
                        <button className="add__btn-confirm" onClick={handleAddProduct}>
                            Xác nhận
                            <i className="add__btn-icon fa fa-check"></i>
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/product')
                            }}
                            className="add__btn-close">
                            Close
                            <i className="add__btn-icon fa fa-sign-out"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct