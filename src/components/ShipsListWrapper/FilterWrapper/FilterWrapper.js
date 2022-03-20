import classes from './FilterWrapper.module.css'
import {useState, useEffect} from "react";
import {useFormik} from "formik";

const FilterWrapper = (props) => {

    //Установка состояния чекбокса (используется при открытии/закрытии выпадающего списка портов)
    const [isCheckbox, setCheckbox] = useState(false)

    //Использование библиотеки "formik" для обрабтки формы фильтрации
    const formik = useFormik({
        initialValues: {
            shipName: props.shipName || "",
            checkedPortName: props.checkedPortName || null,
            shipType: props.shipType || null,
        },

        onSubmit: (values, submitProps) => {
            let formData = {
                shipName: values.shipName,
                checkedPortName: values.checkedPortName,
                shipType: values.shipType
            }

            //Отправка данных из формы в state фильтра
            props.setFilterProps(formData.checkedPortName, formData.shipName, formData.shipType)
        },
    })

    //Использую хук useEffect для автоматической отправки формы при измении состояния полей формы (исключается кнопка отправки формы)
    useEffect(() => {
        formik.submitForm()
    }, [formik.values])

    //Получение значение для поля заголовка выпадающего списка портов
    const getPortValue = () => {
        if(props.checkedPortName.length === 0) {
            return 'Не выбрано'
        } else if(props.checkedPortName.length === 1) {
            return props.checkedPortName
        } else if(props.checkedPortName.length === 2) {
            return 'Выбрано 2'
        } else {
            return 'Выбрано 3'
        }
    }

    return (
        <div className={classes.filterWrapper}>
            <h2>Фильтры</h2>
            <form onSubmit={formik.handleSubmit}>

                {/*Контейнер текстового поля инпута названия кораблей*/}
                <div className={classes.inputContainer}>
                    <input type="text"
                           placeholder='Название'
                           name='shipName'
                           value={formik.values.shipName}
                           onChange={formik.handleChange}
                    />
                </div>

                {/*Контейнер выпадающего списка с чекбоксами портов*/}
                <div className={classes.selectContainer}
                     onMouseEnter={() => setCheckbox(true)}
                     onMouseLeave={() => setCheckbox(false)}>
                    <div className={classes.inputContainer}>
                        <input type="text"
                               name='portNames'
                               value={getPortValue()}
                               onChange={formik.handleChange}
                        />
                    </div>
                    {isCheckbox && <div className={classes.checkBoxs}>
                        <div className={classes.checkBox}>
                            <input type="checkbox"
                                   id="port_canaveral"
                                   name="checkedPortName"
                                   value="Port Canaveral"
                                   onChange={formik.handleChange}
                                   //Проверка содержится ли в state фильтра значение этого чекбокса
                                   //Если содержится, то чекбокс становится включенным
                                   checked={props.checkedPortName.includes("Port Canaveral")} //ECMAScript7
                            />
                            <label htmlFor="port_canaveral">Port Canaveral</label>
                        </div>
                        <div className={classes.checkBox}>
                            <input type="checkbox"
                                   id="port_of_los_angeles"
                                   name="checkedPortName"
                                   value="Port of Los Angeles"
                                   onChange={formik.handleChange}
                                   //Проверка содержится ли в state фильтра значение этого чекбокса
                                   //Если содержится, то чекбокс становится включенным
                                   checked={props.checkedPortName.includes("Port of Los Angeles")} //ECMAScript7
                            />
                            <label htmlFor="port_of_los_angeles">Port of Los Angeles</label>
                        </div>
                        <div className={classes.checkBox}>
                            <input type="checkbox"
                                   id="fort_lauderdale"
                                   name="checkedPortName"
                                   value="Fort Lauderdale"
                                   onChange={formik.handleChange}
                                   //Проверка содержится ли в state фильтра значение этого чекбокса
                                   //Если содержится, то чекбокс становится включенным
                                   checked={props.checkedPortName.includes("Fort Lauderdale")} //ECMAScript7
                            />
                            <label htmlFor="fort_lauderdale">Fort Lauderdale</label>
                        </div>
                    </div>}
                </div>

                {/*Контейнер для радиокнопок выбора типа корабля*/}
                <div className={classes.radioBoxContainer}>
                    <h3>Тип</h3>
                    <label htmlFor="opt1" className={classes.radio}>
                        <input className={classes.hidden}
                               type="radio"
                               name="shipType"
                               id="opt1"
                               value="Barge"
                               onChange={formik.handleChange}
                               checked={props.shipType === "Barge"}
                        />
                        <span className={classes.label}></span>Barge
                    </label>

                    <label htmlFor="opt2" className={classes.radio}>
                        <input className={classes.hidden}
                               type="radio"
                               name="shipType"
                               id="opt2"
                               value="Cargo"
                               onChange={formik.handleChange}
                               checked={props.shipType === "Cargo"}
                        />
                        <span className={classes.label}></span>Cargo
                    </label>

                    <label htmlFor="opt3" className={classes.radio}>
                        <input className={classes.hidden}
                               type="radio"
                               name="shipType"
                               id="opt3"
                               value="High Speed Craft"
                               onChange={formik.handleChange}
                               checked={props.shipType === "High Speed Craft"}
                        />
                        <span className={classes.label}></span>High Speed Craft
                    </label>

                    <label htmlFor="opt4" className={classes.radio}>
                        <input className={classes.hidden}
                               type="radio"
                               name="shipType"
                               id="opt4"
                               value="Tug"
                               onChange={formik.handleChange}
                               checked={props.shipType === "Tug"}
                        />
                        <span className={classes.label}></span>Tug
                    </label>

                    <label htmlFor="opt5" className={classes.radio}>
                        <input className={classes.hidden}
                               type="radio"
                               name="shipType"
                               id="opt5"
                               value="All"
                               onChange={formik.handleChange}
                               checked={props.shipType === "All"}
                        />
                        <span className={classes.label}></span>All
                    </label>
                </div>

            </form>
        </div>
    );
};

export default FilterWrapper;
