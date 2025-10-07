import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../redux/api/api";
import { toggleFavourite } from "../../redux/slices/products/productsSlice";
import type { RootState } from "../../redux/store/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isProductFavourite } from "../../redux/slices/products/productsSelectors";
import Products from "./Products";

const ProductsPage = () => {
  return <div>
    <Products />
  </div>
}

export default ProductsPage;