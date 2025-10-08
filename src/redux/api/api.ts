import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../services/auth.service'

export type ProductResponse = {
  products: Product[]
}

export type Product = {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  tags: string[]
}

export const dummyjsonApi = createApi({
  reducerPath: 'dummyjsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return response.products
      },
    }),
  }),
})


export const { useGetProductsQuery } = dummyjsonApi;