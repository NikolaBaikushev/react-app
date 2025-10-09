import type { QuoteItem } from "../../types/quotes/quotes";
import { THEME_LIGHT, useTheme } from "../context/ThemeContext";

export type QuoteProps = QuoteItem & { isFavourite: boolean, toggleFavouriteQuote: (id: number) => void};

const QuoteCard = (props: QuoteProps) => {
    const [theme] = useTheme()

    const baseClass = theme === THEME_LIGHT ? 'bg-base-100' : 'bg-base-200';
    
    return (<div className={`card card-md card-border ${baseClass} w-96`}>
        <div className="card-body">
            <h2 className="card-title">{props.author}</h2>
            <p className="text-left">{props.quote}</p>
            <div className="card-actions justify-end" >
                <button onClick={() => props.toggleFavouriteQuote(props.id)} className={`btn btn-circle ${props.isFavourite && 'btn-primary'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                </button>
            </div>
        </div>
    </div>)
}
export default QuoteCard;