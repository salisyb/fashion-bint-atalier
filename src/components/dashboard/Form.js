import React from "react";
// import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function Form({ children, type = "standard" }) {
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl variant={type} sx={{ m: 1, minWidth: { xs: 220, sm: 280 } }}>
        <div>{children}</div>
      </FormControl>
    </Box>
  );
}

export default Form;
