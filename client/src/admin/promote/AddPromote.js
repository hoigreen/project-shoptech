import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ModalLoading from '../common/ModalLoading';


const AddPromote = ({ socket }) => {
    const [promotes, setPromotes] = useState([])

    const [id, setPromoteID] = useState('')
    const [name, setName] = useState('')
    const [timeStart, setTimeStart] = useState('')
    const [timeEnd, setTimeEnd] = useState('')
    const [percent, setPercent] = useState(0)
    const [apply, setApply] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://server-shoptech.onrender.com/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
            })
        }
        fetchAPI()
    }, [])

    const changeImage = () => {
        const preview = document.querySelector(".add__avatar-img-promote")
        const imageAdmin = document.querySelector("#image-change").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
            preview.style.objectFit = "fill"
            preview.style.backgroundColor = "#fff"
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }

    const handleAddPromote = (e) => {
        e.preventDefault();
        const imageLink = document.querySelector(".add__avatar-img-promote").getAttribute("src")
        const idValue = document.querySelector(".add__input.add__input--readonly").value
        socket.emit("addPromote", {
            imageLink: imageLink,
            id: idValue,
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
            <ModalLoading />
            <div className="add__cover">
                <div className="add add__promote-container">
                    <div className="add__header">THÊM CHƯƠNG TRÌNH KHUYẾN MÃI MỚI</div>
                    <div className="add-promote__body">
                        <div className="add__avatar">
                            <img src='https://cdn1.iconfinder.com/data/icons/business-company-1/500/image-512.png' className="add__avatar-img-promote"></img>
                            <input type='file' id="image-change" onChange={changeImage} hidden></input>
                            <label htmlFor="image-change" className="info-admin-product__image-btn">Thêm hình ảnh khuyến mãi</label>
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