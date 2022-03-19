export const getShipsData = (state) => {
    return state.shipsPage.ships
}

export const getCurrentPage = (state) => {
    return state.shipsPage.currentPage
}

export const getPageSize = (state) => {
    return state.shipsPage.pageSize
}

export const getLoadingStatus = (state) => {
    return state.shipsPage.isLoading
}