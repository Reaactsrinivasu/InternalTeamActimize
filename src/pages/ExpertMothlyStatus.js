import React from 'react';
import { useFormik } from 'formik';
import { styled } from '@mui/material/styles';
import { useState, useEffect, useMemo, lazy, Suspense, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import { loadMonthlyDetailsStart } from '../redux/actions/ExpertMonthlyActions';
import Controls from "../components/Controls";
import NoDataFound from '../components/NoDataComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: " Expert Name" },
  { id: "total_working_hours", label: "Total Working Hours" },
  { id: "total_non_worked_hours", label: "Expert Working Hours" },
  { id: "total_hours", label: "Expert Non-Working Hours" },
  { id: "total_hours_in_leave", label: "Expert Leave Hours" },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
const ExpertMothlyStatus = () => {
  const anchorRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); }
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const dispatch = useDispatch();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  const handleDropdownChange = async (month) => {
    try {
      dispatch(loadMonthlyDetailsStart(month));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    handleOpen()
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date && typeof date === 'object' && date.$d instanceof Date) {
      const year = date.$d.getFullYear().toString();
      const monthName = date.$d.toLocaleString('default', { month: 'long' }); // Get month name
      const formattedDate = {
        year,
        month: monthName // Use month name instead of number
      };

      dispatch(loadMonthlyDetailsStart(formattedDate));
    } else {
      console.error('Invalid date object:', date);
    }
  };
  const formik = useFormik({
    // initialValues: initialValues,
    // onSubmit: handleSubmit,
    // validationSchema: validationSchema,
  });
  const expertmonthlydata = useSelector((state) => state.expertmonthlydata?.data?.monthly_status || []);
  const totalPages = useSelector((state) => state.expertmonthlydata?.data?.total_pages || []);
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
  const handlePageChange = (event, page) => {

    if (selectedDate instanceof Date) {
      const year = selectedDate.getFullYear().toString();
      const monthName = selectedDate.toLocaleString('default', { month: 'long' });
      const formattedDate = { year, month: monthName };
      dispatch(loadMonthlyDetailsStart(formattedDate, page));
    } else if (selectedDate && typeof selectedDate === 'object' && selectedDate.$d instanceof Date) {
      const year = selectedDate.$d.getFullYear().toString();
      const monthName = selectedDate.$d.toLocaleString('default', { month: 'long' });
      const formattedDate = { year, month: monthName };
      dispatch(loadMonthlyDetailsStart(formattedDate, page));
    } else {
      console.error('Selected date is not a valid Date object:', selectedDate);
    }
  };

  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertmonthlydata} hideActionsCell
      />
    </Suspense>
  ), [columns, expertmonthlydata,]);

  const message = expertmonthlydata?.length > 0 ? true : false
const color = theme.palette.error.main
  return (
    <ThemeProvider theme={theme}>
      <>
        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert Monthly Status
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        {/* <Controls.Paper sx={{ mt: 5, borderRadius: '10px', backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor, }}> */}
        <Controls.Grid container spacing={2}>
          <Controls.Grid item xs={10}>
            <Controls.Paper sx={{ borderRadius: "10px", }}>
              {expertmonthlydata?.length >= 0 && expertmonthlydata
                ? (memoizedTable)
                : null}
            </Controls.Paper>
          </Controls.Grid>
          <Controls.Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                value={selectedDate}
                onChange={handleDateChange}
                views={['year', 'month']}
                openTo="year"
                renderInput={(params) => (
                  <Controls.TextField
                    {...params}
                    format="MMMM yyyy"
                    sx={{
                      svg: { color },
                      input: { color  },
                      label: { color  },
                    }}
                  />
                )}
                classes={{
                  root: 'custom-datepicker-root',
                }}
              />
              <style jsx>{`
                      .custom-datepicker-root .css-15r4bde-PrivatePickersYear-button.Mui-selected {
                        color:#ffa500;
                        background-color: #FFFFFF;
                        border: 2px solid #ffa500;
                      }

                      .custom-datepicker-root .css-ac62hx-MuiTypography-root-PrivatePickersMonth-root.Mui-selected {
                        color: #ffa500;
                        background-color: #FFFFFF;
                        border:2px solid #ffa500;
                    }
                    `}</style>
            </LocalizationProvider>
          </Controls.Grid>
        </Controls.Grid>

        {/* </Controls.Paper> */}
        {!message ? (
         
            <>
            <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <NoDataFound />
            </Controls.Grid>
          </>
        ) : (
          <>
          <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
            <Controls.ReusablePagination
              onChange={handlePageChange}
              count={totalPages} />
          </Controls.Grid>
        </>
        )}

      </>
    </ThemeProvider>
  )
}
export default ExpertMothlyStatus;