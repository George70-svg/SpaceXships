const SET_FILTER_PROPS = 'filterReducer/SET_FILTER_PROPS'

let initionalState = {
    shipName: null,
    checkedPortName: [],
    shipType: 'All',
}

const filterPageReducer = (state = initionalState, action) => {
    switch (action.type) {
        case SET_FILTER_PROPS: {
            return {
                ...state,
                shipName: action.shipName,
                shipType: action.shipType,
                checkedPortName: action.checkedPortName,
            }
        }

        default:
            return state;
    }
}

//AC - action creator
//Добавление выбранных фильтров в стейт
export const setFilterPropsAC = (checkedPortName, shipName, shipType) => (
    {type: SET_FILTER_PROPS, checkedPortName, shipName, shipType}
);

export default filterPageReducer