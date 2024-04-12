import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ButtonSend({ onClick, variant, text, small }) {
    return (
        <Button size={small ? "sm" : "lg"} 
        style= {{borderColor: 'black'}} //, backgroundColor:'purple', color:'red' 
        variant={variant} onClick={onClick}>{text}</Button>
    );
}
