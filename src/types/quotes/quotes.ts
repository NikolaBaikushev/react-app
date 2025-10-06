export type QuotesResponse = {
    quotes: QuoteItem[],
    total: number,
    skip: number,
    limit: number
}

export type QuoteItem = {
    id: number,
    quote: string,
    author: string,
}