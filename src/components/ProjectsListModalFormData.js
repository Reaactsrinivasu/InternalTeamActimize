import React from 'react'
import { useState } from 'react'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { red } from '@mui/material/colors';
import Controls from "../components/Controls";
import * as dayjs from 'dayjs';
import theme from '../Theme';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 680,
  bgcolor: theme.palette.customColorOrange.main,
  borderRadius: 8, // Adjust the value as needed
  boxShadow: 24,
  p: 4,
};

const ProjectListModalFormData = ({ show, closeModal, data }) => {
  const usersData = data?.members_list;
  return (
    <>
      <Controls.Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', ml: 5, mr: 5 }}>
        <Modal
          open={show}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Controls.Grid sx={style}>
            <Controls.Grid>
              <Controls.Grid>
                <Controls.Typography variant='h2' sx={{ textAlign: 'center', marginBottom:'20px' }}> Members</Controls.Typography>
              </Controls.Grid>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">SNO</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">UserName</TableCell>
                      <TableCell align="center">Email</TableCell>
                      <TableCell align="center">Designation</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {usersData && usersData.map((row, index) => (
                      <TableRow
                        key={index}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="center" component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.designation}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </Controls.Grid>
            <Controls.Typography sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop:'20px' }}>
            <Controls.FormAddCloseButton
                    variant="contained"
                    onClick={() => {
                      closeModal();
                    }}
                    buttonText="Close"
                  />
            </Controls.Typography>
          </Controls.Grid>
        </Modal>
      </Controls.Box>
    </>
  )
}

export default ProjectListModalFormData;