import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetUserByUserNameQuery, useUpdateAppUserMutation } from '../../common/services/appUserSlice'
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from 'react-bootstrap'
import InputModal from "../InputModal";
import EditModal from "../EditModal";
// import Form from 'react-bootstrap/Form';

function UserInput() {
    const [update, result] = useUpdateAppUserMutation();

    const { userName } =  useParams();
    const { currentData , isFetching, isError, isLoading, error } = useGetUserByUserNameQuery( userName ? userName : '', { refetchOnMountOrArgChange: true } );

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [selectedFile, setSelectedFile] = useState("")

    const [displayError, setDisplayError] = useState("")
    const [ sleepValue, setSleepValue ] = React.useState(25);

    // If user email provided by server is null, hide edit controls.
    let hideEdits = currentData ? currentData.email ? false : true : true;

    return (
        <>
        <InputModal />&nbsp;<EditModal />
        <div className="d-flex justify-content-center">
            {
                displayError ?
                <h3>{displayError}</h3> : ''
            }
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
                    <div className="card max-700">
                        <div className="card-body">
                            <div>
                                <table>
                                    <thead>
                                        <th>
                                            Mood rating
                                        </th>
                                        <th>
                                            <select name="data type">
                                                    <option value="integer">5- excellent</option>
                                                    <option value="float">4- good </option>
                                                    <option value="string">3- okay</option>
                                                    <option value="boolean">2- not great</option>
                                                    <option value="boolean">1- abysmal</option>
                                            </select>
                                        </th>
                                        <tr>
                                            <td>
                                                Sleep quality rating
                                            </td>
                                            <td>
                                            <select name="data type">
                                                <option value="integer">5- excellent</option>
                                                <option value="float">4- good </option>
                                                <option value="string">3- okay</option>
                                                <option value="boolean">2- not great</option>
                                                <option value="boolean">1- abysmal</option>
                                            </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Sleep hours</td>
                                            <td>
                                                <input placeholder="hours" />

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Endurance training minutes</td>
                                            <td>
                                                <input placeholder="minutes" />

                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Strength training minutes</td>
                                            <td>
                                                <input placeholder="minutes" />

                                            </td>
                                        </tr>
                                    </thead>
                                </table>

                            </div>
                            {/* <div><input /></div> */}
                        </div>
                    </div>
                : 'No data available'}
        </div>

        <div className="d-flex justify-content-center">
            <div className="card max-700">
                <div>Past Inputs</div>
                <div> {/* We also probably want to loop through the contents of the database here to display */}
                    <table>
                        <thead>
                            <th>Date entered</th>
                            <th>Field</th>
                            <th>Value</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </thead>
                        <tr>
                            <td>3/11/2023</td>
                            <td>Mood</td>
                            <td>3</td>
                            <td><Button>Edit</Button></td>
                            <td><Button>Delete</Button></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        </>
        
    );
}

export default UserInput;
