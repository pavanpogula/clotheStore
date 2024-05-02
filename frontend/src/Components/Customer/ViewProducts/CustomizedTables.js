import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useLocation, useNavigate } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch, useSelector} from 'react-redux'
import { updateProduct } from '../../../features/product/customerProductSlice';

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



export default function CustomizedTables({ sizesArray,productId }) {   
  
  const dispatch = useDispatch();
  const sizesData = useSelector(state=> state.customerAddedProducts['selectedProducts']);
  const [newSizes, setNewSizes] = React.useState(sizesData[productId]?sizesData[productId]:sizesArray.map(size => ({ ...size, selected: 0 })));
  const {pathname} = useLocation();
  console.log("pathname : ",pathname)
 
  React.useEffect(() => {
    const selectedProductsCopy = { ...sizesData }; // Assuming 'selectedProducts' is from your Redux state
    const selectedSizes = selectedProductsCopy[productId];
    console.log("LOGGER sizesData ",selectedProductsCopy[productId])
    if ( selectedProductsCopy[productId] && selectedSizes.every((size) => size.selected === 0)) {
      delete selectedProductsCopy[productId];
      dispatch(updateProduct(selectedProductsCopy));
    }
  }, [newSizes, productId, dispatch]);
  
  const handleAdd = (index) => {
    const updatedSizes = [...newSizes];
    if (updatedSizes[index].selected + 1 <= updatedSizes[index].quantity) {
      const updatedSize = { ...updatedSizes[index] };
      updatedSize.selected += 1;
      updatedSizes[index] = updatedSize;
      setNewSizes(updatedSizes);
      dispatch(updateProduct({ ...sizesData,[productId]: updatedSizes }));
    }
  };

  const handleRemove = (index) => {
    const updatedSizes = [...newSizes];
    if (updatedSizes[index].selected - 1 >= 0) {
      const updatedSize = { ...updatedSizes[index] };
      updatedSize.selected -= 1;
      updatedSizes[index] = updatedSize;
      setNewSizes(updatedSizes);
      dispatch(updateProduct({ ...sizesData, [productId]: updatedSizes }));
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Sizes</StyledTableCell>
            <StyledTableCell align="right">Slected</StyledTableCell>
            <StyledTableCell align="right">Add</StyledTableCell>
            <StyledTableCell align="right">Remove</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newSizes.map((row,index) => (
            pathname==='/cart' && row.selected==0?<></>:
            <StyledTableRow key={row.size}>
              <StyledTableCell component="th" scope="row">
                {row.size}
              </StyledTableCell>
              <StyledTableCell align="center">{row.selected}</StyledTableCell>
              <StyledTableCell onClick={()=>handleAdd(index)} align="right"><Fab size="small" color="secondary" aria-label="add">
                <AddIcon />
              </Fab></StyledTableCell>
              <StyledTableCell onClick={()=>handleRemove(index)} align="right"><Fab size="small" color="secondary" aria-label="remove">
                <RemoveIcon />
              </Fab></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
