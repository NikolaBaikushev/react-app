import { ArtificialDelays } from "../redux/api/api";
import type { QuotesResponse } from "../types/quotes/quotes";
import { API_BASE_URL } from "./auth.service"

export const getAllQuotes = async (): Promise<QuotesResponse> => {
    const response = await fetch(`${API_BASE_URL}quotes`);

    if (!response.ok) {
        throw new Error("Error getting quotes!");
    }

    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, ArtificialDelays.QUOTES))
    return data;
}