import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import EditButtonCustomer from "../others/EditButtonCustomer"
import ModalLoading from '../common/ModalLoading';
import AdminHeader from '../common/AdminHeader';
import AdminSidebar from '../common/AdminSidebar';

const CustomerPage = () => {

    const [users, setUsers] = useState([])
    const [countCustomer, setCountCustomers] = useState(0)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPI = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            });
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        // show số lượng khách hàng đăng nhập
        users.map((user, index) => {
            index = index + 1;
            if (index = users.length) {
                setCountCustomers(index);
            }
        })
        handleLoadOptionSelected(1)
    })

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
                <div className='customer__group'>
                    <div className='customer__header'>
                        <label className='customer__header-title'>Danh sách khách hàng</label>
                        <div className='customer__header-counting'>
                            Số lượng khách hàng:
                            <span className='customer__header-counting-number'>{countCustomer}</span>
                        </div>
                    </div>
                    <div className='customer__table-cover'>
                        <table className='table'>
                            <thead>
                                <tr className='table__thead-primary'>
                                    <td>STT</td>
                                    <td>Mã khách hàng</td>
                                    <td>Tên tài khoản</td>
                                    <td>Họ và tên khách hàng</td>
                                    <td>Email</td>
                                    <td>Số điện thoại</td>
                                    <td>Địa chỉ</td>
                                    <td>Chỉnh sửa</td>
                                </tr>
                            </thead>
                            <tbody className='table__tbody-primary'>
                                {loading ? <tr><td>Loading...</td></tr> : users.map((user, index) => (
                                    <tr className='table__row-loading' key={index}>
                                        <td>{index + 1}</td>
                                        <td style={{ textAlign: "center", background: "#ffcdd2", fontWeight: 700 }}>{user.userID}</td>
                                        <td style={{ color: "red", fontWeight: 700 }}>{user.username}</td>
                                        <td style={{ textAlign: "left" }}>{user.fullname}</td>
                                        <td style={{ textAlign: "left" }}>{user.email || "None"}</td>
                                        <td style={{ backgroundColor: "#fff2c1" }}>{user.phone || "None"}</td>
                                        <td style={{ textAlign: "left" }}>{user.address || "None"}</td>
                                        <td>
                                            <div className='table__edit-btn'>
                                                {<EditButtonCustomer user={user} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CustomerPage;