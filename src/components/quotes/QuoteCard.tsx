import type { QuoteItem } from "../../types/quotes/quotes";

export type QuoteProps = Omit<QuoteItem, "id">;

const QuoteCard = (props: QuoteProps) => {
    return <div>
        <span>{props.author}</span>
        <span>{props.quote}</span>
    </div>
}
export default QuoteCard;