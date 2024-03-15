import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth'
import expenseReducer from './expense'
import themeReducer from './theme'


const storeConfig = {
  reducer: {expense:expenseReducer,auth:authReducer,theme:themeReducer}
};


const store = configureStore(storeConfig);

export default store;
