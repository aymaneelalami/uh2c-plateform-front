import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// import { emit } from 'process';
import DomainAutoComplete from '../components/DomainAutoComplete';

// Helper function to generate a unique ID for each field
const generateId = () => Math.random().toString(36).substr(2, 9);

function EntityFormWithFields({ entity, onEntitySubmit }: EntityFormWithFieldsProps) {

    const [entityDetails, setEntityDetails] = useState<EntityDetails>({ name: '', key: '', fields: [], domain: '' });
  
    useEffect(() => {

        if (entity) {
          setEntityDetails(entity);
        } 
        else {
          setEntityDetails({ name: '', key: '', fields: [], domain: '' });
        }
      }, [entity]);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEntityDetails({ ...entityDetails, [e.target.name]: e.target.value });
    };
  
    const handleFieldChange = (index: number, field: Partial<EntityField>) => {
      const newFields = [...entityDetails.fields];
      newFields[index] = { ...newFields[index], ...field };
      setEntityDetails({ ...entityDetails, fields: newFields });
    };
  
    const handleAddField = () => {
      setEntityDetails({
        ...entityDetails,
        fields: [...entityDetails.fields, { id: generateId(), name: '', key: '', type: '' }],
      });
    };
  
    const handleDeleteField = (index: number) => {
      const newFields = [...entityDetails.fields];
      newFields.splice(index, 1);
      setEntityDetails({ ...entityDetails, fields: newFields });
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      //onEntitySubmit(entityDetails);
    };

    const handleDomainSelect = (domainValue) => {
        // Update your entity state or form field with the selected domainValue
        console.log(domainValue); // Do something with the selected domain
      };

      const handleDomainClean = () => {
        // Update your entity state or form field with the selected domainValue
        console.log("Cleaned"); // Do something with the selected domain
      };

      const handleAddNewEntity = () => {
        // Assuming `setEntityDetails` is the state setter for the form's entity
        setEntityDetails({ name: '', key: '', domain: '', fields: [] });
      };

      const handleSubmitEntity = () => {
        // Assuming `setEntityDetails` is the state setter for the form's entity
        console.log(JSON.stringify(entityDetails));
        setEntityDetails({ name: '', key: '', domain: '', fields: [] });
      };
  
  
    return (
      
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
        {/* <TextField
          margin="normal"
          required
          fullWidth
          id="domain"
          label="Domain"
          name="domain"
          value={entityDetails.domain}
          onChange={handleInputChange}
          autoFocus
        /> */}
{/* 
      <Box display="flex" justifyContent="flex-end" mb={4}>
        <Button variant="contained" color="primary" onClick={handleAddNewEntity}>
          Add New Entity
        </Button>
      </Box> */}

        <DomainAutoComplete 
          onDomainSelect={handleDomainSelect} 
          initialValue={entityDetails.domain}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Entity Name"
          name="name"
          value={entityDetails.name}
          onChange={handleInputChange}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="key"
          label="Entity Key"
          id="key"
          value={entityDetails.key}
          onChange={handleInputChange}
        />
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Key</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>
                  <IconButton onClick={handleAddField}>
                    <AddIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entityDetails.fields?.map((field, index) => (
                <TableRow key={field.id}>
                  <TableCell>
                    <TextField
                      value={field.name}
                      onChange={(e) => handleFieldChange(index, { name: e.target.value })}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      value={field.key}
                      onChange={(e) => handleFieldChange(index, { key: e.target.value })}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth size="small">
                      <InputLabel>Type</InputLabel>
                      <Select
                        value={field.type}
                        label="Type"
                        onChange={(e) => handleFieldChange(index, { type: e.target.value })}
                      >
                        <MenuItem value="Text">Text</MenuItem>
                        <MenuItem value="Integer">Integer</MenuItem>
                        <MenuItem value="Real">Real</MenuItem>
                        <MenuItem value="Entity">Entity</MenuItem>
                        <MenuItem value="Select">Select</MenuItem>
                        <MenuItem value="Large Text">Large Text</MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteField(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} onClick={handleSubmitEntity}>
          Save Entity
        </Button> */}
      </Box>
    );
  }
  
export default EntityFormWithFields;