import type { LoginUserPaylod, LoginUserResponse } from "../types/auth/login";

export const API_BASE_URL = 'https://dummyjson.com/'

export const loginUser = async (payload: LoginUserPaylod): Promise<LoginUserResponse> => {
    const response = await fetch(`${API_BASE_URL}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })

    if (!response.ok) {
        throw new Error('Error login!')
    }

    const data = await response.json();
    
    return data;
}