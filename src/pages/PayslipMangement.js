
import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPayslipDetailsStart } from '../redux/actions/expertPayslipsActions';
import { createPaySlipDetailsApi } from '../redux/apis/expertPaySlipApi';
import { initialValues, generateValidationSchema, } from "../components/Validations";
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from "@mui/material/Grid";
import theme from "../Theme";
import PleasEnterDataImgComponent from '../components/PleaseEnterDataImgComponent';
const PayslipMangement = (data) => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formChange , setFormChange] = useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "salary",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const [storedResult, setStoredResult] = useState(null);
  const handleSubmit = async (values, { setStatus, resetForm }) => {
    setStatus();
    try {
      const result = await createPaySlipDetailsApi(values);
      setStoredResult(result); // Update storedResult state with the fetched result
      dispatch(createPayslipDetailsStart(values));
      if (formik.isValid) {
        setFormChange(true);
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.Grid container spacing={2} justifyContent='center'>
            <Controls.Grid item xs={2.2}>
              <Controls.ReusablePaper elevation={1} sx={{ padding: '0px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
                <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  {/* <Controls.ResuableHeaderTypo
                  typographyComponent="span"
                  typographyVariant="h6"
                  sx={{ fontSize: '23px', mt: 1.5, ml: 2, mb: 1.5 }}
                  typographyText="Expert PaySlip"
                /> */}
                  <Controls.Typography variant="h2" sx={{ mt: 1.5, ml: 2, mb: 1.5 }}>
                    PaySlip
                  </Controls.Typography>
                </Controls.Box>
              </Controls.ReusablePaper>
            </Controls.Grid>
            <Controls.Grid item xs={8}>
              <Controls.ReusablePaper elevation={1} sx={{ padding: '5px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
                <Controls.Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      formik.handleSubmit(e);
                    }}
                    autoComplete="off"
                  >
                    {/* <Controls.TextField
                      sx={{  width: '65%',margin:'5px 0px' }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      
                      fullWidth
                      size="small"
                      type="text"
                      margin="dense"
                      id="salary"
                      variant="outlined"
                      label="Salary(CTC)"
                      name="salary"
                      onBlur={formik.handleBlur}
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      error={formik.touched.salary && Boolean(formik.errors.salary)}
                      helperText={formik.touched.salary && formik.errors.salary}
                    /> */}
                    <Controls.TextField
                      sx={{
                        width: '65%',
                        margin: '5px 0px',
                        '& .MuiOutlinedInput-root': {
                          borderRadius: theme.shape.borderRadius,
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: theme.palette.error.main,
                          },
                        },
                        '& .MuiInputLabel-root': {
                          color: theme.palette.error.main,
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                          border: '2px solid',
                          borderColor: theme.palette.error.main,
                          borderRadius: '10px',
                        },
                        '& .MuiInputLabel-outlined.Mui-focused': {
                          color: theme.palette.error.main,
                        },
                        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                          backgroundColor: theme.palette.error.main,
                        },
                        '& .MuiAutocomplete-option[data-focus="true"]': {
                          backgroundColor: theme.palette.error.main,
                        },
                        '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
                          backgroundColor: theme.palette.error.main,
                          '& .MuiAutocomplete-listbox': {
                            backgroundColor: theme.palette.error.main,
                          },
                        },
                      }}
                      fullWidth
                      size="small"
                      type="text"
                      margin="dense"
                      id="salary"
                      variant="outlined"
                      label="Salary(CTC)"
                      name="salary"
                      onBlur={formik.handleBlur}
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      error={formik.touched.salary && Boolean(formik.errors.salary)}
                      helperText={formik.touched.salary && formik.errors.salary}
                    />
                    <Controls.ReusableButton
                      buttonType="submit"
                      buttonVariant="contained"
                      buttonColor="info"
                      buttonText={!editMode ? "Submit" : "Update"}
                      sx={{
                        width: 55,
                        // height: 45,
                        marginTop: '5px',
                        ml: 5,
                        bgcolor: theme.components.MuiButton.styleOverrides.containedCustom.backgroundColor,
                        '&:hover': {
                          bgcolor: theme.components.MuiButton.styleOverrides.containedCustom.backgroundColor,
                        },
                        textTransform: 'none',
                        borderRadius: '10px',
                        boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                      }}
                    />

                  </form>
                </Controls.Box>
              </Controls.ReusablePaper>
            </Controls.Grid>
            {storedResult && storedResult.data && (
              <Controls.Grid container spacing={2} justifyContent='center'>
                <Controls.Grid item xs={10}>
                  <Controls.Paper sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor }}>
                    <Box
                      sx={{
                        margin: '20px',
                        padding: '16px',
                        // border: '1px solid #ccc',
                        borderRadius: '8px',
                        // backgroundColor: '#f9f9f9',
                        maxWidth: '1000px',
                        textAlign: 'left',
                      }}
                    >
                      <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
                        Actimize Software Solutions Pvt.Ltd.
                      </Typography>
                      <Typography variant="subtitle2" gutterBottom style={{ textAlign: 'center' }}>
                        IT Services and IT Consulting Mandapeta, Andhra Pradesh.
                      </Typography>
                      <Typography variant="h2" gutterBottom style={{ textAlign: 'center' }}>
                        Pay Slip
                      </Typography>

                      <Box sx={{ marginBottom: '1px', border: '1px solid', borderColor: theme.palette.error.main, borderRadius: '8px', padding: '16px' }}>

                        <Box sx={{ marginBottom: '1px', borderRadius: '8px', padding: '16px' }}>
                          <Typography variant="h1" gutterBottom>
                            Earnings
                          </Typography>
                          <Divider sx={{ marginBottom: '8px', height: '2px', backgroundColor: theme.palette.error.main }} />
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">Basic Salary</Typography>
                              <Typography variant="h6">HRA</Typography>
                              <Typography variant="h6">Conveyance Allowance</Typography>
                              <Typography variant="h6">Medical Allowance</Typography>
                              <Typography variant="h6">Other Allowance</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>


                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Basic : 'Loading...'}</Typography>
                              <Typography variant="h6">    {storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.HRA : 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Conveyance : 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Medical : 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult && storedResult.data && storedResult.data.Basic ? storedResult.data.Other : 'Loading...'}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ marginBottom: '1px', borderRadius: '8px', padding: '16px' }}>
                          <Typography variant="h1" gutterBottom>
                            Deductions
                          </Typography>
                          <Divider sx={{ marginBottom: '8px', height: '2px', backgroundColor: theme.palette.error.main }} />
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">Professional Tax</Typography>
                              <Typography variant="h6">TDS (Monthly) - Old</Typography>
                              <Typography variant="h6">TDS (Monthly) - New</Typography>
                              <Typography variant="h6">TDS (Yearly) - Old</Typography>
                              <Typography variant="h6">TDS (Yearly) - New</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">  {storedResult?.data?.Deductions?.Professional_Tax ?? 'Loading...'}</Typography>
                              <Typography variant="h6">     {storedResult?.data?.Deductions?.['TDS_Monthly']?.New ?? 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult?.data?.Deductions?.['TDS_Monthly']?.Old ?? 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult?.data?.TDS_Yearly?.New ?? 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult?.data?.TDS_Yearly?.Old ?? 'Loading...'}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ marginBottom: '1px', borderRadius: '8px', padding: '16px' }}>
                          <Typography variant="h1" gutterBottom>
                            Net Salary
                          </Typography>
                          <Divider sx={{ marginBottom: '8px', height: '2px', backgroundColor: theme.palette.error.main }} />
                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">Net Salary - Old:</Typography>
                              <Typography variant="h6">Net Salary - New:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant="h6">:</Typography>
                              <Typography variant="h6">:</Typography>



                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">{storedResult?.data?.Net_Salary?.New ?? 'Loading...'}</Typography>
                              <Typography variant="h6">{storedResult?.data?.Net_Salary?.Old ?? 'Loading...'}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                        <Box sx={{ marginBottom: '1px', borderRadius: '8px', padding: '16px' }}>
                          <Typography variant="h1" gutterBottom>
                            Total CTC
                          </Typography>
                          <Divider sx={{ marginBottom: '8px', height: '2px', backgroundColor: theme.palette.error.main }} />

                          <Grid container spacing={2}>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6"> Total CTC:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                              <Typography variant="h6">:</Typography>
                            </Grid>
                            <Grid item xs={12} sm={5}>
                              <Typography variant="h6">  {storedResult?.data?.Total_CTC ?? 'Loading...'}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Controls.Paper>
                </Controls.Grid>
              </Controls.Grid>
            )}
          </Controls.Grid>
          {!formChange ? (
            <Controls.Grid container sx={{justifyContent:'center'}}>
            <PleasEnterDataImgComponent text='Salary'  />
              </Controls.Grid>
          ) : ('')}
        </Controls.Box>
      </>
    </ThemeProvider>
  )
}
export default PayslipMangement;


