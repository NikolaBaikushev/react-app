import { useGetProductsQuery } from "../../redux/api/api";
import { Skeleton } from "../common/Skeleton";
import SkeletonCard from "../common/SkeletonCard";
import { ProductCard } from "./ProductCard";

const Products = () => {
    const { data: products, error, isLoading } = useGetProductsQuery();
    return (isLoading
        ? <Skeleton length='10' container="div" className="grid grid-cols-3 gap-10 items-center w-full" />
        :
        <div className="grid grid-cols-3 gap-10 items-center w-full">
            {products?.map(product => <ProductCard product={product}></ProductCard>)}
        </div>)
}

export default Products;