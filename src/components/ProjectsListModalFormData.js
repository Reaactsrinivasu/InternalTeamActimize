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
  bgcolor: "#FFFFFF",
  borderRadius: 2, 
  boxShadow: 24,
  p: 0,
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
            <Controls.Grid xs={12} sx={{ backgroundColor: theme.palette.error.main, padding: '10px',borderTopLeftRadius:'5px',borderTopRightRadius:'5px' }}>
              <Controls.Typography variant='h3' sx={{color:theme.palette.success.main}} textAlign='center'>{data.project_name}</Controls.Typography>
            </Controls.Grid>
            <Controls.Grid>
              <Controls.Grid container sx={{ marginTop: '10px', padding:'10px 20px' }}>
                <Controls.Grid xs={8} sx={{ display: 'flex', padding:'10px 0px' }}>
                  <Controls.Grid xs={4} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Project Name</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={8} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.project_name}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid xs={4} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={5} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Status</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={7} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.status}</Controls.Typography>
                  </Controls.Grid>

                </Controls.Grid>
                <Controls.Grid xs={8} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={4} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Start Date</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={8} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.start_date}</Controls.Typography>
                  </Controls.Grid>

                </Controls.Grid>
                <Controls.Grid xs={4} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={5} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>End Date</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={7} >
                    <Controls.Typography variant='h12' sx={{ marginLeft: '20px' }}>{data.end_date}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
                <Controls.Grid xs={12} sx={{ display: 'flex',padding:'10px 0px' }}>
                  <Controls.Grid xs={2.7} sx={{ display: 'flex' }}>
                    <Controls.Typography variant='h11'>Description</Controls.Typography>
                    <Controls.Typography variant='h11' sx={{ marginLeft: 'auto' }}>:</Controls.Typography>
                  </Controls.Grid>
                  <Controls.Grid xs={9} sx={{ marginLeft: '20px' }} >
                    <Controls.Typography variant='h12' >{data.description}</Controls.Typography>
                  </Controls.Grid>
                </Controls.Grid>
              </Controls.Grid>
              <Controls.Grid>
                <Controls.Typography variant='h2' sx={{ textAlign: 'center', marginBottom: '5px' }}> Team</Controls.Typography>
              </Controls.Grid>
              <Controls.Grid sx={{padding:'0px 20px'}}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 550 }} aria-label="simple table">
                  <TableHead sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablehead.backgroundColor, }}>
                    <TableRow>
                      <TableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>SNO</TableCell>
                      <TableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Name</TableCell>
                      <TableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>UserName</TableCell>
                      <TableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Email</TableCell>
                      <TableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Designation</TableCell>
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
          </Controls.Grid>
        </Modal>
      </Controls.Box>
    </>
  )
}

export default ProjectListModalFormData;