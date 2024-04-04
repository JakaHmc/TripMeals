import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function InputText({ id, description, value, onChange, placeholder }) {
  const handleChange = (event) => {
    const uppercaseValue = event.target.value.toUpperCase();
    onChange(id, uppercaseValue);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Text id={`inputGroup-sizing-${id}`}>{description}</InputGroup.Text>
      <Form.Control
        id={id}
        value={value}
        onChange={handleChange}
        aria-label="Small"
        aria-describedby={`inputGroup-sizing-${id}`}
        placeholder={placeholder}
        size="lg"
      />
    </InputGroup>
  );
}

export default InputText;
