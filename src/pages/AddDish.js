import React, { useState } from 'react';
import { db } from "../components/Firebase";
import { collection, addDoc } from 'firebase/firestore';
import InputText from "../components/InputText";
import ButtonSend from "../components/ButtonSend";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import InputDropdown from '../components/InputDropdown';

export default function Test() {
    const [recipe, setRecipe] = useState({
        name: '',
        type: '',
        ingredients: [''], 
        amounts: [''],
        units: ['']
    });

    const [notification, setNotification] = useState(null);

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleIngredientChange = (index, value) => {
        const updatedIngredients = [...recipe.ingredients];
        updatedIngredients[index] = value;
        setRecipe(prevState => ({
            ...prevState,
            ingredients: updatedIngredients
        }));
    };

    const handleAmountChange = (index, value) => {
        const updatedAmounts = [...recipe.amounts];
        updatedAmounts[index] = value;
        setRecipe(prevState => ({
            ...prevState,
            amounts: updatedAmounts
        }));
    };

    const handleUnitChange = (index, value) => {
        const updatedUnits = [...recipe.units];
        updatedUnits[index] = value;
        setRecipe(prevState => ({
            ...prevState,
            units: updatedUnits
        }));
    }

    const handleButtonClick = async () => {
        try {
            const docRef = await addDoc(collection(db, "recipes"), {
                name: recipe.name,
                type: recipe.type,
                ingredients: recipe.ingredients,
                amounts: recipe.amounts,
                units: recipe.units
            });
            setNotification('Recept shranjen!');
            setTimeout(() => {
                setNotification(null);
            }, 3000);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const addIngredientRow = () => {
        setRecipe(prevState => ({
            ...prevState,
            ingredients: [...prevState.ingredients, ''],
            amounts: [...prevState.amounts, ''],
            units: [...prevState.units, '']
        }));
    };

    const removeIngredientRow = () => {
        if (recipe.ingredients.length > 1) {
            setRecipe(prevState => ({
                ...prevState,
                ingredients: prevState.ingredients.slice(0, -1),
                amounts: prevState.amounts.slice(0, -1),
                units: prevState.units.slice(0, -1)
            }));
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
            <ButtonSend
              text = "Seznam jedi"
              variant="primary"
              onClick={() => navigate('/dishes')} // Use navigate hook to navigate to dishes page
            />
          </div>
            <div className="row">
                            <div className="col-md-6">
                    <InputText id="name" description="Ime jedi" value={recipe.name} onChange={(id, value) => setRecipe(prevState => ({ ...prevState, name: value }))} />
                </div>    
                <div className="col-md-6">
                    <InputDropdown id="type" description="Obrok" value={recipe.type} options = {['Zajtrk', 'Kosilo', 'Malica']} onChange={(id, value) => setRecipe(prevState => ({ ...prevState, type: value }))} />
                </div>
            </div>
            {recipe.ingredients.map((ingredient, index) => (
              <div className="row" key={index} style={{ paddingTop: '15px', backgroundColor: index % 2 === 0 ? '#ffffe0' : '#f0f0f0' }}>
                  <div className="col-md-6">
                      <InputText id={`ingredient${index}`} description={`Sestavina ${index + 1}`} value={ingredient} onChange={(id, value) => handleIngredientChange(index, value)} />
                  </div>
                  <div className="col-md-3">
                      <InputText id={`amount${index}`} description={`Količina`} value={recipe.amounts[index]} onChange={(id, value) => handleAmountChange(index, value)} />
                  </div>
                  <div className="col-md-3">
                      <InputDropdown
                          id={`unit${index}`}
                          description={`Enota`}
                          value={recipe.units[index]}
                          defaultValue={recipe.units[index] ? recipe.units[index] : "g"} // Set defaultValue dynamically
                          options={['g', 'kg', 'l', 'ml', 'kos']}
                          onChange={(id, value) => handleUnitChange(index, value)}
                      />
                  </div>
              </div>
          ))}

              <div style={{ display: 'flex', gap: '50px', paddingBottom: '10px',paddingTop: '10px'}}>
                <ButtonSend text="Dodaj" variant="outline-success" onClick={addIngredientRow} />
                <ButtonSend text="Odstrani" variant="outline-danger" onClick={removeIngredientRow} />
              </div>
              <ButtonSend text="Shrani recept" variant="primary" onClick={handleButtonClick}/>
              {notification && <div className="notification">{notification}</div>} {/* Notification */}
        </div>
    );
}
