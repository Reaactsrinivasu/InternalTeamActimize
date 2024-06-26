import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { loadMonthlyAttendenceDetailsStart } from '../redux/actions/expertMonthlyAttenListActions';
import Controls from "../components/Controls";
import { ThemeProvider } from '@mui/material/styles';
import dayjs from 'dayjs'; 
import theme from "../Theme";
import PleasEnterDataImgComponent from '../components/PleaseEnterDataImgComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "expert_name", label: " Expert Name" },
  { id: "present_days", label: "Present Days" },
  { id: "leave_days", label: "Leaves" },
  { id: "holiday_days", label: "Holidays" },
  { id: "working_days_in_month", label: " Working days in month" },
  { id: "expert_working_days", label: " Expert working days" },
];

const ExpertMonthlyAttendenceList = () => {
  const [userInfo, setUserInfo] = useState({});
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const dispatch = useDispatch();
  const initialValues = {
    year: '',
    month: '',
  };
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   if (date && typeof date === 'object' && date.$d instanceof Date) {
  //     const year = date.$d.getFullYear().toString();
  //     const month = (date.$d.getMonth() + 1).toString().padStart(2, '0'); // Get month (zero-based) and pad it to 2 digits
  //     const formattedDate = {
  //       year,
  //       month
  //     };
  //     dispatch(loadMonthlyAttendenceDetailsStart(formattedDate));
  //   } else {
  //     console.error('Invalid date object:', date);
  //   }
  // };
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date && dayjs(date).isValid()) {
      const year = dayjs(date).year().toString();
      const month = (dayjs(date).month() + 1).toString().padStart(2, '0'); // Get month (zero-based) and pad it to 2 digits
      const formattedDate = {
        year,
        month,
      };
      dispatch(loadMonthlyAttendenceDetailsStart(formattedDate));
    } else {
      console.error('Invalid date object:', date);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
  });
  const expertmonthlydata = useSelector((state) => state.expertmonthlyAttendencelistdata?.data?.monthly_attendance || []);
  const totalPages = useSelector((state) => state.expertmonthlyAttendencelistdata?.data?.total_pages);

  let id = userInfo.id;
  useEffect(() => {
    if (id) {
      formik.setValues(userInfo);
    }
  }, [userInfo]);

  const handlePageChange = (event, page) => {
    if (selectedDate instanceof Date) {
      const year = selectedDate.getFullYear().toString();
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const formattedDate = { year, month };
      dispatch(loadMonthlyAttendenceDetailsStart(formattedDate, page));
    } else if (selectedDate && typeof selectedDate === 'object' && selectedDate.$d instanceof Date) {
      // Handle case where selectedDate is coming from another source (e.g., M object)
      const year = selectedDate.$d.getFullYear().toString();
      const month = (selectedDate.$d.getMonth() + 1).toString().padStart(2, '0');
      const formattedDate = { year, month };
      dispatch(loadMonthlyAttendenceDetailsStart(formattedDate, page));
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

  const message = expertmonthlydata?.length > 0 ? true : false;
  const color = theme.palette.error.main;

  return (
    <ThemeProvider theme={theme}>
      <>

        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>

              <Controls.Typography variant="h2" sx={{ mt: 0 }}>
                Expert Monthly Attendence List
              </Controls.Typography>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
          <Controls.Grid container spacing={2}>
            <Controls.Grid item xs={10}>
              <Controls.Paper sx={{ borderRadius: "10px" }}>
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
                  inputFormat="YYYY MM"
                  renderInput={(params) => (
                    <Controls.TextField
                      {...params}
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

        {message ? (
          <>
            <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <Controls.ReusablePagination
                onChange={handlePageChange}
                count={totalPages} color="success" />
            </Controls.Grid>
          </>
        ) : (
          <>

            <Controls.Grid container sx={{ marginTop: '30px', justifyContent:'center' }}>
             <PleasEnterDataImgComponent  text='Date'/>
            </Controls.Grid>
          </>
        )}




      </>
    </ThemeProvider>
  )
}
export default ExpertMonthlyAttendenceList;