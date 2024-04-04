import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../components/Firebase";
import { Link } from 'react-router-dom';

export default function AddTrip() {
  const [tripName, setTripName] = useState('');

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleAddTrip = async () => {
    try {
      // Add a document with a generated ID
      await addDoc(collection(db, "trips"), {
        name: tripName
      });
      
      // If you need to handle success
      console.log("Trip added successfully!");

      // Clear the input field after adding the trip
      setTripName('');
    } catch (error) {
      console.error("Error adding trip: ", error);
    }
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Add Trip</h1>
      <input type="text" value={tripName} onChange={handleTripNameChange} placeholder="Enter trip name" />
      <button onClick={handleAddTrip}>Add Trip</button>
    </div>
  );
}
