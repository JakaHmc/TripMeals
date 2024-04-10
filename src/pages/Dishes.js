import React, { useEffect, useState } from 'react';
import { db } from "../components/Firebase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ButtonSend from '../components/ButtonSend';
export default function Dishes() {
    const [recipes, setRecipes] = useState([]);
    
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesCollection = collection(db, "recipes");
            const recipesSnapshot = await getDocs(recipesCollection);
            const recipesData = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRecipes(recipesData);
        };
        
        fetchRecipes();
    }, []);
    
    const handleEdit = (id) => {
        // Redirect to edit page with the recipe id
    };
    
    const handleRemove = async (id) => {
        try {
            await deleteDoc(doc(db, "recipes", id));
            setRecipes(prevRecipes => prevRecipes.filter(recipe => recipe.id !== id));
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    return (
        
        <div className="container" backgroundColor="black" style={{ paddingTop:'20px', fontSize: '0.8rem'}}>
          <div className="home-button" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px'}}>
            <ButtonSend 
              text="Domov"
              variant="primary"
              onClick={() => navigate('/home')} // Use navigate hook to navigate to home page
            />
            </div>
            <h1>Recipes</h1>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <span>{recipe.name}</span>
                        <button onClick={() => handleEdit(recipe.id)}>Edit</button>
                        <button onClick={() => handleRemove(recipe.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
