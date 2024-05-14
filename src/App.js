import './styles/main.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/Home';
import LoginPage from './components/Login';
import SignUpPage from './components/SignUp';
import CreateRecipePage from './components/CreateRecipe';


export default function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/create_recipe' element={<CreateRecipePage />} />
            </Routes>
        </div>
    )
}