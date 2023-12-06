import React, {useEffect, useState} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import "../../App.css";
import AxiosFetchPost, {AxiosFetchGet} from '../../Utils/AxiosFetch';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [loginAs, setLoginAs] = useState('');

    const loginSuccess = useSelector(state => state.login.loginSuccess);
    const token = useSelector(state => state.login.token);

    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
        
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const loginAsChangeHandler = (event) => {
        const loginAs = event.target.value;
        setLoginAs(loginAs);
    }

    const authenticate =()=>{
        dispatch({type: 'SET_USERNAME', payload:userName})
        dispatch({type: 'SET_PASSWORD', payload:password})
        dispatch({type: 'SET_ROLE', payload:loginAs})
        const body = {
            username: userName,
            password: password,
            role: loginAs
          }
        AxiosFetchPost('authentication/login', body)
          .then(response => {
              if (response.data && !response.error) {
                dispatch({type: 'SET_TOKEN', payload:response.data.token})
                dispatch({type: 'LOGIN_SUCCESS'})
                if (loginAs === 'ADMIN') {
                navigate('/admin');
                } else if (loginAs === 'APPLICANT') {
                    navigate('/applicant');
                } else if (loginAs === 'INSTRUCTOR') {
                    navigate('/instructor');
                } else if (loginAs === 'COMMITTEE_MEMBER') {
                    navigate('/member');
                } 
              } else {
                dispatch({type: 'LOGIN_FAILED'})
              }
              
          })
    }

    useEffect(() => {
        if (token) {
            const config ={headers: {'Authorization' : token}}
            AxiosFetchGet(`profile/getFullProfile/${userName}`, config)
            .then(response => {
                if (response.data && !response.error) {
                    dispatch({type: 'SET_PROFILE', payload: {...response.data}})
                }
                }
            ) 
        }
    },[token])

    return(
        <div className="loginLayout">
            <div className="nu_logo">Northern University</div>
            <div className="loginFieldsBox">
                <TextField
                    className = "inputField"
                    id="username"
                    label="Username"
                    onChange = {(e)=> userNameChangeHandler(e)}
                    variant="filled" 
                />
                <TextField
                    className = "inputField"
                    id="password"
                    label="Password"
                    type="password"
                    onChange = {(e)=>{passwordChangeHandler(e)}}
                    variant="filled"
                />
                 <FormControl variant="filled" className = "inputField">
                    <InputLabel id="login-as-label">Login as</InputLabel>
                    <Select
                    labelId="login-as-label"
                    id="login-as"
                    value={loginAs}
                    onChange={loginAsChangeHandler}
                    >
                    <MenuItem value="ADMIN">Admin</MenuItem>
                    <MenuItem value="APPLICANT">Applicant</MenuItem>
                    <MenuItem value="INSTRUCTOR">Instructor</MenuItem>
                    <MenuItem value="COMMITTEE_MEMBER">Committee Member</MenuItem>
                    </Select>
                </FormControl>
                {loginSuccess === false && 
                    <Chip color="error" size="small" label="Login Failed. Please try again."/>
                }
                <Button
                    variant="outlined"
                    onClick={authenticate}>
                    Login
                </Button>
            </div>
            
        </div>
    )
}

export default Login;