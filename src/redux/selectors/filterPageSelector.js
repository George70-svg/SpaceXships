export const getShipName = (state) => {
    return state.filterPage.shipName
}

export const getCheckedPortName = (state) => {
    return state.filterPage.checkedPortName
}

export const getShipType = (state) => {
    return state.filterPage.shipType
}

export const getFilteredShips = (ships, filterShipName, filterShipType, filterCheckedPortName) => {
    //Получение отфильтрованного массива космических кораблей
    //Фильтрация выполнена последовательно, если одно из значений фильтра не задано
    //неотфильтрованный по данному свойству массив возвращается в исходном виде и
    //фильтрация происходит по другим существующим свойствам
    //ES7 (ie11 не поддерживает includes())

    //Фильтрация по названию корабля (регистронезависима)
    let filteredShips = ships.filter(item => item.name.toLowerCase().includes(filterShipName ? filterShipName.toLowerCase() : ''));
    //Фильтрация по типу корабля
    filteredShips = filteredShips.filter(item => filterShipType && filterShipType !== 'All' ? item.type === filterShipType : item)
    //Фильтрация по порту базирования корабля
    filteredShips = filteredShips.filter(item => filterCheckedPortName.length > 0 ? filterCheckedPortName.includes(item.home_port) : item)

    return filteredShips
}