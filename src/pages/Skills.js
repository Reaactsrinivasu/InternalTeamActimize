
import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  createSkillDetailsStart, loadSkillDetailsStart,
  updateSkillDetailsStart, deleteSkillDetailsStart,
} from '../redux/actions/skillActions';
import Pagination from '@mui/material/Pagination';
import { initialValues, generateValidationSchema, } from "../components/Validations";
import Controls from "../components/Controls";
import theme from "../Theme"; // Import the theme object
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "skill_name", label: "Type of Skill" },
  { id: "rating", label: "Rating" },
];
const formFields = [
  "skill_name",
  "rating",
];
const validationSchema = generateValidationSchema(formFields);

const Skills = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const [loading , setLoading] = useState(true);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const deleteHandler = (id) => {
    if (window.confirm("confirm to delete")) {
      dispatch(deleteSkillDetailsStart(id));
      setTimeout(() => {
        dispatch(loadSkillDetailsStart());
      }, 500);
    }
  };
  const editHandler = (id) => {
    const user = skillData.find((row) => row.id === id);
    if (user) {
      setUserInfo(user);
      formik.setValues(user); // This will populate the form fields
      handleOpen(); // This will open the modal
    }
  };
  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      setEditMode(true);
      formik.setValues(userInfo);
      handleOpen();
    } else {
      setEditMode(false);
    }
  }, [userInfo]);

  const skillData = useSelector((state) => state.skilldata?.data?.skills || []);
  const totalPages = useSelector((state) => state.skilldata?.data?.total_pages);

  useEffect(() => {
      dispatch(loadSkillDetailsStart());
      
  }, [])

  useEffect(() => {
    setTimeout(() => {
      dispatch(loadSkillDetailsStart());
      setLoading(false);
    }, 300)
  }, [])



  const handleSubmit = (values, { setStatus, resetForm }) => {
    setStatus();
    if (!editMode) {
      dispatch(createSkillDetailsStart(values));
      resetForm();
      handleClose();
      Controls.toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadSkillDetailsStart()) }, 500);
    } else {
      dispatch(updateSkillDetailsStart({ id, values }));
      Controls.toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadSkillDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const handlePageChange = (event, page) => {
    dispatch(loadSkillDetailsStart(page));
  };


   const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={skillData}
        editHandler={editHandler}
        deleteHandler={deleteHandler}
        
      />
    </Suspense>
  ), [columns, skillData, editHandler, deleteHandler]);

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
              Skills Details
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
                  <Controls.Typography id="modal-modal-title" variant="h1" >Skills Details</Controls.Typography>
                  <Controls.TextField
                    InputProps={{ disableUnderline: true, }}
                    margin="dense"
                    label="Type of Skill"
                    name="skill_name"
                    type="text"
                    fullWidth
                    variant="filled"
                    value={formik.values.skill_name}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    error={formik.touched.skill_name && Boolean(formik.errors.skill_name)}
                    helperText={formik.touched.skill_name && formik.errors.skill_name ? (<span style={{ color: 'red' }}>{formik.errors.skill_name}</span>) : ('')} />
                  <Controls.Typography component="legend" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', mt: 2 }}>
                    <Controls.Typography component="legend" variant='h1' >Rating</Controls.Typography>
                    <Controls.Rating
                      sx={{ mr: 4 }}
                      name="rating"
                      precision={0.5}
                      size="large"
                      type="number"
                      defaultValue={1}
                      value={parseInt(formik.values.rating)} 
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      error={formik.touched.rating && Boolean(formik.errors.rating)}
                      helperText={formik.touched.rating && formik.errors.rating ? (<span style={{ color: 'red' }}>{formik.errors.rating}</span>) : ('')} />
                  </Controls.Typography>
                  <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: "20px" }}>
                    
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
        {skillData?.length > 0 ? (
       
          <>
          <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
            {skillData?.length >= 0 && skillData
              ? (memoizedTable)
              : null}
          </Controls.Paper>
          <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' , marginTop:'20px'}}>
             <Controls.ReusablePagination onChange={handlePageChange} count={totalPages}  />
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

export default Skills;
