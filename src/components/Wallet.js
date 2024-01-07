import React, { useState,  } from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import WalletDataTable from './WalletDataTable';
import useAppContext from '../hooks/useAppContext';


function Wallet() {
  // 3E8ociqZa9mZUSwGdSmAEMAoAxBK3FNDcd
  // bc1q0sg9rdst255gtldsmcf8rk0764avqy2h2ksqs5
  const [ address, setAddress] = useState('');
  const [isLoading, setLoading] = useState(false);
  const {
    dispatch
  } = useAppContext();

  const handleAddWallet = ()=> {
      // Fetch data from the API
      const walletUrl = 'https://blockchain.info/balance?active=';
      const apiUrl = walletUrl + address;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          if (Object.keys(data).length && !data.error) {
            dispatch({ type: 'ADD_ADDRESS', address: data });
          }
          setAddress('');
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
  }

  const handleDeleteWallet = () => {
    dispatch({ type: 'DELETE_ADDRESS', address: address });
  }
  
  
  return (
      <div>
        <h3 style={{marginTop: '20px'}}>Wallet</h3>
        <TextField style={{ margin: '10px' }} id="standard-basic" label="Address" variant="standard"  fullWidth onChange={(e) => setAddress(e.target.value)} value={address}/>
        
        <Button style={{ margin: '10px' }} variant="contained" onClick={handleAddWallet}>Add Wallet</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleDeleteWallet}>
          Delete
        </Button>
        <div style={{ margin: '10px' }}><WalletDataTable  /></div>
        
      </div>
  );
  
}

export default Wallet;