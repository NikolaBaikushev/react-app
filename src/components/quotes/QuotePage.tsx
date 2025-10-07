// routes/QuotesPage.tsx
import { useEffect, useState } from "react";
import { getAllQuotes } from "../../services/quote.service";
import type { QuoteItem } from "../../types/quotes/quotes";
import Quotes from "./Quotes";

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
      {quotes.length ? <Quotes quotes={quotes} /> : <p>Loading quotes...</p>}
    </div>
  );
};

export default QuotesPage;
