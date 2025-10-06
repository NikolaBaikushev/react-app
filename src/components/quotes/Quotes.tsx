import type { QuoteItem } from "../../types/quotes/quotes";
import QuoteCard from "./QuoteCard";

type QuotesProps = {
    quotes: QuoteItem[]
}

const Quotes = ({quotes}: QuotesProps) => {
    return (<div className="flex flex-row flex-wrap justify-center gap-6 mt-10">{quotes.map(q => <QuoteCard key={q.id} author={q.author} quote={q.quote}/>)}</div>)
}

export default Quotes;