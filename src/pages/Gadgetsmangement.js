import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Controls from "../components/Controls";
import { createGadgetDetailsStart, deleteGadgetDetailsStart, loadGadgetDetailsStart, updateGadgetDetailsStart } from '../redux/actions/expertGadgetsActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const style = {
  p: 4,
  top: '52%',
  left: '50%',
  width: 800,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '500vw',
  overflowY: 'auto',
  borderRadius: '5px',
  position: 'absolute',
  backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,
  transform: 'translate(-50%, -50%)',
};
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert Name" },
  { id: "email_id", label: "Email Id" },
  { id: "mobile_number", label: "Contact Number" },
];
const Gadgetsmangement = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const formFields = [
    "expert_id",
    "employee_id",
    "designation",
    "department",
    "reporting_to",
    "email_id",
    "mobile_number",
    "working_location",
    "serial_number",
    "model",
    "color",
    "charger",
    "keyboard",
    "mouse",
    "bag",
    "made_by"
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createGadgetDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadGadgetDetailsStart()) }, 500);
    }
    else {
      dispatch(updateGadgetDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadGadgetDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadGadgetDetailsStart(page));
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertsGadgetsData = useSelector((state) => state.expertGadgetdata?.data?.gadget || []);
  const totalPages = useSelector((state) => state.expertGadgetdata?.data?.total_pages);
  useEffect(() => {
    dispatch(loadGadgetDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])

  const editHandler = (id) => {
    const user = expertsGadgetsData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteGadgetDetailsStart(id));
      setTimeout(() => {
        dispatch(loadGadgetDetailsStart());
      }, 500);
    }
  };
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
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertsGadgetsData}
        allUsersData={allusersnamedata}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, expertsGadgetsData,
    editHandler,
    deleteHandler
  ]);

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  const message = expertsGadgetsData?.length > 0 ? true : false

  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>

              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert Gadgets
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
              <Controls.Grid rowSpacing={5} columnSpacing={1} container my={1}>
                <Controls.Grid>
                  <Controls.Box sx={style}>
                    <Controls.Typography id="modal-modal-title" variant="h1" component="h2" >
                      Employee/Vendor Details
                    </Controls.Typography>
                    <Controls.Grid container rowSpacing={-1} columnSpacing={1} my={1}>
                      <Controls.Grid item xs={6}>
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
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="employee_id"
                          variant="filled"
                          label="Employee Id"
                          name="employee_id"
                          onBlur={formik.handleBlur}
                          value={formik.values.employee_id}
                          onChange={formik.handleChange}
                          error={formik.touched.employee_id && Boolean(formik.errors.employee_id)}
                          helperText={formik.touched.employee_id && formik.errors.employee_id ? (<span style={{ color: 'red' }}>{formik.errors.employee_id}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="designation"
                          variant="filled"
                          label="Designation "
                          name="designation"
                          onBlur={formik.handleBlur}
                          value={formik.values.designation}
                          onChange={formik.handleChange}
                          error={formik.touched.designation && Boolean(formik.errors.designation)}
                          helperText={formik.touched.designation && formik.errors.designation ? (<span style={{ color: 'red' }}>{formik.errors.designation}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="department"
                          variant="filled"
                          label="Department "
                          name="department"
                          onBlur={formik.handleBlur}
                          value={formik.values.department}
                          onChange={formik.handleChange}
                          error={formik.touched.department && Boolean(formik.errors.department)}
                          helperText={formik.touched.department && formik.errors.department ? (<span style={{ color: 'red' }}>{formik.errors.department}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="reporting_to"
                          variant="filled"
                          label="Reporting To "
                          name="reporting_to"
                          onBlur={formik.handleBlur}
                          value={formik.values.reporting_to}
                          onChange={formik.handleChange}
                          error={formik.touched.reporting_to && Boolean(formik.errors.reporting_to)}
                          helperText={formik.touched.reporting_to && formik.errors.reporting_to ? (<span style={{ color: 'red' }}>{formik.errors.reporting_to}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="email_id"
                          variant="filled"
                          label="Email Id "
                          name="email_id"
                          onBlur={formik.handleBlur}
                          value={formik.values.email_id}
                          onChange={formik.handleChange}
                          error={formik.touched.email_id && Boolean(formik.errors.email_id)}
                          helperText={formik.touched.email_id && formik.errors.email_id ? (<span style={{ color: 'red' }}>{formik.errors.email_id}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="mobile_number"
                          variant="filled"
                          label="Mobile Number"
                          name="mobile_number"
                          onBlur={formik.handleBlur}
                          value={formik.values.mobile_number}
                          onChange={formik.handleChange}
                          error={formik.touched.mobile_number && Boolean(formik.errors.mobile_number)}
                          helperText={formik.touched.mobile_number && formik.errors.mobile_number ? (<span style={{ color: 'red' }}>{formik.errors.mobile_number}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="working_location"
                          variant="filled"
                          label="Working Location"
                          name="working_location"
                          onBlur={formik.handleBlur}
                          value={formik.values.working_location}
                          onChange={formik.handleChange}
                          error={formik.touched.working_location && Boolean(formik.errors.working_location)}
                          helperText={formik.touched.working_location && formik.errors.working_location ? (<span style={{ color: 'red' }}>{formik.errors.working_location}</span>) : ('')}
                        />
                      </Controls.Grid>
                    </Controls.Grid>
                    <Controls.Typography id="modal-modal-title" variant="h1" component="h2" >
                      Device&Accessories
                    </Controls.Typography>

                    <Controls.Grid container rowSpacing={-1} columnSpacing={1} my={1}>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="made_by"
                          variant="filled"
                          label="Made By"
                          name="made_by"
                          onBlur={formik.handleBlur}
                          value={formik.values.made_by}
                          onChange={formik.handleChange}
                          error={formik.touched.made_by && Boolean(formik.errors.made_by)}
                          helperText={formik.touched.made_by && formik.errors.made_by ? (<span style={{ color: 'red' }}>{formik.errors.made_by}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField sx={{ marginTop: '9px' }}
                          select
                          fullWidth
                          variant='filled'
                          defaultValue=""
                          name='charger'
                          label="Charger"
                          placeholder='Select Leave'
                          value={formik.values.charger}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const isCharger = selectedValue === 'true'; // Convert string to boolean
                            formik.setFieldValue('charger', isCharger);
                          }}
                          error={formik.touched.charger && Boolean(formik.errors.charger)}
                          helperText={formik.touched.charger && formik.errors.charger ? (<span style={{ color: 'red' }}>{formik.errors.charger}</span>) : ('')}
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
                          <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                          <Controls.MenuItem value='false'>No</Controls.MenuItem>
                        </Controls.TextField>
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="serial_number"
                          variant="filled"
                          label="Serial Number "
                          name="serial_number"
                          onBlur={formik.handleBlur}
                          value={formik.values.serial_number}
                          onChange={formik.handleChange}
                          error={formik.touched.serial_number && Boolean(formik.errors.serial_number)}
                          helperText={formik.touched.serial_number && formik.errors.serial_number ? (<span style={{ color: 'red' }}>{formik.errors.serial_number}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField sx={{ marginTop: '9px' }}
                          select
                          fullWidth
                          variant='filled'
                          defaultValue=""
                          name='keyboard'
                          label="Keyboard"
                          placeholder=''
                          value={formik.values.keyboard}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const iskeyboard = selectedValue === 'true';
                            formik.setFieldValue('keyboard', iskeyboard);
                          }}
                          error={formik.touched.keyboard && Boolean(formik.errors.keyboard)}
                          helperText={formik.touched.keyboard && formik.errors.keyboard ? (<span style={{ color: 'red' }}>{formik.errors.keyboard}</span>) : ('')}
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
                          <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                          <Controls.MenuItem value='false'>No</Controls.MenuItem>
                        </Controls.TextField>
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="model"
                          variant="filled"
                          label="Model/Type"
                          name="model"
                          onBlur={formik.handleBlur}
                          value={formik.values.model}
                          onChange={formik.handleChange}
                          error={formik.touched.model && Boolean(formik.errors.model)}
                          helperText={formik.touched.model && formik.errors.model ? (<span style={{ color: 'red' }}>{formik.errors.model}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField sx={{ marginTop: '9px' }}
                          select
                          fullWidth
                          variant='filled'
                          defaultValue=""
                          name='mouse'
                          label="Mouse"
                          placeholder=''
                          value={formik.values.mouse}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const ismouse = selectedValue === 'true';
                            formik.setFieldValue('mouse', ismouse);
                          }}
                          error={formik.touched.mouse && Boolean(formik.errors.mouse)}
                          helperText={formik.touched.mouse && formik.errors.mouse ? (<span style={{ color: 'red' }}>{formik.errors.mouse}</span>) : ('')}
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
                          <Controls.MenuItem value="" >Select</Controls.MenuItem>
                          <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                          <Controls.MenuItem value='false'>No</Controls.MenuItem>
                        </Controls.TextField>
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField
                          InputProps={{
                            disableUnderline: true,
                          }}
                          fullWidth
                          type="text"
                          margin="dense"
                          id="color"
                          variant="filled"
                          label="Color "
                          name="color"
                          onBlur={formik.handleBlur}
                          value={formik.values.color}
                          onChange={formik.handleChange}
                          error={formik.touched.color && Boolean(formik.errors.color)}
                          helperText={formik.touched.color && formik.errors.color ? (<span style={{ color: 'red' }}>{formik.errors.color}</span>) : ('')}
                        />
                      </Controls.Grid>
                      <Controls.Grid item xs={6}>
                        <Controls.TextField sx={{ marginTop: '9px' }}
                          select
                          fullWidth
                          variant='filled'
                          defaultValue=""
                          name='bag'
                          label="Bag"
                          placeholder=''
                          value={formik.values.bag}
                          onBlur={formik.handleBlur}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            const isbag = selectedValue === 'true';
                            formik.setFieldValue('bag', isbag);
                          }}
                          error={formik.touched.bag && Boolean(formik.errors.bag)}
                          helperText={formik.touched.bag && formik.errors.bag ? (<span style={{ color: 'red' }}>{formik.errors.bag}</span>) : ('')}
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
                          <Controls.MenuItem value='true'>Yes</Controls.MenuItem>
                          <Controls.MenuItem value='false'>No</Controls.MenuItem>
                        </Controls.TextField>
                      </Controls.Grid>
                    </Controls.Grid>
                    <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '10px' }}>
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
            {!message ? (

              <>
                <NoDataFound />
              </>
            ) : (
              <>
                <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
                  {expertsGadgetsData?.length >= 0 && expertsGadgetsData
                    ? (memoizedTable)
                    : null}
                </Controls.Paper>

                <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                  <Controls.ReusablePagination
                    onChange={handlePageChange}
                    count={totalPages} color="success" />
                </Controls.Grid>
              </>
            )}

          </>
        )}



      </>
    </ThemeProvider>
  )
}

export default Gadgetsmangement;