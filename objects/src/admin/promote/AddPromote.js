import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPromote = ({ socket }) => {
    const [promotes, setPromotes] = useState([])
    const [promote, setPromote] = useState([])

    const [id, setPromoteID] = useState('')
    const [name, setName] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [percent, setPercent] = useState(0)
    const [apply, setApply] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
            })
        }
        fetchAPI()
    }, [])

    const handleAddPromote = (e) => {
        e.preventDefault();
        socket.emit("addPromote", {
            id,
            name,
            timeStart,
            timeEnd,
            percent,
            apply
        });
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate('/admin/promote');
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
                <div className="add add__promote-container">
                    <div className="add__header">THÊM CHƯƠNG TRÌNH KHUYẾN MÃI MỚI</div>
                    <div className="add__body">
                        <div className="add__avatar">
                            <div className="add__avatar-img add__avatar-img-promote"></div>
                            <button className='add__btn'>Thêm hình ảnh khuyến mãi</button>
                        </div>

                        <label className="add__title">Thông tin khuyến mãi</label>

                        <label className="add__label">Mã sản phẩm tự khởi tạo</label>
                        <input style={{ fontWeight: "bold" }} readOnly className='add__input add__input--readonly' value={"PM00" + Number(promotes.length + 1)}
                            onFocus={(e) => {
                                setPromoteID(e.target.value);
                            }} />

                        <label className="add__label">Tên chương trình khuyến mãi </label>
                        <input style={{ fontWeight: "bold", color: "green" }} className='add__input' onChange={(e) => {
                            setName(e.target.value);
                        }} />

                        <label className="add__label">Thời gian bắt đầu</label>
                        <input type="date" className='add__input' onChange={(e) => { setTimeStart(e.target.value); }} />

                        <label className="add__label">Thời gian kết thúc</label>
                        <input type="date" className='add__input' onChange={(e) => { setTimeEnd(e.target.value); }} />

                        <label style={{ fontWeight: "bold", color: "red" }} className="add__label">Phần trăm (%) giảm </label>
                        <input type='number' className='add__input' onChange={(e) => { setPercent(e.target.value); }} />

                        <label className="add__label">Áp dụng cho sản phẩm</label>
                        <input type='text' className='add__input' onChange={(e) => { setApply(e.target.value); }} />
                    </div>

                    <div className="add__footer">
                        <button className="add__btn-confirm" onClick={handleAddPromote}>
                            Xác nhận
                            <i className="add__btn-icon fa fa-check"></i>
                        </button>

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/admin/promote')
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

export default AddPromote