import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../services/auth.service'

export type ProductResponse = {
  products: Product[],
  total: number,
  limit: number,
  skip: number,
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
  tags: string[],

  images: string[],
  returnPolicy: string,
  reviews: ProductReview[],
  warrantyInformation: string,
  shippingInformation: string,

  availabilityStatus: string,
  brand: string,
  sku: string,
  weight: number,
  dimensions: ProductDimensions,
  minimumOrderQuantity: number,

}

type ProductDimensions = {
  width: number,
  height: number,
  depth: number,
}


export type ProductReview = {
  rating: number,
  comment: string,
  date: string,
  reviewerName: string,
  reviewerEmail: string
}

export const dummyjsonApi = createApi({
  reducerPath: 'dummyjsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, 5000))
        return response.products
      },
    }),
    getProductsLimited: builder.query<ProductResponse, { limit: number, skip: number }>({
      query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return response
      },
    }),
    getProductsLimitedSort: builder.query<ProductResponse, { limit: number, skip: number, sortBy?: string, orderBy?: string }>({
      query: ({ limit, skip, sortBy, orderBy = 'asc' }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        })

        if (sortBy) {
          params.append('sortBy', sortBy)
          params.append('order', orderBy);
        }

        return `products?${params.toString()}`;
      },
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, 500))
        return response
      },
    }),
    getProduct: builder.query<Product, number>({
      query: (id: number) => `products/${id}`
    }),
  }),
})


export const { useGetProductsQuery, useGetProductsLimitedQuery, useGetProductsLimitedSortQuery, useGetProductQuery } = dummyjsonApi;