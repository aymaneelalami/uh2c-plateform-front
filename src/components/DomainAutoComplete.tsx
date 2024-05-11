import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

interface DomainAutocompleteProps {
  onDomainSelect: (domainValue: string) => void;
  initialValue?: string; // Optional initialValue prop
}

const DomainAutocomplete = ({ onDomainSelect, initialValue }: DomainAutocompleteProps) => {
  // const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  // const [value, setValue] = useState<string | null>(initialValue || null);

  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState(null);

  // useEffect(() => {
  //   if (initialValue) {
  //     setValue(initialValue);
  //   }
  // }, [initialValue]);

  useEffect(() => {
    setInputValue(initialValue || '');
    setValue(initialValue);
  }, [initialValue]);


  useEffect(() => {
    const fetchDomains = async () => {
      if (inputValue.trim() === '') {
        setOptions([]);
        return;
      }

      try {
        // Assuming your API endpoint and response handling logic here
        const response = await axios.get(`http://localhost:8080/domains/search/${inputValue}`);
        setOptions(response.data.map((d: any) => d.name)); // Adapt based on your actual API response structure
      } catch (error) {
        console.error('Failed to fetch domains:', error);
        setOptions([]);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchDomains();
    }, 500); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [inputValue]);

  return (
    <Autocomplete
      //freeSolo
      value={value}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(_, newValue) => {
        setValue(newValue);
        onDomainSelect(newValue);
      }}
      options={options}
      renderInput={(params) => (
        <TextField {...params} label="Domain" variant="outlined" />
      )}
    />
  );
};

export default DomainAutocomplete;
