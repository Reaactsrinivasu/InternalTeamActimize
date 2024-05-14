import React from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import {
  createProjectDetailsStart,
  loadProjectDetailsStart,
  updateProjectDetailsStart,
  deleteProjectDetailsStart
} from '../redux/actions/expertProjectDetailsActions';

import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import ResuableTable from "../components/Table";
import { initialValues, generateValidationSchema, } from "../components/Validations";
import Controls from "../components/Controls";
import ViewLeaveDetails from './ViewLeaveDetails';
import ProjectListModalFormData from '../components/ProjectsListModalFormData';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const columns = [
  { id: "id", label: "S.No" },
  { id: "project_name", label: "Project Name" },
  { id: "status", label: "Status" },
  { id: "start_date", label: "Start Date" },
  { id: "end_date", label: "End Date" },
  { id: "members", label: "Team" },
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
const ProjectsMangement = () => {

  const [show, setShow] = useState(false);
  const [data, setData] = useState('');
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [formChanged, setFormChanged] = useState(false);
  const handleOpen = () => {
    setstartDate(false);
    setendDate(false);
    setOpen(true);
    setSelectedNames([]);    // Reset the selectedNames state to an empty array
  }
  const [startDate, setstartDate] = useState(false);
  const [endDate, setendDate] = useState(false);
  const [loading , setLoading] = useState(true);
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); setFormChanged(false) };
  const handleOnChange = (startDate, endDate) => {
    formik.setFieldValue('startDate', startDate);
    setstartDate(true)
  }
  const handleOnChangeone = (endDate) => {
    formik.setFieldValue('endDate', endDate);
    setendDate(true)
  }
  const dispatch = useDispatch();
  const formFields = [
    "project_name",
    "status",
    "description",
    "start_date",
    "end_date",
    "members",
    "members_list",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handlePageChange = (event, page) => {
    dispatch(loadProjectDetailsStart(page));
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    console.log(values,"descrio")
    if (editMode) {
      if (startDate) {
        let startDate = new Date(values.start_date);
        startDate.setDate(startDate.getDate() + 1); // Increment the start_date by 1 day
        values.start_date = startDate;
      }
      else if (endDate) {
        let endDate = new Date(values.end_date);
        endDate.setDate(endDate.getDate() + 1); // Increment the end_date by 1 day
        values.end_date = endDate;
      }
      else {
        values.start_date = values.start_date;
        values.end_date = values.end_date;
      }
    } else {
      let startDate = new Date(values.start_date);
      startDate.setDate(startDate.getDate() + 1); // Increment the start_date by 1 day
      let endDate = new Date(values.end_date);
      endDate.setDate(endDate.getDate() + 1); // Increment the end_date by 1 day
      values.start_date = startDate; // Update the start_date value in the values object
      values.end_date = endDate;
    }
    setStatus();
    if (!editMode) {
      values.members = allusersnamedata.filter(i => values.members.includes(i.name)).map(j => j.id);
      dispatch(createProjectDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      dispatch(loadProjectDetailsStart());
      setTimeout(() => { dispatch(loadProjectDetailsStart()); }, 500);
    } else {
      values.members = allusersnamedata.filter(i => values.members.includes(i.name)).map(j => j.id);
      dispatch(updateProjectDetailsStart({ id: values?.id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadProjectDetailsStart()); }, 500);
      resetForm();
      handleClose();
    }
  };
  const editHandler = (id) => {
    const project = expertprojectdata.find((row) => row.id === id);
    setEditMode(true)
    if (project) {
      const memberNames = project.members_list.map((member) => member.name);
      formik.setValues({
        id: project.id,
        project_name: project.project_name,
        status: project.status,
        description:project.description,
        start_date: project.start_date,
        end_date: project.end_date,
        members: memberNames || [], // Make sure memberNames is an array
      });
      handleOpen(); // Open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteProjectDetailsStart(id));
      setTimeout(() => {
        dispatch(loadProjectDetailsStart());
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
  const expertprojectdata = useSelector((state) => state.expertProjectdata?.data?.projects || []);
  const totalPages = useSelector((state) => state.expertProjectdata?.data?.total_pages || []);
  useEffect(() => {
    dispatch(loadProjectDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 500);
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

  const showModal = (data) => {
    setShow(true);
    setData(data);
  }
  const closeModal = () => {
    setShow(false);
  }

  const [selectedNames, setSelectedNames] = useState([]);
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertprojectdata}
        showRemoveRedEyeIcon={true}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        showModal={showModal}
      />
    </Suspense>
  ), [columns, expertprojectdata,
    editHandler,
    deleteHandler, showModal
  ]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>

              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Projects
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
                    <Controls.Typography id="modal-modal-title" variant="h1" sx={{ mb: 1 }}>
                      Project
                    </Controls.Typography>
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      type="text"
                      margin="dense"
                      id="project_name"
                      variant="filled"
                      label="Project Name"
                      name="project_name"
                      onBlur={formik.handleBlur}
                      value={formik.values.project_name}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setFormChanged(true);
                      }}
                      error={formik.touched.project_name && Boolean(formik.errors.project_name)}
                      helperText={formik.touched.project_name && formik.errors.project_name ? (<span style={{ color: 'red' }}>{formik.errors.project_name}</span>) : ('')}
                    />
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      type="text"
                      margin="dense"
                      id="status"
                      variant="filled"
                      label="Status"
                      name="status"
                      onBlur={formik.handleBlur}
                      value={formik.values.status}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setFormChanged(true);
                      }}
                      error={formik.touched.status && Boolean(formik.errors.status)}
                      helperText={formik.touched.status && formik.errors.status ? (<span style={{ color: 'red' }}>{formik.errors.status}</span>) : ('')}
                    />
                    <Controls.TextField
                      InputProps={{
                        disableUnderline: true,
                      }}
                      fullWidth
                      type="text"
                      margin="dense"
                      id="description"
                      variant="filled"
                      label="Description"
                      name="description"
                      onBlur={formik.handleBlur}
                      value={formik.values.description}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setFormChanged(true);
                      }}
                      error={formik.touched.description && Boolean(formik.errors.description)}
                      helperText={formik.touched.description && formik.errors.description ? (<span style={{ color: 'red' }}>{formik.errors.description}</span>) : ('')}
                    />
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
                          setFormChanged(true);
                          handleOnChange(startDate);
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
                        onChange={(endDate) => {
                          handleOnChangeone(endDate);
                          formik.setFieldValue("end_date", endDate ? endDate.toString() : '');
                          setFormChanged(true);
                        }}
                        inputFormat="DD-MM-YYYY"
                        placeholder="DD-MM-YYYY"
                        type="date"
                        label="Date of Exit"
                      />
                    </LocalizationProvider>
                    <Controls.TextField
                      select
                      fullWidth
                      variant='filled'
                      name='members'
                      label="Members"
                      placeholder='Select Leave'
                      multiple
                      value={Array.isArray(formik.values.members) ? formik.values.members : []}
                      onChange={(event) => {
                        const selectedNames = event.target.value;
                        setSelectedNames(selectedNames);
                        formik.setFieldValue('members', selectedNames);
                        setFormChanged(true);

                      }}
                      onBlur={formik.handleBlur}
                      SelectProps={{
                        multiple: true,
                        MenuProps: {
                          PaperProps: {
                            sx: {
                              backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                            },
                          },
                        },
                        renderValue: (selected) => {
                          return selected;
                        },
                      }}
                      error={formik.touched.members && Boolean(formik.errors.members)}
                      helperText={formik.touched.members && formik.errors.members ? (<span style={{ color: 'red' }}>{formik.errors.members}</span>) : ('')}

                    >
                      {Array.isArray(allusersnamedata) && allusersnamedata.length > 0 ? (
                        allusersnamedata.map((item, index) => (
                          <Controls.MenuItem key={index} value={item.name}>
                            {item.name}
                          </Controls.MenuItem>
                        ))
                      ) : (
                        <Controls.MenuItem value="">
                          <em>No data available</em>
                        </Controls.MenuItem>
                      )}
                    </Controls.TextField>
                    <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: "15px" }}>
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
                   
                    disabled={editMode ? (!formChanged) : false}
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
             {expertprojectdata?.length > 0 ? (
          
          <>
          <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
            {expertprojectdata?.length >= 0 && expertprojectdata
              ? (memoizedTable)
              : null}
          </Controls.Paper>
  
          <ProjectListModalFormData show={show} closeModal={closeModal} data={data} />
  
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
export default ProjectsMangement;