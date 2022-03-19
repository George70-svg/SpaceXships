import preloaderImg from '../../img/loading.gif'
import classes from './loadingWrapper.module.css'

const Preloader = () => {
    return (
        <div className={classes.loadingImg}>
            <img src={preloaderImg} alt="loading..."/>
        </div>
    );
};

export default Preloader;