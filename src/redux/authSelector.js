export const selectUser = state => state.auth.user

export const selectToken = state => state.auth.token

export const selectIsLoggedIn = state => state.auth.isLoggedIn

export const selectIsRefreshing = state => state.auth.isRefreshing

export const selectTransactions = state => state.auth.transactions

export const selectCategories = state => state.auth.categories

export const selectError = state => state.auth.error

export const selectIsLoading = state => state.auth.isLoading

export const selectRefreshToken = state => state.auth.refreshToken

export const selectIsLoadingTransactions = state => state.auth.isLoadingTransactions

export const selectIsLoadingCategories = state => state.auth.isLoadingCategories

export const selectIsLoadingError = state => state.auth.isLoadingError

export const selectIsLoadingRefreshToken = state => state.auth.isLoadingRefreshToken

export const selectIsLoadingCategoriesError = state => state.auth.isLoadingCategoriesError

export const selectIsLoadingTransactionsError = state => state.auth.isLoadingTransactionsError
