import { createSlice } from "@reduxjs/toolkit";


const expenseInitialState = {
expense:[]
};

const ExpenseSlice = createSlice({
  name: "expense",
  initialState: expenseInitialState,
  reducers: {
    addExpense(state, action) {
         const newExpenses = action.payload;
      state.expense = newExpenses
     
    },
    deleteExpense(state, action) {
      const expenseIdToDelete = action.payload;
      state.expense = state.expense.filter(
        (expense) => expense.id !== expenseIdToDelete
      );
    },
  }
});

export const expenseAction = ExpenseSlice.actions;
export default ExpenseSlice.reducer;
