import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createCertificateDetailsStart, loadCertificateDetailsStart, updateCertificateDetailsStart } from '../redux/actions/expertCertificateActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Name" },
  { id: "message", label: "Message" },
  { id: "note", label: "Note" },
  { id: "status", label: "Status" },
];
const style = {
  p: 4,
  top: '45%',
  left: '50%',
  width: 400,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const ExpertCertificateVarification = () => {

  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const initialValues = {
    expert_id: '',
    message: '',
    note: '',
    status: '',
  };
  const validationSchema = Yup.object({
    expert_id: Yup
      .string()
      .min(1, "Expert Name is Short!")
      .max(50, "Expert Name is Long!")
      .required('Expert Name is required!'),
    message: Yup
      .string()
      .test('is-not-empty', 'Message is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Message must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Message is too short')
      .max(50, 'Message is too long')
      .required('Message is required'),
    note: Yup
      .string()
      .test('is-not-empty', 'Note is required', value => value !== undefined && value.trim() !== '') // Check if the field is not empty
      .test('is-capitalized', 'First letter must be capitalized', value => /^[A-Z]/.test(value)) // Check if first letter is capitalized
      .matches(/^[A-Za-z\s]+$/, { message: 'Note must contain only alphabetic characters and spaces' }) // Allow spaces
      .min(2, 'Note is too short')
      .max(50, 'Note is too long')
      .required('Note is required'),
    // status
    status: Yup
      .string()
      .min(2, "Relationship is Short!")
      .max(50, "Relationship is Long!")
      .required('Status is required'),
  });
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createCertificateDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadCertificateDetailsStart()) }, 500);
    } else {
      dispatch(updateCertificateDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadCertificateDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadCertificateDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertcertificate = useSelector((state) => state.certificatedata?.data?.certificate_verification || []);
  const totalPages = useSelector((state) => state.certificatedata?.data?.total_pages);
  useEffect(() => {
    dispatch(loadCertificateDetailsStart());
  }, [])

  useEffect(() =>{
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })

  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    }
    else {
      setEditMode(false);
    }
  }, [userInfo]);

  useEffect(() => (
    setInitialFormValue(userInfo)
  ), [userInfo]);

  const editHandler = (id) => {
    const user = expertcertificate.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertcertificate}
        hideDeleteIcon={true}
        editHandler={editHandler}
        allUsersData={allusersnamedata}
      />
    </Suspense>
  ), [columns, expertcertificate,
    editHandler
  ]);

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>

              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Certificate Verfication
              </Controls.Typography>
              <Controls.ReusableButton
                startIcon={<Controls.AddIcon sx={{ mb: 1 }} />}
                onClick={() => {
                  handleOpen();
                }}
              />
            </Controls.Box>
          </Controls.ReusablePaper>
          <Controls.Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
              <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
                <Controls.Grid>
                  <Controls.Box sx={Controls.formBoxStyle}>
                    <Controls.Typography id="modal-modal-title" variant="h1" component="h2" sx={{ mb: 1 }}>
                      Certificate Verfication
                    </Controls.Typography>
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      type="text"
                      margin="dense"
                      id="expert_id"
                      variant="filled"
                      label="Expert Name"
                      name="expert_id"
                      onBlur={formik.handleBlur}
                      value={formik.values.expert_id}
                      onChange={formik.handleChange}
                      error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                      helperText={formik.touched.expert_id && formik.errors.expert_id ? (<span style={{ color: 'red' }}>{formik.errors.expert_id}</span>) : ('')}
                      select // Use 'select' for dropdown/select functionality
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                            },
                          },
                        },
                      }}
                    >
                      <Controls.MenuItem value="">Select</Controls.MenuItem>
                      {allusersnamedata.map((user) => (
                        <Controls.MenuItem key={user.id} value={user.id}>
                          {user.name}
                        </Controls.MenuItem>
                      ))}
                    </Controls.TextField>
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Message"
                      id="message"
                      name='message'
                      type="text"
                      fullWidth
                      variant="filled"
                      onBlur={formik.handleBlur}
                      value={formik.values.message}
                      onChange={formik.handleChange}
                      error={formik.touched.message && Boolean(formik.errors.message)}
                      helperText={formik.touched.message && formik.errors.message ? (<span style={{ color: 'red' }}>{formik.errors.message}</span>) : ('')}
                    />
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Note "
                      id="note"
                      name='note'
                      type="text"
                      fullWidth
                      variant="filled"
                      onBlur={formik.handleBlur}
                      value={formik.values.note}
                      onChange={formik.handleChange}
                      error={formik.touched.note && Boolean(formik.errors.note)}
                      helperText={formik.touched.note && formik.errors.note ? (<span style={{ color: 'red' }}>{formik.errors.note}</span>) : ('')}
                    />
                    <Controls.TextField
                      sx={{ marginTop: '9px' }}
                      InputProps={{
                        disableUnderline: true,
                      }}
                      select
                      fullWidth
                      variant='filled'
                      defaultValue=""
                      name='status'
                      label="Status Type"
                      id="status"
                      placeholder='merit type'
                      value={formik.values.status}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status ? (<span style={{ color: 'red' }}>{formik.errors.status}</span>) : ('')}
                      SelectProps={{
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, // Set background color for dropdown menu items box
                            },
                          },
                        },
                      }}
                    >
                      <Controls.MenuItem value="">Select</Controls.MenuItem>
                      <Controls.MenuItem value='pending'>Pending</Controls.MenuItem>
                      <Controls.MenuItem value='Completed'>Completed</Controls.MenuItem>
                    </Controls.TextField>
                    <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'20px' }}>
                   
                      <Controls.FormAddCloseButton
                        variant="contained"
                        onClick={() => {
                          handleClose();
                        }}
                        buttonText="Close"
                      />
                      <Controls.FormAddCloseButton
                        buttonType="submit"
                        variant="contained"
                        disabled={
                          editMode ? !formik.dirty || !isFormChanged() : false
                        }
                        buttonText={!editMode ? "Add" : "Update"}
                      />
                    </Controls.Typography>
                  </Controls.Box>
                </Controls.Grid>
              </Controls.Grid>
            </form>
          </Controls.Modal>
        </Controls.Box>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
          {expertcertificate?.length > 0 ? (
  
  
            <>
              <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
                {expertcertificate?.length >= 0 && expertcertificate
                  ? (memoizedTable)
                  : null}
              </Controls.Paper>
  
              <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                <Controls.ReusablePagination
                  onChange={handlePageChange}
                  count={totalPages} />
              </Controls.Grid>
            </>
          ) : (
            <>
              <NoDataFound />
            </>
          )}

          </>
        )}


      </>
    </ThemeProvider>
  )
}
export default ExpertCertificateVarification;