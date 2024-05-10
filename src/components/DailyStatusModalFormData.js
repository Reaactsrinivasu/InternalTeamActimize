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
    const descriptionData = data?.description;
    return (
        <>
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 5, mr: 5 }}>
                <Modal
                    open={show}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Controls.Grid sx={style}>
                        <Controls.Grid container sx={{display:'block'}}>
                            <Controls.Grid sx={{display:'flex'}}>
                                {/* <Controls.Grid xs={6} >
                                <Controls.Typography variant='h4' sx={{ textAlign: 'center', marginBottom: '20px' }}>{data?.daily_status}</Controls.Typography>

                                </Controls.Grid>
                                <Controls.Grid xs={6}>
                                <Controls.Typography variant='h4' sx={{ textAlign: 'center', marginBottom: '20px' }}>{data?.task_progress}</Controls.Typography>
                                     
                                </Controls.Grid> */}
                            </Controls.Grid>
                            <Controls.Grid>
                                <Controls.Typography variant='h2' sx={{ textAlign: 'center', marginBottom: '20px' }}>Description</Controls.Typography>
                            </Controls.Grid>
                            <Controls.Typography sx={{ wordWrap: 'break-word' }}>{descriptionData}</Controls.Typography>

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