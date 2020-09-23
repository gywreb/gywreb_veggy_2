import { ThunkAction } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface IProductInCart extends IProduct {
  quantity: number;
}

export type RootState = ReturnType<typeof reducer>;

export interface IGetProductListAction {
  type: string;
  payload?: IProduct[] | string;
}

export type GetProductListThunk = ThunkAction<
  void,
  RootState,
  null,
  IGetProductListAction
>;
