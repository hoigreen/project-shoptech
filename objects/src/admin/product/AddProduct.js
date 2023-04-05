import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])

    const [id, setProductID] = useState('')
    const [name, setName] = useState('')
    const [type, setType] = useState('')
    const [price, setPrice] = useState(0)
    const [option, setOption] = useState('')
    const [color, setColor] = useState('')
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

    const handleAddProduct = (e) => {
        e.preventDefault();
        socket.emit("addProduct", {
            id,
            name,
            type,
            price,
            option,
            color,
            status
        });
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate('/admin/product');
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
                        <div className="add__avatar">
                            <div className="add__avatar-img"></div>
                            <button className='add__btn'>Thêm hình ảnh</button>
                        </div>

                        <label className="add__title">Thông tin sản phẩm</label>

                        <label className="add__label">Mã sản phẩm tự khởi tạo</label>
                        <input style={{ fontWeight: "bold" }} readOnly className='add__input add__input--readonly' value={"P00" + Number(products.length + 1)}
                            onFocus={(e) => {
                                setProductID(e.target.value);
                            }} />

                        <label className="add__label">Tên sản phẩm</label>
                        <input className='add__input' onChange={(e) => { setName(e.target.value); }} />

                        <label className="add__label">Loại sản phẩm</label>
                        <input className='add__input' onChange={(e) => { setType(e.target.value); }} />

                        <label className="add__label">Tùy chọn sản phẩm</label>
                        <input className='add__input' onChange={(e) => { setOption(e.target.value); }} />

                        <label className="add__label">Màu sắc</label>
                        <input type='text' className='add__input' onChange={(e) => { setColor(e.target.value); }} />

                        <label className="add__label">Giá sản phẩm</label>
                        <input type='number' className='add__input' onChange={(e) => { setPrice(e.target.value); }} />

                        <label className="add__label">Tình trạng sản phẩm</label>
                        <input type='text' className='add__input' onChange={(e) => { setStatus(e.target.value); }} />
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