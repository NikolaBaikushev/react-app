import { useState } from "react";
import type { QuoteItem } from "../../types/quotes/quotes";
import QuoteCard from "./QuoteCard";
import { getLocalStorageItem, LocalStorageKeys, setLocalStorageItem } from "../../services/localStorage.service";

type QuotesProps = {
    quotes: QuoteItem[]
}

const Quotes = ({quotes}: QuotesProps) => {
    const [favouriteQuotesIds, setFavouriteQuotesIds] = useState<number[]>(() => {
        const stored = getLocalStorageItem(LocalStorageKeys.FAVOURITE_QUOTES);
        return stored ? JSON.parse(stored) : [];
    })

    const toggleFavouriteQuote = (id:number) => {
        setFavouriteQuotesIds(prev => {
            const updated = prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id];
            setLocalStorageItem(LocalStorageKeys.FAVOURITE_QUOTES, JSON.stringify(updated))
            return updated;
        })
    }


    return (<div className="flex flex-row flex-wrap justify-center gap-6 mt-10">{quotes.map(q => <QuoteCard key={q.id} isFavourite={favouriteQuotesIds.includes(q.id)} toggleFavouriteQuote={toggleFavouriteQuote} id={q.id} author={q.author} quote={q.quote}/>)}</div>)
}

export default Quotes;