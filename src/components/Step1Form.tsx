import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Container, Paper, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { StringSchema } from 'yup';
import { connect } from 'react-redux';
import Step2Form from './Step2Form';

const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  age: yup.number().required('Age is required').positive('Age must be a positive integer'),
  sex: yup.string().required('Sex is required').oneOf(['Male', 'Female'], 'Invalid sex'),
  mobile: yup.string().required('Mobile is required').matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid Indian mobile number'),
  idType: yup.string().oneOf(['Aadhar', 'Pan']).required('ID Type is required'),
  govtId: yup.string().when(['idType'], ([idType], schema: StringSchema) => {
    if (idType === 'Aadhar') {
      return schema.matches(/^[2-9][0-9]{11}$/, 'Invalid Aadhar number').required('Aadhar number is required');
    } else {
      return schema.matches(/^[A-Za-z0-9]{10}$/, 'Invalid PAN number').required('PAN number is required');
    }
  })
});
interface Step1FormProps {
    submitForm: (formData: any) => void; // Replace 'any' with the actual type of your form data
  }
  
  

const Step1Form:React.FC<Step1FormProps> = ({ submitForm })=>{


    const [isValidate,setIsValidate] =useState(false)
    const [personal, setPersonal] =useState({})
    const { control, handleSubmit, formState: { errors } , reset} = useForm({
        resolver: yupResolver(validationSchema)
      });
    
      const onSubmit = (data:any) => {
        setIsValidate(true)
        setPersonal(data)
        reset();
        if(data?.address){
            const form ={...personal,...data}
            submitForm(form);
            setIsValidate(false)
            reset();
        }

      };
    
      return (
            <Container className="flex items-center justify-center h-screen">
                {isValidate === true ? <Step2Form onSubmit={onSubmit}/> :
              <Paper elevation={2} className="p-8 " style={{ marginTop: '5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50%' }}>
                <Typography variant="h5"  gutterBottom style={{left:0, display:'flex', margin:'10px', textDecoration:'underline'}}>
                  Personal Details
                </Typography>
                <div style={{width:"70%"}}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', width: '100%'}}>
                  <FormControl  margin="normal" >
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Name"
                          error={!!errors.name}
                          helperText={errors.name?.message}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl  margin="normal">
                    <Controller
                      name="age"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          type="number"
                          label="Age"
                          error={!!errors.age}
                          helperText={errors.age?.message}
                        />
                      )}
                    />
                  </FormControl>
        
                  <FormControl  margin="normal">
                    <InputLabel id="sex-label" >Sex</InputLabel>
                    <Controller
                      name="sex"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="Sex"
                          error={!!errors.sex}
                        >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error>{errors.sex?.message}</FormHelperText>
                  </FormControl>

                  <FormControl  margin="normal">
                    <Controller
                      name="mobile"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Mobile"
                          error={!!errors.mobile}
                          helperText={errors.mobile?.message}
                        />
                      )}
                    />
                  </FormControl>
        
                  <FormControl  margin="normal">
                    <InputLabel id="idType-label">ID Type</InputLabel>
                    <Controller
                      name="idType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          label="ID Type"
                          error={!!errors.idType}
                        >
                          <MenuItem value="Aadhar">Aadhar</MenuItem>
                          <MenuItem value="Pan">PAN</MenuItem>
                        </Select>
                      )}
                    />
                    <FormHelperText error>{errors.idType?.message}</FormHelperText>
                  </FormControl>
        
                  <FormControl  margin="normal">
                    <Controller
                      name="govtId"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Government Issued ID"
                          error={!!errors.govtId}
                          helperText={errors.govtId?.message}
                        />
                      )}
                    />
                  </FormControl>
        
                  <Button type="submit" variant="contained" color="primary" className="mt-4">
                    Next
                  </Button>
                </form>

                </div>

              </Paper>}
            </Container>
      )
        
    } 

    const mapDispatchToProps = (dispatch:any) => ({
        submitForm: (formData:any) => dispatch({ type: 'SUBMIT_FORM', payload: formData }),
      });
      
      export default connect(null, mapDispatchToProps)(Step1Form);
    

// export default Step1Form; 