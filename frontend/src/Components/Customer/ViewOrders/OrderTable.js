import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { Cookies } from 'react-cookie';
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


export default function CustomizedTables() {
    const[orderDetails,setOrderDetails]= React.useState([]);
    const cookies = new Cookies()
    const navigate = useNavigate();
    React.useEffect(() => {
      window.location.reload();
        const fectOrderDetails = async () =>{
        const response = await axios.post(`http://localhost:8000/getOredrsByCustId`,{'customerId':cookies.get("id")}
        ,{
            headers: {
              'Content-Type': 'application/json',
            }
          })
        .then( e => e.data);
        console.log("logger orders",Object.values(response))
        setOrderDetails(Object.values(response));
        console.log("response data : ",response)
        }
        fectOrderDetails();
    },[] );

const convertToDateText = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="right">Order ID</StyledTableCell>
            <StyledTableCell align="right">Placed Date</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            </TableRow>
        </TableHead>
        {
            orderDetails &&orderDetails.length>0?<TableBody>
            {orderDetails.map((obj,index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {index+1}
                </StyledTableCell>
                <StyledTableCell align="right">{obj._id}</StyledTableCell>
                <StyledTableCell align="right">{convertToDateText(obj.timestamp)}</StyledTableCell>
                <StyledTableCell align="right">{obj.total} </StyledTableCell>
                <StyledTableCell align="right">{obj.deliveryStatus} </StyledTableCell>
                </StyledTableRow>
            ))}
          </TableBody>:<TableBody>
            
              <StyledTableRow>
                <StyledTableCell component="th" scope="row">
                  {'-'}
                </StyledTableCell>
                <StyledTableCell align="right">{'-'}</StyledTableCell>
                <StyledTableCell align="right">{'-'}</StyledTableCell>
                <StyledTableCell align="right">{'-'} $</StyledTableCell>
                </StyledTableRow>
            
          </TableBody>

        }
        
      </Table>
    </TableContainer>
  );
}
