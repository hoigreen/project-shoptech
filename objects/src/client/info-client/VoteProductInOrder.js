import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const VoteProductInOrder = () => {
    const { orderID } = useParams()
    const [users, setUsers] = useState([])

    const [orders, setOrders] = useState([])
    const [owner, setOwner] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [price, setPrice] = useState("")
    const [time, setTime] = useState("")
    const [status, setStatus] = useState("")
    const [listProduct, setListProduct] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

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
            <div className="vote-product__cover">
                <div className="vote-product">
                    <div className="vote-product__header">ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className="vote-product__body">
                        <div className="vote-product__col-left">
                            <label className="vote-product__label">Thông tin sản phẩm</label>
                            <div className="vote-product__avatar">
                                <div className="vote-product__avatar-img"></div>
                                <button className='vote-product__btn'>Thêm hình ảnh</button>
                            </div>

                        </div>
                        <div className="vote-product__col-right">
                            <label className="vote-product__title">Thông tin sản phẩm</label>

                            <input style={{ fontWeight: "bold", color: "red" }} readOnly className='vote-product__input vote-product__input--readonly' value={111}
                                onFocus={(e) => {
                                    // setProductID(e.target.value);
                                }} />

                            <label className="vote-product__label">Tên sản phẩm</label>
                            <input className='vote-product__input' />

                            <label className="vote-product__label">Loại sản phẩm</label>
                            {/* <select style={{ fontWeight: '500' }} className='vote-product__input' onChange={(e) => {
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
                            </select> */}


                            <label className="vote-product__label">Màu sắc</label>
                            <input type='text' className='vote-product__input' onChange={(e) => {
                                var arrayColor = (e.target.value).split(", ")

                            }} placeholder="(Mỗi màu sắc được ngăn cách bằng dấu phẩy). Vd: Đỏ, Vàng, ..." />

                            <label className="vote-product__label">Giá sản phẩm</label>
                            <input type='number' className='vote-product__input' onChange={(e) => { setPrice(e.target.value); }} />

                            <label className="vote-product__label">Tình trạng sản phẩm</label>
                            <input type='text' className='vote-product__input' onChange={(e) => { setStatus(e.target.value); }} />
                        </div>


                    </div>

                    <div className="vote-product__footer">
                        <button className="vote-product__btn-confirm" >
                            Xác nhận
                            <i className="vote-product__btn-icon fa fa-check"></i>
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/product')
                            }}
                            className="vote-product__btn-close">
                            Close
                            <i className="vote-product__btn-icon fa fa-sign-out"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteProductInOrder