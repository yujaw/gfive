import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:4000'}),
    tagTypes: ['Product', 'User', 'Comment'],
    endpoints: builder => ({})
})