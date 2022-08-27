import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CurrencyFormat from "react-currency-format";
import { FaLastfmSquare } from "react-icons/fa";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {},
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

export default function CustomizedTables({ data }) {
  const [isDiscount, setDiscount] = React.useState(false);

  React.useEffect(() => {
    data.every((item) => {
      if (item.discount) {
        setDiscount(true);
        return false;
      }

      return true;
    });
  }, [data]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{}} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Services</StyledTableCell>
            <StyledTableCell align="right">Fabric</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            {isDiscount && (
              <StyledTableCell align="right">Discount</StyledTableCell>
            )}
            <StyledTableCell align="right">Amount</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.style}
              </StyledTableCell>
              <StyledTableCell align="right">
                {row.no_of_attire}
              </StyledTableCell>
              <StyledTableCell align="right">
                {" "}
                {/* ₦ {row.amount} */}
                <CurrencyFormat
                  value={row.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </StyledTableCell>
              {isDiscount && (
                <StyledTableCell align="right">
                  {row.discount ? (
                    <CurrencyFormat
                      value={row.discount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"₦"}
                    />
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              )}
              <StyledTableCell align="right">
                {/* ₦ {row.amount} */}
                <CurrencyFormat
                  value={
                    Number(row.amount) * Number(row.no_of_attire) -
                    (row.discount ? Number(row.discount) : 0)
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
