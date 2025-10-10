import { useState } from "react";
import { useDebounce } from "./useDebounce";

export type SortByValues = 'title' | 'price' | '';
export type OrderByValues = 'asc' | 'desc';
export type ProductsSortState = {
    sortBy: SortByValues,
    orderBy: OrderByValues
}

const useProductsPageFilters = () => {
    const [sortState, setSortState] = useState({
        sortBy: '',
        orderBy: 'asc'
    } as ProductsSortState)

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search);

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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    return { sortState, search, debouncedSearch, handleSortByChange, handleToggleOrderByChange, handleSearchChange }

}

export default useProductsPageFilters