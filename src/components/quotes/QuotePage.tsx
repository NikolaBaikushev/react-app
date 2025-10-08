// routes/QuotesPage.tsx
import { useEffect, useState } from "react";
import { getAllQuotes } from "../../services/quote.service";
import type { QuoteItem } from "../../types/quotes/quotes";
import Quotes from "./Quotes";
import { Skeleton } from "../common/Skeleton";

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([] as QuoteItem[]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getAllQuotes();
        setQuotes(data.quotes);
      } catch (error) {
        console.error("Failed to load quotes:", error);
      }
    };
    fetchQuotes();
  }, []);

  return (
    <div>
      {quotes.length ? <Quotes quotes={quotes} /> : <Skeleton length='10' container="div" className="grid grid-cols-3 gap-10 items-center w-full" />}
    </div>
  );
};

export default QuotesPage;
