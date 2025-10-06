import type { QuoteItem } from "../../types/quotes/quotes";
import QuoteCard from "./QuoteCard";

type QuotesProps = {
    quotes: QuoteItem[]
}

const Quotes = ({quotes}: QuotesProps) => {
    return quotes.map(q => <QuoteCard key={q.id} author={q.author} quote={q.quote}/>)
}

export default Quotes;