import { useState, useCallback, useEffect, useMemo } from "react";
import { useGetProductsLimitedSortQuery, type Product } from "../../redux/api/api";
import type { SortByValues, OrderByValues } from "./useProductsPageFilters";
import { usePagination } from "./usePagination";

const LIMIT = 15;

export const useProducts = (
    sortBy: SortByValues,
    orderBy: OrderByValues,
    search: string
) => {
    const { skip, resetPagination, incrementSkip, hasMore } = usePagination(LIMIT);

    const { data, error, isLoading, isFetching, refetch } =
        useGetProductsLimitedSortQuery({
            limit: LIMIT,
            skip,
            sortBy,
            orderBy,
            search,
        });

    const [products, setProducts] = useState<Product[]>([]);
    const [hasFirstPageLoaded, setHasFirstPageLoaded] = useState(false);

    useEffect(() => {
        resetPagination();
        setProducts([]);
        setHasFirstPageLoaded(false); 
    }, [sortBy, orderBy, search, resetPagination]);

    useEffect(() => {
        if (!data?.products?.length) return;

        if (skip === 0) {
            setProducts(data.products);
            setHasFirstPageLoaded(true); 
        } else {
            setProducts((prev) => {
                const newItems = data.products.filter(
                    (product) => !prev.some((existing) => existing.id === product.id)
                );
                return [...prev, ...newItems];
            });
        }
    }, [data, skip]);

    const loadMore = useCallback(() => {
        if (!isFetching && hasFirstPageLoaded) {
            incrementSkip();
        }
    }, [isFetching, hasFirstPageLoaded, incrementSkip]);

    const hasMoreProducts = useMemo(() => {
        return hasMore(data?.total ?? 0, products.length);
    }, [data?.total, products.length, hasMore]);

    return {
        products,
        isLoading,
        isFetching,
        loadMore,
        hasMoreProducts,
        error,
        refetch,
    };
};
