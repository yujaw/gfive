import React, { Fragment, useState, useEffect } from 'react'
import { Rating } from '@mui/material'
import { FaStar } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { useShoppingCart } from '../../hooks/useShoppingCart'
import { useFavourites } from '../../hooks/useFavourites'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import formatCurrency from '../../utilities/formatCurrency'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import Loader from '../Loader'
import axios from '../../api/axios'
import { Helmet } from 'react-helmet'
import Description from './desc'
// import SingleProductSkeleton from '../Skeletons/SingleProductSkeleton'

const SingleProduct = () => {

    const { increaseCartQuantity } = useShoppingCart()
    const { id } = useParams()
    const { toggleFav, favItems } = useFavourites()
    // const refresh = useRefreshToken()

    const [productImage, setProductImage] = useState()
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    // const [reviews, setReviews] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/products/${id}`)
                setProduct(res.data)
                setImages(res.data.image)
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    return (
        <Fragment>
            {
                product && (
                    <Fragment>
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        <div className='product-page-container'>
                            <div className='product'>
                                <div className='preview'>
                                    <Swiper
                                        loop={true}
                                        spaceBetween={10}
                                        direction='vertical'
                                        thumbs={{ swiper: productImage && !productImage.destroyed ? productImage : null }}
                                        modules={[FreeMode, Thumbs, Navigation]}
                                        className="product-image-swiper"
                                    // navigation={{
                                    //     nextEl: '.nav-el-next',
                                    //     prevEl: '.nav-el-prev'
                                    // }}
                                    >
                                        {
                                            images.map((items, index) => (
                                                <SwiperSlide key={index}>
                                                    <img src={items} alt="product_img" />
                                                </SwiperSlide>
                                            ))
                                        }
                                    </Swiper>
                                    <div className="swiper-nav">
                                        <Swiper
                                            onSwiper={setProductImage}
                                            // loop={true}
                                            direction='vertical'
                                            spaceBetween={10}
                                            slidesPerView={3.5}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            watchSlidesVisibility={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className="product-image-thumb-swiper"
                                        >
                                            {
                                                images.map((items, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className="pane">
                                                            <img src={items} alt="thumb_product_img" />
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                        </Swiper>
                                    </div>
                                </div>
                                <div className='desc'>
                                    <div className='title'>
                                        {product.name}
                                    </div>
                                    <div className='info'>
                                        <div className='rating-container'>
                                            <Rating
                                                className="ratings"
                                                defaultValue={parseInt(product.rating)}
                                                value={parseInt(product.rating)}
                                                precision={0.5}
                                                icon={<FaStar className='icon selected' />}
                                                emptyIcon={<FaStar className='icon unselected' />}
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <div className='price'>{formatCurrency(product.price)}</div>
                                    {/* <div className='container'>
                                        <div className="stock">
                                            <div className="ico"></div>
                                            <span>In Stock</span>
                                        </div>
                                    </div> */}
                                    <div className='checkouts'>
                                        {/* <button type='submit' className='buy primary'>
                                            Buy Now
                                        </button> */}
                                        <button type='submit' className='buy primary' onClick={() => increaseCartQuantity(id, product.price)}>
                                            Add to Cart
                                        </button>
                                        <button className='wish' onClick={() => toggleFav(id)}>
                                            {
                                                favItems.find(items => items === id)
                                                    ? <BsHeartFill style={{ fill: '#F63528' }} />
                                                    : <BsHeart />
                                            }
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Description id={id} />
                        </div>
                    </Fragment>
                )
            }
            {
                !product && (
                    <Loader />
                )
            }
        </Fragment >
    )
}

export default SingleProduct
