import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Nav from '../common/Nav'
import Footer from '../common/Footer'

const Laptop = ({ socket }) => {
    const [products, setProducts] = useState([])
    const [timeStart, setTimeStartSale] = useState(20)
    const [timeEnd, setTimeEndSale] = useState(30)

    const [promotes, setPromotes] = useState([])

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    return (
        <div>
            <Nav socket={socket} />
            <div className=''>
                <div className="grid wide">
                    <div className="container">
                        <div className="block-filter-brands">
                            <div className="brands__content">
                                <div className="list-brand">
                                    <div>
                                        {/* <a href="https://cellphones.com.vn/laptop/mac.html" target="_self" className="list-brand__item"></a>
                                        <img src="https://cdn2.cellphones.com.vn/x/media/icons/brands/brand-macbook-2.svg" height="50" alt="Mac" loading="lazy" className="filter-brand__img"></img> */}
                                    </div>
                                    {/* <a href="https://cellphones.com.vn/laptop/hp.html" target="_self" className="list-brand__item"></a>
                                    <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/b/r/brand-dell.png" height="50" alt="HP" loading="lazy" className="filter-brand__img"> </img> */}
                                    {/* <a href="https://cellphones.com.vn/laptop/dell.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/d/e/dell_logo_1.png" height="50" alt="Dell" loading="lazy" className="filter-brand__img"> </img>i </a>
                            <a href="https://cellphones.com.vn/laptop/asus.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/t/_/t_i_xu_ng_77_.png" height="50" alt="Asus" loading="lazy" className="filter-brand__img"></img> </a>
                    <a href="https://cellphones.com.vn/laptop/lenovo.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/l/e/lenovo_logo_2015.svg.png" height="50" alt="Lenovo" loading="lazy" className="filter-brand__img"></img> </a >
            <a href="https://cellphones.com.vn/laptop/acer.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/a/c/acer-removebg-preview.png" height="50" alt="Acer" loading="lazy" className="filter-brand__img"></img> </a >
                                    <a href="https://cellphones.com.vn/laptop/xiaomi.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/wysiwyg/Logo/brand-xiaomi.png" height="50" alt="Xiaomi" loading="lazy" className="filter-brand__img"> </img></a>
                                    <a href="https://cellphones.com.vn/laptop/surface.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/s/u/surface.png" height="50" alt="Microsoft Surface" loading="lazy" className="filter-brand__img"></img> </a>
                                    <a href="https://cellphones.com.vn/laptop/lg.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/2/5/2560px-lg_logo__2015_.png" height="50" alt="LG" loading="lazy" className="filter-brand__img"> </img></a>
                                    <a href="https://cellphones.com.vn/laptop/huawei.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x/media/icons/brands/brand-418.svg" height="50" alt="Huawei" loading="lazy" className="filter-brand__img"></img> </a>
                                    <a href="https://cellphones.com.vn/laptop/msi.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x/media/icons/brands/brand-msi.svg" height="50" alt="MSI" loading="lazy" className="filter-brand__img"></img></a>
                                    <a href="https://cellphones.com.vn/laptop/gigabyte.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x/media/tmp/catalog/product/1/2/1280px-gigabyte_technology_logo_20080107.svg.png" height="50" alt="Gigabyte" loading="lazy" className="filter-brand__img"> </img></a>
                                    <a href="https://cellphones.com.vn/laptop/fujitsu.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/b/r/brand-fujitsu.png" height="50" alt="Fujitsu" loading="lazy" className="filter-brand__img"></img> </a>
                                    <a href="https://cellphones.com.vn/laptop/intel.html" target="_self" className="list-brand__item>
                                        <img src="https://cdn2.cellphones.com.vn/x50,webp,q30/media/tmp/catalog/product/b/r/brand-intel.png" height="50" alt="Intel" loading="lazy" className="filter-brand__img"></img> </a> */}
                                </div >
                            </div >
                        </div >
                        <div className="filter-required__title">Chọn theo nhu cầu</div>

                        <div className="container px-4 text-center">
                            <div className="row gx-5">
                                <div className="col">
                                    <div className="p-3">Sẵn hàng</div><svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M112 0C85.49 0 64 21.49 64 48V96H16C7.163 96 0 103.2 0 112C0 120.8 7.163 128 16 128H272C280.8 128 288 135.2 288 144C288 152.8 280.8 160 272 160H48C39.16 160 32 167.2 32 176C32 184.8 39.16 192 48 192H240C248.8 192 256 199.2 256 208C256 216.8 248.8 224 240 224H16C7.163 224 0 231.2 0 240C0 248.8 7.163 256 16 256H208C216.8 256 224 263.2 224 272C224 280.8 216.8 288 208 288H64V416C64 469 106.1 512 160 512C213 512 256 469 256 416H384C384 469 426.1 512 480 512C533 512 576 469 576 416H608C625.7 416 640 401.7 640 384C640 366.3 625.7 352 608 352V237.3C608 220.3 601.3 204 589.3 192L512 114.7C499.1 102.7 483.7 96 466.7 96H416V48C416 21.49 394.5 0 368 0H112zM544 237.3V256H416V160H466.7L544 237.3zM160 464C133.5 464 112 442.5 112 416C112 389.5 133.5 368 160 368C186.5 368 208 389.5 208 416C208 442.5 186.5 464 160 464zM528 416C528 442.5 506.5 464 480 464C453.5 464 432 442.5 432 416C432 389.5 453.5 368 480 368C506.5 368 528 389.5 528 416z"></path></svg>
                                </div>
                                <div className="col">
                                    <div className="p-3">Giá</div><svg height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M512 64C547.3 64 576 92.65 576 128V384C576 419.3 547.3 448 512 448H64C28.65 448 0 419.3 0 384V128C0 92.65 28.65 64 64 64H512zM128 384C128 348.7 99.35 320 64 320V384H128zM64 192C99.35 192 128 163.3 128 128H64V192zM512 384V320C476.7 320 448 348.7 448 384H512zM512 128H448C448 163.3 476.7 192 512 192V128zM288 352C341 352 384 309 384 256C384 202.1 341 160 288 160C234.1 160 192 202.1 192 256C192 309 234.1 352 288 352z"></path></svg>
                                </div>
                                <div className="col">
                                    <div className="p-3">Ổ Cứng</div>
                                </div>
                                <div className="col">
                                    <div className="p-3">Dung Lượng RAM </div>
                                </div>
                                <div className="col">
                                    <div className="p-3">CPU </div>
                                </div>
                                <div className="col">
                                    <div className="p-3">Kích Thước Màn Hình </div>
                                </div>
                                <div className="col">
                                    <div className="p-3">Độ Phân Giải </div>
                                </div>
                            </div>
                        </div>

                        <div className="home__container">
                            <div id="home__featured">
                                <div className='home__featured-banner-phone'></div>
                                <div className="home__featured-type" onClick={(e) => { navigate('/smartphone') }}>LAP TOP</div>
                                <div className="home__featured-brand-list">
                                </div>
                                <ul className="smartphone__featured-list">
                                    {/* {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                        <li
                                            className="product__sell-item--smartphone"
                                            key={index}
                                            onClick={(e) => {
                                                e.preventDefault();

                                                window.setTimeout(() => {
                                                    window.location.href = `/product/${product.enType}/${product.name}`
                                                }, 1000)
                                            }}
                                        >
                                            <div style={{
                                                background: `url(${product.imageLink})`,
                                                backgroundColor: "transparent",
                                                backgroundPosition: "center center",
                                                backgroundSize: "95%",
                                                backgroundRepeat: "no-repeat"
                                            }} className='product__sell-item-img'></div>
                                            <label className='product__sell-item-label'>{product.name}</label>
                                            <label className='product__sell-item-price'>{Number(product.price).toLocaleString()} ₫</label>
                                            <span className='product__sell-item-percent'>{(Number(product.price) * 1.065).toLocaleString()}đ</span>
                                            <label className='product__sell-item-sold'>
                                                Đánh giá:
                                                <span className='product__sell-item-star'>{product.star}</span>
                                                <span className='product__sell-item-star-icon'>⭐</span>
                                            </label>
                                        </li>
                                    ))} */}
                                </ul>

                            </div>
                        </div>
                    </div >
                </div >
                <Footer socket={socket} />
                <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                    Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>   
            </div >
        </div >

    );

};

export default Laptop;