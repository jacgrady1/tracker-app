import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import useAppContext from '../hooks/useAppContext';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function WalletSellect({onSelectedChange}) {
  

  const {
    state: { addresses, selectedAddress },
  } = useAppContext();

  const [adrs, setAdrs] = React.useState(selectedAddress);

  const addressArr = addresses.map(obj=> obj.address);
  
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    let addressPicked = typeof value === 'string' ? value.split(',') : value;
    setAdrs(
      addressPicked
    );
    onSelectedChange(addressPicked)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 600 }}>
        <InputLabel id="demo-multiple-checkbox-label">Address</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={adrs}
          onChange={handleChange}
          input={<OutlinedInput label="Address" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {addressArr.map((address) => (
            <MenuItem key={address} value={address}>
              <Checkbox checked={adrs.indexOf(address) > -1} />
              <ListItemText primary={address} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}