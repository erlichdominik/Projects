import React from 'react';
import { useParams } from 'react-router-dom';

const DynamicRoute = () => {
    let { id } = useParams();

    return <div>your id is {id}</div>

};


export default DynamicRoute;    