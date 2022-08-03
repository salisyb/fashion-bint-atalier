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

const rows = [
  createData("Wedding Cloth", 1594, 6.0, 24, 4.0),
  createData("Wedding Cloth", 2373, 9.0, 37, 4.3),
  createData("Wedding cloth", 2626, 16.0, 24, 6.0),
  createData("Wedding Cloth", 3054, 3.7, 67, 4.3),
  createData("Wedding Cloth", 3566, 16.0, 49, 3.9),
];

export default function BasicTable({ onRowClick, tableHeader, tableContent }) {
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ color: "#6c7293" }}
        aria-label="simple table"
        bgColor={"#191c24"}
      >
        <TableHead>
          <TableRow>
            {tableHeader.map((header) => (
              <TableCell key={header} sx={{ color: "#6c7293", align: "left" }}>
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
                sx={{ align: "left", color: "#6c7293" }}
              >
                {row.fullName}
              </TableCell>
              <TableCell sx={{ align: "left", color: "#6c7293" }}>
                {row.phone}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
