import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './common/AdminHeader';
import AdminSidebar from './common/AdminSidebar';
import ModalLoading from './common/ModalLoading';

const Dashboard = () => {
    const [admins, setAdmins] = useState([])
    const [countAdmin, setCountAdmin] = useState(0)

    const [products, setProducts] = useState([])
    const [countProduct, setCountProduct] = useState(0)

    const [users, setUsers] = useState([])
    const [customer, setCustomers] = useState(0)

    const [promotes, setPromotes] = useState([])
    const [countPromotes, setCountPromotes] = useState(0)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/admins").then(res => res.json()).then(data => {
                setAdmins(data.admins)
                setLoading(false)
            });

            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
                setLoading(false)
            });

            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
                setLoading(false)
            });

            fetch("http://localhost:4000/api/promotes").then(res => res.json()).then(data => {
                setPromotes(data.promotes)
                setLoading(false)
            });
        }
        fetchAPIs()
    }, [])


    useEffect(() => {
        // show số lượng khách hàng
        users.map((user, index) => {
            index = index + 1;
            if (index = users.length) {
                setCustomers(index);
            }
        })

        // show số lượng sản phẩm
        products.map((product, index) => {
            index = index + 1;
            if (index = products.length) {
                setCountProduct(index);
            }
        })

        // show số lượng quản trị viên
        promotes.map((promote, index) => {
            index = index + 1;
            if (index = promotes.length) {
                setCountPromotes(index);
            }
        })

        // show số lượng quản trị viên
        admins.map((admin, index) => {
            index = index + 1;
            if (index = admins.length) {
                setCountAdmin(index);
            }
        })


        handleLoadOptionSelected(0)
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
        <div className='admin__container'>
            <ModalLoading />
            <AdminSidebar />
            <div id="admin-box">
                <AdminHeader />

                <div className="admin__title">
                    <label className='admin__tilte-label'>Chúc một ngày tốt lành, quản trị viên!</label>
                    <label className='admin__tilte-describe'>Trang thống kê</label>
                </div>

                <div className="dash__counting">
                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "red" }}>{customer}</div>
                            <div className='dash__counting-describe'>Số lượng khách hàng</div>
                        </div>
                        <i className='dash__counting-icon fa fa-users'></i>

                    </div>

                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "green" }}>{countProduct}</div>
                            <div className='dash__counting-describe'>Số lượng sản phẩm</div>
                        </div>
                        <i className='dash__counting-icon fa fa-list'></i>

                    </div>

                    <div className="dash__counting-item">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "blue" }}>{countPromotes}</div>
                            <div className='dash__counting-describe'>Số lượng khuyến mãi</div>
                        </div>
                        <i className='dash__counting-icon fa fa-tag'></i>

                    </div>

                    <div className="dash__counting-item dash__counting-item--none-border">
                        <div className="dash__counting-content">
                            <div className='dash__counting-number' style={{ color: "violet" }}>{countAdmin}</div>
                            <div className='dash__counting-describe'>Quản trị viên</div>
                        </div>
                        <i className='dash__counting-icon fa fa-user'></i>
                    </div>
                </div>

                <div className='admin__group'>
                    <label className='dash__group-title'>Danh sách quản trị viên</label>

                    <div className='admin__list'>
                        {loading ? <p>Đang kết nối đến server ... </p> : admins.map((admin, index) => (
                            <div className='admin__item' key={index}>
                                <label className='admin__item-id'>{admin.adminID}</label>
                                <div className='admin__item-avatar'>
                                    <img src={admin.avatarUrl} className='admin__item-img'></img>
                                </div>
                                <label className='admin__item-admin-name'>{admin.adminName}</label>

                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Họ và tên:</label>
                                    <p className='admin__item-info-content'>{admin.fullname}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Email:</label>
                                    <p className='admin__item-info-content'>{admin.email || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Số điện thoại: </label>
                                    <p className='admin__item-info-content'>{admin.phone || "Trống!"}</p>
                                </div>
                                <div className='admin__item-info'>
                                    <label className='admin__item-info-label'>Địa chỉ:</label>
                                    <p className='admin__item-info-content'>{admin.address || "Trống!"} </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>

    );
};

export default Dashboard;