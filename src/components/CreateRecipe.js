import React from "react";
import { Form,Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateRecipePage=()=>{
    const {register, handleSubmit, reset, formState:{errors}} = useForm();

    const navigate = useNavigate()

    function createRecipe(data) {
        console.log(data)
        const token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');
        console.log(token)

        const requestOptions={
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(data)
        }
        fetch('/recipe/recipes', requestOptions)
        .then(res=>res.json())
        .then(data => {
            reset()
        })
        .catch(err => console.error(err))

        navigate('/')
    }

    return(
        <div className="container">
            <h1>Ceate Recipe Page</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Name of your Recipe" {
                        ...register('title', {required:true,maxLength:50})
                    } />
                    {errors.title && <p style={{color:'#f00'}}><small>Title is required</small></p>}
                    {errors.title?.type==='maxLength'&& <p style={{color:'#f00'}}><small>Max character is 50</small></p>}
                </Form.Group>
                <br></br>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} placeholder="Description of your Recipe" {...register('description', {required:true,maxLength:500})} />
                    {errors.description && <p style={{color:'#f00'}}><small>Description is required</small></p>}
                    {errors.description?.type==='maxLength'&& <p style={{color:'#f00'}}><small>Max character is 500</small></p>}
                    </Form.Group>
                <br></br>
                <Form.Group>
                    <Button as='sub' variant="primary" onClick={handleSubmit(createRecipe)}>Save</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default CreateRecipePage;