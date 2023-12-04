import React, {useEffect} from 'react';
import StylesS from './Select.module.scss'

const Select = (props) => {
    const getDefaultValue = () => {
        if (props.type === false)
            return <option disabled value="" autoFocus>Выберите {props.labelText}</option>
    }
    
    return (
        <div className={StylesS.filterItem}>
            <label className={StylesS.label}>{props.labelText}</label>
            <select className={StylesS.chooseFilter} multiple={props.type}
                    value={props.value}
                    onChange={event => props.onChange(event.target)}
            >

                {
                    getDefaultValue()
                }

                {props.options.map((option, index) => {
                    if (option.id) {
                        return <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    } else {
                        return <option key={index}>
                            {option}
                        </option>
                    }

                })}

            </select>
        </div>
    );
    
};

export default Select;