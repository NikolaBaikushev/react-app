import { useState } from "react";
import Products from "./Products/Products";

const ProductsPage = () => {
  const [sortBy, setSortBy] = useState('');


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

        <select className="select select-bordered w-full sm:max-w-xs"
          value={sortBy}
          onChange={(e) => setSortBy(e.currentTarget.value)}
        >
          <option value="''" defaultChecked>Sort by</option>
          <option value="title" selected={sortBy === 'title'}>Name</option>
          <option value="price" selected={sortBy === 'price'}>Price</option>
        </select>
      </div>

      <Products sortBy={sortBy}/>
    </div>
  );
};

export default ProductsPage;
