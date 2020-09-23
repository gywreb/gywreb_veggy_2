import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/reducer";

export default configureStore({
  reducer,
});
