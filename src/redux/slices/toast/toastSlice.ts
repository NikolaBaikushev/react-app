import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export enum ToastType {
    ERROR = 'error',
    SUCCESS = 'success',
}

type ToastState = {
    message: string,
    type: ToastType,
    duration: number
}

const initialState: ToastState = {
    duration: 3000
} as ToastState;

export const toastSlice = createSlice({
    name: 'toast',
    initialState,
    reducers: {
        setToastState: (state, action: PayloadAction<Partial<ToastState>>) => {
            const {message, type} = action.payload;
            if (message) state.message = message;
            if (type) state.type = type
        },
        clearToastState: () => initialState,
    }
})

export const { setToastState, clearToastState } = toastSlice.actions;