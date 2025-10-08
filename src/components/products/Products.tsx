import { useEffect, useState } from "react";
import { useGetProductsLimitedQuery, useGetProductsQuery } from "../../redux/api/api";
import { Skeleton } from "../common/Skeleton";
import SkeletonCard from "../common/SkeletonCard";
import { ProductCard } from "./ProductCard";

const LIMIT = 100;

const Products = () => {
    const [skip, setSkip] = useState(0);
    const { data, error, isLoading, isFetching } = useGetProductsLimitedQuery({ limit: LIMIT, skip: skip });
    const [products, setProducts] = useState(() => data?.products?.length ? data.products : []);

    useEffect(() => {
        if (data?.products?.length) {
            setProducts(prev => [...prev, ...data?.products]);
        }
    }, [data]);

    const hasMore = data && (products.length < data.total);

    return (
        <>{isLoading
            ? <Skeleton length={LIMIT} container="div" className="grid grid-cols-3 gap-10 items-center w-full" />
            :
            <div className="grid grid-cols-3 gap-10 items-center w-full">
                {products?.map(product => <ProductCard product={product}></ProductCard>)}
            </div>
            }
            {isFetching && <>
                <Skeleton length={LIMIT} container="div" className="mt-5 grid grid-cols-3 gap-10 items-center w-full" />
            </>}
            <div>
                <div className="col-span-3 flex justify-center mt-4">
                    <button
                        onClick={() => setSkip(state => state + LIMIT)}
                        disabled={isLoading || !hasMore}
                        className="btn btn-primary"
                    >
                        Load More
                    </button>
                </div>
            </div>
        </>
    )

}

export default Products;