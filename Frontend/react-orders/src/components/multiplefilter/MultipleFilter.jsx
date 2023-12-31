﻿import React, {useEffect, useState} from 'react';
import Select from "../select/Select";
import {getObjects} from "../../libraries/functions";
import StylesMF  from './MultipleFilter.module.scss'

const MultipleFilter = (props) => {
    const [objects, setObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    
    useEffect(() => {
        getObjects(props.baseUrl, props.destination).then(r => setObjects(r))
    }, []);
    
    
    return ( 
        <div className={StylesMF.filterItem}>
        <Select
            type={true}
            labelText = {props.labelText}
            options={objects} 
            value={selectedObjects} 
            onChange={(selectedObjects) =>
            {
                setSelectedObjects(Array.from(selectedObjects.selectedOptions, ({ value }) => value))
                
            }} />

            {    
                props.changeFilterValues(selectedObjects, props.filterName)
            }
    
        </div>
    );
    
};

export default MultipleFilter;