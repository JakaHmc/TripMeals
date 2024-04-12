// EditRecipe.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from "../components/Firebase";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import ButtonSend from '../components/ButtonSend';
import { useNavigate } from 'react-router-dom';

export default function EditRecipe() {
    const { id } = useParams(); // Get the recipe ID from the URL params
    const [recipe, setRecipe] = useState({}); // State to store recipe details

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const recipeDoc = await getDoc(doc(db, "recipes", id));
                if (recipeDoc.exists()) {
                    setRecipe({ id: recipeDoc.id, ...recipeDoc.data() });
                } else {
                    console.log("Recipe not found");
                }
            } catch (error) {
                console.error("Error fetching recipe details: ", error);
            }
        };
        fetchRecipeDetails();
    }, [id]);
    const navigate = useNavigate()
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateDoc(doc(db, "recipes", id), recipe);
            console.log("Recipe updated successfully");
            // Redirect the user to the recipes page after updating
            // You can use useHistory or any other routing method here
        } catch (error) {
            console.error("Error updating recipe: ", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevRecipe => ({
            ...prevRecipe,
            [name]: value
        }));
    };

    return (
        <div className="container" style={{ paddingTop: '20px', fontSize: '0.8rem' }}>
            <div className="home-button" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                <ButtonSend
                    text="Domov"
                    variant="primary"
                    onClick={() => navigate('/home')}
                />
            </div>
            <h1>Edit Recipe</h1>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={recipe.name || ''} onChange={handleInputChange} />
                </div>
                {/* Add other input fields for editing recipe details */}
                <ButtonSend type="submit" text="Save Changes" variant="primary" />
            </form>
        </div>
    );
}
