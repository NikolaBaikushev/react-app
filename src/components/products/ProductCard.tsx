import type { Product } from "../../redux/api/api"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleFavourite } from "../../redux/slices/products/productsSlice";
import { THEME_LIGHT, useTheme } from "../context/ThemeContext";

type ProductCardProps = {
    product: Product
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const favouriteProducts = useAppSelector(state => state.products.favouriteProducts);
    const [theme] = useTheme();

    const baseClass = theme === THEME_LIGHT ? 'bg-base-100' : 'bg-base-200';

    return <div className={`card w-full shadow-sm ${baseClass}`}>
        <figure>
            <img
                src={product.thumbnail}
                alt={product.description} />
        </figure>
        <div className="card-body text-left">
            <h2 className="card-title">{product.title}</h2>
            <p className="">{product.description}</p>
            <div className="card-actions flex flex-row">
                <div className="w-full text-right">
                    <button onClick={() => dispatch(toggleFavourite(product.id))} className={`btn btn-circle ${favouriteProducts[product.id] && 'btn-primary'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
}