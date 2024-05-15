import React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import Controls from "../components/Controls";
import theme from '../Theme';

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 680,
    bgcolor: theme.palette.customColorOrange.main,
    borderRadius: 2, // Adjust the value as needed
    boxShadow: 24,
    p: 4,
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
                        <Controls.Grid container sx={{ display: 'block' }}>
                            <Controls.Grid sx={{ display: 'flex', marginBottom: '20px' }}>
                                <Controls.Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Controls.Grid xs={5} sx={{ display: 'flex', }}>
                                        <Controls.Typography variant='h5'>Status/Update </Controls.Typography>
                                        <Controls.Typography variant='h5' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={6}>
                                        <Controls.Typography variant='h4' sx={{ textAlign: 'center', }}>{data?.daily_status}</Controls.Typography>
                                    </Controls.Grid>

                                </Controls.Grid>
                                <Controls.Grid xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Controls.Grid xs={5} sx={{ display: 'flex', }}>
                                        <Controls.Typography variant='h5'>Task Progress </Controls.Typography>
                                        <Controls.Typography variant='h5' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={6}>
                                        <Controls.Typography variant='h4' sx={{ textAlign: 'center', }}>{data?.task_progress}</Controls.Typography>
                                    </Controls.Grid>

                                </Controls.Grid>
                            </Controls.Grid>

                            <Controls.Grid container sx={{ justifyContent: 'center',}} >
                            <Controls.Grid xs={10} sx={{ display: 'block', alignItems: 'center' , margin:'15px'}}>
                                    <Controls.Grid xs={12} >
                                        <Controls.Typography variant='h3' sx={{textAlign:'center'}}>Task Name</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={12}>
                                        <Controls.Typography variant='h5' sx={{ textAlign:'center' }}>{data?.task_name}</Controls.Typography>
                                    </Controls.Grid>
                                </Controls.Grid>
                                <Controls.Grid xs={10} sx={{ display: 'block', alignItems: 'center' }}>
                                    <Controls.Grid xs={12} >
                                        <Controls.Typography variant='h3' sx={{textAlign:'center'}}>Description</Controls.Typography>
                                    </Controls.Grid>
                                    <Controls.Grid xs={12}>
                                        <Controls.Typography variant='h5' sx={{ textAlign:'center' }}>{data?.description}</Controls.Typography>
                                    </Controls.Grid>
                                </Controls.Grid>
                            </Controls.Grid>
                        </Controls.Grid>
                        <Controls.Grid sx={{ marginTop: '20px' }}>
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