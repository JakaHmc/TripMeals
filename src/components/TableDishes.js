import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import ButtonSend from './ButtonSend';

function TableDishes({ recipes, handleEdit, handleRemove }) {
    const [expandedRecipeId, setExpandedRecipeId] = useState(null);

    const toggleExpand = (recipeId) => {
        setExpandedRecipeId(prevId => prevId === recipeId ? null : recipeId);
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Servings</th>
                    <th>Type</th>
                    <th>Edit</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {recipes.map((recipe, index) => (
                    <React.Fragment key={recipe.id}>
                        <tr>
                            <td>{index + 1}</td>
                            <td onClick={() => toggleExpand(recipe.id)} style={{ cursor: 'pointer'}}>
                                {recipe.name}
                            </td>
                            <td>{recipe.servings}</td>
                            <td>{recipe.type}</td>
                            <td><ButtonSend small text="Edit" variant="primary" onClick={() => handleEdit(recipe.id)} /></td>
                            <td><ButtonSend small text="Remove" variant="danger" onClick={() => handleRemove(recipe.id)} /></td>
                        </tr>
                        {expandedRecipeId === recipe.id && (
                            <tr>
                                <td colSpan="6">
                                    <ul>
                                        {recipe.ingredients.map((ingredient, idx) => (
                                            <li  style={{marginLeft:'70px'}} key={idx}>{`${ingredient} ${recipe.amounts[idx]} ${recipe.units[idx]}`}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
            </tbody>
        </Table>
    );
}

export default TableDishes;
