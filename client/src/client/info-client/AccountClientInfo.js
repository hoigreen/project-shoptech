import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav';
import Breadcrumbs from '../common/Breadcrumbs';
import ModalLoading from '../common/ModalLoading';
import SidebarAccount from './SidebarAccount';

const AccountClientInfo = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [userID, setUserID] = useState('')
    const [avatarUrl, setAvatarUrl] = useState('')

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("https://server-shoptech.onrender.com/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setUserID(user.userID)
                setFullname(user.fullname);
                setAvatarUrl(user.avatarUrl);
                setEmail(user.email);
                setPhone(user.phone);
                setAddress(user.address);
            }
        })
        handleLoadOptionSidebar(1)
    })

    const handleLoadOptionSidebar = (index) => {
        const optionItems = document.querySelectorAll('.account__sidebar-item')
        const optionItemActive = document.querySelector(".account__sidebar-item.account__sidebar-item--active")
        optionItems.forEach((item, i) => {
            if (optionItemActive) {
                optionItemActive.classList.remove("account__sidebar-item--active")
            }
        })
        optionItems[index].classList.add("account__sidebar-item--active")
    }

    const changeImage = () => {
        const preview = document.querySelector(".account__box-info-avatar")
        const imageAdmin = document.querySelector("#avatar-change").files[0]
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            preview.src = reader.result;
        }, false)

        if (imageAdmin) {
            reader.readAsDataURL(imageAdmin)
        }
    }

    const handleEditInfo = (e) => {
        e.preventDefault()
        const avatarUrl = document.querySelector(".account__box-info-avatar").getAttribute("src")
        const inputElements = document.querySelectorAll(".account__box-info-input")
        if (window.confirm("Bạn muốn sửa đổi thông tin cá nhân!") == true) {
            socket.emit("editInfoCustomer", {
                userID: userID,
                avatarUrl: avatarUrl,
                fullname: inputElements[0].value,
                email: inputElements[1].value,
                phone: inputElements[2].value,
                address: inputElements[3].value
            })
            window.alert("Thành công!")
            handLoadingPage(1)
            window.setTimeout(() => {
                window.location.reload();
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
        <div>
            <Nav socket={socket} />
            <Breadcrumbs socket={socket} />
            <ModalLoading />

            <div className="container">
                <div className="grid wide">
                    <div className="account-info__container">
                        <SidebarAccount socket={socket} />

                        <div className="account__box">
                            <div className="account__box-info">
                                <div className="account__box-info-container">
                                    <img className="account__box-info-avatar" src={avatarUrl || "https://server-shoptech.onrender.com/public/img-avatar-empty.png"}></img>
                                    <input type='file' id="avatar-change" onChange={(e) => { changeImage() }} hidden></input>
                                    <label className="account__box-info-avatar-btn" htmlFor="avatar-change">Thay đổi Avatar</label>
                                </div>

                                <label className="account__box-info-label">Xin chào</label>
                                <label className="account__box-info-fullname">{fullname}</label>
                                <label className="account__box-info-header">THÔNG TIN CÁ NHÂN</label>

                                <label className="account__box-info-title">Họ và tên đầy đủ:</label>
                                <input className="account__box-info-input" defaultValue={fullname} name="fullname" />

                                <label className="account__box-info-title">Email:</label>
                                <input className="account__box-info-input" defaultValue={email} name="emai" />

                                <label className="account__box-info-title">Số điện thoại:</label>
                                <input className="account__box-info-input" type="text" defaultValue={phone} name="phone" />

                                <label className="account__box-info-title">Địa chỉ liên hệ:</label>
                                <input className="account__box-info-input" defaultValue={address} name="address" />

                                <button className="account__box-info-btn" onClick={handleEditInfo}>Cập nhật thông tin</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountClientInfo