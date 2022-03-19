import classes from "../ShipCardWrapper/ShipCardWrapper.module.css"
import {compose} from "redux"
import {connect} from "react-redux"
import {useNavigate, useLocation} from "react-router-dom"
import classNames from "classnames"
import {useEffect} from "react"
import iconArrow from "../../img/icon.png"
import {setShipInfo, setShipInfoAC} from "../../redux/shipPageReducer"
import {getLoadingStatus, getShipInfo} from "../../redux/selectors/shipPageSelector"
import Preloader from "../../common/Preloader/Preloader"

const ShipCardWrapper = (props) => {
    //Подключение библиотеки для роутинга страниц
    let navigate = useNavigate()
    //Приём данных о текущей страницы при переходе на неё
    const {state} = useLocation()
    //Получение id корабля для запроса данных о нём
    const shipId = state.shipId
    let missions = ''

    if(props.shipInfo.missions) {
        //Создание строки со всеми миссиями, где принимал участие данный корабль
        missions = props.shipInfo.missions.map((mission) => mission.name).join(', ')
    }

    //Запрос к данным корабля по id
    useEffect(() => {
        props.setShipInfo(shipId)
    }, [])

    //Прелодер при ожидании ответа API
    if(props.isLoading) {
        return (
            <div className={classes.loadingContainer}>
                <h1>Загрузка</h1>
                <Preloader/>
            </div>
        )
    }

    return (
        <div className={classes.shipCardContainer}>
            <div className={classes.shipCardBack} onClick={() => navigate(`/`)}>
                <img className={classes.arrowIcon}
                     src={iconArrow}
                     alt="arrowLeft"
                />
                <span>Вернуться</span>
            </div>

            <div className={classes.shipName}>
                <h1>{props.shipInfo.name}</h1>
            </div>

            <div className={classes.shipProps}>
                <div className={classNames(classes.shipProp, classes.shipType)}>
                    <span className={classes.propName}>Тип</span>
                    <span className={classes.propType}>{props.shipInfo.type}</span>
                </div>
                <div className={classNames(classes.shipProp, classes.shipPort)}>
                    <span className={classes.propName}>Порт</span>
                    <span className={classes.propType}>{props.shipInfo.home_port}</span>
                </div>
                <div className={classNames(classes.shipProp, classes.shipWeight)}>
                    <span className={classes.propName}>Вес</span>
                    <span className={classes.propType}>{props.shipInfo.weight_kg ? `${props.shipInfo.weight_kg} кг` : 'Масса неизвестна'}</span>
                </div>
                <div className={classNames(classes.shipProp, classes.shipYear)}>
                    <span className={classes.propName}>Год</span>
                    <span className={classes.propType}>{props.shipInfo.year_built ? `${props.shipInfo.year_built}` : 'Год неизвестен'}</span>
                </div>
            </div>

            <div className={classes.spaceMissions}>
                <h2>Миссии</h2>
                <div className={classes.missions}>{missions}</div>
            </div>

        </div>
    );
};

let mapStateToProps = (state) => {
    return ({
        shipInfo: getShipInfo(state),
        isLoading: getLoadingStatus(state),
    })
}

let actionsCreator = {
    setShipInfo,
    setShipInfoAC,
}

export default compose(
    connect(mapStateToProps, actionsCreator)
)(ShipCardWrapper);