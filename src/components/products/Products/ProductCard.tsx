import { useNavigate } from "react-router-dom";
import type { Product } from "../../../redux/api/api"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { toggleFavourite } from "../../../redux/slices/products/productsSlice";
import { ProductRating } from "../ProductDetails/ProductDetailsCardComponents";
import { useTheme } from "../../context/ThemeContext";
import { Heart, Trash, Trash2, Trash2Icon } from "lucide-react";

type ProductCardProps = {
    product: Product
};

export const ProductCard = ({ product }: ProductCardProps) => {
    const dispatch = useAppDispatch();
    const favouriteProducts = useAppSelector(state => state.products.favouriteProducts);
    const { isCurrentThemeLight } = useTheme();
    const navigate = useNavigate();

    const themeClasses = {
        card_container_bg_base_class: isCurrentThemeLight ? 'bg-base-100' : 'bg-base-200',
        card_container_clickable_bg_base_class: isCurrentThemeLight ? 'hover:bg-base-200' : 'hover:bg-neutral',
        img_container_bg_base_class: !isCurrentThemeLight && 'bg-base-300'
    }

    const toggleFavouriteProduct = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        dispatch(toggleFavourite(product.id))
    }

    return <div onClick={() => navigate(`/products/${product.id}`)} className={`card cursor-pointer shadow-sm ${themeClasses.card_container_bg_base_class} ${themeClasses.card_container_clickable_bg_base_class}`}>

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


                <p className="text-lg font-semibold mt-2">${product.price}</p>

                <div className="flex justify-between items-center w-full">
                    <ProductRating rating={product.rating} />

                    <div className="inline-flex space-x-2">
                        <button
                            onClick={toggleFavouriteProduct}
                            className={`btn btn-circle btn-accent btn-outline hover:text-white ${favouriteProducts[product.id] && 'btn-active text-white'}`}
                        >
                            <Heart  size={18}/>
                        </button>
                        <button className="btn btn-circle btn-error text-right btn-outline">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    </div>
}