import classNames from "classnames";
import classes from "./Paginator.module.css";

const Paginator = (props) => {
    let currentPage = props.currentPage
    //Вычисление целого значения номера последний страницы пагинации как частное
    //от всех объектов и их возможного количества на странице
    let lastPage = Math.ceil(props.allShips / props.pageSize)

    const setNextPage = () => {
        if(props.currentPage >= lastPage) {
            return
        }
        props.setPage(props.currentPage + 1)
    }

    const setPrevPage = () => {
        if(props.currentPage <= 1) {
            return
        }
        props.setPage(props.currentPage - 1)
    }

    return (
        <div className={classes.paginatorContainer}>
            <div className={currentPage <= 1 ?
                classNames(classes.arrow, classes.leftArrow, classes.disabledArrow) :
                classNames(classes.arrow, classes.leftArrow)}
                 onClick={() => setPrevPage()}>
            </div>

            <div className={classes.page}>{props.currentPage}</div>

            <div className={currentPage >= lastPage ?
                classNames(classes.arrow, classes.rightArrow, classes.disabledArrow) :
                classNames(classes.arrow, classes.rightArrow)}
                 onClick={() => setNextPage()}>
            </div>
        </div>
    );
};

export default Paginator;