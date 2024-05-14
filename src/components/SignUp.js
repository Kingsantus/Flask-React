import { Form,Button,Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function SignUpPage() {
    const {register, handleSubmit,reset, formState:{errors}} = useForm();
    const [show, setShow] = useState(true);
    const [serverResponse, setServerResponse] = useState('')

    function handleSubmitForm(data) {
        if (data.password === data.confirmPassword ) {

            const body = {
                username:data.username,
                email:data.email,
                password:data.password
            }

            const requestOptions = {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body:JSON.stringify(body)
            }

        fetch('auth/signup', requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setServerResponse(data.message)
            console.log(serverResponse)

            setShow(true)
        })
        .then(err => console.log(err))

        reset()
        }
        else {
            alert("Passwords do not match")
        }
    }

    return(
        <div className="container">
            <div className="form">
                {show? 
                    <>
                        <Alert variant="success" onClose={() => setShow(false)} dismissible>
                            <p>
                                {serverResponse}
                            </p>
                        </Alert>
                        <h1>SignUp Page</h1>
                    </>
                     : <h1>SignUp Page</h1> }
                <form>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" {...register("username",{required:true,maxLength:25})} />
                        {errors.username && <p style={{color:'#f00'}}><small>Username is required</small></p>}
                        {errors.username?.type==='maxLength'&& <p style={{color:'#f00'}}><small>Max character is 25</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" {...register("email",{required:true,maxLength:100})} />
                        {errors.email && <p style={{color:'#f00'}}><small>Email is required</small></p>}
                        {errors.email?.type==='maxLength'&& <p style={{color:'#f00'}}><small>Max character is 100</small></p>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" {...register("password",{required:true,minLength:8})} />
                        {errors.password && <p style={{color:'#f00'}}><small>Password is required</small></p>}
                        {errors.password?.type==='minLength'&& <p style={{color:'#f00'}}><small>Min character is 8</small></p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" {...register("confirmPassword",{required:true,minLength:8})}  />
                        {errors.confirmPassword && <p style={{color:'#f00'}}><small>Confirm Password is required</small></p>}
                        {errors.confirmPassword?.type==='minLength'&& <p style={{color:'#f00'}}><small></small>Min character is 8</p>}
                    </Form.Group>
                    <br></br>
                    <Form.Group>
                        <Button as="sub" variant="primary" onClick={handleSubmit(handleSubmitForm)}>Sign Up</Button>
                    </Form.Group>
                    <Form.Group>
                        <small>Do not have an account? <Link to='/login'>Login</Link></small>
                    </Form.Group>
                </form>
            </div>
        </div>
    )
}