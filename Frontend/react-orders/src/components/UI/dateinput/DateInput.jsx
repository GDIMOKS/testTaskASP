import React, {useEffect, useState} from 'react';

const DateInput = (props) => {
    const getDefaultDate = () => {
        let date = new Date()
        let day = date.getDate(); if (day<10) day='0'+day;
        let month = date.getMonth()+1; 
        let year = date.getFullYear();
        let hours = date.getHours(); if (hours<10) hours='0'+hours
        let minutes = date.getMinutes(); if (minutes<10) minutes='0'+minutes
        let seconds = date.getSeconds(); if (seconds<10) seconds='0'+seconds
        if (props.labelText === 'Начальная дата')
            month -= 1
        if (month<10)month='0'+month
        
        return year + "-" + month + "-" + day+"T"+hours + ":" + minutes + ":" + seconds
    }
    const [defaultDate, setDefaultDate] = useState(getDefaultDate());
    useEffect(() => {
        props.onChange(defaultDate, props.filterName)
    }, []);

    return (
        <div>
            <label>{props.labelText}</label>

            <input type="datetime-local" defaultValue={defaultDate}
                   onChange={event => {
                props.onChange( event.target.value === '' ? null : event.target.value, props.filterName)
            }}/>   

        </div>
    );
};

export default DateInput;