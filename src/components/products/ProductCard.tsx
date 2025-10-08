import type { Product } from "../../redux/api/api"
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleFavourite } from "../../redux/slices/products/productsSlice";
import { THEME_DARK, THEME_LIGHT, useTheme } from "../context/ThemeContext";

type ProductCardProps = {
    product: Product
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const favouriteProducts = useAppSelector(state => state.products.favouriteProducts);
    const [theme] = useTheme();

    const rating: number = Math.floor(product.rating);


    const themeClasses = {
        card_container_bg_base_class: theme === THEME_LIGHT ? 'bg-base-100' : 'bg-base-200',
        img_container_bg_base_class: theme === THEME_DARK && 'bg-base-300'
    }

    return <div className={`card w-full shadow-sm ${themeClasses.card_container_bg_base_class}  rounded-2xl`}>
        <figure>
            <img
                className={`object-center rounded-2xl ${themeClasses.img_container_bg_base_class}`}
                src={product.thumbnail}
                alt={product.description} />
        </figure>
        <div className="card-body text-left">
            <h2 className="card-title ">{product.title}</h2>
            <p className="">{product.description}</p>

            <div className="card-actions w-full flex flex-col justify-start">
                <div className="flex flex-row gap-x-2 justify-normal mt-3">
                    {product.tags.map((tag) => (
                        <div key={tag} className="badge badge-accent badge-outline">{tag}</div>
                    ))}
                </div>

                <div className="flex justify-between items-center w-full mt-1">
                    <div className="rating">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="mask mask-star bg-orange-400"
                                aria-label={`${index + 1} star`}
                                aria-current={index + 1 === rating}
                            ></div>
                        ))}
                    </div>

                    <div>
                        <button
                            onClick={() => dispatch(toggleFavourite(product.id))}
                            className={`btn btn-circle ${favouriteProducts[product.id] ? 'btn-primary' : ''}`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="2.5"
                                stroke="currentColor"
                                className="size-[1.2em]"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}