import { useParams } from "react-router-dom";


const ProductDetailsPage = () => {
  const params = useParams();
  return <div><h1>Product Detail For {params.id}</h1></div>
}



export default ProductDetailsPage;