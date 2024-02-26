// Step2Form.tsx
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, FormControl, Paper, Typography, Container } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios'

interface Step2FormProps {
  onSubmit: (data: Step2FormData) => void;
}

interface Step2FormData {
  address?: string;
  state?: string;
  city?: string;
  country?: string;
  pincode?: number;
}

const validationSchema = yup.object().shape({
  address: yup.string().optional(),
  state: yup.string().optional(),
  city: yup.string().optional(),
  country: yup.string().optional(),
  pincode: yup.number().optional()
});

const Step2Form: React.FC<Step2FormProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<Step2FormData>({
    resolver: yupResolver(validationSchema),
  });
  const [countryOptions, setCountryOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const loadCountryOptions = async (inputValue: string) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${inputValue}`);
      const countries = response.data.map((country:any) => country.name.common);
      setCountryOptions(countries);
    } catch (error) {
      console.error('Error fetching country options:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (data: Step2FormData) => {
    onSubmit(data);
  };

  return (
    <Container className="flex items-center justify-center h-screen">
      <Paper elevation={3} className="p-8"  style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
        <Typography variant="h4" gutterBottom>
          Address Information
        </Typography>
        <div style={{width:"70%"}}>
        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
          <FormControl fullWidth margin="normal">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Address" />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="State" />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="City" />
              )}
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Country"
                  onChange={(e) => {
                    loadCountryOptions(e.target.value);
                    field.onChange(e);
                  }}
                  autoComplete="off"
                />
              )}
            />
            {loading && <p>Loading country options...</p>}
            {!loading && countryOptions.length > 0 && (
              <ul>
                {countryOptions.map((country:any) => (
                  <li key={country}>{country}</li>
                ))}
              </ul>
            )}
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Controller
              name="pincode"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="pincode" />
              )}
            />
          </FormControl>


          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Submit
          </Button>
        </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Step2Form;
