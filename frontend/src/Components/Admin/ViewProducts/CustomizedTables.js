import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables({sizesArray}) {
const navigate = useNavigate();

 const editHandler = (
    { price,
      title,
      description,
      color,
      productId,
      brand }
  ) => {
    navigate(
      '/adminEditProduct',
      {
        state: {
          price,
          brand,
          title,
          description,
          color,
          productId,

        }
      });
  }



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sizes</StyledTableCell>
            <StyledTableCell align="right">Units</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sizesArray.map((row) => (
            <StyledTableRow key={row.size}>
              <StyledTableCell component="th" scope="row">
                {row.size}
              </StyledTableCell>
              <StyledTableCell align="right">{row.quantity}</StyledTableCell>
              
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
