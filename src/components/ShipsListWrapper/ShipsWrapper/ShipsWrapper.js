import React, {useEffect} from "react";
import classes from './ShipsWrapper.module.css'
import {compose} from "redux";
import {connect} from "react-redux";
import {addShips, setPageAC} from "../../../redux/spaceShipsReducer";
import {setFilterPropsAC} from "../../../redux/filterReducer";
import {getCurrentPage, getLoadingStatus, getPageSize, getShipsData} from "../../../redux/selectors/spaceShipsSelector";
import {getCheckedPortName, getFilteredShips, getShipName, getShipType} from "../../../redux/selectors/filterPageSelector";
import Ship from "./Ship/Ship";
import FilterWrapper from "../FilterWrapper/FilterWrapper";
import Paginator from "../../../common/Paginator/Paginator";
import Preloader from "../../../common/Preloader/Preloader";

const ShipsWrapper = (props) => {

    //Первонаальное обращение для загрузки всего массива космических кораблей
    useEffect(() => {
        props.addShips()
    }, [])

    //Получение отфильтрованного массива космических кораблей
    let filteredShipsList = getFilteredShips(props.ships, props.filterShipName, props.filterShipType, props.filterCheckedPortName)

    //Установка текущей страницы (для пагинации)
    let currentPage = props.currentPage
    //Установка стандартного размера страницы из стейта
    let pageSize = props.pageSize
    //выисление левого края порции элементов (для пагинации)
    let leftBorderOfElements = ((currentPage - 1) * pageSize)
    //вычисление правого края порции элементов (для пагинации)
    let rightBorderOfElements = (currentPage * pageSize)
    //получение количества всех элементов в массиве фильтрованных/нефильтрованых
    //космических кораблей (для расчёта количества доступных страниц пагинации)
    let allFilteredShips = filteredShipsList.length

    //Обработка полного/отфильрованного массива космических кораблей
    //Фильтрация массива (вычисление пагинации) происходит на основании текущей страницы и количества элементов на странице
    //Далее по методу map создаются удовлетворяющие компоненты
    let ships = filteredShipsList.filter((item, index) => index >= leftBorderOfElements && index < rightBorderOfElements)
        .map((ship) => <Ship
        key={ship.id}
        id={ship.id}
        shipName={ship.name}
        shipType={ship.type}
        shipHomePort={ship.home_port}
    />)

    //Прелодер при ожидании ответа API
    if(props.isLoading) {
        return (
            <div className={classes.loadingPage}>
                <h1>SpaceX Ships</h1>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className={classes.shipsContainer}>
            <div className={classes.shipsWrapper}>
                <h1>SpaceX Ships</h1>
                <div className={classes.ships}>{ships}</div>
                <Paginator currentPage={props.currentPage}
                           allShips={allFilteredShips}
                           pageSize={props.pageSize}
                           setPage={props.setPageAC}
                />
            </div>

            <FilterWrapper setFilterProps={props.setFilterPropsAC}
                           shipName={props.filterShipName}
                           checkedPortName={props.filterCheckedPortName}
                           shipType={props.filterShipType}
            />
        </div>
    )
}

let mapStateToProps = (state) => {
    return ({
        ships: getShipsData(state),
        currentPage: getCurrentPage(state),
        pageSize: getPageSize(state),
        isLoading: getLoadingStatus(state),
        filterShipName: getShipName(state),
        filterCheckedPortName: getCheckedPortName(state),
        filterShipType: getShipType(state),
    })
}

let actionsCreator = {
    addShips,
    setPageAC,
    setFilterPropsAC,
}

export default compose(
    connect(mapStateToProps, actionsCreator),
)(ShipsWrapper)