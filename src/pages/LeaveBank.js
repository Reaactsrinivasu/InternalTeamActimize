import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { createLeaveBankStart, loadLeaveBankStart, updateLeaveBankStart, deleteLeaveBankStart } from '../redux/actions/leaveBankActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Pagination from '@mui/material/Pagination';
import Controls from "../components/Controls";
import { initialValues, generateValidationSchema, } from "../components/Validations";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import NoDataFound from "../components/NoDataComponent";
import LoadingComponent from "../components/LoadingComponent";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_id", label: "Expert" },
  { id: "casual_leaves", label: "Casual Leaves" },
  { id: "sick_leaves", label: "Sick Leaves" },
  { id: "taken_casual_leaves", label: " Taken Casual Leaves" },
  { id: "taken_sick_leaves", label: "Taken Sick Leaves" },
  { id: "remaining_casual_leaves", label: "Remaining Casual Leaves" },
  { id: "remaining_sick_leaves", label: "Remaining Sick Leaves" },
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
const Leaves = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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


  useEffect(() => (
    setInitialFormValue(userInfo)
  ), [userInfo])


  const allleaveBankData = useSelector((state) => state.leaveBankData?.data?.leave_banks || []);
  const totalPages = useSelector((state) => state.leaveBankData?.data?.total_pages);

  useEffect(() => {
    dispatch(loadLeaveBankStart());
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 900);
  })


  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }
  const leavesBank = useSelector((state) => state.leavedata.data?.leave_bank);
  const formFields = [
    "expert_id",
    "sick_leaves",
    "casual_leaves",
    "year",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, }) => {

    setStatus();
    if (!editMode) {
      dispatch(
        createLeaveBankStart({
          ...values,
          expert_id: String(values.expert_id),
          sick_leaves: String(values.sick_leaves),
          casual_leaves: String(values.casual_leaves),
          year: String(values.year),
        })
      );
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
    }
    else {
      dispatch(updateLeaveBankStart({
        id,
        ...values,
      })
      );
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadLeaveBankStart()) }, 500);
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadLeaveBankStart(page));
  };
  const editHandler = (id) => {
    const user = allleaveBankData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user);
      handleOpen();
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteLeaveBankStart(id));
      setTimeout(() => {
        dispatch(loadLeaveBankStart());
      }, 500);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={allleaveBankData}
        allUsersData={allusersnamedata}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, allleaveBankData, editHandler, deleteHandler]);

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }
  const message = allleaveBankData?.length > 0 ? true : false
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0,0,0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Leaves Bank
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
                    <Controls.Typography id="modal-modal-title" variant="h1" component="h2">
                      Leave Bank
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
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Sick Leaves"
                      id="sick_leaves"
                      name="sick_leaves"
                      type="number"
                      fullWidth
                      variant="filled"
                      value={formik.values.sick_leaves}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.sick_leaves && Boolean(formik.errors.sick_leaves)}
                      helperText={formik.touched.sick_leaves && formik.errors.sick_leaves ? (<span style={{ color: 'red' }}>{formik.errors.sick_leaves}</span>) : ('')}
                    />
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Casual Leaves"
                      id="casual_leaves"
                      name="casual_leaves"
                      type="number"
                      fullWidth
                      variant="filled"
                      value={formik.values.casual_leaves}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.casual_leaves && Boolean(formik.errors.casual_leaves)}
                      helperText={formik.touched.casual_leaves && formik.errors.casual_leaves ? (<span style={{ color: 'red' }}>{formik.errors.casual_leaves}</span>) : ('')}
                    />
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      margin="dense"
                      label="Year"
                      id="year"
                      name="year"
                      type="text"
                      fullWidth
                      variant="filled"
                      value={formik.values.year}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.year && Boolean(formik.errors.year)}
                      helperText={formik.touched.year && formik.errors.year ? (<span style={{ color: 'red' }}>{formik.errors.year}</span>) : ('')}
                    />
                    <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'10px' }}>

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
                  {allleaveBankData?.length >= 0 && allleaveBankData
                    ? (memoizedTable)
                    : null}
                </Controls.Paper>
                <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                  <Controls.ReusablePagination
                    onChange={handlePageChange}
                    count={totalPages}
                  />
                </Controls.Grid>
              </>
            )}
          </>
        )}

      </>
    </ThemeProvider>
  )
}

export default Leaves;

