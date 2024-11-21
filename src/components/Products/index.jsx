import { useGetAllProductsQuery } from '../../features/products/productsApiSlice'
import Loader from '../Loader'

const Productas = () => {
    const {
        data: products,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllProductsQuery()

    let content

    if (isLoading) content = <Loader />

    if (isError) {
        content = <p>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = products

        const tableContent = ids?.length
            ? ids.map(productId => <p>{productId}</p>)
            : null

        content = <div>
            {tableContent}
        </div>
    }

    return content
}

export default Productas