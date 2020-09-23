import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProduct, IProductInCart } from "../../types";

const slice = createSlice({
  name: "cart",
  initialState: {
    list: [] as IProductInCart[],
  },
  reducers: {
    addToCart: (
      cart,
      { payload }: PayloadAction<{ product: IProduct; quantity: number }>
    ) => {
      const { product, quantity } = payload;
      const isInCartItem = cart.list.find((item) => item.id === product.id);
      if (isInCartItem) isInCartItem.quantity += quantity;
      else cart.list.push({ ...product, quantity });
    },
    deleteFromCart: (cart, action: PayloadAction<number>) => {
      const index = cart.list.findIndex(
        (product) => product.id === action.payload
      );
      if (index !== -1) cart.list.splice(index, 1);
    },
    quantityIncrease: (cart, action: PayloadAction<number>) => {
      const product = cart.list.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity < 99) product.quantity += 1;
    },

    quantityDecrease: (cart, action: PayloadAction<number>) => {
      const product = cart.list.find(
        (product) => product.id === action.payload
      );
      if (product && product.quantity > 1) product.quantity -= 1;
    },
  },
});

export const {
  addToCart,
  quantityIncrease,
  quantityDecrease,
  deleteFromCart,
} = slice.actions;

export default slice.reducer;
