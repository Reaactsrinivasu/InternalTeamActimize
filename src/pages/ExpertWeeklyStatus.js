import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import Controls from '../components/Controls';
import {
  Table
} from '@mui/material';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import { useState, useEffect, useRef } from 'react';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import * as dayjs from 'dayjs';
import { loadWeeklyDetailsStart, loadWeeklySelectDetailsStart } from '../redux/actions/expertWeeklyActions';
import ReusablePaper from '../components/Paper';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';

const style = {
  p: 4,
  top: '55%',
  left: '50%',
  width: 300,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  // bgcolor: 'background.paper',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.error.main,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({

  backgroundColor: theme.palette.customColorOrange.main,

}));
const ITEMS_PER_PAGE = 1;
const ExpertWeeklyStatus = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading , setLoading] = useState(true);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const dispatch = useDispatch();
  const initialValues = {
    expert_id: '',
    message: '',
    note: '',
  };
  const validationSchema = Yup.object({
    expert_id: Yup
      .string()
      .min(1, " expert name is Short!")
      .max(50, " expert name is Long!")
      .required(' expert name is required'),
    message: Yup
      .string()
      .min(2, "message is Short!")
      .max(50, "message is Long!")
      .required('message is required'),
    note: Yup
      .string()
      .min(2, "note is Short!")
      .max(50, "note is Long!")
      .required('note is required'),

  });
  const handleDropdownChange = async (name, start_date) => {
    try {
      dispatch(loadWeeklySelectDetailsStart(name, start_date));

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    handleOpen()
  };

  const handleSubmit = (values, { setStatus, resetForm }) => {
  }
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });
  const expertcertificate = useSelector((state) => state.expertweeklydata?.data?.previous_weeks || []);
  const totalPages = useSelector((state) => state.expertweeklydata?.data?.total_pages);
  const expertSelectdata = useSelector((state) => state.expertWeeklySelectData.data || []);


  useEffect(() => {
    dispatch(loadWeeklyDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
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
  const handleEdit = (id) => {
    setUserInfo(id);
    formik.setFieldValue(id);
  }

  const handlePageChange = (event, page) => {
    dispatch(loadWeeklyDetailsStart(page));
  };
  const message = expertcertificate?.length > 0  ? true : false ;

  return (
    <ThemeProvider theme={theme}>
      <>
        <Box>
          <ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Typography variant="h2" sx={{ mt: 0 }}>
                Expert Weekly Status
              </Typography>
            </Box>
          </ReusablePaper>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, width: 500, borderRadius: 4, backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, }}>
              <Typography variant="h2" component="h2" sx={{ marginBottom: 2, textAlign: 'center' }}>
                Expert Weekly Status
              </Typography>
              <Paper elevation={5} sx={{ padding: 2, borderRadius: 1, backgroundColor: theme.palette.success.main, }}>
                <Grid container direction="row" spacing={2} justifyContent="center">
                  {expertSelectdata.daily_status && expertSelectdata.daily_status.length > 0 ? (
                    expertSelectdata.daily_status.map((status, index) => (
                      <Grid item key={index} sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ marginBottom: 1 }}>
                          Date: {status.date}
                        </Typography>
                        {status.hours !== undefined && (
                          <Typography variant="h3" sx={{ marginBottom: 1 }}>
                            Hours: {status.hours}
                          </Typography>
                        )}
                        {status.day !== undefined && (
                          <Typography variant="h3" sx={{ marginBottom: 1 }}>
                            Day: {status.day}
                          </Typography>
                        )}
                      </Grid>
                    ))
                  ) : (
                    <Grid item xs={12}>
                      <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                        No data available
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Box>
          </Modal>
        </Box>
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
          <Paper sx={{ mt: 2, borderRadius: '10px', }}>
            <TableContainer component={Paper} sx={{ borderRadius: '10px', }}>
              <Table sx={{ minWidth: 100 }} aria-label="customized table">
                <TableHead >
                  <TableRow  >
                    <StyledTableCell align="center">S.No</StyledTableCell>
                    <StyledTableCell align="center"> Name </StyledTableCell>
                    <StyledTableCell align="center">Start Date &nbsp;</StyledTableCell>
                    <StyledTableCell align="center">End Date&nbsp;</StyledTableCell>
                    <StyledTableCell align="center"> Total Working  Hours  </StyledTableCell>
                    <StyledTableCell align="center">Expert Working Hours&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">Expert Non-Working Hours&nbsp;</StyledTableCell>
                    <StyledTableCell align="center">Expert Leave Hours&nbsp;</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.isArray(expertcertificate) && expertcertificate.length > 0 ? (
                    expertcertificate.map((item, index) => (
                      <StyledTableRow key={index}
                      >
                        <StyledTableCell align="center" component="th" scope="row"
                          sx={{
                            color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                          }}>
                          {index + 1}
                        </StyledTableCell>
                        <StyledTableCell sx={{
                          color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                        }} align="center" onClick={() => handleDropdownChange(item.name,
                          item.start_date)}>
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell sx={{
                          color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                        }} align="center">{dayjs(item.start_date).format('DD-MM-YYYY')}</StyledTableCell>
                        <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }} align="center">{dayjs(item.end_date).format('DD-MM-YYYY')}</StyledTableCell>
                        <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }} align="center">{item.total_hours}</StyledTableCell>
                        <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }} align="center">{item.total_working_hours}</StyledTableCell>
                        <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }} align="center">{item.total_non_worked_hours}</StyledTableCell>
                        <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }} align="center">{item.total_hours_in_leave}</StyledTableCell>
                      </StyledTableRow>
                    ))
                  ) : (
                    <StyledTableRow sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor, }}>
  
                    </StyledTableRow>
                  )}
                </TableBody>
  
              </Table>
            </TableContainer>
  
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Controls.ReusablePagination
                onChange={handlePageChange}
                count={totalPages}  />
            </Grid>
          </Box>
          </>
        )}
          </>
          
        )}
       
      </>
    </ThemeProvider>
  )
}
export default ExpertWeeklyStatus;