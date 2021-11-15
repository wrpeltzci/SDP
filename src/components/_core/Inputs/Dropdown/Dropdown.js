import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Dropdown = ({
  id,
  label,
  handleChange,
  items=[],
  defaultLabel="Select One",
  variant="standard",
  ...props
}) => {

  return (
    <FormControl variant={variant}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={`${id}-label`}
        label={label}
        id={id}
        onChange={handleChange}
        {...props}
      >
        <MenuItem value="">
          <em>{defaultLabel}</em>
        </MenuItem>
        {
          items.map((item, key) =>
          <MenuItem value={item.value} key={key}>{item.label}</MenuItem>
          )
        }
      </Select>
    </FormControl>
  );
}

export default Dropdown;