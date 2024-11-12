import React, { FormEvent, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Button,
  Paper,
  Box,
  Snackbar,
  Alert,
  styled,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LocalizationService from '../utils/store';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(to right bottom, #ffffff, #fafafa)',
  margin: 'auto',  
  maxWidth: '100%', 
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  fontSize: '1.1rem',
  fontWeight: 600,
  borderRadius: theme.spacing(1),
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  },
}));

const AddTask = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: '',
    city: '',
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = [formData];
    LocalizationService({ key: 'taskData1', value: taskData });
    setOpenSnackbar(true);
    setFormData({
      name: '',
      dateOfBirth: '',
      gender: '',
      city: '',
    });
  };

  const cities = [
    { value: 'New Delhi', label: 'New Delhi' },
    { value: 'Kolkata', label: 'Kolkata' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Bangalore', label: 'Bangalore' },
  ];

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Box sx={{ width: '100%', my: 4 }}>
        <Typography
          variant={isSmallScreen ? 'h5' : 'h4'}
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            mb: 3,
          }}
        >
          Add Task
        </Typography>

        <StyledPaper elevation={3}>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              fullWidth
              margin="normal"
              required
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <TextField
              name="dateOfBirth"
              type="date"
              fullWidth
              margin="normal"
              required
              value={formData.dateOfBirth}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              label="Date of Birth"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: 2 },
              }}
            />

            <FormControl margin="normal" fullWidth sx={{ mb: 3 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                sx={{
                  justifyContent: 'space-around',
                  mt: 1,
                }}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
              <TextField
                select
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                label="City"
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.value} value={city.value}>
                    {city.label}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>

            <StyledButton type="submit" variant="contained" fullWidth disableElevation>
              Submit
            </StyledButton>
          </form>
        </StyledPaper>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Information submitted successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AddTask;
