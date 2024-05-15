
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFormik } from "formik";
import theme from "../Theme";
import { useSelector, useDispatch } from "react-redux";
import ViewLeaveDetails from './ViewLeaveDetails';
import {
  createLeaveDetailsStart,
  loadLeaveDetailsStart,
  updateLeaveDetailsStart,
  deleteLeaveDetailsStart,
} from '../redux/actions/leaveDetailsActions';
import { initialValues, generateValidationSchema } from "../components/Validations";
import { loadAllManagementStart } from '../redux/actions/allManagementActions';
import * as dayjs from 'dayjs';
import { toast } from 'react-toastify';
import {
  MenuItem
} from '@mui/material';
import Controls from "../components/Controls";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NoDataFound from "../components/NoDataComponent";
import LoadingComponent from "../components/LoadingComponent";
const ResuableTable = lazy(() => import("../components/Table"));

const columns = [
  { id: "id", label: "S.No" },
  { id: "leave_purpose", label: "Purpose of Leave" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date " },
  { id: "number_of_leaves", label: "Number of Leaves " },
  { id: "type_of_leave", label: "Type of Leave " },
  { id: "approval", label: "Status " },
];

const Leaves = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading , setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
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
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteLeaveDetailsStart(id));
      setTimeout(() => {
        dispatch(loadLeaveDetailsStart());
      }, 500);
    }
  };
  const editHandler = (id) => {
    const user = leavesData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user);
      handleOpen();
    }
  };
  const leavesData = useSelector((state) => state.leavedata?.data?.leaves || []);
  const totalPages = useSelector((state) => state.leavedata?.data?.total_pages);
  useEffect(() => {
    dispatch(loadLeaveDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000)
  })

  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }
  const leavesBank = useSelector((state) => state.leavedata?.data?.leave_bank);
  let cLeaves = parseInt(leavesBank?.casual_leaves);
  let sLeaves = parseInt(leavesBank?.sick_leaves);
  let tCLeaves = parseInt(leavesBank?.taken_casual_leaves);
  let tSLeaves = parseInt(leavesBank?.taken_sick_leaves);
  let rCLeaves = parseInt(leavesBank?.remaining_casual_leaves);
  let rSLeaves = parseInt(leavesBank?.remaining_sick_leaves);
  const formFields = [
    "leave_purpose",
    "start_date",
    "end_date",
    "type_of_leave",
    "number_of_leaves",
    "manager_id",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createLeaveDetailsStart({
        ...values,
        start_date: dayjs(values.start_date).format('MM-DD-YYYY'),
        end_date: dayjs(values.end_date).format('MM-DD-YYYY')

      }));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
    }
    else {
      dispatch(updateLeaveDetailsStart({
        id,
        ...values,
        start_date: dayjs(values.start_date).set('hour', 11).format('MM-DD-YYYY'),
        end_date: dayjs(values.end_date).set('hour', 11).format('MM-DD-YYYY')
      }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadLeaveDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadLeaveDetailsStart(page));
    setCurrentPage(page);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const allmanagementdata = useSelector((state) => state.allmanagementdata?.data || []);
  useEffect(() => {
    dispatch(loadAllManagementStart());
  }, [])
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={leavesData}
        showRemoveRedEyeIcon={true}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        showModal={showModal}
        display={true}
      />
    </Suspense>
  ), [columns, leavesData, editHandler, deleteHandler, showModal]);

  useEffect(() => (
    setInitialFormValue(userInfo)
  ), [userInfo])

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  return (

  <>
  {loading ? (
    <LoadingComponent />
  ) : (

    <>
    <Controls.Box>
      <Controls.ReusablePaper elevation={1} sx={{
        padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
        borderRadius: '10px'
      }} >
        <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>

          <Controls.Typography variant="h2" sx={{ mt: 0 }}>
            Leaves Details
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
                <Controls.Typography id="modal-modal-title" variant="h1">
                  Leaves Details
                </Controls.Typography>
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  margin="dense"
                  label="Purpose of Leave"
                  id="leave_purpose"
                  name="leave_purpose"
                  type="text"
                  fullWidth
                  variant="filled"
                  value={formik.values.leave_purpose}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.leave_purpose && Boolean(formik.errors.leave_purpose)}
                  helperText={formik.touched.leave_purpose && formik.errors.leave_purpose ? (<span style={{ color: 'red' }}>{formik.errors.leave_purpose}</span>) : ('')}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    InputProps={{
                      disableUnderline: true,
                    }}
                    renderInput={(params) => {
                      return <Controls.TextField
                        fullWidth
                        variant='filled'
                        margin="dense"
                        name="start_date"
                        value={formik.values.start_date}
                        {...params}
                        error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                        helperText={formik.touched.start_date && formik.errors.start_date ? (<span style={{ color: 'red' }}>{formik.errors.start_date}</span>) : ('')}
                      />
                    }}
                    name="start_date"
                    value={dayjs(formik.values.start_date)}
                    onBlur={() => { formik.handleBlur('start_date') }}
                    // onBlur={formik.handleBlur}
                    onChange={(startDate) => {
                      formik.setFieldValue('start_date', startDate);
                    }}
                    placeholder="DD-MM-YYYY"
                    inputFormat="DD-MM-YYYY"
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
                        variant='filled'
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
                    onChange={(endDate) => {
                      formik.setFieldValue('end_date', endDate);
                    }}
                    placeholder="DD-MM-YYYY"
                    inputFormat="DD-MM-YYYY"
                    label="End Date"
                    type="date"
                  />
                </LocalizationProvider>
                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  margin="dense"
                  label="Number of Leaves"
                  id="number_of_leaves"
                  name="number_of_leaves"
                  type="number"
                  fullWidth
                  variant="filled"
                  value={formik.values.number_of_leaves}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.number_of_leaves && Boolean(formik.errors.number_of_leaves)}
                  helperText={formik.touched.number_of_leaves && formik.errors.number_of_leaves ? (<span style={{ color: 'red' }}>{formik.errors.number_of_leaves}</span>) : ('')}
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
                  name='type_of_leave'
                  label="Type of Leave"
                  placeholder='Select Leave'
                  value={formik.values.type_of_leave}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.type_of_leave && Boolean(formik.errors.type_of_leave)}
                  helperText={formik.touched.type_of_leave && formik.errors.type_of_leave ? (<span style={{ color: 'red' }}>{formik.errors.type_of_leave}</span>) : ('')}
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
                  <MenuItem value="">Select</MenuItem>
                  <MenuItem value='Sick'>Sick</MenuItem>
                  <MenuItem value='Casual'>Casual Leave</MenuItem>
                  <MenuItem value='others'>Others</MenuItem>
                </Controls.TextField>

                <Controls.TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  fullWidth
                  type="text"
                  margin="dense"
                  id="manager_id"
                  variant="filled"
                  label="Management Name"
                  name="manager_id"
                  onBlur={formik.handleBlur}
                  value={formik.values.manager_id}
                  onChange={formik.handleChange}
                  error={formik.touched.manager_id && Boolean(formik.errors.manager_id)}
                  helperText={formik.touched.manager_id && formik.errors.manager_id ? (<span style={{ color: 'red' }}>{formik.errors.manager_id}</span>) : ('')}
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
                  {allmanagementdata.map((user) => (
                    <Controls.MenuItem key={user.id} value={user.id}>
                      {user.name}
                    </Controls.MenuItem>
                  ))}
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

    {leavesData?.length > 0 ? (
      <>
        <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
          {leavesData?.length >= 0 && leavesData
            ? (memoizedTable)
            : null}
        </Controls.Paper>

        <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
          <Controls.ReusablePagination
            onChange={handlePageChange}
            count={totalPages} />
        </Controls.Grid>

        <ViewLeaveDetails show={show} closeModal={closeModal} data={data} />
        <Controls.Container maxWidth='xlg' sx={{
          "&.MuiContainer-root": {
            paddingLeft: 0,
            paddingRight: 0
          },
        }}>
          <Controls.Grid container rowSpacing={2} columnSpacing={3} my={1}>
            <Controls.Grid item xs={12} sm={12} md={4}>
              <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor
              }}>
                <Controls.CardContent>
                  <Controls.Typography variant="subtitle1"
                    gutterBottom>
                    Total Leaves &ensp;&ensp;{cLeaves + sLeaves}
                  </Controls.Typography>
                  <Controls.Divider color="orange" sx={{ mt: 2, height: 2 }} />
                  <Controls.Typography variant="subtitle1" sx={{ mb: 1.5, mt: 3, }}>
                    Casuals &ensp;&ensp;{cLeaves}
                  </Controls.Typography>
                  <Controls.Typography variant="subtitle1" sx={{ mt: 3 }} >
                    Sicks  &ensp;&ensp;{sLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
            </Controls.Grid>
            <Controls.Grid item xs={12} sm={12} md={4}>
              <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor
              }}>
                <Controls.CardContent>
                  <Controls.Typography variant="subtitle1" gutterBottom>
                    Taken Leaves &ensp;&ensp;{tCLeaves + tSLeaves}
                  </Controls.Typography>
                  <Controls.Divider variant="fullWidth" color="orange" sx={{ mt: 2, height: 2 }} />
                  <Controls.Typography variant="subtitle1" sx={{ mb: 1.5, mt: 3, }} >
                    Casuals  &ensp;&ensp;{tCLeaves}
                  </Controls.Typography>
                  <Controls.Typography variant="subtitle1" sx={{ mt: 3, }} >
                    Sicks  &ensp;&ensp;{tSLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
            </Controls.Grid>
            <Controls.Grid item xs={12} sm={12} md={4}>
              <Controls.Card elevation={1} sx={{
                borderRadius: '20px',
                boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)',
                backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor
              }}>
                <Controls.CardContent>
                  <Controls.Typography variant="subtitle1" gutterBottom>
                    Remaining Leaves &ensp;&ensp;{rCLeaves + rSLeaves}
                  </Controls.Typography>
                  <Controls.Divider variant="fullWidth" color="orange" sx={{ mt: 2, height: 2 }} />
                  <Controls.Typography variant="subtitle1" sx={{ mb: 1.5, mt: 3, }} >
                    Casuals  &ensp;&ensp;{rCLeaves}
                  </Controls.Typography>
                  <Controls.Typography variant="subtitle1" sx={{ mt: 3 }} >
                    Sicks  &ensp;&ensp;{rSLeaves}
                  </Controls.Typography>
                </Controls.CardContent>
              </Controls.Card>
            </Controls.Grid>
          </Controls.Grid>
        </Controls.Container>
      </>

    ) : (
      <>
        <NoDataFound />
      </>
    )}
  </>

  )}
 
    </>

  );
};

export default Leaves;
