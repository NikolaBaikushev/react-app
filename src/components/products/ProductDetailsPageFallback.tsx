const ProductDetailsPageFallback = () => {

    return <div className="bg-white rounded-lg shadow-md animate-pulse">

        <div className="flex gap-8 p-6 ">
            <div className="w-64 h-100 bg-base-200 rounded-md"></div>

            <div className="flex-1 h-120 space-y-5">
                <div className="space-y-3">
                    <div className="h-8 bg-base-200 rounded w-full"></div>
                    <div className="h-6 bg-base-200 rounded w-1/3"></div>
                </div>
                <div className="h-7 bg-base-200 rounded w-24 mt-6"></div>
                <div className="h-7 bg-base-200 rounded w-36 mt-6"></div>

                <div className="h-5 bg-base-200 rounded w-full"></div>
                <div className="h-5 bg-base-200 rounded w-4/5"></div>
                <div className="h-5 bg-base-200 rounded w-3/5"></div>

                <div className="flex items-center space-x-2">
                    <div className="h-7 w-24 bg-base-200 rounded"></div>
                    <div className="h-7 w-24 bg-base-200 rounded"></div>
                </div>

                <div className="mt-6 h-10 bg-base-200 w-full rounded-full"></div>
            </div>

        </div>


    </div>
}
export default ProductDetailsPageFallback;