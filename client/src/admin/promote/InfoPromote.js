import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'

import ModalLoading from '../common/ModalLoading'
import AdminSidebar from '../common/AdminSidebar'
import AdminHeader from '../common/AdminHeader'

const InfoPromote = ({ socket }) => {
    const { id } = useParams()

    const [promotes, setPromotes] = useState([])

    const [imageLink, setImageLink] = useState('')
    const [namePromote, setNamePromote] = useState('')
    const [timeStartPromote, setTimeStartPromote] = useState('')
    const [timeEndPromote, setTimeEndPromote] = useState('')
    const [percentPromote, setPercentPromote] = useState()
    const [applyPromote, setApplyPromote] = useState('')

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
            });
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        // show thông tin sản phẩm
        promotes.map((promote, index) => {
            if (promote.id === id) {
                setImageLink(promote.imageLink);
                setNamePromote(promote.name);
                setTimeStartPromote(promote.timeStart);
                setTimeEndPromote(promote.timeEnd);
                setPercentPromote(promote.percent);
                setApplyPromote(promote.apply);
            }
        })

        handleLoadOptionSelected(3)
    })

    const changeImage = () => {
        const preview = document.querySelector(".info-promote__avatar-img")
        const image = document.querySelector("#image-change").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (image) {
            reader.readAsDataURL(image)
        }
    }

    const handleLoadOptionSelected = (index) => {
        const optionItems = document.querySelectorAll('.sidebar__component-item')
        const optionItemActive = document.querySelector(".sidebar__component-item.sidebar__component-item--active")
        optionItems.forEach((item, i) => {
            if (optionItemActive) {
                optionItemActive.classList.remove("sidebar__component-item--active")
            }
        })
        optionItems[index].classList.add("sidebar__component-item--active")
    }

    const handleConfirmChange = (e) => {
        e.preventDefault()
        const imageLink = document.querySelector(".info-promote__avatar-img").getAttribute("src")
        const inputName = document.querySelector(".info-promote__input-name");
        const inputElements = document.querySelectorAll(".info-promote__input");
        if (window.confirm("Bạn muốn cập nhật thông tin chương trình khuyến mãi này?") == true) {
            socket.emit("editInfoPromote", {
                imageLink: imageLink,
                id,
                name: inputName.value,
                timeStart: inputElements[0].value,
                timeEnd: inputElements[1].value,
                percent: Number(inputElements[2].value),
                apply: inputElements[3].value
            })
            window.alert("Cập nhật thông tin thành công!")
            handLoadingPage(1)
            window.setTimeout(() => {
                navigate(`/admin/promote`)
            }, 1000)
        }
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

                <div className='info-page__group'>
                    <div className="info-promote__header">Chỉnh sửa thông tin sản phẩm</div>

                    <div className="info-promote__body">
                        <div className="add__avatar">
                            <img src={imageLink} className="info-promote__avatar-img"></img>
                            <input type='file' id="image-change" onChange={changeImage} hidden></input>
                            <label htmlFor="image-change" className="info-admin-product__image-btn">Thay đổi hình ảnh khuyến mãi</label>
                        </div>

                        <label style={{ fontWeight: "600" }} className="info-page__user-id">{id}</label>

                        <label style={{ textAlign: "center", fontWeight: "600" }} className="info-page__label">Tên chương trình khuyến mãi</label>
                        <input style={{ fontWeight: 'bold', color: "green" }} className='info-promote__input-name' defaultValue={namePromote} />

                        <div className="info-promote__box-info">
                            <div className="info-promote__col-1">
                                <label className="info-promote__label">Thời gian bắt đầu</label>
                                <input type="date" className='info-promote__input' defaultValue={timeStartPromote} />

                                <label className="info-promote__label">Đến ngày</label>
                                <input type="date" className='info-promote__input' defaultValue={timeEndPromote} />
                            </div>

                            <div className="info-promote__col-2">
                                <label style={{ fontWeight: 'bold', color: "red" }} className="info-promote__label">Phần trăm (%) giảm</label>
                                <input type="number" className='info-promote__input' defaultValue={percentPromote} />

                                <label className="info-promote__label">Khuyến mãi áp dụng cho</label>
                                <input className='info-promote__input' defaultValue={applyPromote} />
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

export default InfoPromote