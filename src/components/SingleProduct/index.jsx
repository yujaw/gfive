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
// import SingleProductSkeleton from '../Skeletons/SingleProductSkeleton'

const SingleProduct = () => {

    const { increaseCartQuantity } = useShoppingCart()
    const { id } = useParams()
    const { toggleFav, favItems } = useFavourites()
    // const refresh = useRefreshToken()

    const [productImage, setProductImage] = useState()
    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    // const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/products/${id}`)
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
                                        {/* <div className="nav nav-el-prev">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 0 320 512">
                                                <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z" />
                                            </svg>
                                        </div> */}
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
                                        {/* <div className="nav nav-el-next">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="2.5rem" viewBox="0 0 320 512">
                                                <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z" />
                                            </svg>
                                        </div> */}
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
                                            {/* <div className='wish'>
                                                <button onClick={() => toggleFav(id)}>
                                                    {
                                                        favItems.find(items => items === id) ?
                                                            <BsHeartFill style={{ fill: '#F63528' }} /> :
                                                            <BsHeart />
                                                    }
                                                </button>
                                            </div> */}
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
                                        <button type='submit' className='buy primary' onClick={() => increaseCartQuantity(id)}>
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
