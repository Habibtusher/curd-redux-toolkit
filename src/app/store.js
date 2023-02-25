import { configureStore } from "@reduxjs/toolkit";
import TransactionReducer from "../Features/transaction/TransactionSlice";
export const store = configureStore({
    reducer: {
      transaction:  TransactionReducer
    },
});
