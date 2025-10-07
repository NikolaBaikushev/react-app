import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit/react"

type ProductState = {
    favouriteProducts: Record<number, boolean>
}

const initialState: ProductState = {
    favouriteProducts: {}
}

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        toggleFavourite: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            if (state.favouriteProducts[id]) {
                delete state.favouriteProducts[id];
            } else {
                state.favouriteProducts[id] = true;
            }
        }
    }
})

export const { toggleFavourite } = productsSlice.actions;