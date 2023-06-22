import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import "./styles/promote-style.css"

import AdminHeader from '../Common/AdminHeader';
import AdminSidebar, { handleLoadOptionSelected } from '../Common/AdminSidebar';
import { handleLoadingPage } from '../../Common';
import EditButtonPromote from '../../EditButton/EditButtonPromote';

const PromotePage = () => {
    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    useEffect(() => {
        const fetchAPI = () => {
            fetch("https://server-shoptech.onrender.com/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
                setLoading(false)
            });
        }
        fetchAPI()
        handleLoadOptionSelected(3)
    }, [])

    const handleAddPromote = (event) => {
        event.preventDefault()
        handleLoadingPage(1)
        window.setTimeout(() => {
            navigate("/admin/promote/add")
        }, 1000)
    }

    return (
        <>
            <AdminSidebar />
            <div id="admin-box">
                <AdminHeader />
                <div className="admin__title">
                    <label className='admin__tilte-label'>Chào một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang quản lý chương trình khuyến mãi</label>
                </div>

                <div className='promote__group'>
                    <div className='promote__header'>
                        <label className='promote__header-title'>Danh sách chương trình khuyến mãi</label>
                    </div>

                    <div className='promote__btn-container'>
                        <button className='promote__btn-add' onClick={handleAddPromote}>Thêm chương trình khuyến mãi</button>
                    </div>

                    <table className='table'>
                        <thead>
                            <tr className='table__thead-primary'>
                                <td>Mã KM</td>
                                <td>Tên chương trình</td>
                                <td>Từ ngày</td>
                                <td>Đến ngày</td>
                                <td>% giảm</td>
                                <td>Áp dụng cho</td>
                                <td>Chỉnh sửa</td>
                            </tr>
                        </thead>
                        <tbody className='table__tbody-primary'>
                            {loading ? <tr><td>Loading...</td></tr> : promotes.map((promote, index) => (
                                <tr className='table__row-loading' key={index}>
                                    <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700 }}>{promote.id}</td>
                                    <td style={{ color: "red", fontWeight: 700, textAlign: 'left' }}>{promote.name}</td>
                                    <td style={{ backgroundColor: "#e0f1d4" }}>{promote.timeStart}</td>
                                    <td style={{ backgroundColor: "#d5a2f7", fontWeight: 700 }}>{promote.timeEnd}</td>
                                    <td style={{ fontWeight: 600, textAlign: "center", fontSize: "2.4rem", color: "red" }}>{promote.percent || "None"} %</td>
                                    <td style={{ backgroundColor: "#fff2c1" }}>{promote.apply}</td>
                                    <td>
                                        <div className='table__edit-btn'>
                                            {<EditButtonPromote promote={promote} />}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default PromotePage;