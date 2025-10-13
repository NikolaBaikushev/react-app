import { useState, useCallback, useEffect, useMemo } from "react";
import { useGetProductsLimitedSortQuery, type Product } from "../../redux/api/api";
import type { SortByValues, OrderByValues } from "./useProductsPageFilters";

const LIMIT = 15;

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

export const useProducts = (sortBy: SortByValues, orderBy: OrderByValues, search: string) => {
    const { skip, resetPagination, incrementSkip, hasMore } = usePagination(LIMIT);
    const { data, error, isLoading, isFetching, refetch } = useGetProductsLimitedSortQuery({
        limit: LIMIT,
        skip,
        sortBy,
        orderBy,
        search,
    });

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        resetPagination();
        setProducts([]);
    }, [sortBy, orderBy, search, resetPagination]);

    useEffect(() => {
        if (data?.products?.length) {
            updateProducts(data.products);
        }
    }, [data, skip]);

    const loadMore = useCallback(() => {
        if (!isFetching) {
            incrementSkip();
        }
    }, [isFetching, incrementSkip]);

    const hasMoreProducts = useMemo(() => hasMore(data?.total ?? 0, products.length), [data, products, hasMore]);

    return {
        products,
        isLoading,
        isFetching,
        loadMore,
        hasMoreProducts,
        error,
        refetch,
    };

    function updateProducts(newData: Product[]) {
        setProducts((prev) => {
            const newItems = newData.filter(
                (product) => !prev.some((existing) => existing.id === product.id)
            );
            return [...prev, ...newItems];
        });
    }
};
