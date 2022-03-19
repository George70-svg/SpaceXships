import {applyMiddleware, combineReducers, createStore} from "redux"
import thunkMiddleware from "redux-thunk"
import spaceShipsReducer from "./spaceShipsReducer"
import shipPageReducer from "./shipPageReducer"
import filterPageReducer from "./filterReducer"

const reducers = combineReducers({
    shipsPage: spaceShipsReducer,
    shipCardPage: shipPageReducer,
    filterPage: filterPageReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware))

//Добавление объекта store в window (для просмотра в момент разработки)
window.__store__ = store

export default store