import React, { useState } from "react";
import {useGetAllItemDefinitionsQuery, 
    useCreateItemDefinitionMutation,
    useUpdateItemDefinitionMutation,
    useDeleteItemDefinitionMutation} from '../../common/services/itemDefinitionSlice';

function ItemDefinitionsDisplay() {

    const { currentData , isFetching, isError, isLoading, error } = useGetAllItemDefinitionsQuery("");

    return (
        <div className="d-flex justify-content-center">
             {
                isFetching ?
                <h3>Refreshing...</h3> : ''
            }
            {
                isLoading ?
                <h3>Loading...</h3> : ''
            }
            {
                isError ?
                <h3>{error}</h3> : ''
            }
            {currentData
                ? 
                <div  className="card max-320" >
                    <div className="card-body">
                    <h3>Registered Users</h3>
                            <table className=".table">
                                <tr><td>Name</td><td>Minimum</td><td>Maximum</td></tr>
                                {currentData.map(elem => {
                                    return <tr><td>${elem.name}</td><td>${elem.minimum}</td><td>${elem.maximum}</td></tr>
                                })}
                            </table>
                    </div>
                </div>
                : 'No data available'}
        </div>
    );
}

export default ItemDefinitionsDisplay;
