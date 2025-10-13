import { useCallback, useEffect, useState } from "react";
import { useGetProductsLimitedSortQuery, type Product } from "../../../redux/api/api";
import { Skeleton } from "../../common/Skeleton";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { ProductCard } from "./ProductCard";
import type { ProductsSortState } from "../../hooks/useProductsPageFilters";
import { useProducts } from "../../hooks/useProducts";
import useToast from "../../hooks/useToast";
import { ToastType } from "../../../redux/slices/toast/toastSlice";

const LIMIT = 15;

const Products = ({ sortBy, orderBy, search }: ProductsSortState & { search: string }) => {
    const {
        products,
        isLoading,
        isFetching,
        loadMore,
        hasMoreProducts,
        error,
        refetch,
    } = useProducts(sortBy, orderBy, search)
    const { setToast} = useToast();

    const sentinelRef = useInfiniteScroll(loadMore, hasMoreProducts as boolean, isFetching);

    if (error) {
        setToast(`Something went wrong! ${error}`, ToastType.ERROR);
    }

    return (
        <>{isLoading
            ? <Skeleton length={LIMIT} container="div" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-center w-full" />
            :
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 items-stretch min-h-[80vh]">

                {products?.map(product => <ProductCard key={product.id} product={product} refetch={refetch}></ProductCard>)}
            </div>
        }
            {isFetching && <>
                <Skeleton length={LIMIT} container="div" className="mt-5 grid grid-cols-3 gap-10 items-center w-full" />
            </>}

            {hasMoreProducts && !isFetching && <div ref={sentinelRef} style={{ height: '1px' }} />}
        </>
    )

}

export default Products;