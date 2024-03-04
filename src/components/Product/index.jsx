import { Fragment, useEffect, useState } from 'react'
import StoreItem from '../Home/storeItem'
import useFavourites from '../../hooks/useFavourites'
import Sidenav from './sideNav'
import CardNav from './cardNav'
import useFilter from '../../hooks/useFilter'
import axios from '../../api/axios'
import Loader from '../Loader'
import useSearch from '../../hooks/useSearch'
import { Pagination, styled } from '@mui/material'

const MobileSideNav = () => {
    const { filtermenu } = useFilter()

    return filtermenu ? <Sidenav /> : null
}

const Products = () => {

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProductLoading, setIsProductLoading] = useState()
    const { values } = useSearch()
    const { sort, fil, page, setPage } = useFilter()
    const { favItems } = useFavourites()
    const [total, setTotal] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsProductLoading(true)
                await axios
                    .get(`/api/products?query=${values?.keyword}&sort=${sort?.name}&order=${sort?.order}&page=${page}`)
                    .then((res) => {
                        setProduct(res.data.data)
                        setTotal(Math.ceil(res.data.totalCount / 8))
                        setIsProductLoading(false)
                        setIsLoading(false)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [values, sort?.page, sort?.name, sort?.order, fil, page])

    const StyledPagination = styled(Pagination)({
        ul: {
            '& .Mui-selected': {
                backgroundColor: '#00ed64',
                borderRadius: '.2rem',
                color: 'black',
                fontWeight: '500',
                border: '1px solid #00684a',
                transition: '.3s ease',
                '&:hover': {
                    backgroundColor: "#00ed64",
                    borderRadius: '2rem'
                }
            }
        }
    })

    return (
        isLoading ? (
            <Loader />
        ) : (
            <Fragment>
                <div className="products_container">
                    {
                        window.innerWidth > 768
                            ? <Sidenav />
                            : <MobileSideNav />
                    }
                    <div className="product_grid_container">
                        <CardNav />
                        <div className="products">
                            {
                                product.map((item, index) => (
                                    <div className='card' key={index}>
                                        {
                                            isProductLoading
                                                ? (
                                                    <Fragment>
                                                        <div className="product">
                                                            <div className="skeleton image"></div>
                                                            <div className="contents">
                                                                <div className="skeleton skeleton-text skeleton-gap"></div>
                                                                <div className="skeleton skeleton-title"></div>
                                                                <div className="more">
                                                                    <div className="skeleton skeleton-crate"></div>
                                                                    <div className="skeleton skeleton-title"></div>
                                                                    <div className="skeleton skeleton-crate"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Fragment>
                                                )
                                                : favItems
                                                    .find(items => items === item._id)
                                                    ? <StoreItem {...item} fav={true} />
                                                    : <StoreItem {...item} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="pagination_container">
                    <StyledPagination
                        count={total}
                        defaultPage={parseInt(page)}
                        shape='rounded'
                        size='large'
                        onChange={(event, value) => setPage(value)}
                    />
                </div>
            </Fragment>
        )
    )
}

export default Products