import { useCallback, useEffect, useEffectEvent, useState } from "react";
import { dummyjsonApi, useGetProductsLimitedSortQuery } from "../../../redux/api/api";
import { Skeleton } from "../../common/Skeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { ProductCard } from "./ProductCard";
import type { ProductsSortState } from "../../hooks/useProductsPageFilters";
import { useAppDispatch } from "../../../redux/hooks";

const LIMIT = 15;

const Products = ({ sortBy, orderBy, search }: ProductsSortState & { search: string }) => {
    const [skip, setSkip] = useState(0);
    const { data, error, isLoading, isFetching } = useGetProductsLimitedSortQuery({ limit: LIMIT, skip: skip, sortBy, orderBy: orderBy, search });
    const [products, setProducts] = useState(() => data?.products?.length ? data.products : []);

    useEffect(() => {
        if (data?.products?.length) {
            setProducts(prev => [...prev, ...data?.products]);
        }
    }, [data]);

    useEffect(() => {
        setProducts([])
        setSkip(0)
    }, [sortBy, orderBy, search])


    const hasMore = data && (products.length < data.total);

    const loadMore = useCallback(() => {
        if (!isFetching) {
            setSkip((state) => state + LIMIT);
        }
    }, [isFetching]);

    const sentinelRef = useInfiniteScroll(loadMore, hasMore as boolean, isFetching);

    return (
        <>{isLoading
            ? <Skeleton length={LIMIT} container="div" className="grid grid-cols-3 gap-10 items-center w-full" />
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-stretch min-h-[80vh]">

                {products?.map(product => <ProductCard key={product.id} product={product}></ProductCard>)}
            </div>
        }
            {isFetching && <>
                <Skeleton length={LIMIT} container="div" className="mt-5 grid grid-cols-3 gap-10 items-center w-full" />
            </>}

            {hasMore && !isFetching && <div ref={sentinelRef} style={{ height: '1px' }} />}
        </>
    )

}

export default Products;