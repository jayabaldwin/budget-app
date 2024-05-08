// Initially query list of all categories
// Set states to checked, if checked reveal text field


// Only return states
// Conditional state - if checked enable a text field

import { useState } from 'react';
import { Checkbox, TextField, FormControlLabel } from '@mui/material';

function App() {
  // State to track whether the checkbox is checked or not
  const [isChecked, setIsChecked] = useState(false);

  // State to hold the value of the text field
  const [textFieldValue, setTextFieldValue] = useState('');

  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // Function to handle text field change
  const handleTextFieldChange = (event) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        }
        label="Check me"
      />

      {/* Render text field only if checkbox is checked */}
      {isChecked && (
        <TextField
          label="Text Field"
          value={textFieldValue}
          onChange={handleTextFieldChange}
          variant="outlined"
          fullWidth
        />
      )}
    </div>
  );
}

export default App;

