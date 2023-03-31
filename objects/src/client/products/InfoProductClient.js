import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../common/Nav'
import Footer from '../common/Footer'
import Breadcrumbs from '../common/Breadcrumbs'

const InfoProductClient = ({ socket }) => {
    const [users, setUsers] = useState([])
    const [cartUser, setCartUser] = useState([])

    const [products, setProducts] = useState([])
    const [productID, setProductID] = useState('')
    const { name } = useParams()
    const [imagePrimary, setImagePrimary] = useState('')
    const [imageLink, setImageLink] = useState('')
    const [imageList, setImageList] = useState([])
    const [type, setType] = useState('')
    const [option, setOption] = useState([])
    const [optionEdit, setOptionEdit] = useState('')
    const [color, setColor] = useState([])
    const [colorEdit, setColorEdit] = useState([])
    const [price, setPrice] = useState('')
    const [priceEdit, setPriceEdit] = useState('')
    const [percent, setPercent] = useState()
    const [starProduct, setStarProduct] = useState()
    const [voterProduct, setVoterProduct] = useState()
    const [quantity, setQuantity] = useState(1)

    const [promotes, setPromotes] = useState([])

    const [comments, setComments] = useState([])

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api").then(res => res.json()).then(data => {
                setUsers(data.users)
                setProducts(data.products)
                setPromotes(data.promotes)
                setComments(data.comments)
                setLoading(false)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        users.map((user, index) => {
            if (user.username === window.localStorage.getItem("userLogged")) {
                setCartUser(user.cart);
            }
        })
        // show thông tin sản phẩm
        products.map((product, index) => {
            if (name === product.name) {
                setProductID(product.id)
                setImagePrimary(product.imagePrimary);
                setImageLink(product.imageLink);
                setImageList(product.imageList);
                setType(product.type);
                setOption(product.option);
                setColor(product.color);
                setPrice(product.price);
                setPercent(product.percent);
                setStarProduct(product.star);
                setVoterProduct(product.voter);
            }
        })

        // show thông tin sản phẩm tương tự
        products.map((product, index) => {
            const infoProductSimilar = document.querySelectorAll('.product__sell-item')[index];
            if (product.type === type) {
                infoProductSimilar.style.display = "block";
            }
        })

        // show thông tin đánh giá sản phẩm
        comments.map((comment, index) => {
            const infoVote = document.querySelectorAll('.info-product__review-item')[index];
            if (name === comment.nameProductVoted) {
                infoVote.style.display = "block";
            }
        })

        handleFormatCrumbs()
        handleLoadStarProduct()
        handleLoadStarVoted()
    })

    const handleFormatCrumbs = () => {
        const crumbLinks = document.querySelectorAll(".crumb-link");
        crumbLinks.forEach(crumbLink => {
            if (crumbLink.innerHTML.includes("%")) {
                crumbLink.style.display = "none"
            }
        })
    }

    const handleLoadStarProduct = () => {
        let starOfProduct = 0;
        products.map((product, index) => {
            if (name === product.name) {
                starOfProduct = product.star;
            }
        })
        const elementStarProductHeader = document.querySelector(".info-product__header-star")
        const elementStarProduct = document.querySelector(".info-product__rating-star-icon")
        if (starOfProduct < 1) {
            elementStarProductHeader.textContent = `☆☆☆☆☆`
            elementStarProduct.textContent = `☆ ☆ ☆ ☆ ☆`
        } else if (starOfProduct < 2) {
            elementStarProductHeader.textContent = `★☆☆☆☆`
            elementStarProduct.textContent = `★ ☆ ☆ ☆ ☆`
        } else if (starOfProduct < 3) {
            elementStarProductHeader.textContent = `★★☆☆☆`
            elementStarProduct.textContent = `★ ★ ☆ ☆ ☆`
        } else if (starOfProduct < 4) {
            elementStarProductHeader.textContent = `★★★☆☆`
            elementStarProduct.textContent = `★ ★ ★ ☆ ☆`
        } else if (starOfProduct < 5) {
            elementStarProductHeader.textContent = `★★★★☆`
            elementStarProduct.textContent = `★ ★ ★ ★ ☆`
        } else {
            elementStarProductHeader.textContent = `★★★★★`
            elementStarProduct.textContent = `★ ★ ★ ★ ★`
        }
    }

    const handleLoadStarVoted = () => {
        let starVoted = 0;
        comments.map((comment, index) => {
            if (name === comment.nameProductVoted) {
                starVoted = comment.starVoted;
            }
        })

        const elementStarVoted = document.querySelector(".info-product__review-item-vote-start")
        if (elementStarVoted) {
            if (starVoted < 1) {
                elementStarVoted.textContent = `☆☆☆☆☆`
            } else if (starVoted < 2) {
                elementStarVoted.textContent = `★☆☆☆☆`
            } else if (starVoted < 3) {
                elementStarVoted.textContent = `★★☆☆☆`
            } else if (starVoted < 4) {
                elementStarVoted.textContent = `★★★☆☆`
            } else if (starVoted < 5) {
                elementStarVoted.textContent = `★★★★☆`
            } else {
                elementStarVoted.textContent = `★★★★★`
            }
        }

    }

    const handleSelectOption = (optionData, data) => {
        const optionList = document.querySelector(".info-product__detail-option");
        const optionItems = optionList.querySelectorAll('.info-product__detail-option-item')
        document.querySelector(".info-product__detail-current-price").textContent = `${Number(data).toLocaleString()} đ`
        const colorList = document.querySelectorAll(".info-product__detail-option")[1]
        const colorItemPrices = colorList.querySelectorAll(".info-product__detail-option-item-price")
        colorItemPrices.forEach((colorItemPrice, i) => {
            colorItemPrice.innerHTML = `${Number(data).toLocaleString()} đ`
        })
        optionItems.forEach((optionItem, index) => {
            optionItem.onclick = () => {
                const optionItemActive = optionList.querySelector(".info-product__detail-option-item.info-product__detail-option-item--active")
                if (optionItemActive) {
                    optionItemActive.classList.remove("info-product__detail-option-item--active")
                    optionItem.classList.add('info-product__detail-option-item--active')
                } else {
                    optionItem.classList.add('info-product__detail-option-item--active')
                }
            }
        })
        setOptionEdit(optionData)
        setPriceEdit(data)
    }

    const handleSelectColor = (data) => {
        const colorList = document.querySelectorAll(".info-product__detail-option")[1];
        const colorItems = colorList.querySelectorAll('.info-product__detail-option-item')
        colorItems.forEach((colorItem, index) => {
            colorItem.onclick = () => {
                const colorItemActive = colorList.querySelector(".info-product__detail-option-item.info-product__detail-option-item--active")
                if (colorItemActive) {
                    colorItemActive.classList.remove("info-product__detail-option-item--active")
                    colorItem.classList.add('info-product__detail-option-item--active')
                } else {
                    colorItem.classList.add('info-product__detail-option-item--active')
                }
            }
        })
        setColorEdit(data)
    }

    const changeImage = (fileName) => {
        const imageElement = document.querySelector(".info-product__image-primary")
        imageElement.style.backgroundImage = `url(${fileName})`
        imageElement.style.animation = `toRight 0.2s linear`

        const imgItems = document.querySelectorAll('.info-product__image-item')
        imgItems.forEach((imgItem, index) => {
            imgItem.onclick = () => {
                const imgItemActive = document.querySelector(".info-product__image-item.info-product__image-item--active")
                if (imgItemActive) {
                    imgItemActive.classList.remove("info-product__image-item--active")
                    imgItem.classList.add('info-product__image-item--active')
                } else {
                    imgItem.classList.add('.info-product__image-item--active')
                }
            }
        })
    }

    const arrayImage = []
    products.map((product, index) => {
        if (name === product.name) {
            arrayImage.push(product.imagePrimary, product.imageLink)
            imageList.map((imageItem, i) => {
                arrayImage.push(imageItem)
            })
        }
    })
    let indexImageInArray = 0;
    const handleNextImage = () => {
        if (indexImageInArray >= arrayImage.length) indexImageInArray = -1;
        indexImageInArray++;
        const imageElement = document.querySelector(".info-product__image-primary")
        imageElement.style.animation = 'toRight 0.3s linear';
        imageElement.style.backgroundImage = `url(${arrayImage[indexImageInArray]})`

    }
    const handlePrevImage = () => {
        if (indexImageInArray <= 0) indexImageInArray = arrayImage.length;
        indexImageInArray--;
        const imageElement = document.querySelector(".info-product__image-primary")
        imageElement.style.backgroundImage = `url(${arrayImage[indexImageInArray]})`
    }

    const toast = ({ title = "", message = "", type = "info", duration = 3000 }) => {
        const main = document.getElementById("toast-with-navbar");
        if (main) {
            const toast = document.createElement("div");
            // Auto remove toast
            const autoRemoveId = setTimeout(function () {
                main.removeChild(toast);
            }, duration + 1000);
            // Remove toast when clicked
            toast.onclick = function (e) {
                if (e.target.closest(".toast__close")) {
                    main.removeChild(toast);
                    clearTimeout(autoRemoveId);
                }
            };
            const icons = {
                success: "ti-check-box",
                info: "ti-info",
                warning: "ti-close",
                error: "ti-close"
            };
            const icon = icons[type];
            const delay = (duration / 1000).toFixed(2);
            toast.classList.add("toast", `toast--${type}`);
            toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;
            toast.innerHTML = `
                      <div class="toast__icon">
                          <i class="${icon}"></i>
                      </div>
                      <div class="toast__body">
                          <h3 class="toast__title">${title}</h3>
                          <p class="toast__msg">${message}</p>
                      </div>
                      <div class="toast__close">
                          <i class="ti-close"></i>
                      </div>
                  `;
            main.appendChild(toast);
        }
    }

    const showSuccessMessage = () => {
        toast({ title: 'Thêm thành công', message: 'Sản phẩm của bạn đã được thêm vào giỏ hàng, Xem ngay nào!', type: 'success', duration: 3000 })
    }

    const showErrorMessage = () => {
        toast({ title: 'Không thể thêm sản phẩm vào giỏ hàng', message: 'Bạn vui lòng chọn đủ phiên bản và màu sắc của sản phẩm!', type: 'error', duration: 3000 })
    }


    const handleClickAddToCart = () => {
        const elementClickActive = document.querySelector(".info-product__detail-option-item.info-product__detail-option-item--active")
        console.log(elementClickActive)
        if (elementClickActive) {
            users.map((user, index) => {
                if (window.localStorage.getItem("userLogged") === user.username) {
                    var indexProduct = cartUser.length + 1;
                    socket.emit("addProductToCart",
                        {
                            userID: user.userID,
                            cart:
                            {
                                indexProduct: indexProduct,
                                imageLink: imageLink,
                                id: productID,
                                productName: name,
                                option: optionEdit,
                                color: colorEdit,
                                price: priceEdit,
                                percent: percent,
                                quantity: 1
                            }
                        }
                    )
                }
            })
            showSuccessMessage();
            window.location.href = window.location.href
        }
        else {
            showErrorMessage();
        }

    }




    return (
        <div>
            <div id="toast-with-navbar"></div>
            <Nav socket={socket} />
            <Breadcrumbs />
            <div className="container">
                <div className="grid wide">
                    <div className="info-product__container">
                        <div className="info-product__header">
                            <label className="info-product__header-name">{name}</label>
                            <p className="info-product__header-star">()</p>
                            <p className="info-product__header-voters">({voterProduct} người bình chọn)</p>
                        </div>

                        <div className="info-product__box">
                            <div className="info-product__image-group">
                                <div className="info-product__image-primary"
                                    style={{
                                        backgroundImage: `url(${imagePrimary})`,
                                        backgroundPosition: "center center",
                                        backgroundColor: "transparent",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain"
                                    }}>
                                    <div className="info-product__image-pre-btn--prev" onClick={handlePrevImage}>
                                        <i className="fa fa-arrow-left"></i>
                                    </div>
                                    <div className="info-product__image-pre-btn--next" onClick={handleNextImage}>
                                        <i className="fa fa-arrow-right"></i>
                                    </div>
                                </div>
                                <label className="info-product__image-label">Những hình ảnh của sản phẩm</label>
                                <ul className="info-product__image-list">
                                    <li style={{
                                        backgroundImage: `url(${imageLink})`,
                                        backgroundPosition: "center center",
                                        backgroundColor: "transparent",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "contain"
                                    }} className='info-product__image-item info-product__image-item--active'
                                        onClick={(e) => {
                                            changeImage(imageLink)
                                        }}>
                                    </li>

                                    {loading ? <p>Đang kết nối đến server ... </p> : imageList.map((image, i) => (
                                        <li key={i}
                                            style={{
                                                backgroundImage: `url(${image})`,
                                                backgroundPosition: "center center",
                                                backgroundColor: "transparent",
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "cover"
                                            }} className='info-product__image-item'
                                            onClick={(e) => {
                                                changeImage(image)
                                            }}>
                                        </li>
                                    ))}
                                </ul>
                                <div className="info-product__policy">
                                    <label className="info-product__policy-header">CHÍNH SÁCH CỦA SẢN PHẨM</label>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-wrench"></i>
                                        <p className="info-product__policy-item-content">
                                            Bảo hành chính hãng <span style={{ fontWeight: 'bold' }}>12 tháng </span> tại trung tâm bảo hành ủy quyền của hệ thống cửa hàng của ShopTech
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-refresh"></i>
                                        <p className="info-product__policy-item-content">
                                            <span style={{ fontWeight: 'bold' }}>1 ĐỔI 1 </span>trong vòng 30 ngày đầu sử dụng và <span style={{ fontWeight: 'bold' }}>HỎNG GÌ ĐỔI NẤY </span> trong 90 ngày
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                    <div className="info-product__policy-item">
                                        <i className="info-product__policy-item-icon fa fa-retweet"></i>
                                        <p className="info-product__policy-item-content">
                                            Chính sách <span style={{ fontWeight: 'bold' }}>Trade-in lên đời </span> luôn hỗ trợ cho mọi sản phẩm
                                            <button className="info-product__policy-item-btn">(Xem chi tiết)</button>
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className='info-product__detail'>
                                <label className='info-product__detail-label info-product__detail-label-price'>Giá sản phẩm:</label>
                                <div className='info-product__detail-price'>
                                    <label className='info-product__detail-current-price'>{Number(price).toLocaleString()} đ</label>
                                    <label className='info-product__detail-old-price'>{(Number(price) * (100 + percent) / 100).toLocaleString()} đ</label>
                                    <label className='info-product__detail-percent'>-{percent}%</label>
                                </div>
                                <label className='info-product__detail-installment'>
                                    <i className="info-product__detail-installment-icon fa fa-tag"></i>
                                    Trả góp 0%
                                </label>
                                <div className='info-product__detail-option'>
                                    <label className='info-product__detail-label'>Chọn phiên bản:</label>
                                    {loading ? <p>Đang kết nối đến server ... </p> : option.map((o, i) => (
                                        <div key={i} className='info-product__detail-option-item' onClick={() => {
                                            handleSelectOption(o.data, o.price)
                                        }}>
                                            <div className='info-product__detail-option-item-content'>{o.data}</div>
                                            <div className='info-product__detail-option-item-price'>{Number(o.price).toLocaleString()} đ</div>
                                        </div>
                                    ))}

                                </div>
                                <div className='info-product__detail-option'>
                                    <label className='info-product__detail-label'>Chọn màu sắc:</label>
                                    {loading ? <p>Đang kết nối đến server ... </p> : color.map((c, i) => (
                                        <div className='info-product__detail-option-item' onClick={() => {
                                            handleSelectColor(c)
                                        }}>
                                            <div className='info-product__detail-option-item-content'>{c}</div>
                                            <div className='info-product__detail-option-item-price'>{Number(price).toLocaleString()} đ</div>
                                        </div>
                                    ))}
                                </div>
                                <div className='info-product__detail-promote'>
                                    <label className='info-product__detail-promote-label'>
                                        <i className='info-product__detail-promote-label-icon fa fa-gift'></i>
                                        ƯU MÃI RIÊNG CHO SẢN PHẨM
                                    </label>
                                    <div className='info-product__detail-promote-item'>
                                        <p className='info-product__detail-promote-item-index'>1</p>
                                        <label className='info-product__detail-promote-item-content'>
                                            Giảm ngay 1.800.000đ khi thanh toán qua QR bank
                                            <button className='info-product__detail-promote-item-content-btn'>(Xem chi tiết)</button>
                                        </label>
                                    </div>
                                    {loading ? <p>Đang kết nối đến server ... </p> : promotes.map((promote, i) => (
                                        <div className='info-product__detail-promote-item'>
                                            <p className='info-product__detail-promote-item-index'>{i + 2}</p>
                                            <label className='info-product__detail-promote-item-content'>
                                                {promote.name}
                                                <button className='info-product__detail-promote-item-content-btn'>(Xem chi tiết)</button>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <div className='info-product__detail-payment'>
                                    <button className='info-product__detail-payment-btn'>MUA NGAY
                                        <p className='info-product__detail-payment-describe'>Nhận tại cửa hàng hoặc giao hàng tận nơi</p>
                                    </button>
                                    <button className='info-product__detail-payment-btn-cart' onClick={handleClickAddToCart}>
                                        <i className="info-product__detail-payment-btn-icon fa fa-cart-plus"></i>
                                        Thêm vào giỏ hàng
                                        <p className='info-product__detail-payment-describe'>Thêm sản phẩm để mua sau</p>
                                    </button>
                                    <button className='info-product__detail-payment-btn-installment'>
                                        <i className="info-product__detail-payment-btn-icon fa fa-credit-card"></i>
                                        MUA TRẢ GÓP 0%
                                        <p className='info-product__detail-payment-describe'>Xét duyệt online trong 5 phút</p>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className='info-product__similar'>
                            <div className="info-product__similar-label">SẢN PHẨM TƯƠNG TỰ</div>
                            <ul className="info-product__similar-list">
                                {loading ? <p>Đang kết nối đến server ... </p> : products.map((product, index) => (
                                    <li
                                        className="product__sell-item"
                                        key={index}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            window.location.href = `/product/${product.enType}/${product.name}`

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
                                ))}
                            </ul>
                        </div>

                        <div className='info-product__review-container'>
                            <div className="info-product__rating-box">
                                <label className="info-product__rating-label">ĐÁNH GIÁ SẢN PHẨM</label>
                                <p className="info-product__rating-star">{Number(starProduct).toFixed(1)}/5</p>
                                <p className="info-product__rating-star-icon"></p>
                                <p className="info-product__rating-number">{voterProduct} lượt đánh giá</p>
                            </div>

                            <ul className="info-product__review-list">
                                <label className="info-product__review-label">Nhận xét</label>

                                {loading ? <p>Đang kết nối đến server ... </p> : comments.map((comment, index) => (
                                    <li className="info-product__review-item">
                                        <div className="info-product__review-item-title">
                                            <div className='info-product__review-item-info'>
                                                <div className='info-product__review-item-avatar'
                                                    style={{
                                                        backgroundImage: `url(${comment.ownerAvatar})`
                                                    }}>
                                                </div>
                                                <div className='info-product__review-item-fullname'>{comment.ownerName}</div>
                                            </div>
                                            <p className='info-product__review-item-time'>
                                                <i className='info-product__review-item-time-icon fa fa-clock'></i>
                                                {comment.time}
                                            </p>
                                        </div>
                                        <div className='info-product__review-item-vote'>
                                            <label className='info-product__review-item-vote-title'>
                                                Đánh giá sản phẩm:
                                                <span className='info-product__review-item-vote-start'></span>
                                            </label>
                                            <label className='info-product__review-item-vote-title'>Nhận xét sản phẩm:</label>
                                            <div className='info-product__review-item-vote-box'>
                                                <p className='info-product__review-item-vote-content'>{comment.content}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer socket={socket} />
            <p className='app-copyright'>©️ Bản quyền thuộc nhóm 7 -  Chuyên đề thực tế 2 - CN20A - năm 2023 <br />
                Địa chỉ: 70 Tô Ký, phường Tân Chánh Hiệp. Quận 12, Thành phố Hồ Chí Minh.</p>
        </div>
    )
}

export default InfoProductClient;