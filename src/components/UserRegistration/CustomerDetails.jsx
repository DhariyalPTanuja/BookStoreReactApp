import React, { useState} from 'react'
import '../UserRegistration/CustomerDetail.css'
import { Link,  useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Header from '../Header/Header'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import TextField from '@mui/material/TextField';
import CustomerServices from '../services/CustomerService'


const CustomerDetails = (props) => {
    let navigate = useNavigate();
    let startValue = {
        
        name: "",
        pinCode: "",
        address: "",
        locality: "",
        landmark: "",
        city: "",
        contact: "",
        type:"",

    }

    const [formValue, setForm] = useState(startValue)
    const onReset = () => {
        setForm({
            ...startValue, isUpdate: formValue.isUpdate
        });
    };

    const addUser = async (event) => {
        event.preventDefault();
        
        let object = {
            name: formValue.name,
            address: formValue.address,
            pinCode: formValue.pinCode,
            contact: formValue.contact,
            city: formValue.city,
            type: formValue.type,
            locality: formValue.locality,
            landmark: formValue.landmark

        };
        console.log(object);
            CustomerServices.addperson(object).then((response) => {
                console.log(response);
                alert("Data Added!!",response)
                localStorage.setItem('CustomerId', response.data.data.customerID);
              })
        navigate(`/order`);
        
    }
   
    const onNameChange = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value });
        console.log('value for', event.target.name, event.target.value);
    }
    return (
        <div>
            <Header />
            <div className="form-content">
                <form className="form" action="#" onSubmit={addUser}>
                    <div className="form-head">
                        Customer Details
                    </div> <br/>
                    <div>
                        <TextField
                            id="name" name="name"
                            label="Name"
                            marginRight="10px"
                            value={formValue.name}
                            onChange={onNameChange}
                            required
                        />	&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField 
                            id="contact"
                            name="contact"
                            label="Contact"
                            value={formValue.contact}
                            onChange={onNameChange}
                            required />
                    </div> <br/>
                    <div>
                        <TextField 
                            id="pinCode"
                            name="pinCode"
                            label="Pincode" 
                            value={formValue.pinCode}
                            required
                            onChange={onNameChange}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField 
                            id="locality"
                            name="locality"
                            label="Locality" 
                            value={formValue.locality}
                            onChange={onNameChange}
                            required/>
                    </div> <br/>
                    <div >
                        <TextareaAutosize
                            id="address"
                            name="address"
                            aria-label="minimum height"
                            placeholder="Address..."
                            style={{ width: 485, height: 100 }}
                            padding-bottom="10"
                            value={formValue.address}
                            onChange={onNameChange}
                            required
                        />
                    </div> <br/>    
                    <div>
                        <TextField 
                            name="city"
                            id="city"
                            label="City" 
                            value={formValue.city}
                            onChange={onNameChange}
                            required/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <TextField
                            id="landmark"
                            label="Landmark"
                            name="landmark"
                            value={formValue.landmark} 
                            onChange={onNameChange}
                            required/>
                    </div>
                    <br/>
                   
                    <div>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                            >
                                <FormControlLabel value="home" checked={formValue.type === 'home'} name="home" id="home"  control={<Radio />} onChange={onNameChange}  label="Home" />
                                <FormControlLabel value="work" checked={formValue.type === 'work'} name="work" id="work" control={<Radio />} onChange={onNameChange}  label="Work" />
                                <FormControlLabel value="other" checked={formValue.type === 'other'} name="other" id="other" control={<Radio />}onChange={onNameChange} label="Other" />
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <div className="submit-reset">
                        <div className="buttonParent">
                            <Button variant="contained" size="large" type="submit" className="button submitButton" id="submitButton" onClick={onReset} >Back</Button>
                            <Link to="/order"> <Button variant="contained" size="large" type="reset" className="button resetButton" id="resetButton" onClick={addUser}>Continue</Button></Link>

                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default CustomerDetails;