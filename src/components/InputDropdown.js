import React from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function InputDropdown({ id, description, value, onChange, options, defaultValue }) {
  const handleDropdownChange = (selectedValue) => {
    onChange(id, selectedValue);
  };

  // Determine the value to display
  const displayValue = value !== undefined ? value : defaultValue;

  return (
    <InputGroup className="mb-3" size="lg">
      <DropdownButton
        variant="outline-secondary"
        title={description}
        id={`input-dropdown-${id}`}
        onSelect={handleDropdownChange}
      >
        {options.map((option, index) => (
          <Dropdown.Item key={index} eventKey={option}>
            {option}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <Form.Control
        value={displayValue}
        readOnly
        aria-label="Text input with dropdown button"
      />
    </InputGroup>
  );
}

export default InputDropdown;
