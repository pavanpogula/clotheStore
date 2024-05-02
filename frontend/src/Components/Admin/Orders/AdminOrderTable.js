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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
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
  const [filterData, setFilterData] = React.useState('all');

  const handleChange = (event) => {
    setFilterData(event.target.value);
  };
    const[orderDetails,setOrderDetails]= React.useState([]);
    const cookies = new Cookies()
    const navigate = useNavigate();
    React.useEffect(() => {
        const fectOrderDetails = async () =>{
        const response = await axios.get(`http://localhost:8080/getAllOrders`)
        .then( e => e.data);
        setOrderDetails(Object.values(response));
        console.log("response data : ",response)
        }
        fectOrderDetails();
        


    },[] );
const orderPageHandler = (obj)=>{
    console.log("clicked ",obj)
    navigate(
        '/adminSingleOrderPage',
        {
          state: {
            ...obj
        }} );
}
const convertToDateText = (dateString) => {
    const date = new Date(dateString);

    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
}
  return (<>
  <div style={{marginBottom:'30px',marginTop:'30px'}}>
  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">Delivery Type</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={filterData}
        label="Age"
        onChange={handleChange}
      >
        <MenuItem value={"all"}>All</MenuItem>
        <MenuItem value={"pickup"}>Store Pickup</MenuItem>
        <MenuItem value={"delivery"}>Home Delivery</MenuItem>
      </Select>
    </FormControl>
  </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No.</StyledTableCell>
            <StyledTableCell align="right">Order ID</StyledTableCell>
            <StyledTableCell align="right">Placed Date</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            </TableRow>
        </TableHead>
        {
            orderDetails.length>0?<TableBody>
            {orderDetails.map((obj,index) => (
              filterData==="all"?<StyledTableRow key={index} onClick={()=>orderPageHandler(obj)} style={{cursor:'pointer'}}>
              <StyledTableCell component="th" scope="row">
                {index+1}
              </StyledTableCell>
              <StyledTableCell align="right">{obj.id}</StyledTableCell>
              <StyledTableCell align="right">{convertToDateText(obj.timestamp)}</StyledTableCell>
              <StyledTableCell align="right">{obj.total} $ </StyledTableCell>
              </StyledTableRow>:
              obj['deliveryType']===filterData?
              <StyledTableRow key={index} onClick={()=>orderPageHandler(obj)} style={{cursor:'pointer'}}>
                <StyledTableCell component="th" scope="row">
                  {index+1}
                </StyledTableCell>
                <StyledTableCell align="right">{obj.id}</StyledTableCell>
                <StyledTableCell align="right">{convertToDateText(obj.timestamp)}</StyledTableCell>
                <StyledTableCell align="right">{obj.total} $ </StyledTableCell>
                </StyledTableRow>:<></>
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
    </>
  );
}
