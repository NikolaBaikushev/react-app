import { data, useParams } from "react-router-dom";
import { useGetProductQuery } from "../../redux/api/api";
import { hasErrorData } from "../../guards/hasErrorData";
import { useState } from "react";

type ProductDetailsPageParams = {
    readonly id: string,
}

const ProductDetailsPage = () => {
    const { id } = useParams<ProductDetailsPageParams>();
    const [isOpen, setIsOpen] = useState(false);

    const { data: product, error, isLoading } = useGetProductQuery(Number(id!));

    // const productCard = <>

    //     <div className="card lg:card-side bg-base-100 shadow-sm">
    //         <figure className="hover-gallery max-w-60">
    //             {product?.images.map(image =><img key={image} src={image}></img>)}
    //         </figure>
    //         <div className="card-body">
    //             <h2 className="card-title">New album is released!</h2>
    //             <p>Click the button to listen on Spotiwhy app.</p>
    //             <div className="card-actions justify-end">
    //                 <button className="btn btn-primary">Listen</button>
    //             </div>
    //         </div>
    //     </div>

    // </>

    const rating = product && Math.floor(product.rating);

    const productCard = <>
        <div className="card bg-base-100 shadow-sm  px-4">
            <div className="grid lg:grid-cols-3 items-start">

                {/* Images */}
                <figure className="col-span-1 max-w-full hover-gallery">
                    {product?.images.map(image => <img key={image} src={image}></img>)}
                </figure>

                {/* Main Details */}
                <div className="space-y-5 col-span-2 pt-8 text-left">
                    <div className="space-y-3 text-left w-full">
                        <h2 className="text-4xl font-bold">{product?.title}</h2>
                        <p className="text-sm text-gray-500">{product?.brand} | SKU: {product?.sku}</p>
                    </div>

                    <div className="text-xl font-semibold text-primary">${product?.price}</div>

                    {rating && <>
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

                    </>}

                    <p className="text-md">{product?.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {product?.tags.map(tag => (
                            <span key={tag} className="badge badge-outline badge-accent">{tag}</span>
                        ))}
                    </div>

                    <div tabIndex={0}

                        className={`collapse collapse-arrow border border-base-200 bg-base-100 rounded-box  ${isOpen ? "collapse-open" : "collapse-close"
                            } px-2`}>
                        <input type="checkbox" checked={isOpen} onChange={() => setIsOpen((state) => !state)} />
                        <div className="collapse-title text-lg font-medium">
                            More Information
                        </div>
                        <div className="collapse-content">
                            <ul className="grid grid-cols-2 text-sm space-y-1 list-none">
                                <li><strong>Category:</strong> {product?.category}</li>
                                <li><strong>Stock:</strong> {product?.stock} ({product?.availabilityStatus})</li>
                                <li><strong>Weight:</strong> {product?.weight}g</li>
                                <li><strong>Dimensions:</strong> {product?.dimensions?.width} × {product?.dimensions?.height} × {product?.dimensions?.depth} cm</li>
                                <li><strong>Warranty:</strong> {product?.warrantyInformation}</li>
                                <li><strong>Shipping:</strong> {product?.shippingInformation}</li>
                                <li><strong>Return Policy:</strong> {product?.returnPolicy}</li>
                                <li><strong>Min Order Qty:</strong> {product?.minimumOrderQuantity}</li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* Reviews Section */}
            {/* <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                {product?.reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="space-y-4">
                        {product?.reviews.map((review, idx) => (
                            <div key={idx} className="border p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <h4 className="font-semibold">{review.reviewerName}</h4>
                                    <div className="rating rating-sm">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <input
                                                key={i}
                                                type="radio"
                                                className="mask mask-star-2 bg-yellow-400"
                                                readOnly
                                                checked={i + 1 === review.rating}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                                <p className="mt-1">{review.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div> */}
        </div>

    </>

    const x = 5
    return <div>
        {error ? <div><h1>Error: {hasErrorData(error) && `${error.data.message}`} </h1></div> : productCard}
    </div>
}



export default ProductDetailsPage;