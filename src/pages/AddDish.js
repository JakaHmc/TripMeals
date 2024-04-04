import React, { useState } from 'react';
import InputText from "../components/InputText";
import ButtonSend from '../components/ButtonSend';
import InputDropdown from '../components/InputDropdown';
import { db } from '../components/Firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default function Dodaj() {
  const [ingredientNames, setIngredientNames] = useState([]);
  const [ingredientAmounts, setIngredientAmounts] = useState([]);
  const [inputValues, setInputValues] = useState({
    name: '',
    meal: '',
  });
  const [alertSent, setAlertSent] = useState(false);
  const [ingredientRows, setIngredientRows] = useState(1); // Initial number of ingredient rows

  const handleInputChange = (id, value) => {
      setInputValues(prevState => ({
        ...prevState,
        [id]: value
      }));
    };

  const handleButtonClick = async () => {
    try {
      // Add the ingredients and amounts to inputValues
      const updatedInputValues = {
        ...inputValues,
        ingredients: ingredientNames,
        amounts: ingredientAmounts
      };
  
      // Add the document to Firestore
      const docRef = await addDoc(collection(db, 'items'), updatedInputValues);
      console.log("Document written with ID: ", docRef.id);
  
      // Reset alertSent state
      setAlertSent(true);
      setTimeout(() => {
        setAlertSent(false);
      }, 3000);
  
      // Clear only the necessary fields
      setInputValues(prevState => ({
        ...prevState,
        name: '',
        meal: ''
      }));
  
      // Reset ingredient names and amounts
      setIngredientNames([]);
      setIngredientAmounts([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  

  const addIngredientRow = () => {
    setIngredientRows(prevRows => prevRows + 1);
  };

  const removeIngredientRow = () => {
    setIngredientRows(prevRows => prevRows - 1);
    // Remove the last item from ingredientNames and ingredientAmounts arrays when removing ingredient row
    setIngredientNames(prevNames => prevNames.slice(0, -1));
    setIngredientAmounts(prevAmounts => prevAmounts.slice(0, -1));
  };

  return (
    <>
      <div className="container" style={{ paddingTop: '20px' }}>
        <div className="row">
          <div className="col-md-6">
            <InputText id="name" description="Name" placeholder="Ime jedi" onChange={handleInputChange} />
          </div>
          <div className="col-md-6">
            <InputDropdown id="meal" description="Meal" value={inputValues.meal} onChange={handleInputChange} />
          </div>
        </div>

        {[...Array(ingredientRows)].map((_, index) => (
          <div className="row" key={index}>
            <div className="col-md-6">
              <InputText
                id={`ingredient${index}`}
                description={`Ingredient ${index + 1}`}
                placeholder={`Sestavina ${index + 1}`}
                onChange={handleInputChange} // Ensure that handleInputChange is passed as onChange prop
              />
            </div>
            <div className="col-md-6">
              <InputText
                id={`amount${index}`}
                description={`Amount ${index + 1}`}
                placeholder={`Količina ${index + 1}`}
                onChange={handleInputChange} // Ensure that handleInputChange is passed as onChange prop
              />
            </div>
          </div>
        ))}
        <div className="row">
          <div className="col-md-12">
            <button className="btn btn-primary" onClick={addIngredientRow}>Add Ingredient</button>
            <button className="btn btn-primary" onClick={removeIngredientRow}>Remove Ingredient</button>
          </div>
        </div>
      </div>

      <div className="container-md" style = {{ paddingTop: '10px' }}>
        <ButtonSend text="Dodaj!" variant="primary" onClick={handleButtonClick}/>
        {alertSent && <div className="alert alert-warning" role="alert">Welkom</div>}
      </div>
    </>
  );
}
