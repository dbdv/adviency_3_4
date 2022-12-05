import { configureStore } from "@reduxjs/toolkit";
import giftsSlice from "../features/gifts/giftsSlice";

export default configureStore({
  reducer: {
    gifts: giftsSlice,
  },
});
