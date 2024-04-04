import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomeCard({ src, buttonText, destination }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (destination) {
      navigate(destination);
    }
  };

  return (
    <Card style={{ width: '18rem', display: 'flex', flexDirection: 'column' }}>
      <Card.Img variant="top" src={require(`../images/${src}`)} />
      <Card.Body style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button variant="primary" onClick={handleButtonClick}>{buttonText}</Button>
      </Card.Body>
    </Card>
  );
}

export default HomeCard;
