import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { createHolidayDetailsStart, deleteHolidayDetailsStart, loadHolidayDetailsStart, updateHolidayDetailsStart } from '../redux/actions/expertHolidaysActions';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import { Grid, Typography, Button, Paper, Link } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useFormik } from 'formik';
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const SquareCard = styled(Controls.Card)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  textAlign: 'center',
  width: 270,
  height: 320,
  margin: 'auto',
  padding: '5px',
  backgroundColor: "lightgray",
});
const HolidaysMangement = () => {
  const dispatch = useDispatch();
  const expertholidaydata = useSelector((state) => state.expertHolidaydata?.data?.holidays || []);
  const totalPages = useSelector((state) => state.expertHolidaydata?.data?.total_pages );
  const [userInfo, setUserInfo] = useState({});
  const [loading , setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const formFields = [
    "title",
    "date",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    const { date } = values;
    const parsedDate = dayjs(date);
    const formattedDate = parsedDate.format('DD-MM-YYYY'); // Format the date for logging
    const day = parsedDate.format('dddd');
    values.date = formattedDate
    setStatus();
    if (!editMode) {
      dispatch(createHolidayDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
    }
    else {
      dispatch(updateHolidayDetailsStart({ id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
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
  const handleEdit = (id) => {
    setUserInfo(id);
    formik.setFieldValue(id);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const handlePageChange = (event, page) => {
    dispatch(loadHolidayDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadHolidayDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  })

  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteHolidayDetailsStart(id));
      setTimeout(() => { dispatch(loadHolidayDetailsStart()) }, 500);
    }
  }
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

  const isFormChanged = () => {
    return JSON.stringify(formik.values) !== JSON.stringify(initialFormValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Controls.ReusablePaper  sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              Experts Holidays List
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
                  <Controls.Typography id="modal-modal-title" variant="h1" component="h2" sx={{ mb: 1 }}>
                    Holiday
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="title"
                    variant="filled"
                    label="Holiday Name"
                    name="title"
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title ? (<span style={{ color: 'red' }}>{formik.errors.title}</span>) : ('')} />
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
                          name="date"  // Changed name to "event_date"
                          {...params}
                          error={formik.touched.date && Boolean(formik.errors.date)}
                          helperText={formik.touched.date && formik.errors.date ? (<span style={{ color: 'red' }}>{formik.errors.date}</span>) : ('')}
                        />
                      )}
                      name="date"  // Changed name to "event_date"
                      value={formik.values.date} // Update value field to match the new name
                      onBlur={formik.handleBlur}
                      onChange={(date) => {
                        formik.setFieldTouched("date");
                        formik.setFieldValue("date", date ? date.toString() : '');
                      }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label=" Holiday Date"  // Changed label to "Holiday Date"
                    />
                  </LocalizationProvider>
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
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
          {expertholidaydata?.length > 0 ? (
           
            
               <>
               <Controls.Grid container sx={{justifyContent:'center'}}>
               {expertholidaydata.map((item) => (
                   <Grid item xs={12} sm={6} md={4} key={item.id}>
                     <SquareCard  sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor, }}>
                       <Controls.Grid container justifyContent="flex-end"  >
                         <Controls.Grid item>
                           <IconButton sx={{ color: theme.palette.error.main, }} onClick={() => handleEdit(item)}>
                             <EditIcon />
                           </IconButton>
                         </Controls.Grid>
                         <Controls.Grid item>
                           <IconButton sx={{ color: "#ff0000", cursor: "pointer" }} onClick={() => handleDelete(item.id)}>
                             <DeleteIcon />
                           </IconButton>
                         </Controls.Grid>
                       </Controls.Grid>
                       <Paper sx={{ p: 5, boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)', borderRadius: '10px', backgroundColor: theme.components.tables.styleOverrides.containedPrimarysidebar.containedPrimarysidebarheader.backgroundColor, marginBottom: "25px" }}>
                        
                         <Typography variant="subtitle1" component="div" mb={1}>
                           {item.title}
                         </Typography>
                         <Typography variant="subtitle1" gutterBottom>
                           {dayjs(item.date).format('MM-DD-YYYY')}
                         </Typography>
                         <Typography variant="subtitle1" gutterBottom>
                           {item.day}
                         </Typography>
                       </Paper>
       
                     </SquareCard>
                   </Grid>
                 ))}
               </Controls.Grid>
       
               <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                     <Controls.ReusablePagination
                       onChange={handlePageChange}
                       count={totalPages} />
                   </Controls.Grid>
               </>
          ) : (
            <>
            <NoDataFound/>
            </>
          )}
          </>
        )}

      </div>
    </ThemeProvider>
  );
};
export default HolidaysMangement;