import React from 'react'



const PageNotFound = () => {
    return (
        <div>
            <div className="container">
                <div className="page-error__container">
                    <img src="https://server-shoptech.onrender.com/public/img-404-error.gif" className="page-error__img" />
                    <h1 className="page-error__title">Xin lỗi! Liên kết bạn cần đã hỏng hoặc không tồn tại 😔😔😔</h1>
                    <button className="page-error__btn" onClick={() => { window.location.href = '/home' }}>Trở lại trang chủ ShopTECH</button>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound