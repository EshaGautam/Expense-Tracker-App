import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import expenseReducer from './expense'


const storeConfig = {
  reducer: {expense:expenseReducer,auth:authReducer}
};


const store = configureStore(storeConfig);

export default store;
