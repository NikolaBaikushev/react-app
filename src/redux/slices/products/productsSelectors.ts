import type { RootState } from "../../store/store";

export const isProductFavourite = (state: RootState, id: number): boolean => {
  return Boolean(state.products.favouriteProducts[id]);
}
