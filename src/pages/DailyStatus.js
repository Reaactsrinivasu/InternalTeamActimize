
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import Pagination from '@mui/material/Pagination';
import theme from "../Theme";
import {
  createStatusDetailsStart,
  loadStatusDetailsStart,
  updateStatusDetailsStart,
  deleteStatusDetailsStart,
} from "../redux/actions/dailyStatusActions";
import { initialValues, generateValidationSchema } from "../components/Validations";
import Controls from "../components/Controls";
import NoDataFound from "../components/NoDataComponent";
import ProjectListModalFormData from "../components/ProjectsListModalFormData";
import DailyStatusModalFormData from "../components/DailyStatusModalFormData";
import LoadingComponent from "../components/LoadingComponent";

// Lazy load ResuableTable component
const ResuableTable = lazy(() => import("../components/Table"));

const columns = [
  { id: "id", label: "S.No" },
  { id: "created_at", label: "Date" },
  { id: "daily_status", label: "Status/Update" },
  { id: "task_name", label: "Task Name" },
  { id: "description", label: "Description" },
  { id: "task_progress", label: "Task Progress" },
  { id: "total_hours", label: "Total Hours" },
  { id: "worked_hours", label: "Worked Hours" },
];

const style = {
  pr: 2,
  pb: 2,
  pt: 2,
  top: '45%',
  left: '50%',
  width: 650,
  boxShadow: 24,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  borderRadius:'5px',
  backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,
  transform: 'translate(-50%, -50%)',
};

const DailyStatus = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [modalType, setModalType] = useState('');
  const [initialFormValue, setInitialFormValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditMode(false)
    setOpen(false);
    formik.resetForm();
    setUserInfo({});
  };

  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }

  const formFields = [
    "daily_status",
    "task_progress",
    "task_name",
    "description",
    "total_hours",
    "worked_hours",
  ];

  const validationSchema = generateValidationSchema(formFields);

  const statusData = useSelector((state) => state.statusdata?.data?.tasks || []);
  const totalPages = useSelector((state) => state.statusdata?.data?.total_pages);

  useEffect(() => {
      setEditMode(false)
      dispatch(loadStatusDetailsStart());
      
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setEditMode(false)
      dispatch(loadStatusDetailsStart());
      setLoading(false);
    }, 500)
  }, []);

  // Delete status handler
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteStatusDetailsStart(id));
      setTimeout(() => {
        dispatch(loadStatusDetailsStart());
      }, 500);
    }
  };

  // Edit status handler
  const editHandler = (id) => {
    const user = statusData.find((row) => row.id === id);
    if (user) {
      setEditMode(true);
      setUserInfo(user);
      formik.setValues(user);
      handleOpen();
    }
  };

  const handlePageChange = (event, page) => {
    dispatch(loadStatusDetailsStart(page));
  };
  // Form submit handler
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createStatusDetailsStart(values));
      resetForm();
      handleClose();
      setTimeout(() => {
        dispatch(loadStatusDetailsStart());
      }, 500);
    } else {
      dispatch(updateStatusDetailsStart({ id: userInfo.id, values }));
      setTimeout(() => {
        dispatch(loadStatusDetailsStart());
      }, 500);
      resetForm();
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  // Memoize the table component
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={statusData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        showRemoveRedEyeIcon={true}
        showModal={showModal}
        
      />
    </Suspense>
  ), [columns, statusData, editHandler, deleteHandler]);

  useEffect(() => (
    setInitialFormValue(userInfo)
  ), [userInfo])

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  return (

    <>
      <Controls.Box>
        <Controls.ReusablePaper elevation={1}>
          <Controls.Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              Daily Status
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
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>

            <Controls.Grid rowSpacing={0} columnSpacing={2} container my={3} sx={style} >

              <Controls.Grid item xs={12}>
                <Controls.Box>
                  <Controls.Typography sx={{ ml: 1 }} id="modal-modal-title" variant="h1" component="h2">
                    {!editMode ? 'Add Daily Status' : 'Edit Daily Status'}
                  </Controls.Typography>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    select
                    variant='filled'
                    placeholder='Select Status'
                    name='daily_status'
                    label="Select Status"
                    value={formik.values.daily_status}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.daily_status && Boolean(formik.errors.daily_status)}
                    helperText={formik.touched.daily_status && formik.errors.daily_status ? (<span style={{ color: 'red' }}>{formik.errors.daily_status}</span>) : ('')}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                          },
                        },
                      },
                    }}>
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='Status'>Status</Controls.MenuItem>
                    <Controls.MenuItem value='Update'>Update</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    select
                    variant='filled'
                    placeholder='Select Progress'
                    name='task_progress'
                    label="Select Progress"
                    value={formik.values.task_progress}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.task_progress && Boolean(formik.errors.task_progress)}
                    helperText={formik.touched.task_progress && formik.errors.task_progress ? (<span style={{ color: 'red' }}>{formik.errors.task_progress}</span>) : ('')}
                    SelectProps={{
                      MenuProps: {
                        PaperProps: {
                          sx: {
                            backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                          },
                        },
                      },
                    }}>
                    <Controls.MenuItem value=''>Select</Controls.MenuItem>
                    <Controls.MenuItem value='Completed'>Completed</Controls.MenuItem>
                    <Controls.MenuItem value='Inprogress'>In Progress</Controls.MenuItem>
                    <Controls.MenuItem value='Incomplete'>InComplete</Controls.MenuItem>
                    <Controls.MenuItem value='Juststarted'>Just Started</Controls.MenuItem>
                  </Controls.TextField>
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1}>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    disabled={modalType === 'view' ? true : false}
                    label="Task Name"
                    margin="dense"
                    id="task_name"
                    name="task_name"
                    type="text"
                    variant="filled"
                    value={formik.values.task_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.task_name && Boolean(formik.errors.task_name)}
                    helperText={formik.touched.task_name && formik.errors.task_name ? (<span style={{ color: 'red' }}>{formik.errors.task_name}</span>) : ('')} />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1}>
                  <Controls.TextField
                    InputProps={{ disableUnderline: true, }}
                    fullWidth
                    disabled={modalType === 'view' ? true : false}
                    label="Description"
                    multiline
                    maxRows={2}
                    margin="dense"
                    id="description"
                    name="description"
                    type="text"
                    variant="filled"
                    value={formik.values.description}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description ? (<span style={{ color: 'red' }}>{formik.errors.description}</span>) : ('')}
                  />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    label="Total Hours"
                    margin="dense"
                    id="total_hours"
                    name="total_hours"
                    type="number"
                    variant="filled"
                    value={formik.values.total_hours}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.total_hours && Boolean(formik.errors.total_hours)}
                    helperText={formik.touched.total_hours && formik.errors.total_hours ? (<span style={{ color: 'red' }}>{formik.errors.total_hours}</span>) : ('')}
                  />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={6}>
                <Controls.Box p={1} >
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    label="Active Hours"
                    margin="dense"
                    id="worked_hours"
                    name="worked_hours"
                    type="number"
                    variant="filled"
                    value={formik.values.worked_hours}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.worked_hours && Boolean(formik.errors.worked_hours)}
                    helperText={formik.touched.worked_hours && formik.errors.worked_hours ? (<span style={{ color: 'red' }}>{formik.errors.worked_hours}</span>) : ('')} />
                </Controls.Box>
              </Controls.Grid>
              <Controls.Grid item xs={12}>
                <Controls.Box p={1} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
             
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
          {statusData?.length > 0 ? (
        <>
        <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
          {statusData?.length >= 0 && statusData
            ? (memoizedTable)
            : null}
        </Controls.Paper>
        
        <DailyStatusModalFormData show={show} closeModal={closeModal} data={data} />
  
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

  );
};

export default DailyStatus;


