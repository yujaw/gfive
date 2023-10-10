import { Fragment, useEffect, useState } from 'react'
import StoreItem from '../Home/storeItem'
import useFavourites from '../../hooks/useFavourites'
import Sidenav from './sideNav'
import CardNav from './cardNav'
import useFilter from '../../hooks/useFilter'
import axios from '../../api/axios'
import Loader from '../Loader'
import useSearch from '../../hooks/useSearch'

const MobileSideNav = () => {
    const { filtermenu } = useFilter()

    return filtermenu ? <Sidenav /> : null
}

const Products = () => {

    const [product, setProduct] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isProductLoading, setIsProductLoading] = useState()
    const { values } = useSearch()
    const { sort, fil } = useFilter()
    const { favItems } = useFavourites()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsProductLoading(true)
                await axios
                    .get(`/api/products?query=${values?.keyword}&sort=${sort?.name}&order=${sort?.order}`)
                    .then((res) => {
                        setProduct(res.data)
                        setIsProductLoading(false)
                        setIsLoading(false)
                    })
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [values, sort?.name, sort?.order, fil])

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
                                // console.log(product)
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
            </Fragment>
        )
    )
}

export default Products