import React, { useEffect, useState } from 'react';
import { db } from "../components/Firebase";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ButtonSend from '../components/ButtonSend';
import TableDishes from '../components/TableDishes';

export default function Dishes() {
    const [recipes, setRecipes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecipes = async () => {
            const recipesCollection = collection(db, "recipes");
            const recipesSnapshot = await getDocs(recipesCollection);
            let recipesData = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Sort recipes alphabetically by name
            recipesData.sort((a, b) => a.name.localeCompare(b.name));

            setRecipes(recipesData);
        };
        fetchRecipes();
    }, []);

    const handleEdit = (id) => {
        // Redirect to edit page with the recipe id

        navigate(`/edit/${id}`);
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
        <div className="container" style={{ paddingTop: '20px', fontSize: '0.8rem' }}>
            <div className="home-button" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '10px' }}>
                <ButtonSend
                    text="Domov"
                    variant="primary"
                    onClick={() => navigate('/home')}
                />
                <ButtonSend
                    text="Dodaj recept"
                    variant="primary"
                    onClick={() => navigate('/add-dish')}
                />
            </div>
            <h1>Recipes</h1>
            <TableDishes recipes={recipes} handleEdit={handleEdit} handleRemove={handleRemove} />
        </div>
    );
}
