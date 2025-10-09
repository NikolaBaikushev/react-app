import { useState } from "react";
import type { ProductReview, Product } from "../../../redux/api/api";

export const ProductDetailsCardImages = ({ images }: { images: string[] }) => {
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

export const ProductDetailsReviews = ({ reviews }: { reviews: ProductReview[] }) => {
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

export const ProductDetailsMoreInformation = ({
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