import React, {useState, useEffect} from 'react'
import './RegisterForm.css'
import { Link, useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import User from '../services/UserService'


const RegistrationForm = (props) => {
    let navigate = useNavigate();
    let startValue = {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber:'',
        address: '',
        city:'',
        landmark:'',
        locality: '',
        state:'',
        zipCode:'',
        addressType:'',
        dob: '',
        password: '',
        confirmPassword: "" 
    }

    const [formValue, setForm] = useState(startValue)
    const onReset = () => {
        setForm({
            ...startValue, id: formValue.id, isUpdate: formValue.isUpdate 
        });
    };

    const login = async (event) => {
        event.preventDefault();
        
        let object = {
            id: formValue.userID,
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            email: formValue.email,
            phoneNumber:formValue.phoneNumber,
            address: formValue.address,
            city:formValue.city,
            landmark:formValue.landmark,
            locality: formValue.locality,
            state:formValue.state,
            zipCode:formValue.zipCode,
            addressType:formValue.addressType,
            dob: formValue.dob,
            password: formValue.password,
            confirmPassword:formValue.confirmPassword 
        };

        if(formValue.firstName === "" && formValue.lastName === "" && formValue.password === "" && formValue.email === ""){
            alert("Enter input all Fileds")
        }
        else{
            User.addUser(object).then((response) => {
                console.log(response);
                alert("Data Added!!",response)
              })
        localStorage.clear();  
        alert("Regisraion Success....")
        navigate("/login");
        }
    }
    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }

    return (
        <div>
            <div className="form-content">
                <form className="form" action="#" onSubmit={login}>
                    <div className="form-head">
                        User Registration Form
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">FirstName</label>
                        <input type="text" className="input" id="firstName" name="firstName" value={formValue.firstName}
                            placeholder="Your name.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">LastName</label>
                        <input type="text" className="input" id="fullName" name="lastName" value={formValue.lastName}
                            placeholder="Your last name.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Phone Number</label>
                        <input type="text" className="input" id="mobileNumber" name="phoneNumber" value={formValue.phoneNumber}
                            placeholder="mobile number...." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                        <label htmlFor="name" className="label text">Email-Id</label>
                        <input type="email" className="input" id="email" name="email" value={formValue.email}
                            placeholder="Your email.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="row-content">
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">Password</label>
                        <input type="password" className="input" id="password" name="password" value={formValue.password}
                            placeholder="password.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">Confirm Password</label>
                        <input type="password" className="input" id="confirmPassword" name="confirmPassword" value={formValue.confirmPassword}
                            placeholder="Confirm password.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    </div>
                    <div className="row-content">
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">Date of Birth</label>
                        <input type="text" className="input" id="dob" name="dob" value={formValue.dob}
                            placeholder="YYYY-mm-dd formate use.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">Address</label>
                        <input type="text" className="input" id="address" name="address" value={formValue.address}
                            placeholder="your address.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    </div>
                    
                    
                    <div className="row-content">
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">City</label>
                        <input type="text" className="input" id="city" name="city" value={formValue.city}
                            placeholder="uyour address.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">Locality</label>
                        <input type="text" className="input" id="locality" name="locality" value={formValue.locality}
                            placeholder="locality.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
               </div>
               <div className="row-content">
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">State</label>
                        <input type="text" className="input" id="state" name="state" value={formValue.state}
                            placeholder="state.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">pincode</label>
                        <input type="text" className="input" id="zipCode" name="zipCode" value={formValue.zipCode}
                            placeholder="Pincode.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
            </div>
            <div className="row-content">
            <div className="sub-content">
                        <label htmlFor="name" className="label text">Landmark</label>
                        <input type="text" className="input" id="landmark" name="landmark" value={formValue.landmark}
                            placeholder="Near Place." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
                    <div className="sub-content">
                        <label htmlFor="name" className="label text">AddressType</label>
                        <input type="text" className="input" id="addressType" name="addressType" value={formValue.addressType}
                            placeholder="Home/Office.." required onChange={onNameChange} />
                        <error-output className="text-error" htmlFor="name"></error-output>
                    </div>
            </div>
                    
        
                    <br></br>
                    <div className="submit-reset">
                    <div className="buttonParent">
                            <Button variant="contained" size="large" type="submit" className="button submitButton" id="submitButton" onClick={login} >Submit</Button>
                            <Link to="/login"> <Button variant="contained" size="large" type="reset" className="button resetButton" id="resetButton" onClick={onReset}>Login</Button></Link>
                            
                    </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default RegistrationForm;