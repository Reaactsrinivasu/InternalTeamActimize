
import React, { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  createWorkExperienceDetailsStart,
  loadWorkExperienceDetailsStart,
  updateWorkExperienceDetailsStart,
  deleteWorkExperienceDetailsStart,
} from "../redux/actions/workExperienceActions";
import { initialValues, generateValidationSchema, } from "../components/Validations";
import Controls from "../components/Controls";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import NoDataFound from "../components/NoDataComponent";
import LoadingComponent from "../components/LoadingComponent";
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "organization_name", label: "Organization" },
  { id: "date_of_join", label: "Joining Date" },
  { id: "date_of_end", label: "Ending Date" },
  { id: "experience", label: "Experience" },
  { id: "designation", label: "Designation" },
];
const formFields = [
  "organization_name",
  "designation",
  "date_of_join",
  "date_of_end",
];
const validationSchema = generateValidationSchema(formFields);
const WorkExperience = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const editHandler = (id) => {
    const user = workExperienceData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteWorkExperienceDetailsStart(id));
      setTimeout(() => {
        dispatch(loadWorkExperienceDetailsStart());
      }, 500);
    }
  };
  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createWorkExperienceDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadWorkExperienceDetailsStart()) }, 500);
    } else {
      dispatch(updateWorkExperienceDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadWorkExperienceDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const workExperienceData = useSelector((state) => state.workexpdata?.data?.work_experiences || []);
  const totalRecords = useSelector((state) => state.workexpdata?.data?.total_count || []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = workExperienceData.slice(startIndex, endIndex);
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    dispatch(loadWorkExperienceDetailsStart());

  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadWorkExperienceDetailsStart());
      setLoading(false);
    }, 1000)
  }, )

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
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={currentData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
      />
    </Suspense>
  ), [columns, currentData, editHandler, deleteHandler]);


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
              Work Experience Details
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
          aria-describedby="modal-modal-description">
          <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }} autoComplete='off'>
            <Controls.Grid rowSpacing={2} columnSpacing={1} container my={2}>
              <Controls.Grid>
                <Controls.Box sx={Controls.formBoxStyle}>
                  <Controls.Typography id="modal-modal-title" variant="h1" sx={{ mb: 1 }}>
                    Work Experience </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="organization"
                    variant="filled"
                    label="Organization"
                    name="organization_name"
                    onBlur={formik.handleBlur}
                    value={formik.values.organization_name}
                    onChange={formik.handleChange}
                    error={formik.touched.organization_name && Boolean(formik.errors.organization_name)}
                    helperText={formik.touched.organization_name && formik.errors.organization_name ? (<span style={{ color: 'red' }}>{formik.errors.organization_name}</span>) : ('')} />
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
                          name="date_of_join"
                          {...params}
                          error={formik.touched.date_of_join && Boolean(formik.errors.date_of_join)}
                          helperText={formik.touched.date_of_join && formik.errors.date_of_join ? (<span style={{ color: 'red' }}>{formik.errors.date_of_join}</span>) : ('')} />)}
                      name="date_of_join"
                      value={formik.values.date_of_join}
                      onBlur={formik.handleBlur}
                      onChange={(joinDate) => {
                        formik.setFieldTouched("JoinDate");
                        formik.setFieldValue("date_of_join", joinDate ? joinDate.toString() : '');
                      }}
                    
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Date of Join" />
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
                          name="date_of_end"
                          {...params}
                          error={formik.touched.date_of_end && Boolean(formik.errors.date_of_end)}
                          helperText={formik.touched.date_of_end && formik.errors.date_of_end ? (<span style={{ color: 'red' }}>{formik.errors.date_of_end}</span>) : ('')} />)}
                      name="date_of_end"
                      value={formik.values.date_of_end}
                      onBlur={formik.handleBlur}
                      onChange={(endDate) => {
                        formik.setFieldTouched("endDate");
                        formik.setFieldValue("date_of_end", endDate ? endDate.toString() : '');
                      }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Date of End" />
                  </LocalizationProvider>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    margin="dense"
                    label="Designation"
                    id="designation"
                    name='designation'
                    type="text"
                    fullWidth
                    variant="filled"
                    onBlur={formik.handleBlur}
                    value={formik.values.designation}
                    onChange={formik.handleChange}
                    error={formik.touched.designation && Boolean(formik.errors.designation)}
                    helperText={formik.touched.designation && formik.errors.designation ? (<span style={{ color: 'red' }}>{formik.errors.designation}</span>) : ('')} />
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '20px' }}>

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
          {workExperienceData?.length > 0 && workExperienceData ? (
            <>
              <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
                {workExperienceData?.length >= 0 && workExperienceData
                  ? (memoizedTable)
                  : null}
              </Controls.Paper>

              <Controls.Grid container sx={{ marginTop: '30px', justifyContent: 'center', }}>
                <Controls.ReusablePagination count={Math.ceil(totalRecords / itemsPerPage)} page={currentPage} onChange={handlePageChange} />
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

  )
}
export default WorkExperience;