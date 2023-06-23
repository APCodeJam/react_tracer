import { lutimes } from "fs";
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useGetPagedUsernamesQuery } from '../../common/services/appUserSlice';

function UserDisplay() {

    //the backend API starts at page 0 but users will expect pages to start at 1
    //our RTK query handles this and passes {page-1} to the backend
    const [page, setPage] = useState(1);

    const { currentData , isFetching, isError, isLoading, error } = useGetPagedUsernamesQuery( page, { refetchOnMountOrArgChange: true } );
    // console.log(currentData)
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
                                {currentData.map(elem => {
                                    return <Link className="nav-link active" aria-current="page" to={`/profile/${elem.username}`}><tr><td><img src={elem.profilePreviewImage}/></td><td>{elem.username}</td></tr></Link>
                                })}
                            </table>
                        <button onClick={() => setPage(page - 1)} hidden={page<2}>{"<"}</button>
                        <button>{page}</button>
                        <button onClick={() => setPage(page + 1)}>{">"}</button>
                    </div>
                </div>
                : 'No data available'}
        </div>
        
    );
}

export default UserDisplay;
