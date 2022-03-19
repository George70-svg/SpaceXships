import classes from './Ship.module.css'
import {useNavigate} from "react-router-dom";
import iconArrow from '../../../../img/icon.png'

const Ship = (props) => {
    let navigate = useNavigate()

    return (
        <div className={classes.shipContainer}>
            <div className={classes.shipHeader}>
                <span className={classes.shipName}
                      onClick={() => navigate('/shipCard', {state: {shipId: props.id}})}
                >{props.shipName}</span>
                <img className={classes.arrowIcon}
                     src={iconArrow}
                     alt="arrowRight"
                     onClick={() => navigate('/shipCard', {state: {shipId: props.id}})}
                />
            </div>
            <div className={classes.shipProps}>
                <div className={classes.shipType}>
                    <span className={classes.propName}>Тип</span>
                    <span className={classes.propType}>{props.shipType}</span>
                </div>
                <div className={classes.shipName}>
                    <span className={classes.propName}>Порт</span>
                    <span className={classes.propType}>{props.shipHomePort}</span>
                </div>
            </div>
        </div>
    );
};

export default Ship;