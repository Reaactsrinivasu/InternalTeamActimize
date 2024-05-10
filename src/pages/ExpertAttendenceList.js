import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FormControlLabel from '@mui/material/FormControlLabel';
import * as dayjs from 'dayjs';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import { createAttendenceListDetailsStart, loadAttendenceListDetailsStart, updateAttendenceListDetailsStart } from '../redux/actions/expertAttendencelistActions';
import { loadAllUsersStart } from '../redux/actions/allUsersActions';
import Controls from "../components/Controls";
const style = {
  p: 4,
  top: '45%',
  left: '50%',
  width: 300,
  boxShadow: 30,
  maxHeight: '100%',
  maxWidth: '100vw',
  overflowY: 'auto',
  position: 'absolute',
  backgroundColor: (theme) =>
    theme.palette.common.white,
  transform: 'translate(-50%, -50%)',
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    // color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const StyledTableRow = styled(Controls.TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    // backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
const ExpertAttendenceList = () => {
  const [updatedEMData, setUpdatedEMData] = useState([])
  const [formChange, setFormChange] = useState(false);
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = React.useState(null);
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const initialValues = {
    date: new Date(),
    present: [],
    leave: [],
    holiday: []
  };
  const [finalData, setFinalData] = useState({
    date: dayjs(new Date()).format('YYYY-MM-DD'),
    present: [],
    leave: [],
    holiday: []
  });
  const validationSchema = Yup.object({
    date: Yup
      .date()
      .required('Start Date is required'),
    present: Yup.array().min(0, 'At least one role must be selected')
      .required('Role is required'),
    leave: Yup.array().min(0, 'At least one role must be selected')
      .required('Role is required'),
    holiday: Yup.array().min(0, 'At least one role must be selected')
      .required('Role is required'),
  });
  const handleSubmit = () => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');

    const updatedData = {
      ...finalData,
      date: formattedDate,
    };

    dispatch(createAttendenceListDetailsStart(updatedData));
    Controls.toast.success("Data Added Successfully");
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
  });
  const handleDateChange = (date) => {
    let formattedDate = dayjs(date).format('YYYY-MM-DD');
    setFormChange(true);
    setSelectedDate(date);
    dispatch(loadAttendenceListDetailsStart(date));
  };
  const allusersnamedata = useSelector((state) => state.alluserdata.data || []);
  useEffect(() => {
    dispatch(loadAllUsersStart());
  }, [])
  const expertmonthlydata = useSelector((state) => state.expertAttendencelistdata.data || []);
  const [switches, setSwitches] = React.useState(() => {
    if (Array.isArray(expertmonthlydata) && expertmonthlydata.length > 0) {
      return expertmonthlydata[0].experts.map((expert) => ({
        present: expert.present,
        leave: expert.leave,
        holiday: expert.holiday,
      }));
    }
    return [];
  });
  const handleSwitchChange = (rowIndex, propertyIndex, property, checked, expertId) => {
    console.log(rowIndex, propertyIndex, property, checked, finalData, expertmonthlydata, expertId);
    let experts = updatedEMData.length > 0 ? [...updatedEMData[0].experts] : [...expertmonthlydata?.[0]?.experts];
    expertmonthlydata[0].experts = [...experts];
    expertmonthlydata[0].experts = [...experts.map((i) => {
      if (i.expert_id === expertId) {
        if (property === 'present') {
          return { ...i, present: checked, leave: false, holiday: false }
        }
        if (property === 'leave') {
          return { ...i, leave: checked, present: false, holiday: false }
        }
        if (property === 'holiday') {
          return { ...i, holiday: checked, leave: false, present: false }
        }
      } else {
        return i;
      }
    })]
    setUpdatedEMData([...expertmonthlydata])

  };
  const [switchValues, setSwitchValues] = useState([]);
  useEffect(() => {
    setSwitchValues(new Array(allusersnamedata.length).fill([false, false, false]));
  }, [allusersnamedata]);
  const handleSwitchChangeone = (rowIndex, switchIndex, user) => {
    setSwitchValues((prevSwitchValues) => {
      const updatedSwitchValues = prevSwitchValues.map((row, index) => {
        if (index === rowIndex) {
          return row.map((switchValue, i) => (i === switchIndex ? !switchValue : false));
        }
        return row;
      });
   
      return updatedSwitchValues;
    });
    let updateData = finalData
    if (switchIndex == 0) {
      if (finalData.present.includes(user.id)) {
        updateData.present = updateData.present.filter(i => i !== user.id);
      } else {
        updateData.present.push(user.id)
        updateData.leave = updateData.leave.filter(i => i !== user.id);
        updateData.holiday = updateData.holiday.filter(i => i !== user.id);
      }
    }
    if (switchIndex == 1) {
      if (finalData.leave.includes(user.id)) {
        updateData.leave = updateData.leave.filter(i => i !== user.id);
      } else {
        updateData.leave.push(user.id)
        updateData.present = updateData.present.filter(i => i !== user.id);
        updateData.holiday = updateData.holiday.filter(i => i !== user.id);
      }
    }
    if (switchIndex == 2) {
      if (finalData.holiday.includes(user.id)) {
        updateData.holiday = updateData.holiday.filter(i => i !== user.id);
      } else {
        updateData.holiday.push(user.id)
        updateData.leave = updateData.leave.filter(i => i !== user.id);
        updateData.present = updateData.present.filter(i => i !== user.id);
      }
    }
    setFinalData(updateData)
  };
  const handleAttendanceUpdate = () => {
    const formattedDate = dayjs(selectedDate).format('YYYY-MM-DD');
    const updatedData = {
      date: formattedDate,
      present: updatedEMData[0].experts.filter(i => i.present).map(i => i.expert_id),
      leave: updatedEMData[0].experts.filter(i => i.leave).map(i => i.expert_id),
      holiday: updatedEMData[0].experts.filter(i => i.holiday).map(i => i.expert_id)
    };
    if (Array.isArray(updatedEMData) && updatedEMData.length > 0) {
      const anyid = updatedEMData[0].id;
      dispatch(updateAttendenceListDetailsStart(updatedData, anyid));
      Controls.toast.success("Data Updated  Successfully");
    }
   
  };
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert  Attendence List
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        {/* <Controls.Paper sx={{ mt: 5, borderRadius: '10px', backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, }}> */}
          <Controls.Grid container spacing={2}>
            <Controls.Grid item xs={10}>
              {Array.isArray(expertmonthlydata) && expertmonthlydata.length > 0 ? (
                <Controls.TableContainer component={Controls.Paper} sx={{ borderRadius: '10px' }}>
                  <Controls.Table sx={{ minWidth: 100 }} aria-label="customized table">
                    <Controls.TableHead sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablehead.backgroundColor, }}>
                      <Controls.TableRow>
                        <StyledTableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Expert name</StyledTableCell>
                        <StyledTableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Present</StyledTableCell>
                        <StyledTableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Leave</StyledTableCell>
                        <StyledTableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Holiday</StyledTableCell>
                      </Controls.TableRow>
                    </Controls.TableHead>
                    <Controls.TableBody>
                      {(updatedEMData.length > 0 ? updatedEMData : expertmonthlydata).map((item, rowIndex) => (
                        item.experts.map((expert, innerSwitchIndex) => {
                          const user = allusersnamedata.find(userItem => userItem.id === expert.expert_id);
                          const userName = user ? user.name : 'N/A';
                          return (
                            <StyledTableRow key={`${rowIndex}-${innerSwitchIndex}`}>
                              <StyledTableCell align="center" sx={{
                                backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor,
                                color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                              }}>{userName}</StyledTableCell>
                              {['present', 'leave', 'holiday'].map((property, propertyIndex) => (
                                <StyledTableCell key={propertyIndex} align="center"
                                  sx={{
                                    backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor,
                                    color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                                  }}>
                                  <FormControlLabel
                                    required
                                    control={
                                      <Controls.Switch
                                        checked={expert[property]}
                                        onChange={(e) => handleSwitchChange(rowIndex, propertyIndex, property, e.target.checked, expert.expert_id)}
                                      />
                                    }
                                  />
                                </StyledTableCell>
                              ))}
                            </StyledTableRow>
                          );
                        })
                      ))}
                    </Controls.TableBody>
                  </Controls.Table>
                  <Controls.Box sx={{ textAlign: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, }}>
                    <Controls.Button type="submit" onClick={handleAttendanceUpdate} variant="contained" sx={{margin:'10px 0px', backgroundColor:theme.palette.error.main, paddingTop:'8px', "&:hover":{backgroundColor:theme.palette.error.main}}}>
                      update
                    </Controls.Button>
                  </Controls.Box>
                </Controls.TableContainer>
              ) : (
                <Controls.Grid container spacing={2}>
                  <Controls.Grid item xs={12}>
                    <form onSubmit={(e) => { e.preventDefault(); formik.handleSubmit(e) }}>
                      <Controls.TableContainer component={Controls.Paper} sx={{ borderRadius: '10px' }}>
                        <Controls.Table sx={{ minWidth: 100 }} aria-label="customized table">
                          <Controls.TableHead sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablehead.backgroundColor, }}>
                            <Controls.TableRow>
                              <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }} align="center">Expert Name</StyledTableCell>
                              <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }} align="center">Present</StyledTableCell>
                              <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }} align="center">Leave</StyledTableCell>
                              <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }} align="center">Holiday</StyledTableCell>
                            </Controls.TableRow>
                          </Controls.TableHead>
                          {selectedDate && (
                            <Controls.TableBody>
                              {Array.isArray(allusersnamedata) && allusersnamedata.length > 0 ? (
                                allusersnamedata.map((user, row) => {
                                  return (
                                    <StyledTableRow key={row}>
                                      <StyledTableCell sx={{
                                        backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor,
                                        color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                                      }} align="center">{user.name}</StyledTableCell>
                                      {[0, 1, 2].map((column) => (
                                        <StyledTableCell key={column} align="center" sx={{
                                          backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor,
                                          color: theme.components.tables.styleOverrides.containedPrimarytablebody.color,
                                        }}>
                                          <FormControlLabel
                                            required
                                            control={
                                              <Controls.Switch
                                                checked={switchValues[row]?.[column] || false}
                                                onChange={() => handleSwitchChangeone(row, column, user)}
                                              />
                                            }
                                          />
                                        </StyledTableCell>
                                      ))}
                                    </StyledTableRow>
                                  );
                                })
                              ) : (
                                <Controls.TableRow>
                                  <Controls.TableCell colSpan={4}>No data available</Controls.TableCell>
                                </Controls.TableRow>
                              )}
                            </Controls.TableBody>
                          )}
                        </Controls.Table>
                        <Controls.Box sx={{ textAlign: 'center', backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, }}>
                          <Controls.Button type="button" variant="contained" disabled={
                            !formChange}
                            sx={{ margin:'10px 0px', paddingTop:'10px',
                            
                              bgcolor: theme.palette.error.main,
                              '&:hover': {
                                bgcolor: theme.palette.error.main,
                              },
                            }}
                            onClick={handleSubmit}>
                            Submit
                          </Controls.Button>
                        </Controls.Box>

                      </Controls.TableContainer>
                    </form>
                  </Controls.Grid>
                </Controls.Grid>
              )}
            </Controls.Grid>
            <Controls.Grid item xs={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  renderInput={(params) => (
                    <Controls.TextField
                      {...params}
                    />
                  )}
                  classes={{ root: 'custom-datepicker-root', }}
                />
                
                 <style jsx>{`
                      .custom-datepicker-root .css-bkrceb-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
                        color: #fff;
                        background-color: #e99936;
                      }

                      .custom-datepicker-root .css-195y93z-MuiButtonBase-root-MuiPickersDay-root:not(.Mui-selected) {
                        border: 1px solid #e99936;
                    }
                    }
                    `}</style>
              </LocalizationProvider>
            </Controls.Grid>
          </Controls.Grid>
        {/* </Controls.Paper> */}
      </>
    </ThemeProvider>
  )
}
export default ExpertAttendenceList;