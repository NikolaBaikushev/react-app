import { useState } from "react";
import { useParams } from "react-router-dom";
import { hasErrorData } from "../../guards/hasErrorData";
import { useGetProductQuery, type Product, type ProductReview } from "../../redux/api/api";
import { useTheme, THEME_DARK } from "../context/ThemeContext";

type ProductDetailsPageParams = {
    readonly id: string,
}


const ProductDetailsCardImages = ({ images }: { images: string[] }) => {
    if (images.length > 1) {
        return <figure className="col-span-1 max-w-full hover-gallery">
            {images.map(image => <img key={image} src={image}></img>)}
        </figure>
    } else if (images.length === 1) {
        return <figure className="col-span-1 max-w-full">
            <img src={images[0]}></img>
        </figure>
    }
}

export const ProductRating = ({ rating, color, className }: { rating: number, color?: string, className?: string }) => {
    rating = Math.floor(rating);

    return <div className={`rating ${className}`}>
        {Array.from({ length: 5 }).map((_, index) => (
            <div
                key={index}
                className={`mask mask-star ${color ? color : 'bg-orange-400'}`}
                aria-label={`${index + 1} star`}
                aria-current={index + 1 === rating}
            ></div>
        ))}
    </div>
}

const ProductDetailsReviews = ({ reviews }: { reviews: ProductReview[] }) => {
    return <>
        {reviews.map((review, idx) => (
            <div key={idx} className="">
                <div className="flex justify-between items-center">
                    <h4 className="text-accent font-semibold">{review.reviewerName}</h4>
                    <ProductRating rating={review.rating} className="rating-sm" color="bg-yellow-400"></ProductRating>
                </div>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                <p className="mt-1">{review.comment}</p>
            </div>
        ))}
    </>
}

const ProductDetailsMoreInformation = ({
    category, 
    stock,
    availabilityStatus,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    minimumOrderQuantity
}: Product) => {
    const [isOpen, setIsOpen] = useState(false);

    return <div tabIndex={0}
        className={`collapse collapse-arrow border border-accent-content cursor-pointer rounded-box  ${isOpen ? "collapse-open" : "collapse-close"
            } px-1`}>
        <input type="checkbox" checked={isOpen} onChange={() => setIsOpen((state) => !state)} />
        <div className="collapse-title text-lg font-medium ">
            More Information
        </div>
        <div className="collapse-content">
            <ul className="grid grid-cols-2 text-sm space-y-1 list-none">
                <li><strong>Category:</strong> {category}</li>
                <li><strong>Stock:</strong> {stock} ({availabilityStatus})</li>
                <li><strong>Weight:</strong> {weight}g</li>
                <li><strong>Dimensions:</strong> {dimensions.width} × {dimensions.height} × {dimensions.depth} cm</li>
                <li><strong>Warranty:</strong> {warrantyInformation}</li>
                <li><strong>Shipping:</strong> {shippingInformation}</li>
                <li><strong>Return Policy:</strong> {returnPolicy}</li>
                <li><strong>Min Order Qty:</strong> {minimumOrderQuantity}</li>
            </ul>
        </div>
    </div>
}

export const ProductDetailsCard = ({ product }: { product: Product }) => {
    const [theme] = useTheme();

    return (<>
        <div className={`card ${theme === THEME_DARK ? 'bg-base-200' : 'bg-base-100'} shadow-sm  px-4`}>
            <div className="grid lg:grid-cols-3 items-start">

                {/* Images */}
                <ProductDetailsCardImages images={product.images} />

                {/* Main Details */}
                <div className="space-y-5 col-span-2 pt-8 text-left">
                    {/* Title */}
                    <div className="space-y-3 text-left w-full">
                        <h2 className="text-4xl font-bold">{product.title}</h2>
                        <p className="text-sm text-gray-500">{product.brand} | SKU: {product.sku}</p>
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
