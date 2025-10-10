import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/api";
import { hasErrorData } from "../../guards/hasErrorData";
import ProductDetailsCard from "./ProductDetails/ProductDetailsCard";

type ProductDetailsPageParams = {
    readonly id: string,
}

const ProductDetailsPage = () => {
    const { id } = useParams<ProductDetailsPageParams>();

    const { data: product, error, isLoading } = useGetProductQuery(Number(id!));

    if (isLoading) return null;

    if (error || !product) {
        return <div>
            <h1>Error: {hasErrorData(error) && `${error.data.message}`} </h1>
        </div>;
    }

    return <ProductDetailsCard product={product}></ProductDetailsCard>
}



export default ProductDetailsPage;