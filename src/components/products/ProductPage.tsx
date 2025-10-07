import { useDispatch, useSelector } from "react-redux";
import { useGetProductsQuery } from "../../redux/api/api";
import { toggleFavourite } from "../../redux/slices/products/productsSlice";
import type { RootState } from "../../redux/store/store";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isProductFavourite } from "../../redux/slices/products/productsSelectors";

const ProductsPage = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  const favProducts = useAppSelector((state) => state.products.favouriteProducts);

  const dispatch = useAppDispatch();

  return <div>
    <h1>Products</h1>
    {data?.length && data.map(product => <>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <img
            src={product.thumbnail || "https://via.placeholder.com/150"}
            alt={product.title}
            className="h-48 object-cover w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{product.title}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold">${product.price}</span>
            <button
              className="btn btn-sm btn-outline"
              onClick={() => dispatch(toggleFavourite(product.id))}
              aria-label="Toggle favourite"
            >
              {/* if using selector function -> 
              {useAppSelector((state) => isProductFavourite(state, product.id)) ? "❤️" : "🤍"} 
              */}
              {favProducts[product.id] ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </>)}
  </div>
}

export default ProductsPage;