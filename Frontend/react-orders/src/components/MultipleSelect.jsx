import React from 'react';

const MultipleSelect = (props) => {
    
    return (
        <select multiple={true}
            value={props.value}
            onChange={event => props.onChange(event.target.selectedOptions)}
        >
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
    );
    
};

export default MultipleSelect;