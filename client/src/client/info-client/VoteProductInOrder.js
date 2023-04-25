import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../common/Nav';
import ModalLoading from '../common/ModalLoading';

const VoteProductInOrder = ({ socket }) => {
    const { orderID, productID } = useParams()

    const [users, setUsers] = useState([])
    const [avatarLink, setAvatarLink] = useState("")

    const [orders, setOrders] = useState([])
    const [owner, setOwner] = useState("")
    const [ownerFullname, setOwnerFullname] = useState("")
    const [listProduct, setListProduct] = useState([])
    const [imageLink, setImageLink] = useState("")
    const [productName, setProductName] = useState("")
    const [option, setOption] = useState("")
    const [color, setColor] = useState("")
    const [price, setPrice] = useState()

    const [numberStar, setNumberStar] = useState()
    const [contentComment, setContentComment] = useState("")

    const [products, setProducts] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchAPIs = () => {
            fetch("http://localhost:4000/api/users").then(res => res.json()).then(data => {
                setUsers(data.users)
            })

            fetch("http://localhost:4000/api/products").then(res => res.json()).then(data => {
                setProducts(data.products)
            })

            fetch("http://localhost:4000/api/orders").then(res => res.json()).then(data => {
                setOrders(data.orders)
            })
        }
        fetchAPIs()
    }, [])

    useEffect(() => {
        // Show thông tin sản phẩm đang đánh giá
        orders.map((order, index) => {
            if (order.orderID === orderID) {
                setOwner(order.owner)
                setListProduct(order.lists)
                setOwnerFullname(order.fullname)
            }
        })

        listProduct.map((item, index) => {
            if (item.id === productID) {
                setImageLink(item.imageLink)
                setProductName(item.productName)
                setOption(item.option)
                setColor(item.color)
                setPrice(item.price)
            }
        })

        users.map((user, index) => {
            if (user.username === owner) {
                setAvatarLink(user.avatarUrl)
            }
        })

        handleClickStar()
    })

    const handleClickStar = () => {
        const stars = document.querySelectorAll(".vote-product__start-group-item")
        for (let i = 0; i < stars.length; i++) {
            stars[i].onclick = () => {
                for (let j = 0; j < stars.length; j++) {
                    stars[j].classList.remove("vote-product__start-group-item--selected")
                }
                stars[i].classList.add("vote-product__start-group-item--selected")
                switch (i) {
                    case 0:
                        setNumberStar(5)
                        break;
                    case 1:
                        setNumberStar(4)
                        break;
                    case 2:
                        setNumberStar(3)
                        break;
                    case 3:
                        setNumberStar(2)
                        break;
                    case 4:
                        setNumberStar(1)
                        break;
                }
            }
        }
    }

    const handleConfirm = () => {
        if (!numberStar) {
            alert("Vui lòng bình chọn số sao sản phẩm này")
            return;
        }
        alert("Đánh giá sản phẩm thành công!")
        handLoadingPage(1.5)
        setTimeout(() => {
            var today = new Date();
            var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            var dateTime = date + ' ' + time;
            orders.map((item, index) => {
                if (item.orderID === orderID) {
                    products.map((product, i) => {
                        if (product.id === productID) {
                            socket.emit("handleVoteProduct",
                                { orderID: item.orderID },
                                { id: product.id },
                                {
                                    nameProductVoted: productName,
                                    owner: owner,
                                    ownerAvatar: avatarLink,
                                    ownerName: ownerFullname,
                                    time: dateTime,
                                    content: contentComment,
                                    starVoted: numberStar
                                },
                                productID,
                                numberStar
                            )
                        }
                    })
                }
            })
            window.location.href = `/account/history/detail-id=${orderID}`
        }, 1500)
    }

    const handLoadingPage = (second) => {
        const loading = document.querySelector(".modal__cover")
        loading.classList.add("modal--active")
        window.setTimeout(() => {
            loading.classList.remove("modal--active")
        }, second * 1000)
    }

    return (
        <div className="add-product__container">
            <Nav />
            <ModalLoading />
            <div className="vote-product__cover">
                <div className="vote-product">
                    <div className="vote-product__header">ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className="vote-product__body">
                        <div className='vote-product__item'>
                            <img src={imageLink} className='vote-product__item-img' />
                            <div className='vote-product__item-info'>
                                <label className='vote-product__item-name'>{productName}</label>
                                <label className='vote-product__item-content'>{option}</label>
                                <label className='vote-product__item-content'>{color}</label>
                                <p className='vote-product__item-price'>{Number(price).toLocaleString()} đ</p>
                            </div>
                        </div>

                        <label className="vote-product__title">Bạn thấy thế nào về sản phẩm này?</label>
                        <p className='vote-product__describe'>Hãy đánh giá và để lại nhận xét dành cho ShopTECH nhé</p>

                        <ul className='vote-product__start-group'>
                            <li className="vote-product__start-group-item" key="1"></li>
                            <li className="vote-product__start-group-item"></li>
                            <li className="vote-product__start-group-item"></li>
                            <li className="vote-product__start-group-item"></li>
                            <li className="vote-product__start-group-item"></li>
                        </ul>

                        <textarea type='text' className='vote-product__textbox' onChange={(e) => {
                            setContentComment(e.target.value)
                        }} placeholder="Chia sẽ cảm nhận của bạn ở đây nhé ..." value={contentComment} />
                    </div>

                    <div className="vote-product__footer">
                        <button className="vote-product__btn-confirm" onClick={handleConfirm}>
                            Xác nhận
                            <i className="vote-product__btn-icon fa fa-check"></i>
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigate(`/account/history/detail-id=${orderID}`)
                            }}
                            className="vote-product__btn-close">
                            Close
                            <i className="vote-product__btn-icon fa fa-sign-out"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VoteProductInOrder