import { Fragment, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y } from 'swiper/modules'
import useFavourites from '../../hooks/useFavourites'
import { Link, useNavigate } from 'react-router-dom'
import Loader from '../Loader'

import StoreItem from './storeItem'
import axios from '../../api/axios'

import 'swiper/css/pagination'
import 'swiper/css'
const Home = () => {

  const [product, setProduct] = useState([])
  const [ad, setAd] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios
          .get('/api/products')
          .then((res) => {
            setProduct(res.data)
            setAd(res.data[2])
          })
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const { favItems } = useFavourites()

  const navigate = useNavigate();
  // const routeChange = () => {
  //   navigate('/product/00eb26dae5a');
  // }

  return (
    isLoading ? (
      <Loader />
    ) : (
      <Fragment>
        <div className='offers'>
          <div className='back'>
            <div className="filter" />
          </div>
        </div>
        <div className='features'>
          <Link to={'/products'} className='category'>
            <div className='img_container'>
              <img src='./images/office-chair.png' alt='Category' />
            </div>
            <div className='desc'><span>Components</span></div>
          </Link>
          <Link to={'/products'} className='category'>
            <div className='img_container'>
              <img src='./images/laptop.png' alt='Category' />
            </div>
            <div className='desc'><span>Laptops</span></div>
          </Link>
          <Link to={'/products'} className='category'>
            <div className='img_container'>
              <img src='./images/headphones.png' alt='Category' />
            </div>
            <div className='desc'><span>Accessories</span></div>
          </Link>
          <Link to={'/products'} className='category'>
            <div className='img_container'>
              <img src='./images/computer.png' alt='Category' />
            </div>
            <div className='desc'><span>Desktops</span></div>
          </Link>
        </div>
        {
          product?.length > 0 && (
            <div className='store_banner'>
              <div className='store'>
                <div className='title'>Featured Products</div>
                <div className='product_swiper product-swiper-one'>
                  <Swiper
                    className='swiper-wrapper'
                    breakpoints={{
                      100: {
                        // width: 100,
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 20,
                        centeredSlides: true
                      }, 768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 40
                      }
                    }}
                    modules={[Pagination, A11y]}
                    direction='horizontal'
                    speed={400}
                    loop={false}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    spaceBetween={40}

                    pagination={
                      {
                        el: '.swiper-pagination-one',
                        type: 'bullets',
                        clickable: 'true',
                        dynamicBullets: 'true',
                        dynamicMainBullets: 3,
                      }
                    }

                  >
                    {
                      product.map(item => (
                        item.featured ? (
                          <SwiperSlide className='swiper-slide' key={item._id}>
                            {
                              favItems.find(items => items === item._id) ?
                                <StoreItem {...item} fav={true} /> :
                                <StoreItem {...item} />
                            }
                          </SwiperSlide>
                        ) : null
                      ))
                    }
                  </Swiper>
                  <div className='swiper-pagination swiper-pagination-one'></div>
                </div>
              </div>
            </div>
          )
        }
        {
          ad?.name && (
            <div className='ad_container'>
              <div className='ad'>
                <div className='left'>
                  <div className='title'>{ad.name}</div>
                  <div className='desc'>{ad.name}</div>
                  <button className='btn' onClick={() => navigate(`/products/${ad._id}`)}>View</button>
                </div>
                <div className='right'>
                  <img src={ad.image[0]} alt='ad' />
                </div>
              </div>
            </div>
          )
        }
        {
          product?.length > 0 && (
            <div className='store_banner'>
              <div className='store'>
                <span className='title'>Best Selling Products</span>
                <div className='product_swiper product-swiper-two'>
                  <Swiper
                    className='swiper-wrapper'
                    breakpoints={{
                      100: {
                        slidesPerView: 2,
                        slidesPerGroup: 1,
                        spaceBetween: 20,
                        centeredSlides: true
                      }, 768: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                        spaceBetween: 40
                      }
                    }}
                    modules={[Pagination, A11y]}
                    direction='horizontal'
                    speed={400}
                    loop={false}
                    slidesPerView={4}
                    slidesPerGroup={4}
                    spaceBetween={40}

                    pagination={
                      {
                        el: '.swiper-pagination-two',
                        type: 'bullets',
                        clickable: 'true',
                        dynamicBullets: 'true',
                        dynamicMainBullets: 3,
                      }
                    }
                  >
                    {product.map(item => (
                      <SwiperSlide className='swiper-slide' key={item._id}>
                        {
                          favItems.find(items => items === item._id) ?
                            <StoreItem {...item} fav={true} /> :
                            <StoreItem {...item} />
                        }
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className='swiper-pagination swiper-pagination-two'></div>
                </div>
              </div>
            </div>
          )
        }
      </Fragment>
    )
  )
}

export default Home