

import React, { useEffect, useState } from 'react';
import * as dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyProjectsDetailsStart } from '../redux/actions/myProjectsActions';
import Controls from "../components/Controls";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import theme from "../Theme"; // Import your theme
import { Grid, Typography } from '@mui/material';
import NoDataFound from '../components/NoDataComponent';
import LoadingComponent from '../components/LoadingComponent';

const MyProjects = () => {
  const [open, setOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [descriptionData, setDescriptionData] = useState('');
  const [indexValue, setIndexValue] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const projectsList = useSelector((state) => state.projectsdata?.data?.projects || []);
  const totalRecords = useSelector((state) => state.projectsdata?.data?.total_projects);
  const perPage = useSelector((state) => state.projectsdata?.data?.per_page);

  useEffect(() => {
    dispatch(loadMyProjectsDetailsStart());
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handlePageChange = (event, page) => {
    dispatch(loadMyProjectsDetailsStart(page));
  };

  const totalPages = Math.ceil(totalRecords / perPage);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 1,
    p: 0,
  };

  const handleOpen = (member, description, index) => {
    setSelectedMembers(member);
    setDescriptionData(description);
    setIndexValue(index);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Controls.Box sx={{ marginLeft: "0%" }}>
        <Controls.ReusablePaper elevation={1}>
          <Controls.Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Controls.Typography variant="h2" sx={{ mt: 0 }}>
              My Projects
            </Controls.Typography>
          </Controls.Box>
        </Controls.ReusablePaper>
      </Controls.Box>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {projectsList.length > 0 ? (
            <>
              <Controls.Grid container sx={{ justifyContent: 'center', }}>
                <Controls.Grid container item xs={12} sx={{ display: 'flex', justifyContent: 'center', }}>
                  {projectsList && projectsList.map((item, index) => (
                    <>
                      <Controls.Grid xs={12} md={3.6} sx={{
                        backgroundColor: theme.components.tables.styleOverrides.containedPrimarycardpaper.backgroundColor,
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '15px', margin: '10px',
                        transition: 'box-shadow 0.3s ease',
                        '&:hover': {
                          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
                        },
                      }} >
                        <Controls.Grid sx={{ padding: '10px 10px 0px 10px', display: 'flex', alignItems: 'center' }}>
                          <Controls.Typography variant="h2" >{item.project_name} </Controls.Typography>
                          <RemoveRedEyeIcon sx={{ marginLeft: 'auto' }} onClick={() => handleOpen(item.members, item.description, index)} />
                        </Controls.Grid>
                        <Controls.Divider sx={{ mt: 1, height: 2, }} color='orange' />
                        <Controls.Grid container sx={{ padding: '10px 20px', display: 'flex', }}>
                          <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Initial Date </Controls.Typography>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                            <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{dayjs(item.start_date).format('DD-MM-YYYY')}</Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container sx={{ padding: '10px 20px', display: 'flex' }}>
                          <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Final Date </Controls.Typography>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                            <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{dayjs(item.end_date).format('DD-MM-YYYY')}</Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container sx={{ padding: '10px 20px', display: 'flex' }}>
                          <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}>Status  </Controls.Typography>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                            <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}>{item.status}</Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid container sx={{ padding: '10px 20px', display: 'flex' }}>
                          <Controls.Grid item xs={5} sx={{ display: 'flex' }}>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold' }}> Assigned By</Controls.Typography>
                            <Controls.Typography variant='h5' sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>:</Controls.Typography>
                          </Controls.Grid>
                          <Controls.Grid item xs={7} sx={{ paddingLeft: '30px' }}>
                            <Controls.Typography variant='h6' sx={{ marginLeft: 'auto' }}> {item.assigned_by}</Controls.Typography>
                          </Controls.Grid>
                        </Controls.Grid>
                      </Controls.Grid>
                      {indexValue === index ? (
                        <>
                          <Controls.Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Controls.Box sx={style}>
                              <Controls.Grid xs={12} sx={{ backgroundColor: theme.palette.error.main, padding: '10px', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                                <Controls.Typography variant='h3' sx={{color:theme.palette.success.main}} textAlign='center'>{item?.project_name}</Controls.Typography>
                              </Controls.Grid>
                              <Controls.Grid container sx={{ padding: '20px' }}>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Initial Date</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={6} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{dayjs(item.end_date).format('DD-MM-YYYY')}</Controls.Typography>
                                  </Controls.Grid>
                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Final Date</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={6} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{dayjs(item.end_date).format('DD-MM-YYYY')}</Controls.Typography>
                                  </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Status</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={6} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}> {item.status}</Controls.Typography>
                                  </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Assigned By</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={6} >
                                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{item.assigned_by}</Controls.Typography>
                                  </Controls.Grid>
                                </Controls.Grid>
                                <Controls.Grid xs={12} sx={{ display: 'flex', padding: '10px 0px' }}>
                                  <Controls.Grid xs={3} sx={{ display: 'flex' }}>
                                    <Controls.Typography variant='h11'>Members</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                  </Controls.Grid>
                                  <Controls.Grid xs={9} >
                                    <Controls.Grid container sx={{ display: 'flex', marginLeft: '20px' }}>
                                      {selectedMembers && selectedMembers.map((item, index) => (
                                        <>
                                          <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                                            <Grid xs={2}>
                                              <Typography variant='h12'>{index + 1}</Typography>
                                            </Grid>
                                            <Grid xs={10}>
                                              <Typography variant='h12'>{item.name}</Typography>
                                            </Grid>
                                          </Controls.Grid>
                                        </>
                                      ))}
                                    </Controls.Grid>
                                  </Controls.Grid>
                                </Controls.Grid>
                              </Controls.Grid>
                              <Controls.Grid sx={{ padding: '0px 20px', display:'flex' }}>
                                <Controls.Grid xs={3.2} sx={{display:'flex'}}>
                                  <Controls.Typography variant='h11' >Description</Controls.Typography>
                                    <Controls.Typography variant='h11' sx={{ marginLeft:'auto' }}>:</Controls.Typography>
                                </Controls.Grid>
                                <Controls.Grid xs={9} sx={{marginLeft:'20px'}}>
                                  <Typography sx={{ wordWrap: 'break-word' }} variant='h12'>{descriptionData}</Typography>
                                </Controls.Grid>
                              </Controls.Grid>
                              <Controls.Grid sx={{ margin: '10px',display: 'flex', flexDirection: 'row', justifyContent: 'end', }}>
                                <Controls.FormAddCloseButton
                                  variant="contained"
                                  onClick={() => {
                                    handleClose();
                                  }}
                                  buttonText="Close"
                                />
                              </Controls.Grid>
                            </Controls.Box>
                          </Controls.Modal>
                        </>
                      ) : ('')}
                    </>
                  ))}
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid sx={{ paddingBottom: '40px' }}>
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


    </>
  );
};

export default MyProjects;
