import React from 'react'
import Modal from '@mui/material/Modal';
import Controls from "../components/Controls";
import theme from '../Theme';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: "#FFFFFF",
    borderRadius: 2, // Adjust the value as needed
    boxShadow: 24,
    p: 0,
};

const DailyStatusModalFormData = ({ show, closeModal, data }) => {
    return (
        <>
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 5, mr: 5 }}>
                <Modal
                    open={show}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Controls.Grid sx={style}>
                        <Controls.Grid xs={12} sx={{ backgroundColor: theme.palette.error.main, padding: '10px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px' }}>
                            <Controls.Typography variant='h3' sx={{color:theme.palette.success.main}} textAlign='center'>{data?.task_name}</Controls.Typography>
                        </Controls.Grid>
                        <Controls.Grid container sx={{ display: 'block' }}>
                            <Controls.Grid sx={{ display: 'flex', marginBottom: '0px' }}>
                                <Controls.Grid xs={6} sx={{ display: 'flex', alignItems: 'center', padding:'10px 20px' }}>
                                    <Controls.Grid xs={6} sx={{ display: 'flex', }}>
                                        <Controls.Typography variant='h11'>Status/Update </Controls.Typography>
                                        <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={6}>
                                        <Controls.Typography variant='h12' sx={{ textAlign: 'center', marginLeft:'20px' }}>{data?.daily_status}</Controls.Typography>
                                    </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Controls.Grid xs={6} sx={{ display: 'flex', }}>
                                        <Controls.Typography variant='h11'>Task Progress </Controls.Typography>
                                        <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={6}>
                                        <Controls.Typography variant='h12' sx={{ textAlign: 'center', marginLeft:'20px' }}>{data?.task_progress}</Controls.Typography>
                                    </Controls.Grid>

                                </Controls.Grid>
                            </Controls.Grid>

                            <Controls.Grid container sx={{padding:'0px 20px'}} >
                                <Controls.Grid xs={12} sx={{ display: 'flex',  }}>
                                    <Controls.Grid xs={2.8} sx={{display:'flex', }} >
                                        <Controls.Typography variant='h11' sx={{ textAlign: 'center' }}>Description</Controls.Typography>
                                        <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={9.2} sx={{paddingLeft:'20px'}}>
                                        <Controls.Typography variant='h12' sx={{ textAlign: 'center', wordWrap: 'break-word'}}>{data?.description}</Controls.Typography>
                                    </Controls.Grid>
                                </Controls.Grid>
                            </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid  sx={{display: 'flex', flexDirection: 'row', justifyContent: 'end', margin: '10px'  }}>
                            <Controls.FormAddCloseButton
                                variant="contained"
                                onClick={() => {
                                    closeModal();
                                }}
                                buttonText="Close"
                            />
                        </Controls.Grid>
                    </Controls.Grid>

                </Modal>
            </Controls.Box>
        </>
    )
}

export default DailyStatusModalFormData;