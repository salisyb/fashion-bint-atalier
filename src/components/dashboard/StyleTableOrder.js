import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";

export default function BasicTable({
  onRowClick,
  tableHeader,
  tableContent,
  mark = false,
  onMark,
}) {
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
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ align: "left", color: "#6c7293" }}
                onClick={() => onRowClick("view edit order", row)}
              >
                {`${row.client.first_name} ${row.client.last_name}`}
              </TableCell>
              <TableCell sx={{ align: "left", color: "#6c7293" }}>
                {/* {row.clientsinformation && row.clientsinformation.phone_number} */}
                {/* {Math.floor(Math.random() * 1000000000)} */}
                <Checkbox
                  onChange={() => onMark(row)}
                  {...{ inputProps: { "aria-label": "Checkbox demo" } }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
