import { Pencil } from "lucide-react";
import { type Product } from "../../../redux/api/api";
import { ProductDetailsCardImages, ProductDetailsMoreInformation, ProductDetailsReviews, ProductRating } from "./ProductDetailsCardComponents";
import { useTheme } from "../../context/ThemeContext";
import { useRef } from "react";
import type { UpdateProductModalHandle } from "../UpdateProductModal/UpdateProductModal";
import UpdateProductModal from "../UpdateProductModal/UpdateProductModal";


export const ProductDetailsCard = ({ product }: { product: Product }) => {
    const { isCurrentThemeLight } = useTheme();
    const modalRef = useRef<UpdateProductModalHandle>(null)


    return (<>
        <UpdateProductModal product={product} ref={modalRef} />


        <div className={`card ${isCurrentThemeLight ? 'bg-base-100' : 'bg-base-200'} shadow-sm  px-4`}>
            <div className="grid lg:grid-cols-3 items-start">

                {/* Images */}
                <ProductDetailsCardImages images={product.images} />

                {/* Main Details */}
                <div className="space-y-5 col-span-2 pt-8 text-left">
                    {/* Title */}
                    <div className="space-y-3 flex flex-row justify-between  text-left w-full">

                        <div>
                            <h2 className="text-4xl font-bold">{product.title}</h2>
                            <p className="text-sm text-gray-500">{product.brand} | SKU: {product.sku}</p>
                        </div>
                        <button onClick={modalRef.current?.openModal} className={`btn btn-lg border ${isCurrentThemeLight ? 'border-primary hover:bg-base-200' : 'border-secondary hover:bg-base-300'} bg-base-100  text-right btn-circle`}>
                            <Pencil size={22} />
                        </button>
                    </div>

                    {/* Price */}
                    <div className="text-xl font-semibold text-primary">${product.price}</div>

                    {/* Rating */}
                    <ProductRating rating={product.rating} />

                    {/* Description */}
                    <p className="text-md">{product.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {product.tags.map(tag => (
                            <span key={tag} className="badge badge-outline badge-accent">{tag}</span>
                        ))}
                    </div>

                    {/* More Information */}
                    <ProductDetailsMoreInformation {...product}></ProductDetailsMoreInformation>

                </div>
            </div>

            {/* Reviews Section */}
            <div className="text-left mt-5">
                <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                {product.reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        <ProductDetailsReviews reviews={product.reviews}></ProductDetailsReviews>
                    </div>
                )}
            </div>
        </div>
    </>)


}

export default ProductDetailsCard;
