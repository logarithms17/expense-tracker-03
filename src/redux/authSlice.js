import { createSlice } from "@reduxjs/toolkit";

import { register, logIn, logOut, refreshUser, updateAvatar, updateUser, removeAvatar, createCategory, deleteCategory, updateCategory, createTransaction, getTransactions, updateTransaction, deleteTransaction } from "./authOperations";

const initialState = {
    transactions: { data: [], status: 'idle', error: null },
    user: {
        name: null,
        email: null,
        transactionsTotal: {
            incomes: 0,
            expenses: 0
        },
        avatarUrl: null,
    },
    
    token: localStorage.getItem("authToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    isLoggedIn: false,
    isRefreshing: false,
    categories: {
        incomes: [],
        expenses: [],
    },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
                state.isLoggedIn = true;
                localStorage.setItem("authToken", action.payload.accessToken);
            })
            .addCase(logOut.fulfilled, (state) => {
                state.user = { name: null, email: null };
                state.token = null;
                state.refreshToken = null;
                state.isLoggedIn = false;
                localStorage.removeItem("authToken");
            })

            .addCase(refreshUser.pending, (state) => {
                state.isRefreshing = true;
            })
            .addCase(refreshUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoggedIn = true;
                state.isRefreshing = false;
            })
            .addCase(refreshUser.rejected, (state) => {
                state.isRefreshing = false;
            })
            .addCase(updateAvatar.fulfilled, (state, action) => {
                state.user.avatarUrl = action.payload.avatarUrl; // Store the avatar URL as a string
            })
            .addCase(updateAvatar.rejected, (state, action) => {
                console.log(action);
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                const {currency, name} = action.payload
                state.user.name = name;
                state.user.currency = currency;
            })
            .addCase(updateUser.rejected, (state, action) => {
                console.log(action);
            })
            .addCase(removeAvatar.fulfilled, (state, action) => {
                state.user.avatarUrl = action.payload;
            })
            .addCase(removeAvatar.rejected, (state, action) => {
                console.log(action);
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                const { type } = action.payload
                if (type === "expenses") {
                    state.user.categories.expenses.push(action.payload);
                }

                if (type === "incomes") {
                    state.user.categories.incomes.push(action.payload);
                }

            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                const id = action.payload;

                // Ensure categories object exists and is properly formatted
                if (state.user.categories) {
                    if (Array.isArray(state.user.categories.expenses)) {
                        state.user.categories.expenses = state.user.categories.expenses.filter(
                            (category) => category._id !== id
                        );
                    } else {
                        console.error("Expenses is not an array or is undefined.");
                    }

                    if (Array.isArray(state.user.categories.incomes)) {
                        state.user.categories.incomes = state.user.categories.incomes.filter(
                            (category) => category._id !== id
                        );
                    } else {
                        console.error("Incomes is not an array or is undefined.");
                    }
                } else {
                    console.error("Categories object is undefined.");
                }
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                // Log the error action for debugging

                // Optionally, store the error in the state for error handling in the UI
                state.error = action.payload || "Category deletion failed";
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                const updatedCategory = action.payload;

                if (updatedCategory) {
                    if (Array.isArray(state.user.categories.expenses)) {
                        state.user.categories.expenses = state.user.categories.expenses.map((category) => {
                            if (category._id === updatedCategory._id) {
                                return updatedCategory;
                            }
                            return category;
                        });
                    } else {
                        console.error("Expenses is not an array or is undefined.");
                    }

                    if (Array.isArray(state.user.categories.incomes)) {
                        state.user.categories.incomes = state.user.categories.incomes.map((category) => {
                            if (category._id === updatedCategory._id) {
                                return updatedCategory;
                            }
                            return category;
                        });
                    } else {
                        console.error("Incomes is not an array or is undefined.");
                    }
                }

                console.log("Category update failed:", action.error);
            })
            .addCase(updateCategory.rejected, (state, action) => {
                console.log("Category update failed:", action.error);
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
    
                // Add the new transaction to the transactions.data array
                state.transactions.data.push(action.payload);
            })
            .addCase(getTransactions.fulfilled, (state, action) => {

            // Replace the current transactions with the fetched ones
                state.transactions.data = action.payload;
                state.transactions.status = 'succeeded';
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.transactions.status = 'failed';
                state.transactions.error = action.error.message;
            })
            .addCase(updateTransaction.fulfilled, (state, action) => {

                if (action.payload && action.payload._id) {
                    const updatedTransaction = action.payload;
                    const index = state.transactions.data.findIndex(
                        (transaction) => transaction._id === updatedTransaction._id
                    );

                    if (index !== -1) {
                        state.transactions.data[index] = updatedTransaction;
                    } else {
                        console.log("Transaction does not exist, adding it");
                        state.transactions.data.push(updatedTransaction);
                    }
                }
            })
            .addCase(updateTransaction.rejected, (state, action) => {

                console.log("Transaction update failed:", action.error);
            })
            .addCase(deleteTransaction.fulfilled, (state, action) => {

                if (!state.user.transactions) {
                    state.user.transactions = []; // Initialize transactions if undefined
                }

                state.transactions.data = state.transactions.data.filter(
                    (transaction) => transaction._id !== action.payload
                );
            })
            },
        });

const authReducer = authSlice.reducer;

export default authReducer;