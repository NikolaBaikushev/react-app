import { useState, useCallback } from "react";

export const usePagination = (limit: number) => {
    const [skip, setSkip] = useState(0);

    const resetPagination = useCallback(() => {
        setSkip(0);
    }, []);

    const incrementSkip = useCallback(() => {
        setSkip((prev) => prev + limit);
    }, [limit]);

    const hasMore = useCallback((total: number, currentLength: number) => {
        return currentLength < total;
    }, []);

    return { skip, resetPagination, incrementSkip, hasMore };
};