import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { Delete, Edit } from "@mui/icons-material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories };
}

export default function BasicTable({
  onRowClick,
  tableHeader,
  tableContent,
  onOptionClick,
}) {
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
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ align: "left", color: "#000000", cursor: "pointer" }}
                onClick={() => onRowClick("view edit client", row)}
              >
                {`${row.first_name} ${row.last_name}`}
              </TableCell>
              <TableCell sx={{ align: "left", color: "#000000" }}>
                <Button
                  startIcon={<Delete />}
                  size="small"
                  variant="outlined"
                  onClick={() => onOptionClick("delete", row)}
                >
                  Delete
                </Button>
                <Button
                  startIcon={<Edit />}
                  size="small"
                  variant="outlined"
                  onClick={() => onOptionClick("edit", row)}
                >
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
