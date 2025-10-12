import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_BASE_URL } from '../../services/auth.service'
import type { OrderByValues, SortByValues } from '../../components/hooks/useProductsPageFilters'

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

type ProductCategory = {
  slug: string,
  name: string,
  url: string
}

type ProductCategoriesResponse = ProductCategory[];

export enum ArtificialDelays {
  PRODUCTS = 5000,
  QUOTES = 1000,
  PRODUCTS_INFINITE_SCROLL = 500,
  PRODUCTS_CATEGORIES = 2000,
  PRODUCTS_DETAILS_SUSPENSE = 3000
  
}

export const dummyjsonApi = createApi({
  reducerPath: 'dummyjsonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => `products`,
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, ArtificialDelays.PRODUCTS))
        return response.products
      },
    }),
    // getProductsLimited: builder.query<ProductResponse, { limit: number, skip: number }>({
    //   query: ({ limit, skip }) => `products?limit=${limit}&skip=${skip}`,
    //   transformResponse: async (response: ProductResponse) => {
    //     await new Promise((resolve) => setTimeout(resolve, 500))
    //     return response
    //   },
    // }),
    getProductsLimitedSort: builder.query<ProductResponse, { limit: number, skip: number, sortBy?: SortByValues, orderBy?: OrderByValues, search: string }>({
      query: ({ limit, skip, sortBy, orderBy = 'asc', search }) => {
        const params = new URLSearchParams({
          limit: limit.toString(),
          skip: skip.toString(),
        })

        if (sortBy) {
          params.append('sortBy', sortBy)
          params.append('order', orderBy);
        }
        let base = `products?${params.toString()}`;
        if (search) {
          params.append('q', search);
          base = `products/search?${params.toString()}`
        }

        return base;
      },
      transformResponse: async (response: ProductResponse) => {
        await new Promise((resolve) => setTimeout(resolve, ArtificialDelays.PRODUCTS_INFINITE_SCROLL))
        return response
      },
    }),
    getProduct: builder.query<Product, number>({
      query: (id: number) => `products/${id}`,
    }),
    addProduct: builder.mutation<Product, Partial<Product>>({
      query: ({ title, price }) => ({
        url: `products/add`,
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ title, price })
      })
    }),
    updateProduct: builder.mutation<Product, {id: number, body: Partial<Product>}>({
      query: ({id, body}) => ({
        url: `products/${id}`,
        headers: { 'Content-Type': 'application/json' },
        method: 'PUT',
        body: JSON.stringify(body)
      })
    }),
    deleteProduct: builder.mutation<Product & {isDeleted: boolean, deletedOn: string}, number>({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      })
    }),
    getProductsCategories: builder.query<Omit<ProductCategory, 'url'>[], void>({
      query: () => `products/categories`,
      transformResponse: async (response: ProductCategoriesResponse) => {
        await new Promise((resolve) => setTimeout(resolve, ArtificialDelays.PRODUCTS_CATEGORIES))

        return response.map((data: ProductCategory) => ({
          name: data.name,
          slug: data.slug
        }))
      }
    }),
  }),
})


export const { useGetProductsQuery, useGetProductsLimitedSortQuery, useGetProductQuery, useAddProductMutation, useGetProductsCategoriesQuery, useUpdateProductMutation, useDeleteProductMutation} = dummyjsonApi;