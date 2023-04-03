import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"

const EditButtonCustomer = ({ user }) => {

    const navigate = useNavigate(user)

    const editInfo = (e) => {
        handLoadingPage(1)
        window.setTimeout(() => {
            navigate(`/admin/customer/info/${user.userID}/${user.username}`, { user })
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
        <div>
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 edit-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                onClick={editInfo}>
                <path strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
        </div>
    )
}

export default EditButtonCustomer;