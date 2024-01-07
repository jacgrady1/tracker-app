import React, { useState, useEffect } from 'react';
import TransactionGrid from './TransactionGrid'; 
import useAppContext from '../hooks/useAppContext';
import parseTxs from '../utils/dataParser';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import WalletSellect from './WalletSelect';

function Transactions() {
  const {
    state: { selectedAddress},
    dispatch
  } = useAppContext();
  const [isLoading, setLoading ] = useState(true);
  const [selectedAdr, setSelectedAdr] = useState(selectedAddress);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const walletUrl = 'https://blockchain.info/multiaddr?active=';
    const extractedAddresses = selectedAdr.join('|');
    
    const apiUrl = walletUrl + extractedAddresses;
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const parsedData = parseTxs(data);
          if (parsedData) {
            dispatch({ type: 'UPDATE_TRANSACTIONS', transactions: parsedData });
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
  }, [selectedAdr]);


  useEffect(() => {
    // TODO: add a util function to aggregate code
    const walletUrl = 'https://blockchain.info/multiaddr?active=';
    const extractedAddresses = selectedAdr.join('|');
    
    const apiUrl = walletUrl + extractedAddresses + '&offset=' + offset;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const parsedData = parseTxs(data);
        if (parsedData.length) {
          dispatch({ type: 'UPDATE_TRANSACTIONS', transactions: parsedData });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [offset]);


  const handleSelected = (adrs) =>{
    setSelectedAdr(adrs);
  }

  const handleLoadMoreRows = (newOffset) => {
    setOffset(newOffset);
  }

  
  return (
      <div>
        <h3 style={{marginTop: '20px'}}>Transactions</h3>
        {isLoading ?
          (<Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>) : 
          (
              <Box>
                <WalletSellect onSelectedChange={handleSelected}/>
                <div style={{ margin: '10px' }}>
                  <TransactionGrid onLoadMoreRows={handleLoadMoreRows}/>
                </div>
              </Box>
          )
        } 
      </div>
  );
  
}

export default Transactions;