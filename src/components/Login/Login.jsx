import React, { useState } from 'react'
import './Login.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import User from '../services/UserService'
import SnackMessages from './Message'


const Login = (props) => {
    let navigate = useNavigate();
    let startValue = {
        email: "",
        password: "",
        error: "",
    }

    const [formValue, setForm] = useState(startValue)
    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }
    const login = (event) => {
        event.preventDefault();
        let object = {
            email: formValue.email,
            password: formValue.password, 
        };
        console.log(object)
        window.localStorage.clear();
        if (formValue.password === "" && formValue.email === "") {
            alert("Enter input all Fileds")
        }
        else {
            User.userLogin(object).then((response) => {
                console.log(response.data.data);
                // let severity = response.data.message === "LOGIN SUCCESSFUL" ? "success" : "error";
                // console.log(severity);
                // severity === "success" ? localStorage.setItem('Authorization', response.data.data.userID) : localStorage.setItem('Authorization', "null")
                // severity === "success" ? localStorage.setItem('Token', response.data.data.token) : localStorage.setItem('Token', "null")
                // severity === "success" ? localStorage.setItem('Name', response.data.data.firstName) : localStorage.setItem('Name', "null")
                // console.log(severity);
                localStorage.setItem("Token", response.data.data.token ); 
                localStorage.setItem("userID", response.data.data.userID);
                localStorage.setItem("Name", response.data.data.firstName);
                console.log(localStorage.getItem("Token"))
                console.log(localStorage.getItem("userID"))
                console.log(localStorage.getItem("Name"))
                console.log(response.data.data.userID)
                console.log(response.data.data.token)
               
                console.log(response);
                navigate("/");
                window.location.reload();
            })
        }
    }
   

    return (
        <div>
            <div className="form-content">
                <form className="form" action="#" onSubmit={login}>
                    <div className="formhead">
                        User Login Form
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Email Id</label>
                        <input type="text" className="input" id="email" name="email" value={formValue.email}
                            placeholder="Email Id.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Password</label>
                        <input type="password" className="input" id="password" name="password" value={formValue.password}
                            placeholder="password.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="submit-reset">
                        <div className="buttonParent">
                            <Link to="/register" underline="none"> <Button variant="contained" size="large" className="resetButton
                                button cancleButton">Sign Up</Button></Link>
                            <Button variant="contained" size="large" type="submit" className="button submitButton" id="submitButton" onClick={login} >Login</Button>
                        </div>
                    </div>

                </form>

            </div>
            {formValue.snackFlag &&
                <SnackMessages message={this.state.snackMessage} severity={this.state.severity} />
            }

        </div>
    )
}

export default Login;