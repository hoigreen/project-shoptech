import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const EditButtonProduct = ({ product }) => {
    const navigate = useNavigate(product)

    const editInfoProduct = (e) => {
        navigate(`/admin/product/info/${product.id}/${product.price}`, {product})
    }

    return (
        <svg xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 edit-icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            onClick={editInfoProduct}>
            <path strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    )
}

export default EditButtonProduct