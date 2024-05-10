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
  width: 680,
  bgcolor: theme.palette.customColorOrange.main,
  borderRadius: 8, // Adjust the value as needed
  boxShadow: 24,
  p: 4,
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
            <Controls.Typography sx={{ mb: 2}} id="modal-modal-title" variant="h2" >
              View Leave Details
            </Controls.Typography>

            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 250 }}>
                <Controls.Typography  variant="subtitle1">Purpose of Leave</Controls.Typography>
                <Controls.Typography variant="subtitle2">{data.leave_purpose}</Controls.Typography>
              </Controls.Box>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300, mb: 3 }}>
              <Controls.Typography  variant="subtitle1">Type of Leave</Controls.Typography>
                <Typography variant="subtitle2">{data.type_of_leave}</Typography>
              </Controls.Box>
            </Controls.Box>
            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 250 }}>
              <Controls.Typography  variant="subtitle1">Start Date</Controls.Typography>
                <Typography component="span" variant="subtitle2">{dayjs(data.start_date).format('DD-MM-YYYY')}</Typography>
              </Controls.Box>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300, mb: 3 }}>
              <Controls.Typography  variant="subtitle1">End Date</Controls.Typography>
                <Controls.Typography component="span" variant="subtitle2">{dayjs(data.end_date).format('DD-MM-YYYY')}</Controls.Typography>
              </Controls.Box>
            </Controls.Box>

            <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 250 }}>
              <Controls.Typography  variant="subtitle1">Status</Controls.Typography>
                <Controls.Typography variant="subtitle2" sx={{ 'color': data.approval === false ? 'red' : 'green' }} component="span">{data.approval === false ? 'Not Approved' : 'Approved'}</Controls.Typography>
              </Controls.Box>
              <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: 300, mb: 3 }}>
              <Controls.Typography  variant="subtitle1">Permission</Controls.Typography>
               
                <Controls.Typography variant="subtitle2" sx={{ 'color': data.approval === false ? 'red' : 'green' }} component="span">{data.approval === false ? 'Not Approved' : 'Approved'}</Controls.Typography>
              </Controls.Box>
            </Controls.Box>
          
                    <Controls.FormAddCloseButton
                      variant="contained"
                      onClick={() => {
                        closeModal();
                      }}
                      buttonText="Close"
                    />
          </Controls.Box>
        </Modal>
      </Controls.Box>
    </>
  )
}

export default ViewLeaveDetails;