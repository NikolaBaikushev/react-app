import type { Product } from "../../redux/api/api"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleFavourite } from "../../redux/slices/products/productsSlice";

type ProductCardProps = {
    product: Product
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const favouriteProducts = useAppSelector(state => state.products.favouriteProducts);


    // light bg-base-100
    // dark bg-base-200
    return <div className="card-sm card bg-base-100 shadow-sm">
        <figure>
            <img
                src={product.thumbnail || "https://via.placeholder.com/150"}
                alt={product.title}
                className="h-48 w-48 object-center"
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
                    {favouriteProducts[product.id] ? "❤️" : "🤍"}
                </button>
            </div>
        </div>
    </div>
}