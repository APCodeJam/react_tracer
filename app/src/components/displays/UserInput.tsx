import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import { useGetUserByUserNameQuery, useUpdateAppUserMutation } from '../../common/services/appUserSlice'
import DynamicTable from "../DynamicTable";
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

    function UpdateUser() {
        try{
            email ? email : currentData ? setEmail(currentData.email) : '';
            const payload = update({ 
                username : userName ? userName : '', 
                email, 
                password, 
                profileImage : selectedFile }).unwrap();
            payload.then(user=>{
                let image = ""
                if (result.data) 
                    if (result.data.profileImage)
                        image = result.data.profileImage
                if (image)
                    setSelectedFile( image )
            })
          } catch (error) {
            setDisplayError('Update Failed')
          }
    }

    function handleImageSelection(event: { target: { files: any; }; }) {
        let files = event.target.files;
        let reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = (e) => {
            if (e.target)
                setSelectedFile(e.target.result ? e.target.result.toString() : "");
        }
    }

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
                            <h3>{userName}</h3>
                            <img hidden={!(selectedFile || currentData.profileImage)} height="280" width="280" src={selectedFile ? selectedFile : currentData.profileImage}/>
                            <label hidden={hideEdits}>Upload Image :</label>
                            <div className="input-group mb-3" hidden={hideEdits}>
                                <input type="file" name="upload_file" onChange={handleImageSelection} />
                            </div>
                            <label hidden={hideEdits}>Email</label>
                            <div className="input-group mb-3">
                                <input type="text"
                                    className="form-control"
                                    defaultValue={currentData.email}
                                    aria-label="Email"
                                    aria-describedby="basic-addon1"
                                    hidden={hideEdits}
                                    onChange={(e) => {
                                            setEmail(e.target.value);
                                    }} />
                            </div>
                            <label hidden={hideEdits}>New Password</label>
                            <div className="input-group mb-3">
                                
                                <input type="password"
                                    className="form-control"
                                    placeholder="Optional"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                    hidden={hideEdits}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }} />
                            </div>
                            <div><DynamicTable /></div>
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
                            <p className="btn btn-primary" hidden={hideEdits} onClick={UpdateUser}>Save Changes</p>
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
