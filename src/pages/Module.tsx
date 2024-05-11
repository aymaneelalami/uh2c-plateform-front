import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 220 },
    { field: 'firstName', headerName: 'First name', width: 230 },
    { field: 'lastName', headerName: 'Last name', width: 230 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 230,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        sortable: false,
        width: 230,
        renderCell: (params) => (
            <>
                <Button
                    variant="contained"
                    endIcon={<EditIcon />}
                    onClick={() => handleEditButtonClick(params.row)}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteButtonClick(params.row)}
                >
                    Delete
                </Button>
            </>
        ),
    },
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

export default function MODULE() {
    const handleButtonClick = (row) => {
        // Handle button click event here
        console.log('Button clicked for row:', row);
    };

    return (
        <>

                <Typography variant="h2" noWrap component="div" >
                    MODULE
                </Typography>

                <Box >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10, 15]}
                        checkboxSelection
                        // disableColumnMenu
                    />
                </Box>
        </>
    );
}