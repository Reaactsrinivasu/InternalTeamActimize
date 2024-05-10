import React from 'react';
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { styled } from "@mui/material/styles";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import TableContainer from "@mui/material/TableContainer";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ThemeProvider } from '@mui/material/styles';
import theme from "../Theme";
import * as dayjs from 'dayjs';
import { Grid } from '@mui/material';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {


  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    // color: theme.palette.customColor.main,
  },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    // backgroundColor: theme.palette.action.hover,
    // backgroundColor: theme.palette.customColor.main,

  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const ResuableTable = React.memo(({ columns, data, editHandler, deleteHandler, showModal, hideActionsCell, showRemoveRedEyeIcon, hideDeleteIcon, allUsersData, display }) => {

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <TableContainer component={Paper} sx={{ borderRadius: "10px" }}>
          <Table aria-label="customized table">
            <TableHead sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablehead.backgroundColor, }}>
              <TableRow >
                {columns.length > 0 &&
                  columns?.map((column) => (
                    <StyledTableCell align="center" key={column.id} sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color, fontWeight: "bold" }}>
                      {column.label}
                    </StyledTableCell>
                  ))}
                {!hideActionsCell && (<StyledTableCell align="center" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>Actions</StyledTableCell>)}
              </TableRow>
            </TableHead>
            <TableBody sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablehead.color }}>
              {data.length > 0 &&
                data?.map((row, index) => (
                  <StyledTableRow key={index} sx={{ backgroundColor: theme.components.tables.styleOverrides.containedPrimarytablebody.backgroundColor,  }}>
                    <StyledTableCell align="center" component="th" scope="row" sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color, }}>
                      {index + 1}
                    </StyledTableCell>
                    {columns.slice(1).map((column) => (
                      <StyledTableCell sx={{ color: theme.components.tables.styleOverrides.containedPrimarytablebody.color }}
                        align="center"
                        component="th"
                        scope="row"
                        key={column.id} >
                        {column.id === 'expert_id' ? 
                         truncateText(allUsersData.find(user => user.id === row[column.id])?.name || '', 20) : (
                          column.id === "experience"
                            ? `${row.experience.years} Y ${row.experience.months} M`
                            : column.id === "date_of_join" || column.id === "date_of_end" || column.id === "end_date" ||
                              column.id === "appreciation_date" || column.id === "start_date" || column.id === "created_at"
                              // ? dayjs(row[column.id], "DD-MM-YYYY", true).isValid()
                              //   ? dayjs(row[column.id], "DD-MM-YYYY").format("DD-MM-YYYY")
                              //   : dayjs(row[column.id]).format("DD-MM-YYYY")
                              ? dayjs(row[column.id]).format("DD-MM-YYYY")

                              : column.id === "approval"
                                ? row[column.id] === false
                                  ? "Not Approved"
                                  : "Approved"
                                : truncateText(row[column.id] || '', 20)
                        )}
                      </StyledTableCell>
                    ))}
                    {/* {!hideActionsCell && (
                      <StyledTableCell
                        align="center"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          // justifyContent: "space-evenly",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={3} >
                          {showRemoveRedEyeIcon && (
                            <Link>
                              <RemoveRedEyeIcon sx={{ cursor: 'pointer',  }} onClick={() => showModal(row)} />
                            </Link>
                          )}
                          </Grid>
                          <Grid item xs={8} sx={{}} >
                          {!row.approval && (
                            <>
                              <Link>
                                <ModeEditIcon
                                  sx={{ cursor: "pointer", color: theme.components.tables.styleOverrides.containedCustomedit.color, marginRight:'5px', }}
                                  onClick={() => editHandler(row.id)}
                                />
                              </Link>
                              {!hideDeleteIcon && (
                                <Link>
                                  <DeleteIcon
                                    onClick={() => deleteHandler(row.id)}
                                    sx={{ color: "#ff0000", cursor: "pointer", }}
                                  />
                                </Link>
                              )}
                            </>
                          )}
                          </Grid>
                          </Grid>
                      </StyledTableCell>
                      
                    )} */}
                    {display ? (
                      <>
                       {!hideActionsCell && (
                      <StyledTableCell
                        align="center"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          // justifyContent: "space-evenly",
                        }}
                      >
                        <Grid container>
                          <Grid item xs={3} >
                          {showRemoveRedEyeIcon && (
                            <Link>
                              <RemoveRedEyeIcon sx={{ cursor: 'pointer',  }} onClick={() => showModal(row)} />
                            </Link>
                          )}
                          </Grid>
                          <Grid item xs={8} sx={{}} >
                          {!row.approval && (
                            <>
                              <Link>
                                <ModeEditIcon
                                  sx={{ cursor: "pointer", color: theme.palette.error.main, marginRight:'5px', }}
                                  onClick={() => editHandler(row.id)}
                                />
                              </Link>
                              {!hideDeleteIcon && (
                                <Link>
                                  <DeleteIcon
                                    onClick={() => deleteHandler(row.id)}
                                    sx={{ color: "#ff0000", cursor: "pointer", }}
                                  />
                                </Link>
                              )}
                            </>
                          )}
                          </Grid>
                          </Grid>
                      </StyledTableCell>
                      
                    )}
                      </>
                    ) : (
                      <>
                       {!hideActionsCell && (
                      <StyledTableCell
                        align="center"
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                        }}
                      >
                          {showRemoveRedEyeIcon && (
                            <Link>
                              <RemoveRedEyeIcon sx={{ cursor: 'pointer', }} onClick={() => showModal(row)} />
                            </Link>
                          )}
                          {!row.approval && (
                            <>
                              <Link>
                                <ModeEditIcon
                                  sx={{ cursor: "pointer", color: theme.palette.error.main, marginRight:'5px', }}
                                  onClick={() => editHandler(row.id)}
                                />
                              </Link>
                              {!hideDeleteIcon && (
                                <Link>
                                  <DeleteIcon
                                    onClick={() => deleteHandler(row.id)}
                                    sx={{ color: "#ff0000", cursor: "pointer", }}
                                  />
                                </Link>
                              )}
                            </>
                          )}
                      </StyledTableCell>
                      
                    )}
                      </>
                    )}
                 
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    </ThemeProvider >
  );
});
export default ResuableTable;
