import React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import Controls from "../components/Controls";
import * as dayjs from 'dayjs';
import theme from '../Theme';

const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 730,
  bgcolor: "#FFFFFF",
  borderRadius: 1, // Adjust the value as needed
  boxShadow: 24,
  p: 0,
};
const ViewLeaveDetails = ({ show, closeModal, data }) => {
  const [open, setOpen] = useState(show);
  return (
    <>
      <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 5, mr: 5 }}>
        <Modal
          open={show}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Controls.Box sx={style}>
          <Controls.Grid xs={12} sx={{ backgroundColor: theme.palette.error.main, padding: '10px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px' }}>
              <Controls.Typography variant='h3' sx={{color:theme.palette.success.main}} textAlign='center'> View Leave Details</Controls.Typography>
            </Controls.Grid>
            <Controls.Grid container sx={{ marginTop: '10px', padding:'10px 20px' }}>
                <Controls.Grid xs={6} sx={{ display: 'flex', padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Purpose of Leave</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.leave_purpose}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid xs={6} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Type of Leave</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.type_of_leave}</Controls.Typography>
                  </Controls.Grid>

                </Controls.Grid>
                <Controls.Grid xs={6} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Start Date</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{dayjs(data.start_date).format('DD-MM-YYYY')}</Controls.Typography>
                  </Controls.Grid>

                </Controls.Grid>
                <Controls.Grid xs={6} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>End Date</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{dayjs(data.end_date).format('DD-MM-YYYY')}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid xs={6} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Status</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px','color': data.approval === false ? 'red' : 'green' }}>{data.approval === false ? 'Not Approved' : 'Approved'}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid xs={6} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={6} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Permission</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={6} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px', 'color': data.approval === false ? 'red' : 'green' }}>{data.approval === false ? 'Not Approved' : 'Approved'}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Grid>

      
          <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', margin: '10px' }}>
                    <Controls.FormAddCloseButton
                      variant="contained"
                      onClick={() => {
                        closeModal();
                      }}
                      buttonText="Close"
                    />
                    </Controls.Typography>
          </Controls.Box>
        </Modal>
      </Controls.Box>
    </>
  )
}

export default ViewLeaveDetails;