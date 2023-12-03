import React, {useEffect, useState} from 'react';
import MultipleSelect from "./MultipleSelect";

const MultipleFilter = (props) => {
    const [objects, setObjects] = useState([]);
    const [selectedObjects, setSelectedObjects] = useState([]);
    
    const getObjects = async () => {
        const options = {
            method: 'GET'
        }

        const result = await fetch(props.baseUrl + props.destination, options);
        if (result.ok) {
            const _objects = await result.json()
            setObjects(_objects)
            return _objects
        }
        return []
    }

    useEffect(() => {
        getObjects()
    }, []);
    
    
    return ( 
        <div>
        <MultipleSelect 
            options={objects} 
            value={selectedObjects} 
            onChange={(selectedObjects) =>
            {
                setSelectedObjects(Array.from(selectedObjects, ({ value }) => value))
                
            }} />

            {    
                props.changeFilterValues(selectedObjects, props.filterName)
            
            }
{/*            {
                
                selectedObjects.map((value,index) => {
                return <div key={index}>{value}</div>
            })}*/}
    
        </div>
    );
    
};

export default MultipleFilter;