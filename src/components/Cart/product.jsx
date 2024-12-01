import React, { Fragment, useEffect, useState } from 'react'
import Card from '@mui/material/Card'
import useShoppingCart from '../../hooks/useShoppingCart'
import formatCurrency from '../../utilities/formatCurrency'
import axios from '../../api/axios'

const Product = ({ id, quantity }) => {
    const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } = useShoppingCart()
    // const item = storeItems.find(i => i.id === id)

    const [item, setItem] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios
                    .get(`/products/${id}`)
                    .then((res) => {
                        setItem(res.data)
                        setIsLoading(false)
                    })
            } catch (err) {
                console.log(err)
            }
        }

        fetchData()
    }, [id])

    return (
        <Card className="product" square>
            {
                isLoading ? (
                    <Fragment>
                        <div className="image-box skeleton"></div>
                        {/* <div className="image-box">
                            <img src={item.image[0]} alt="Product" />
                        </div> */}
                        <div className="about">
                            <div className='skeleton skeleton-title skeleton-gap'></div>
                            <div className='skeleton skeleton-text'></div>
                        </div>
                        <div className="counter">
                            <div className='skeleton skeleton-title'></div>
                        </div>
                        <div className="prices">
                            <div className="skeleton skeleton-text"></div>
                            <div>
                                <button className="remove" onClick={() => removeFromCart(id)}>Remove</button>
                            </div>
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="image-box">
                            <img src={item.image[0]} alt="Product" />
                        </div>
                        <div className="about">
                            <h1 className="title">{item.name}</h1>
                            <h3 className="subtitle">{formatCurrency(item.price)}</h3>
                        </div>
                        <div className="counter">
                            <button
                                className="btn"
                                onClick={() => increaseCartQuantity(item._id)}
                            >
                                {/* <span>+</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" /></svg>
                            </button>
                            <div className="count">{quantity}</div>
                            <button
                                className="btn"
                                onClick={() => decreaseCartQuantity(item._id)}
                            >
                                {/* <span>-</span> */}
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width="24"><path d="M200-440v-80h560v80H200Z" /></svg>
                            </button>
                        </div>
                        <div className="prices">
                            <div className="amount">{formatCurrency(item.price * quantity)}</div>
                            <div>
                                <button className="remove" onClick={() => removeFromCart(id)}>Remove</button>
                            </div>
                        </div>
                    </Fragment>
                )
            }
        </Card>
    )
}

export default Product
