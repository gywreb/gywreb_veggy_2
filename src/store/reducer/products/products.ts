import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GetProductListThunk, IProduct } from "../../types";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [] as IProduct[],
    searchedList: null as IProduct[] | null,
    filteredCategory: null as string | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    productsRequestSuccess: (products, action: PayloadAction<IProduct[]>) => {
      products.list = action.payload;
      products.loading = false;
      products.error = null;
    },
    productsRequestFailed: (products, action: PayloadAction<string>) => {
      products.loading = false;
      products.error = action.payload;
    },
    productsRequest: (products) => {
      products.loading = true;
    },
    renderSearchedProducts: (products, action: PayloadAction<string>) => {
      const productRegEx = new RegExp(action.payload, "gi");
      products.searchedList = products.list.filter((product) =>
        product.name.match(productRegEx)
      );
    },
    resetSearchedProducts: (products) => {
      products.searchedList = null;
    },
    getFilteredCategory: (products, action: PayloadAction<string>) => {
      if (!action.payload.length) products.filteredCategory = null;
      products.filteredCategory = action.payload;
    },
  },
});

const {
  productsRequest,
  productsRequestFailed,
  productsRequestSuccess,
} = slice.actions;

export const {
  renderSearchedProducts,
  resetSearchedProducts,
  getFilteredCategory,
} = slice.actions;

export default slice.reducer;

export const getProductList = (): GetProductListThunk => async (dispatch) => {
  dispatch(productsRequest());
  try {
    const { data } = await axios.get(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
    );
    dispatch(productsRequestSuccess(data));
  } catch (error) {
    dispatch(productsRequestFailed(error.message));
  }
};
