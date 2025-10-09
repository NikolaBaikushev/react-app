import { data, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/api";
import { hasErrorData } from "../../guards/hasErrorData";

type ProductDetailsPageParams = {
    readonly id: string,
}

const ProductDetailsPage = () => {
    const { id } = useParams<ProductDetailsPageParams>();


    const { data: product, error, isLoading } = useGetProductQuery(Number(id!));

    return <div>
        {error ? <div><h1>Error: {hasErrorData(error) && `${error.data.message}`} </h1></div> : <>
            <h1>Product Detail For {product?.id}</h1>

        </>}
    </div>
}



export default ProductDetailsPage;