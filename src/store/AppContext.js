import React, { createContext, useReducer } from 'react';
export const appContext = createContext();

const initialState = {
  addresses: [],
  transactions: [],
  selectedAddress: []
};

export const reducer = (
  oldState,
  action
) => {
  switch (action.type) {
    case 'SELECT_ADDRESSES':
      return {
        selectedAddress: [...action.selectedAddress],
        ...oldState
      }
    case 'DELETE_ADDRESS':
      return {
        addresses: [...oldState.addresses].filter((obj) => obj.address !== action.address),
        selectedAddress: [...oldState.addresses].filter((adr) => adr !== action.address),
        transactions: [],
        ...oldState
      };
    case 'ADD_ADDRESS':
      // make sure it's not duplicated
      if (![...oldState.addresses].find((item) => item['address'] === Object.keys(action.address)[0])){

        const flattenedAddressBalance = Object.entries(action.address).map(([key, value]) => ({
          id: key,
          address: key, // parse balance to divide 100000000
          converted_balance: value.final_balance/100000000,
          ...value,
        }));

        let parsedAddresses = [
          ...oldState.addresses,
          flattenedAddressBalance[0]
        ];
        
        // pre select all address
        const selectedAddressArr = parsedAddresses.map(obj=> obj.address);

        return {
          addresses: parsedAddresses,
          transactions: [],
          selectedAddress: selectedAddressArr
        }
      };
      return oldState;

    case 'UPDATE_TRANSACTIONS':
      return {
        ...oldState,
        transactions: action.transactions,
        selectedAddress: oldState.selectedAddress
      };

    case 'LOAD_MORE_TRANSACTIONS': 
      let newTransactions = [...oldState.transactions].concat(action.transactions);
      return {
        ...oldState,
        transactions: newTransactions,
        selectedAddress: oldState.selectedAddress
      };
        
    default:
      return oldState;
  }
};

export const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {children}
    </appContext.Provider>
  );
};
