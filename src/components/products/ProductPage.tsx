import { useState } from "react";
import Products from "./Products/Products";

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <input
          type="text"
          placeholder="Search products..."
          className="input input-bordered w-full sm:max-w-xs"
        />

        <button className="btn btn-primary">
          Create Product
        </button>


        <div className="w-full sm:max-w-xs">
          <div className="join w-full">
            <select className="join-item select border-r-0 select-bordered w-full"  // full width inside join
              value={sortBy}
              onChange={(e) => setSortBy(e.currentTarget.value)}
            >
              <option value="">Sort by</option>
              <option value="title">Name</option>
              <option value="price">Price</option>
            </select>
            <button
              onClick={toggleSortOrder}
              disabled={!sortBy}
              style={{
                borderColor: 'color-mix(in oklab, var(--color-base-content) 20%, #0000)'
              }}
              className="btn btn-square border-l-0 bg-base-100 join-item "
              title={`Sort order: ${sortOrder === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortOrder === 'asc' ? <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 swap-on"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg> : <> <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 swap-off"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg></>}

            </button>
          </div>
        </div>


      </div>

      <Products sortBy={sortBy} />
    </div>
  );
};

export default ProductsPage;
