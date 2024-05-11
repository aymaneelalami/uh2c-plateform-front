import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, TableSortLabel, Checkbox } from '@mui/material';

interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    isSortable?: boolean; // New property to indicate if the column is sortable
  }

  interface Data {
    [key: string]: string | number | boolean; // Assuming selection might add a boolean
  }

interface FullFeaturedTableProps {
  columns: Column[];
  rows: Data[];
}

const FullFeaturedTable: React.FC<FullFeaturedTableProps> = ({ columns, rows }) => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterName, setFilterName] = useState('');

    const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string | null>(null);

    const [selected, setSelected] = useState<string[]>([]);


    // Assuming we are filtering based on a 'name' property; adjust if needed
    const filteredRows = rows.filter(row =>
        row.name ? row.name.toString().toLowerCase().includes(filterName.toLowerCase()) : true
    );

    const handleSort = (columnId: string) => {
        const isAsc = orderBy === columnId && orderDirection === 'asc';
        setOrderDirection(isAsc ? 'desc' : 'asc');
        setOrderBy(columnId);
    };
    
    const sortData = (rows: Data[], orderBy: string | null, orderDirection: 'asc' | 'desc') => {
        if (!orderBy) return rows;
        return rows.sort((a, b) => {
        if (a[orderBy] < b[orderBy]) {
            return orderDirection === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
            return orderDirection === 'asc' ? 1 : -1;
        }
        return 0;
        });
    };
    
    // Apply sorting to filteredRows
    const sortedRows = sortData(filteredRows, orderBy, orderDirection);
  
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleFilterByName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFilterName(event.target.value);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          const newSelecteds = sortedRows.map((n) => n.name.toString());
          setSelected(newSelecteds);
          return;
        }
        setSelected([]);
      };
      
      const handleClick = (name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];
      
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
          );
        }
      
        setSelected(newSelected);
      };

      const handleClickRow = (name: string) => {
        const selectedIndex = selected.indexOf(name);
        console.log(selectedIndex);
      };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>

      <TextField
        value={filterName}
        onChange={handleFilterByName}
        placeholder="Filter by name"
        fullWidth
        size="small"
      />

      <TableContainer sx={{ minHeight: 540 }}>
        <Table stickyHeader size="small" aria-label="sticky table">

        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                <Checkbox
                    indeterminate={selected.length > 0 && selected.length < sortedRows.length}
                    checked={sortedRows.length > 0 && selected.length === sortedRows.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all desserts' }}
                />
                </TableCell>
                {columns.map((column) => (
                <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    style={{ minWidth: column.minWidth }}
                    sortDirection={orderBy === column.id ? orderDirection : false}
                >
                    {column.isSortable ? (
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? orderDirection : 'asc'}
                        onClick={() => handleSort(column.id)}
                    >
                        {column.label}
                    </TableSortLabel>
                    ) : (
                    column.label
                    )}
                </TableCell>
                ))}
            </TableRow>
        </TableHead>


        <TableBody>
            {sortedRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                const isItemSelected = selected.indexOf(row.name.toString()) !== -1; // Assuming 'name' uniquely identifies a row
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                    hover
                    onClick={(event) => handleClickRow(row.name.toString())} // 'name' is used for selection; adjust if necessary
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name} // Ensure 'name' is unique or use another unique identifier
                    selected={isItemSelected}
                    >
                    <TableCell padding="checkbox">
                        <Checkbox
                        onClick={(event) => handleClick(row.name.toString())}
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </TableCell>
                    {columns.map((column) => {
                        const value = row[column.id];
                        return (
                        <TableCell key={column.id} align={column.align}>
                            {value}
                        </TableCell>
                        );
                    })}
                    </TableRow>
                );
                })}
            </TableBody>

        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default FullFeaturedTable;
