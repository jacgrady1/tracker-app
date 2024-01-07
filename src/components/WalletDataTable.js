import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import useAppContext from '../hooks/useAppContext';

const columns = [
  { field: 'address', headerName: 'Address', width: 500 },
  { field: 'converted_balance', headerName: 'Balance', width: 130 },
  {
    field: 'n_tx',
    headerName: 'Transactions',
    type: 'number',
    width: 150,
  }
];

export default function WalletDataTable() {

  const {
    state: { addresses },
  } = useAppContext();
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={addresses}
        columns={columns}
        autoPageSize
      />
    </div>
  );
}