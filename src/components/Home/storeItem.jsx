import React from 'react'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import formatCurrency from '../../utilities/formatCurrency'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import useShoppingCart from '../../hooks/useShoppingCart'
import useFavourites from '../../hooks/useFavourites'

const StoreItem = ({ _id, name, price, rating, fav, image }) => {

    const id = _id
    const { increaseCartQuantity } = useShoppingCart()
    const { toggleFav } = useFavourites()
    return (
        <div className="product">
            <div
                className="wish"
                style={{ opacity: fav ? 1 : null }}
            >
                <button onClick={() => toggleFav(id)}>
                    {fav ? (
                        <BsHeartFill
                            style={{ fill: fav ? '#F63528' : null }}
                        />
                    ) : (
                        <BsHeart />
                    )}
                </button>
            </div>
            <Link to={`/products/${id}`} className="image">
                <img src={image[0]} alt="Product" />
            </Link>
            <div className="contents">
                <Link to={`/products/${id}`} className="desc">
                    <span>
                        {name}
                    </span>
                </Link>
                <div className="more">
                    <Rating
                        className="ratings"
                        defaultValue={parseInt(rating)}
                        precision={0.5}
                        icon={<FaStar className='icon selected' />}
                        emptyIcon={<FaStar className='icon unselected' />}
                        readOnly
                    />
                    <span className="price">{formatCurrency(price)}</span>
                    <button className="buy" onClick={() => increaseCartQuantity(id, price)}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default StoreItem
