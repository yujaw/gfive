import React, { Fragment, useState } from 'react'
import { Rating } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { useFavourites } from '../../hooks/useFavourites'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import formatCurrency from '../../utilities/formatCurrency'
import storeItems from '../../data/items.json'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Helmet } from 'react-helmet'
import Slider from './slider'

const SingleProduct = () => {

    const { increaseCartQuantity } = useShoppingCart()
    const { id } = useParams()
    const product = storeItems.find((product) => product.id === id)

    const { toggleFav, favItems } = useFavourites()

    const [productImage, setProductImage] = useState()

    const location = window.location.href

    return (
        <Fragment>
            <Helmet>
                <title>{product.name}</title>
                <meta property="og:title" content={product.name} />
                <meta property="og:image" content={product.productImg[0]} />
                <meta property="og:url" content={location} />
            </Helmet>
            <div className='product-page-container'>
                <div className='product'>
                    <div className='preview'>
                        {
                            window.innerWidth < 768 ? (
                                <div className="mobile_title">
                                    {product.name}
                                </div>
                            ) : null
                        }
                        <Swiper
                            loop={true}
                            spaceBetween={10}
                            // thumbs={{ swiper: productImage }}
                            thumbs={{ swiper: productImage && !productImage.destroyed ? productImage : null }}
                            modules={[FreeMode, Thumbs]}
                            className="product-image-swiper"
                        >
                            {
                                product.productImg.map((items, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={items} alt="product_img" />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                        <Swiper
                            onSwiper={setProductImage}
                            loop={true}
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode={true}
                            watchSlidesProgress={true}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="product-image-thumb-swiper"
                        >
                            {
                                product.productImg.map((items, index) => (
                                    <SwiperSlide key={index}>
                                        <div className="pane">
                                            <img src={items} alt="thumb_product_img" />
                                        </div>
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    </div>
                    <div className='desc'>
                        {
                            window.innerWidth > 768 ? (
                                <div className='title'>
                                    {product.name}
                                </div>
                            ) : null
                        }
                        <div className='info'>
                            <div className='rating-container'>
                                <Rating
                                    className="ratings"
                                    defaultValue={parseInt(product.rating)}
                                    precision={0.5}
                                    icon={<FaStar className='icon selected' />}
                                    emptyIcon={<FaStar className='icon unselected' />}
                                    readOnly
                                />
                                <div className='wish'>
                                    <button onClick={() => toggleFav(id)}>
                                        {
                                            favItems.find(items => items === id) ?
                                                <BsHeartFill style={{ fill: '#F63528' }} /> :
                                                <BsHeart />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='price'>{formatCurrency(product.price)}</div>
                        <div className='container'>
                            <div className="stock">
                                <div className="ico"></div>
                                <span>In Stock</span>
                            </div>
                        </div>
                        <div className='checkouts'>
                            <button type='submit' className='buy primary'>
                                Buy Now
                            </button>
                            <button type='submit' className='add_cart secondary' onClick={() => increaseCartQuantity(id)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='product-details'>
                <span className='title'>Product Details</span>
                <div className='desc'>
                    {
                        product.desc.map((items, ind) => (
                            <div key={ind}>
                                <p>{items[0]}</p>
                                <span>{items[1]}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='feedback-container'>
                <div className='customer-ratings'>
                    <span className='title'>Product Ratings</span>
                    <div className='rating-details'>
                        <div className='ratings'>
                            <div className='desc'>
                                {product.rating}
                                <span>
                                    /5
                                </span>
                            </div>
                            <Rating
                                className="rating"
                                defaultValue={parseInt(product.rating)}
                                precision={0.5}
                                icon={<FaStar className='icon selected' />}
                                emptyIcon={<FaStar className='icon unselected' />}
                                readOnly
                            />
                            <div className='rate'>{product.comments.length} Ratings</div>
                        </div>
                        <div className='ratings-desc'>
                            <Slider width={30} txt={5} />
                            <Slider width={50} txt={4} />
                            <Slider width={70} txt={3} />
                            <Slider width={80} txt={2} />
                            <Slider width={10} txt={1} />
                        </div>
                    </div>
                </div>
                <div className='customer-reviews'>
                    <span className='title'>Product Reviews</span>
                    <div className='reviews'>
                        {
                            product.comments.map((items, index) => (
                                <div className='review-container' key={index}>
                                    <div className='image-container'>
                                        <img src={items.image} alt='product' />
                                    </div>
                                    <div className='chat'>
                                        <div className='review-data'>
                                            <div className='review-top'>
                                                <Rating
                                                    className="ratings"
                                                    defaultValue={items.rate}
                                                    precision={0.5}
                                                    icon={<FaStar className='icon selected' />}
                                                    emptyIcon={<FaStar className='icon unselected' />}
                                                    readOnly
                                                />
                                                <div className='date'>{items.msg_date}</div>
                                            </div>
                                            <div className='name'>{items.user}</div>
                                            <div className='desc'>
                                                {items.msg}
                                            </div>
                                        </div>
                                        <div className='response'>
                                            <div className='response-top'>
                                                <div className='name'>
                                                    Global IT Pvt. Ltd.
                                                </div>
                                                <div className='date'>{items.reply_date}</div>
                                            </div>
                                            <div className='desc'>{items.reply}</div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default SingleProduct
