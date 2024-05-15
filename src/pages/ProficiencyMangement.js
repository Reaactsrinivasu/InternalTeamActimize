import React from 'react';
import { useFormik } from 'formik';
import { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadProficiencyDetailsStart, loadProficiencySelectDetailsStart } from '../redux/actions/expertProficiencyActions';
import Controls from "../components/Controls";
import {
  initialValues,
} from "../components/Validations";
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';
import PleasEnterDataImgComponent from '../components/PleaseEnterDataImgComponent';
const ResuableTable = lazy(() => import("../components/Table"));
const columns = [
  { id: "id", label: "S.No" },
  { id: "name", label: "Expert Name" },
  { id: "employee_id_number", label: "Employee" },
  { id: "mobile_number", label: "Mobile Number" },
  { id: "email", label: "Email" },
  { id: "designation", label: "Designation" },
];
const ProficiencyMangement = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [loading , setLoading] = useState(true);
  const handleOpen = () => { setOpen(true); }
  const [changeData, setChangeData] = useState(false);
  const handleClose = () => { setOpen(false); formik.resetForm(); setUserInfo({}); };
  const [selectedSkill, setSelectedSkill] = useState("");
  const dispatch = useDispatch();

  const handleDropdownChange = async (skill_name) => {
    setChangeData(true)
    try {
      setSelectedSkill(skill_name);
      dispatch(loadProficiencySelectDetailsStart(skill_name));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
  });
  const expertProficiencydata = useSelector((state) => state.expertProficiencydata.data || []);
  const expertProficiencydataone = useSelector((state) => state.expertproficiencyselectdata?.data?.skilled_users || []);
  const totalPages = useSelector((state) => state.expertproficiencyselectdata?.data?.total_pages || []);
  const skills = expertProficiencydata?.skills;
  useEffect(() => {
    dispatch(loadProficiencyDetailsStart());
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  })

  const handlePageChange = (event, page) => {
    dispatch(loadProficiencySelectDetailsStart(selectedSkill, page));
  };
  const memoizedTable = useMemo(() => (
    <Suspense fallback={<div>{''}</div>}>
      <ResuableTable
        columns={columns}
        data={expertProficiencydataone} hideActionsCell
      />
    </Suspense>
  ), [columns, expertProficiencydataone,]);

  const message = expertProficiencydata?.message 
  return (
    <ThemeProvider theme={theme}>
      <>

        <Controls.Box>
          <Controls.ReusablePaper elevation={1} sx={{ padding: '10px', mb: 2, mt: 2, boxShadow: '0px 10px 80px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }} >
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>

              <Controls.Typography variant="h2" sx={{ mt: 1.5 }}>
                Experts Proficiency
              </Controls.Typography>
              <Controls.TextField
                sx={{ marginTop: '9px', width: '25%' }}
                InputProps={{
                  disableUnderline: true,
                }}
                select
                fullWidth
                variant='filled'
                defaultValue=""
                name='type_of_leave'
                label="Technologies"
                placeholder='Select Leave'
                onBlur={formik.handleBlur}
                onChange={(event) => handleDropdownChange(event.target.value)}
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        backgroundColor: theme.components.tables.styleOverrides.containedPrimaryModelPaper.backgroundColor,  // Set background color for dropdown menu items box
                      },
                    },
                  },
                }}
              >
                {Array.isArray(skills) && skills.length > 0 ? (
                  skills.map((item, index) => (
                    <Controls.MenuItem key={index} value={item}>{item}</Controls.MenuItem>
                  ))
                ) : (
                  <p>No data available</p>
                )}
              </Controls.TextField>
            </Controls.Box>
          </Controls.ReusablePaper>
        </Controls.Box>
        {loading ? (
          <LoadingComponent />
        ) : (
          <>
          { !changeData ? (
           
             <>
             <Controls.Grid container sx={{justifyContent:'center'}}>
             <PleasEnterDataImgComponent text='Technology' />
             </Controls.Grid>
             </>
          ) : (
            <>
            <Controls.Paper sx={{ mt: 2, borderRadius: "10px" }}>
              {expertProficiencydataone?.length >= 0 && expertProficiencydataone
                ? (memoizedTable)
                : null}
            </Controls.Paper>
    
            <Controls.Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: 2 }}>
              <Controls.ReusablePagination
                onChange={handlePageChange}
                count={totalPages}  />
            </Controls.Grid>
            </>
          )}

          </>
        )}
      </>
    </ThemeProvider>
  )
}
export default ProficiencyMangement;