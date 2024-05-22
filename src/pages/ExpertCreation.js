import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createExpertCreationStart } from '../redux/actions/ExpertCreationActions';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
const ExpertCreation = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: '',
    username: '',
    email: '',
    roles: [],
    designation: '',
    employee_id_number: '',
    password: '',
    password_confirmation: '',
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .test('is-not-empty', 'Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),

    username: Yup.string()
      .test('is-not-empty', 'User Name is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'User Name must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'User Name is too short')
      .max(50, 'User Name is too long')
      .required('User Name is required'),
    email: Yup.string().email('Invalid email address format').required('Email is required'),
    designation: Yup.string()
      .test('is-not-empty', 'Designation is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Designation must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Designation is too short')
      .max(50, 'Designation is too long')
      .required('Designationis required'),
    roles: Yup.array().min(1, 'At Least One Role must be selected')
      .required('Role is required'),
    employee_id_number: Yup.string()
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, 'Employee ID must contain at least one alphabet and one number')
      .min(4, 'Employee ID must be at least 4 characters')
      .required('Employee ID is required'),

    password: Yup.string()
      .matches(
        /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&+=!]).*$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@#$%^&+=!)'
      )
      .min(8, 'Password must be at least 8 characters long')
      .max(20, 'Password cannot be longer than 20 characters')
      .required('Password is required'),

    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    dispatch(createExpertCreationStart(values));
    resetForm();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, m: 4, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              Expert Creation
            </Controls.Typography>
          </Controls.Box>
        </Controls.ReusablePaper>
        <form onSubmit={formik.handleSubmit}>
          <Controls.Container>
            <Controls.Paper sx={{
              padding: '15px',
              boxShadow: '10px 10px 80px rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
              backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor

            }} elevation={2}>
              <Controls.Grid rowSpacing={0} columnSpacing={2} container my={1} >
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid rowSpacing={0} columnSpacing={2} container my={1}>
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2" >Name</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Name"
                          placeholder=''
                          variant="outlined"
                          name="name"
                          type="text"
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.name && Boolean(formik.errors.name)}
                          helperText={formik.touched.name && formik.errors.name ? (<span style={{ color: 'red' }}>{formik.errors.name}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">UserName</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="User Name"
                          placeholder=''
                          variant="outlined"
                          name="username"
                          type="text"
                          value={formik.values.username}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.username && Boolean(formik.errors.username)}
                          helperText={formik.touched.username && formik.errors.username ? (<span style={{ color: 'red' }}>{formik.errors.username}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">Email</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Email"
                          placeholder=''
                          variant="outlined"
                          name="email"
                          type="text"
                          value={formik.values.email}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.email && Boolean(formik.errors.email)}
                          helperText={formik.touched.email && formik.errors.email ? (<span style={{ color: 'red' }}>{formik.errors.email}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">Role</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Role"
                          variant="outlined"
                          name="roles"
                          select
                          SelectProps={{
                            multiple: true,
                            MenuProps: {
                              PaperProps: {
                                sx: {
                                  backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                                },
                              },
                            },
                          }}
                          value={formik.values.roles}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.roles && Boolean(formik.errors.roles)}
                          helperText={formik.touched.roles && formik.errors.roles ? (<span style={{ color: 'red' }}>{formik.errors.roles}</span>) : ('')}

                        >
                          <Controls.MenuItem value="Employee">Expert</Controls.MenuItem>
                          <Controls.MenuItem value="Management">Management</Controls.MenuItem>
                        </Controls.TextField>
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">Designation</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Designation"
                          placeholder=''
                          variant="outlined"
                          name="designation"
                          type="text"
                          value={formik.values.designation}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.designation && Boolean(formik.errors.designation)}
                          helperText={formik.touched.designation && formik.errors.designation ? (<span style={{ color: 'red' }}>{formik.errors.designation}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">Employee Id Number</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Employee Id Number "
                          placeholder=''
                          variant="outlined"
                          name="employee_id_number"
                          type="text"
                          value={formik.values.employee_id_number}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.employee_id_number && Boolean(formik.errors.employee_id_number)}
                          helperText={formik.touched.employee_id_number && formik.errors.employee_id_number ? (<span style={{ color: 'red' }}>{formik.errors.employee_id_number}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2">Password</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Password"
                          placeholder=''
                          variant="outlined"
                          name="password"
                          type="text"
                          value={formik.values.password}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.password && Boolean(formik.errors.password)}
                          helperText={formik.touched.password && formik.errors.password ? (<span style={{ color: 'red' }}>{formik.errors.password}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12} sm={12} md={12}>
                  <Controls.Grid columnSpacing={2} container >
                    <Controls.Grid item xs={12} sm={12} md={3}>
                      <Controls.Box p={4}>
                        <Controls.Typography variant="subtitle2"> Confirm Password</Controls.Typography>
                      </Controls.Box>
                    </Controls.Grid>
                    <Controls.Grid item xs={12} sm={12} md={6}>
                      <Controls.Box p={2}>
                        <Controls.TextField
                          fullWidth
                          autoComplete='off'
                          label="Confirm Password"
                          placeholder=''
                          variant="outlined"
                          name="password_confirmation"
                          type="text"
                          value={formik.values.password_confirmation}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          error={formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                          helperText={formik.touched.password_confirmation && formik.errors.password_confirmation ? (<span style={{ color: 'red' }}>{formik.errors.password_confirmation}</span>) : ('')}
                        />
                      </Controls.Box>
                    </Controls.Grid>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid item xs={12}>
                  <Controls.Box pr={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                   
                   <Controls.FormAddCloseButton
                    buttonType="submit"
                    variant="contained"
                    buttonText= "Add" 
                  />
                  </Controls.Box>

                </Controls.Grid>
              </Controls.Grid>
            </Controls.Paper>
          </Controls.Container>
        </form>
      </>
    </ThemeProvider>
  );
};
export default ExpertCreation;
