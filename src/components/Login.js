// import React, { useState } from "react";
import { Form,Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { login } from "../auth";


export default function LoginPage() {

    const {register, handleSubmit,reset, formState:{errors}} = useForm();

    const navigate = useNavigate()


    function handleLoginForm(data) {
        // console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: { 
                'content-type': 'application/json' 
            },
            body: JSON.stringify(data)
        }

        fetch('/auth/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data.access_token)
            login(data.access_token)

            navigate('/')
        })
        reset();
    }


    return(
        <div className="container">
            <div className="form">
                <h1>Login Page</h1>
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" {...register("username",{required:true,maxLength:25})} />
                        {errors.username && <p style={{color:'#f00'}}><small>Username is required</small></p>}
                        {errors.username?.type==='maxLength'&& <p style={{color:'#f00'}}><small>Max character is 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password"  {...register("password",{required:true,minLength:8})} />
                        {errors.password && <p style={{color:'#f00'}}><small>Password is required</small></p>}
                        {errors.password?.type==='minLength'&& <p style={{color:'#f00'}}><small>Min character is 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(handleLoginForm)}>Login</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Do not have an account? <Link to='/signup'>Sign Up</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}
