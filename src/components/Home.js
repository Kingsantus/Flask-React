import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Modal,Form,Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoggedInHome() {
    const {register, handleSubmit, reset, setValue, formState:{errors}} = useForm();
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);
    const [recipeId, setRecipeId] = useState(0);

    useEffect(
        ()=>{
            fetch('/recipe/recipes')
            .then(res=>res.json())
            .then(data=>{
                setRecipes(data)
            })
            .then(err=>console.log(err))
        },[]
    );

    function getAllRecipes(){
        fetch('/recipe/recipes')
            .then(res=>res.json())
            .then(data=>{
                setRecipes(data)
            })
            .then(err=>console.log(err))
    }


    function closeModal() {
        setShow(false)
    }

    function showModal(id) {
        setShow(true)
        setRecipeId(id)
        recipes.map(
            (recipe)=>{
                if (recipe.id===id){
                    setValue('title',recipe.title)
                    setValue('description',recipe.description)
                }
            }
        )
    }

    let token = localStorage.getItem('REACT_TOKEN_AUTH_KEY');

    function updateRecipe(data) {
        console.log(data)
        
        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            },
            body:JSON.stringify(data)
        }

        fetch(`/recipe/recipe/${recipeId}`, requestOptions)
        .then(res=>res.json())
        .then(data => {
            const reload=window.location.reload()
            reload()
        })
        .catch(err => console.error(err))
    }

    function deleteRecipe(id) {
        console.log(id)

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${JSON.parse(token)}`
            }
        }

        fetch(`/recipe/recipe/${id}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            getAllRecipes()
        })
        .catch(err=>console.log(err))
    }

    return (
        <div className="home container">
            <h1 className="heading">List of Recipe</h1>
            <Modal
                show={show}
                size='lg'
                onHide={closeModal}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Recipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>  
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
                        <Button as='sub' variant="primary" onClick={handleSubmit(updateRecipe)}>Update</Button>
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
            {
                recipes.map((recipe, index)=>(
                    <Recipe key={index} title={recipe.title} description={recipe.description} onClick={()=>{showModal(recipe.id)}}
                    onDelete={()=>{deleteRecipe(recipe.id)}}
                    />
                ))
            }
        </div>
    )
}

function LoggedOutHome() {
    return (
        <div className="home container">
            <h1 className="heading">Welcome to the Recipe</h1>
            <Link to='/signup' className="btn btn-primary btn-lg">Get Started</Link>
        </div>
    )
}

const HomePage=()=>{
    const [logged] = useAuth();
    return(
        <div>
            {logged ? <LoggedInHome /> : <LoggedOutHome />}
        </div>  
    )
}

export default HomePage;