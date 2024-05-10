import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import {
  createReleavingDetailsStart,
  loadReleavingDetailsStart,
  updateReleavingDetailsStart
}
  from '../redux/actions/ExpertReleavingDetailsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Controls from "../components/Controls";
import { initialValues, generateValidationSchema, } from "../components/Validations";
import NoDataFound from '../components/NoDataComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert Name " },
  { id: "start_date", label: "Joining Date" },
  { id: "end_date", label: "Ending Date" },
  { id: "exit_type", label: "Exit Type" },
];
const ExpertReleavingData = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "expert_id",
    "exit_type",
    "start_date",
    "end_date",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createReleavingDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      dispatch(loadReleavingDetailsStart())
      setTimeout(() => { dispatch(loadReleavingDetailsStart()) }, 500);
    } else {
      dispatch(updateReleavingDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadReleavingDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadReleavingDetailsStart(page));
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertReleavingData = useSelector((state) => state.releavingdata?.data?.relieving_details || []);
  const totalPages = useSelector((state) => state.releavingdata?.data?.total_pages);
  useEffect(() => {
    dispatch(loadReleavingDetailsStart());
  }, [])
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
  ), [userInfo])

  const editHandler = (id) => {
    const user = expertReleavingData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user);
      handleOpen();
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
        data={expertReleavingData}
        hideDeleteIcon={true}
        editHandler={editHandler}
        allUsersData={allusersnamedata}
      />
    </Suspense>
  ), [columns, expertReleavingData,
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
                Expert Releaving Data
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
                      Releaving Data
                    </Controls.Typography>
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Expert Name"
                      id="expert_id"
                      name="expert_id"
                      select
                      fullWidth
                      variant="filled"
                      onBlur={formik.handleBlur}
                      value={formik.values.expert_id}
                      onChange={formik.handleChange}
                      error={formik.touched.expert_id && Boolean(formik.errors.expert_id)}
                      helperText={formik.touched.expert_id && formik.errors.expert_id ? (<span style={{ color: 'red' }}>{formik.errors.expert_id}</span>) : ('')}
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        InputProps={{
                          disableUnderline: true,
                        }}
                        renderInput={(params) => (
                          <Controls.TextField
                            fullWidth
                            variant='filled'
                            margin="dense"
                            name="start_date"
                            {...params}
                            error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                            helperText={formik.touched.start_date && formik.errors.start_date ? (<span style={{ color: 'red' }}>{formik.errors.start_date}</span>) : ('')}
                          />
                        )}
                        name="start_date"
                        value={formik.values.start_date}
                        onBlur={formik.handleBlur}
                        onChange={(startDate) => {
                          formik.setFieldTouched("start_date");
                          formik.setFieldValue("start_date", startDate ? startDate.toString() : '');
                        }}
                        inputFormat="DD-MM-YYYY"
                        placeholder="DD-MM-YYYY"
                        type="date"
                        label="Start Date"
                      />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        InputProps={{
                          disableUnderline: true,
                        }}
                        renderInput={(params) => (
                          <Controls.TextField
                            fullWidth
                            variant="filled"
                            margin="dense"
                            name="end_date"
                            {...params}
                            error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                            helperText={formik.touched.end_date && formik.errors.end_date ? (<span style={{ color: 'red' }}>{formik.errors.end_date}</span>) : ('')}
                          />
                        )}
                        name="end_date"
                        value={formik.values.end_date}
                        onBlur={formik.handleBlur}
                        onChange={(end_date) => {
                          formik.setFieldTouched("end_date");
                          formik.setFieldValue("end_date", end_date ? end_date.toString() : '');
                        }}
                        inputFormat="DD-MM-YYYY"
                        placeholder="DD-MM-YYYY"
                        type="date"
                        label="Date of Exit"
                      />
                    </LocalizationProvider>
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Exit Type "
                      id="exit_type"
                      name='exit_type'
                      type="text"
                      fullWidth
                      variant="filled"
                      onBlur={formik.handleBlur}
                      value={formik.values.exit_type}
                      onChange={formik.handleChange}
                      error={formik.touched.exit_type && Boolean(formik.errors.exit_type)}
                      helperText={formik.touched.exit_type && formik.errors.exit_type ? (<span style={{ color: 'red' }}>{formik.errors.exit_type}</span>) : ('')}
                    />
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
        {expertReleavingData?.length > 0 ? (


          <>
            <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
              {expertReleavingData?.length >= 0 && expertReleavingData
                ? (memoizedTable)
                : null}
            </Controls.Paper>

            <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <Controls.ReusablePagination
                onChange={handlePageChange}
                count={totalPages} color="success" />
            </Controls.Grid>
          </>
        ) : (
          <>
            <NoDataFound />
          </>
        )}
      </>
    </ThemeProvider>
  )
}
export default ExpertReleavingData;