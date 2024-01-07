import * as React from 'react';
import useAppContext from '../hooks/useAppContext';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {field: 'time', headerName: 'Time', width: 200},
  {field: 'address', headerName: 'Address', width: 300},
  { field: 'type', headerName: 'Type', width: 100 },
  { field: 'result', headerName: 'Result', width: 100 },
  { field: 'fee', headerName: 'Fee', width: 100 },
];


export default function TransactionGrid({onLoadMoreRows}) {

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 100,
  });

  const {
    state: { addresses, transactions },
  } = useAppContext();

  const MAX_ROW_LENGTH = addresses.reduce((sum, obj) => sum + obj.n_tx, 0);

  const [rowCountState, setRowCountState] = React.useState(
    MAX_ROW_LENGTH || 0,
  );

  const handlePageModelChange = (model) => {
    setPaginationModel(model);
    var offset = model.page * model.pageSize;
    onLoadMoreRows(offset);
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={transactions}
        columns={columns}
        paginationMode="server"
        rowCount={rowCountState}
        paginationModel={paginationModel}
        onPaginationModelChange={handlePageModelChange}
      />
    </div>
  );
}