  import React from 'react';
  import CheckLogin from '../components/CheckLogin.js';
  import HomeCard from '../components/HomeCard.js';

  export default function Home() {
    return (
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '30px'
      }}>
        <HomeCard buttonText="Dodaj recept" src="chef.jpeg" destination="/add-dish" />
        <HomeCard buttonText="Izberi jedi za smučanje" src="cartman.jpeg" destination="/add-trip" />
        <HomeCard buttonText="Test" src="cartman.jpeg" destination="/test" />
      </div>
    );
  }
