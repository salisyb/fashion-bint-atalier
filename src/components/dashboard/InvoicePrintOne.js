import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactToPrint from "react-to-print";

// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Chip,
  Container,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";


class ComponentToPrint extends React.Component {
    render() {
      const data = this.props.data;
  
      return (
        <Box
          sx={{
            minWidth: { xs: "xs" },
            paddingX: "100px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="https://i.postimg.cc/gkB8x8yd/ff85e82c-e25b-4913-b13f-09bbae1b1e36-removebg-preview.png"
              alt="display-logo"
              width={200}
            />
          </Box>
          {/* order detail */}
          <>
            <Divider>
              <Chip label="ORDER DETAIL" />
            </Divider>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Number of Attire
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {data.no_of_attire}
                </Typography>
              </Box>
              <Divider />
            </>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Style
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {data.style}
                </Typography>
              </Box>
              <Divider />
            </>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Description
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {data.description}
                </Typography>
              </Box>
              <Divider />
            </>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Collection Date
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {data.collection_date}
                </Typography>
              </Box>
              <Divider />
            </>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Status of order
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {data.status}
                </Typography>
              </Box>
              <Divider />
            </>
  
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  my: "10px",
                }}
              >
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  Amount
                </Typography>
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  ₦{data.amount}
                </Typography>
              </Box>
              <Divider />
            </>
          </>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: "10px",
              }}
            >
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                Amount Paid
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                ₦{data.amount_paid}
              </Typography>
            </Box>
            <Divider />
          </>
  
          {/* measurement detail */}
          <>
            <Divider sx={{ marginTop: "30px" }}>
              <Chip label="MEASUREMENT DETAIL" />
            </Divider>
            <Box></Box>
          </>
  
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: "10px",
              }}
            >
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                Measurement Name
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                {data.measurement.measurement_owner}
              </Typography>
            </Box>
            <Divider />
          </>
  
          {/* <Box marginTop={"40px"} spacing={2}>
          <ReactToPrint
            trigger={() => <Button variant="outlined">Generate Invoice</Button>}
            content={() => componentRef}
          />
        </Box> */}
        </Box>
      );
    }
  }


  export default ComponentToPrint;