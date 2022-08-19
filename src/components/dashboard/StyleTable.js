import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories };
}

export default function BasicTable({ onRowClick, tableHeader, tableContent }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ color: "#E1AD01" }}
        aria-label="simple table"
        bgColor={"#E1AD01"}
      >
        <TableHead>
          <TableRow>
            {tableHeader.map((header) => (
              <TableCell key={header} sx={{ color: "#000000", align: "left" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableContent.map((row) => (
            <TableRow
              onClick={() => onRowClick("view edit client", row)}
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ align: "left", color: "#000000" }}
              >
                {`${row.first_name} ${row.last_name}`}
              </TableCell>
              <TableCell sx={{ align: "left", color: "#000000" }}>
                {row.clientsinformation && row.clientsinformation.phone_number}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
