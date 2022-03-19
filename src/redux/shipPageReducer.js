import {shipsAPI} from '../API/api'

const SET_SHIP_CARD_INFO = 'shipPageReducer/SET_SHIP_CARD_INFO'
const SET_LOADING_STATUS = 'shipPageReducer/SET_LOADING_STATUS'

let initionalState = {
    shipInfo: {},
    isLoading: true,
}

const shipPageReducer = (state = initionalState, action) => {
    switch (action.type) {
        case SET_SHIP_CARD_INFO: {
            return {
                ...state,
                shipInfo: action.shipInfo
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
//Установка свойств (информация о кораблей) для карточки корабля
export const setShipInfoAC = (shipInfo) => ({type: SET_SHIP_CARD_INFO, shipInfo})
//Установка статуса загрузки данных для карточки корабля
export const setLoadingStatusAC = (loadingStatus) => ({type: SET_LOADING_STATUS, loadingStatus})

//Thunk creator для создания состояния карточки корабля (ShipCardWrapper)
export const setShipInfo = (shipId) => async (dispatch) => {
    dispatch(setLoadingStatusAC(true))
    let response = await shipsAPI.getCurrentShip(shipId)
    dispatch(setShipInfoAC(response))
    dispatch(setLoadingStatusAC(false))
}

export default shipPageReducer