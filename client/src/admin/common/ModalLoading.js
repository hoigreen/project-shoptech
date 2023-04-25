import React from 'react'

const ModalLoading = () => {
    return (
        <div className="modal__cover">
            <div className="modal">
                <div className="modal__body">
                    <div className="modal__loading-spinner "></div>
                    <div>Đang tải dữ liệu ...</div>
                </div>
            </div>
        </div>
    )
}

export default ModalLoading