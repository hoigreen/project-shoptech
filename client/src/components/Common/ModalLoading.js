import React from 'react'

import "../../styles/loading.css"

const ModalLoading = ({ children }) => {
    return (
        <React.Fragment>
            <div className="modal__cover">
                <div className="modal">
                    <div className="modal__body">
                        <div className="modal__loading-spinner "></div>
                        <div>Đang tải dữ liệu ...</div>
                    </div>
                </div>
            </div>

            {children}
        </React.Fragment>
    )
}

export default ModalLoading