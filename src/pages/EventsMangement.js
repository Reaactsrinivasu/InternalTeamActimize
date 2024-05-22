import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/system';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useFormik } from 'formik';
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import theme from "../Theme";
import {
  initialValues,
  generateValidationSchema,
} from "../components/Validations";
import Controls from "../components/Controls";
import { createEventmanDetailsStart, deleteEventmanDetailsStart, loadEventmanDetailsStart, updateEventmanDetailsStart } from '../redux/actions/expertEventmanActions';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
const EventsMangement = () => {
  const dispatch = useDispatch();
  const expertEventsdata = useSelector((state) => state.expertEventmandata?.data?.schedules_and_events || []);
  const totalPages = useSelector((state) => state.expertEventmandata?.data?.total_pages || []);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewData, setViewData] = useState([]);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [initialFormValue, setInitialFormValue] = useState(null);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); setModalOpen(false) };
  const formFields = [
    "event_name",
    "event_date",
    "event_time",
    "venue",
    "view",
  ];
  const validationSchema = generateValidationSchema(formFields);
  const handleSubmit = (values, { setStatus, resetForm }) => {
    values.event_date = dayjs(values.event_date).format('YYYY-MM-DD');
    setStatus();
    if (!editMode) {
      dispatch(createEventmanDetailsStart(values));
      resetForm();
      handleClose();
      toast.success('Data Added Successfully');
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
    } else {
      dispatch(updateEventmanDetailsStart({ id, values }));
      toast.success('Data Updated Successfully');
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
      resetForm();
      handleClose();
    }
  }
  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 0,
    borderRadius: 1
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
    dispatch(loadEventmanDetailsStart(page));
  };
  useEffect(() => {
    dispatch(loadEventmanDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 900);
  })
  const handleDelete = (id) => {
    if (window.confirm('confirm to delete')) {
      dispatch(deleteEventmanDetailsStart(id));
      setTimeout(() => { dispatch(loadEventmanDetailsStart()) }, 500);
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

  const handleModalFormOpen = (item) => {
    setViewData(item);
    setModalOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
          <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              Schedules and Events
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
                    Events
                  </Controls.Typography>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="event_name"
                    variant="filled"
                    label="Event Name"
                    name="event_name"
                    onBlur={formik.handleBlur}
                    value={formik.values.event_name}
                    onChange={formik.handleChange}
                    error={formik.touched.event_name && Boolean(formik.errors.event_name)}
                    helperText={formik.touched.event_name && formik.errors.event_name ? (<span style={{ color: 'red' }}>{formik.errors.event_name}</span>) : ('')}
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
                          name="event_date"  // Changed name to "event_date"
                          {...params}
                          error={formik.touched.event_date && Boolean(formik.errors.event_date)}
                          helperText={formik.touched.event_date && formik.errors.event_date ? (<span style={{ color: 'red' }}>{formik.errors.event_date}</span>) : ('')}
                        />
                      )}
                      name="event_date"  // Changed name to "event_date"
                      value={formik.values.event_date} // Update value field to match the new name
                      onBlur={formik.handleBlur}
                      onChange={(eventDate) => {
                        formik.setFieldTouched("event_date");
                        formik.setFieldValue("event_date", eventDate ? eventDate.toString() : '');
                      }}
                      inputFormat="DD-MM-YYYY"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      label="Event Date"  // Changed label to "Holiday Date"
                    />
                  </LocalizationProvider>
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="event_time"
                    variant="filled"
                    label="Event Time "
                    name="event_time"
                    onBlur={formik.handleBlur}
                    value={formik.values.event_time}
                    onChange={formik.handleChange}
                    error={formik.touched.event_time && Boolean(formik.errors.event_time)}
                    helperText={formik.touched.event_time && formik.errors.event_time ? (<span style={{ color: 'red' }}>{formik.errors.event_time}</span>) : ('')}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="venue"
                    variant="filled"
                    label="Event venue"
                    name="venue"
                    onBlur={formik.handleBlur}
                    value={formik.values.venue}
                    onChange={formik.handleChange}
                    error={formik.touched.venue && Boolean(formik.errors.venue)}
                    helperText={formik.touched.venue && formik.errors.venue ? (<span style={{ color: 'red' }}>{formik.errors.venue}</span>) : ('')}
                  />
                  <Controls.TextField
                    InputProps={{
                      disableUnderline: true,
                    }}
                    fullWidth
                    type="text"
                    margin="dense"
                    id="view"
                    variant="filled"
                    label="Event view"
                    name="view"
                    onBlur={formik.handleBlur}
                    value={formik.values.view}
                    onChange={formik.handleChange}
                    error={formik.touched.view && Boolean(formik.errors.view)}
                    helperText={formik.touched.view && formik.errors.view ? (<span style={{ color: 'red' }}>{formik.errors.view}</span>) : ('')}
                  />
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
      </div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {expertEventsdata?.length > 0 ? (

            <>
              <Controls.Grid>
                <Controls.Grid container sx={{ display: 'flex', justifyContent: 'center' }}>
                  {expertEventsdata.map((item, index) => (
                    <>
                      <Controls.Card item xs={4} sx={{
                        maxWidth: 300,
                        backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor,
                        marginRight: '20px',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        },
                        transition: 'transform 0.4s ease'

                      }}>
                        <Controls.Grid sx={{ display: 'flex' }}>
                          <Controls.Grid sx={{ padding: '2px 0px 0px 4px' }}>
                            <Controls.Typography variant='h3'>Event details</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid sx={{ marginLeft: 'auto' }}>
                            <Controls.Grid container justifyContent="flex-end"  >
                              <Controls.Grid item>
                                <IconButton onClick={() => handleModalFormOpen(index)}>
                                  <RemoveRedEyeIcon sx={{ color: 'blue' }} />
                                </IconButton>
                                <IconButton sx={{ color: theme.palette.error.main, }} onClick={() => handleEdit(item)}>
                                  <EditIcon />
                                </IconButton>
                              </Controls.Grid>
                              <Controls.Grid item>
                                <IconButton sx={{ color: 'red', cursor: "pointer" }} onClick={() => handleDelete(item.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Controls.Grid>
                            </Controls.Grid>
                          </Controls.Grid>

                        </Controls.Grid>
                        <Controls.CardContent sx={{ borderTop: '1px solid lightgrey', }}>
                          <Controls.Grid container item xs={8} sx={{ margin: 'auto', display: 'flex' }}>
                            <Controls.Grid item xs={5} sx={{}}>
                              <Controls.Typography variant="h6" gutterBottom> Name : </Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item xs={5}>
                              <Controls.Typography variant="h6" gutterBottom>  {item.event_name} </Controls.Typography>

                            </Controls.Grid>

                            <Controls.Grid item xs={5} sx={{}}>
                              <Controls.Typography variant="h6" gutterBottom>  Date :  </Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item xs={6}>
                              <Controls.Typography variant="h6" gutterBottom> {dayjs(item.event_date).format('DD-MM-YYYY')} </Controls.Typography>

                            </Controls.Grid>

                            <Controls.Grid item xs={5} sx={{}}>
                              <Controls.Typography variant="h6" gutterBottom> Time : </Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item xs={5}>
                              <Controls.Typography variant="h6" gutterBottom>  {item.event_time} </Controls.Typography>

                            </Controls.Grid>

                            <Controls.Grid item xs={5} sx={{}}>
                              <Controls.Typography variant="h6" gutterBottom> Venue : </Controls.Typography>
                            </Controls.Grid>
                            <Controls.Grid item xs={5}>
                              <Controls.Typography variant="h6" gutterBottom>  {item.venue} </Controls.Typography>

                            </Controls.Grid>

                          </Controls.Grid>
                        </Controls.CardContent>
                      </Controls.Card>
                      {viewData === index ? (
                        <>
                          <Controls.Modal
                            open={modalOpen}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Controls.Box sx={styles}>
                              <Controls.Grid xs={12} sx={{ backgroundColor: theme.palette.error.main, padding: '10px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px' }}>
                                <Controls.Typography variant='h3' sx={{color:theme.palette.success.main}} textAlign='center'>{item.event_name} Event</Controls.Typography>
                              </Controls.Grid>
                              <Controls.Grid container sx={{ marginTop: '15px', padding: '0px 20px' }}>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={3} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11' >Name</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}> {item.event_name}</Controls.Typography>
                                  </Controls.Grid>
                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={3} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11' >Date</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{dayjs(item.event_date).format('MM-DD-YYYY')}</Controls.Typography>
                                  </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={3} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Time</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}> {item.event_time}</Controls.Typography>
                                  </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={3} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Venue</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{item.venue}</Controls.Typography>
                                  </Controls.Grid>

                                </Controls.Grid>
                              </Controls.Grid>
                              <Controls.Grid sx={{ padding: '0px 20px' }}>
                                <Controls.Grid xs={12} sx={{ display: 'flex', padding: '10px 0px', }}>
                                  <Controls.Grid xs={2} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>View</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: '24px' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '0px', wordWrap: 'break-word' }}>{item.view}</Controls.Typography>
                                  </Controls.Grid>
                                </Controls.Grid>
                              </Controls.Grid>

                              <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', margin: '10px' }}>
                                <Controls.FormAddCloseButton
                                  variant="contained"
                                  onClick={() => {
                                    handleClose();
                                  }}
                                  buttonText="Close"
                                />
                              </Controls.Typography>

                            </Controls.Box>
                          </Controls.Modal>
                        </>
                      ) : ('')}


                    </>


                  ))}
                </Controls.Grid>

                <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
                  <Controls.ReusablePagination
                    onChange={handlePageChange}
                    count={totalPages} />
                </Controls.Grid>

              </Controls.Grid>
            </>
          ) : (
            <>
              <NoDataFound />
            </>

          )}
        </>
      )}




    </ThemeProvider>
  );
};
export default EventsMangement;