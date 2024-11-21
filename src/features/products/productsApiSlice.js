import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apislice"

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProducts: builder.query({
            query: () => ({
                url: '/products',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedproducts = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return productsAdapter.setAll(initialState, loadedproducts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        addNewProduct: builder.mutation({
            query: initialproductData => ({
                url: '/products',
                method: 'POST',
                body: {
                    ...initialproductData,
                }
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),
        updateProduct: builder.mutation({
            query: initialproductData => ({
                url: '/products',
                method: 'PATCH',
                body: {
                    ...initialproductData,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        getProduct: builder.query({
            query: ({id}) => ({
                url: `/products/${id}`,
                method: 'GET'
            }),
            transformResponse: responseData => {
                responseData.id = responseData._id;
                return productsAdapter.upsertOne(initialState, responseData)
            },
            providesTags: (result, error, arg) => [
                { type: 'Product', id: arg }
            ]
        }),
    }),
})

export const {
    useGetAllProductsQuery,
    useGetProductQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
} = productsApiSlice

// returns the query result object
export const selectProductsResult = productsApiSlice.endpoints.getAllProducts.select()

// creates memoized selector
const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)