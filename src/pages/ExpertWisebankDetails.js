import React, { useState } from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { loadBankWiseDetailsStart } from '../redux/actions/expertPersonalWiseActions';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import ContactEmergencyRoundedIcon from '@mui/icons-material/ContactEmergencyRounded';
import Diversity1RoundedIcon from '@mui/icons-material/Diversity1Rounded';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ContactsIcon from '@mui/icons-material/Contacts';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
import BankDetails from './BankDetails';


import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { createBankDetailsStart, loadBankDetailsStart } from '../redux/actions/bankDetailsActions';
import { initialValues, generateValidationSchema } from "../components/Validations";



const ExpertWisebankDetails = () => {
  const { user_id } = useParams(); // Get the expert ID from URL params
  const id = parseInt(user_id);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false)
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [formChange, setFormChange] = useState(false);
  // const expertfamilywise = useSelector((state) => state.expertbankWiseData?.data?.data || []);
  // useEffect(() => {
  // dispatch(loadBankWiseDetailsStart(id));
  // }, [dispatch, id]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 800);
  // })
  // const message = expertfamilywise?.message ? false : true



  const formFields = ["bank_name", "account_number", "ifsc_code", "branch_name"];
  const validationSchema = generateValidationSchema(formFields);

  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createBankDetailsStart(values, id));
      toast.success('Data Added Successfully');
      // dispatch(loadBankDetailsStart(id));
      // window.location.reload();
    } else {
      dispatch(createBankDetailsStart(values, id));
      toast.success('Data Updated Successfully');
      // dispatch(loadBankDetailsStart(id));
    }
    resetForm();
    setEditMode(false);
    setTimeout(() => {
      dispatch(loadBankDetailsStart(id));
      setFormChange(false);
    }, 1000);
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  const bankData = useSelector((state) => state.bankdata?.data?.data[0] || '');
  useEffect(() => {
    dispatch(loadBankDetailsStart(id));
  }, [dispatch], id);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  })

  useEffect(() => {
    if (bankData) {
      setData(bankData);
      setEditMode(true);
      formik.setValues(bankData);
    } else {
      setData(initialValues);
      setEditMode(false);
      formik.setValues(initialValues);
    }
  }, [bankData]);
  return (

    <ThemeProvider theme={theme}>
      {/* {!message ? ( */}
      <>
        <Controls.Box sx={{ marginLeft: "0%" }}>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Bank Details
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        <Controls.Grid container sx={{ display: 'flex', width: '100%', paddingLeft: '0%' }}>
          <Controls.Grid container item md={12} sx={{ display: 'flex', justifyContent: 'center', backgroundColor: theme.palette.customColorOrange.main, padding: '35px 0px', borderRadius: '10px', }} >
            <Controls.Grid item md={8} sx={{ marginRight: '20px' }}>
              {loading ? (
                <LoadingComponent />
              ) : (
                <>
                  <Controls.Grid container sx={{ justifyContent: 'center' }}>
                    <Controls.Grid xs={10}>
                      <form onSubmit={formik.handleSubmit}>
                        <Controls.Container maxWidth='md' sx={{
                          my: 11, "&.MuiContainer-root": {
                            paddingLeft: 0,
                            paddingRight: 0
                          },
                        }}>
                          <Controls.Grid rowSpacing={1} columnSpacing={2} container my={2}>
                            <Controls.Grid item xs={12} sm={12} md={6} sx={{ padding: '10px 0px' }}>
                              <Controls.Box >
                                <Controls.TextField
                                  fullWidth
                                  autoComplete='off'
                                  label="Bank Name"
                                  placeholder='Bank Name'
                                  variant="outlined"
                                  name="bank_name"
                                  type="text"
                                  size='small'
                                  value={formik.values.bank_name}
                                  onBlur={formik.handleBlur}
                                  // onChange={formik.handleChange}
                                  onChange={(event) => {
                                    formik.handleChange(event);
                                    setFormChange(true);
                                  }}
                                  error={formik.touched.bank_name && Boolean(formik.errors.bank_name)}
                                  helperText={formik.touched.bank_name && formik.errors.bank_name ? (<span style={{ color: 'red' }}>{formik.errors.bank_name}</span>) : ('')}
                                />
                              </Controls.Box>
                            </Controls.Grid>
                            <Controls.Grid item xs={12} sm={12} md={6} sx={{ padding: '10px 0px' }}>
                              <Controls.Box  >
                                <Controls.TextField
                                  fullWidth
                                  autoComplete='off'
                                  label="Account Number"
                                  placeholder='Account Number'
                                  name="account_number"
                                  type="text"
                                  size='small'
                                  variant="outlined"
                                  value={formik.values.account_number}
                                  onBlur={formik.handleBlur}
                                  // onChange={formik.handleChange}
                                  onChange={(event) => {
                                    formik.handleChange(event);
                                    setFormChange(true);
                                  }}
                                  error={formik.touched.account_number && Boolean(formik.errors.account_number)}
                                  helperText={formik.touched.account_number && formik.errors.account_number ? (<span style={{ color: 'red' }}>{formik.errors.account_number}</span>) : ('')}
                                />
                              </Controls.Box>
                            </Controls.Grid>
                            <Controls.Grid item xs={12} sm={12} md={6} sx={{ padding: '10px 0px' }}>
                              <Controls.Box  >
                                <Controls.TextField
                                  fullWidth
                                  autoComplete='off'
                                  label="IFSC Code"
                                  placeholder='IFSC Code'
                                  name="ifsc_code"
                                  type="text"
                                  size='small'
                                  variant="outlined"
                                  value={formik.values.ifsc_code}
                                  onBlur={formik.handleBlur}
                                  // onChange={formik.handleChange}
                                  onChange={(event) => {
                                    formik.handleChange(event);
                                    setFormChange(true);
                                  }}
                                  error={formik.touched.ifsc_code && Boolean(formik.errors.ifsc_code)}
                                  helperText={formik.touched.ifsc_code && formik.errors.ifsc_code ? (<span style={{ color: 'red' }}>{formik.errors.ifsc_code}</span>) : ('')}
                                />
                              </Controls.Box>
                            </Controls.Grid>
                            <Controls.Grid item xs={12} sm={12} md={6} sx={{ padding: '10px 0px' }}>
                              <Controls.Box  >
                                <Controls.TextField
                                  fullWidth
                                  autoComplete='off'
                                  label="Branch Name"
                                  placeholder='Branch Name'
                                  name="branch_name"
                                  size='small'
                                  type="text"
                                  variant="outlined"
                                  value={formik.values.branch_name}
                                  onBlur={formik.handleBlur}
                                  // onChange={formik.handleChange}
                                  onChange={(event) => {
                                    formik.handleChange(event);
                                    setFormChange(true);
                                  }}
                                  error={formik.touched.branch_name && Boolean(formik.errors.branch_name)}
                                  helperText={formik.touched.branch_name && formik.errors.branch_name ? (<span style={{ color: 'red' }}>{formik.errors.branch_name}</span>) : ('')}
                                />
                              </Controls.Box>
                            </Controls.Grid>
                            <Controls.Grid item xs={12}>
                              <Controls.Box pr={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Controls.ReusableButton
                                  buttonType="submit"
                                  buttonVariant="contained"
                                  buttonColor={!editMode ? "info" : "success"}
                                  buttonText={!editMode ? "Add" : "Update"}
                                  disabled={!formChange}
                                />

                              </Controls.Box>
                            </Controls.Grid>
                          </Controls.Grid>
                        </Controls.Container>
                      </form>
                    </Controls.Grid>
                  </Controls.Grid>
                </>
              )}
            </Controls.Grid>
            <Controls.Grid container item md={3} sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', padding: '20px 0px', display: 'block', cursor: 'pointer', borderRadius: '10px' }} >
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/emergencydetails/${id}`)} >
                <ContactEmergencyRoundedIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Emergency Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/familydetails/${id}`)} >
                <Diversity1RoundedIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Family Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/skills/${id}`)} >
                <PsychologyIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Skills</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/workexperience/${id}`)} >
                <WorkHistoryIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }}>Work Experience</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/personaldetails/${id}`)} >
                <ContactsIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Personal Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', backgroundColor: theme.palette.error.main, color: theme.palette.success.main }} onClick={() => navigate(`/hr/experts/expertpage/bankdetails/${id}`)} >
                <AccountBalanceIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Bank Details</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/projects/${id}`)} >
                <FactCheckIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Projects</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{ padding: '10px 0px 10px 30px', display: 'flex', alignItems: 'center', color: theme.palette.error.main, '&:hover': { backgroundColor: theme.palette.error.main, color: theme.palette.success.main } }} onClick={() => navigate(`/hr/experts/expertpage/leavebank/${id}`)}>
                <PersonOffIcon />
                <Controls.Typography sx={{ paddingLeft: '10px' }} >Leave Bank</Controls.Typography>
              </Controls.Grid>
            </Controls.Grid>
          </Controls.Grid>
        </Controls.Grid>
      </>
      

    </ThemeProvider>
  );
};
export default ExpertWisebankDetails;