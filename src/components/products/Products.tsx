import { useGetProductsQuery } from "../../redux/api/api";
import { Skeleton } from "../common/Skeleton";
import SkeletonCard from "../common/SkeletonCard";
import { ProductCard } from "./ProductCard";

const Products = () => {
    const { data: products, error, isLoading } = useGetProductsQuery();
    return (isLoading ? <Skeleton length='10' container="div" className="flex flex-col flex-auto w-full gap-y-10"/>: <div className="flex flex-col flex-auto w-full gap-y-10">{products?.map(product => <ProductCard product={product}></ProductCard>)}</div>)
}

export default Products;