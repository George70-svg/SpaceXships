import {shipsAPI} from "../API/api";

const ADD_SHIPS = 'spaceShipsReducer/ADD_SHIPS'
const SET_PAGE = 'spaceShipsReducer/SET_PAGE'
const SET_LOADING_STATUS = 'spaceShipsReducer/SET_LOADING_STATUS'

let initionalState = {
    ships: [],
    currentPage: 1,
    pageSize: 5,
    isLoading: true,
}

const spaceShipsReducer = (state = initionalState, action) => {
    switch (action.type) {
        case ADD_SHIPS: {
            return {
                ...state,
                ...action.ships
            }
        }

        case SET_PAGE: {
            return {
                ...state,
                currentPage: action.page
            }
        }

        case SET_LOADING_STATUS: {
            return {
                ...state,
                isLoading: action.loadingStatus
            }
        }

        default:
            return state;
    }
}

//AC - action creator
//Установка массива кораблей в стейт
export const addShipsAC = (ships) => ({type: ADD_SHIPS, ships});
//Установка текущей страницы (для пагинации)
export const setPageAC = (page) => ({type: SET_PAGE, page});
//Установка статуса загрузки данных получение списка космических кораблей
export const setLoadingStatusAC = (loadingStatus) => ({type: SET_LOADING_STATUS, loadingStatus});

//Thunk creator для создания состояния страницы списка космических кораблей (ShipsWrapper)
export const addShips = () => async (dispatch) => {
    dispatch(setLoadingStatusAC(true))
    let response = await shipsAPI.getShips()
    dispatch(addShipsAC(response))
    dispatch(setLoadingStatusAC(false))
}

export default spaceShipsReducer