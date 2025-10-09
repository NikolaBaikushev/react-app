import { useState } from "react";
import Products from "./Products/Products";

export type SortByValues = 'title' | 'price' | '';
export type OrderByValues = 'asc' | 'desc';
export type ProductsSortState = {
  sortBy: SortByValues,
  orderBy: OrderByValues
}

const ProductsPage = () => {
  // const [sortBy, setSortBy] = useState('');
  // const [orderBy, setOrderBy] = useState('asc');

  const [sortState, setSortState] = useState({
    sortBy: '',
    orderBy: 'asc'
  } as ProductsSortState)

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortState((state) => ({
      ...state,
      sortBy: e.target.value as SortByValues
    }))
  }

  const handleToggleOrderByChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSortState((state) => ({
      ...state,
      orderBy: state.orderBy === 'asc' ? 'desc' : 'asc' as OrderByValues
    }))
  }

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
              value={sortState.sortBy}
              onChange={(e) => handleSortByChange(e)}
            >
              <option value="">Sort by</option>
              <option value="title">Name</option>
              <option value="price">Price</option>
            </select>
            <button
              onClick={(e) => handleToggleOrderByChange(e)}
              disabled={sortState.sortBy === ''}
              style={{
                borderColor: 'color-mix(in oklab, var(--color-base-content) 20%, #0000)'
              }}
              className="btn btn-square border-l-0 bg-base-100 join-item "
              title={`Sort order: ${sortState.orderBy === 'asc' ? 'Ascending' : 'Descending'}`}
            >
              {sortState.orderBy === 'asc' ? <svg
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

      <Products {...sortState} />
    </div>
  );
};

export default ProductsPage;
