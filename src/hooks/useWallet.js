// import { useState, useEffect } from 'react';
// import useAppContext from './useAppContext';
// const walletUrl = 'https://blockchain.info/balance?active=';

// function useWallet(address) {
//   // const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);

//   const {
//     state: { addresses },
//     dispatch
//   } = useAppContext();

//   useEffect(() => {
//     // Fetch data from the API
//     const apiUrl = walletUrl + address;
//     fetch(apiUrl)
//       .then((response) => response.json())
//       .then((data) => {
//         // setData(data);
        
//         if (Object.keys(data).length && !data.error) {
//           console.log('dispataching .... ');
//           dispatch({ type: 'ADD_ADDRESS', address: data });
//         }
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//         setLoading(false);
//       });
//   }, [address]); // Re-fetch data when apiUrl changes

//   return { loading };
// }

// export default useWallet;
