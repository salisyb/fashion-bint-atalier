import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactToPrint from "react-to-print";
import CustomizedTables from "./TableInvoice";

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
import CurrencyFormat from "react-currency-format";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ComponentToPrint = React.forwardRef(({ data }, ref) => {
  const initialAmount = 0;
  const totalBalance = data.reduce(
    (initialAmount, item) => initialAmount + Number(item.amount),
    initialAmount
  );

  return (
    <Box
      ref={ref}
      sx={{
        minWidth: { xs: "xs" },
        paddingX: "200px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          my: "20px",
        }}
      >
        <img
          src="https://i.postimg.cc/gkB8x8yd/ff85e82c-e25b-4913-b13f-09bbae1b1e36-removebg-preview.png"
          alt="display-logo"
          width={200}
        />
        <Box textAlign="right">
          <Typography fontSize="26px">Invoice</Typography>
          <Typography fontSize="20px" fontWeight="600">
            Bint Atelier
          </Typography>
          <Typography>No 1234 the address of bint atelier </Typography>
          <Typography>Kano Kano</Typography>
          <Typography>NG</Typography>
          <Typography>07098483921</Typography>
          <Typography>bintatelier@bint.com</Typography>
        </Box>
      </Box>

      {/* order detail */}
      {/* <>
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
        </> */}

      <Box sx={{ backgroundColor: "#E1AD01", px: "20px", py: "20px" }}>
        <>
          <Typography>BILL TO:</Typography>
          <Typography>
            {data[0].client &&
              data[0].client.first_name + " " + data[0].client.last_name}
          </Typography>
        </>
      </Box>

      <CustomizedTables data={data} />

      <Box
        sx={{
          mt: "20px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <Box sx={{ backgroundColor: "#E1AD01", px: "30px", py: "20px" }}>
          <Typography>Total Balance</Typography>
          <Typography sx={{ fontWeight: "600", fontSize: "30px" }}>
            <CurrencyFormat
              value={totalBalance}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"₦"}
            />
          </Typography>
        </Box>
      </Box>

      <Box mt="30px">
        <Typography>Dear Esteemed Client</Typography>
        <Typography mb="20px">
          You are either to pay 50% deposit or full payment of your service
          charge before we start processing making your outfits, Please do send
          Proof of Payment Thank you
        </Typography>

        {/* account number */}
        <Typography>Bank Account: 1234567890</Typography>
        <Typography>Bank Name: FCMB</Typography>
        <Typography mb="30px">Account Name: Bint atelier Enerprises</Typography>
        <Divider />
      </Box>
    </Box>
  );
});

export default ComponentToPrint;
