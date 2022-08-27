import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactToPrint from "react-to-print";
import InvoiceItems from "./InvoiceItems";

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
import moment from "moment";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ComponentToPrint = ({ data }) => {
  const initialAmount = 0;

  const totalBalance = data.reduce(
    (initialAmount, item) =>
      initialAmount +
      (Number(item.amount) * Number(item.no_of_attire) -
        (item.discount ? Number(item.discount) : 0)),
    initialAmount
  );

  const initialPaidAmount = 0;

  const totalAmountPaid = data.reduce(
    (initialAmount, item) => initialAmount + Number(item.amount_paid),
    initialPaidAmount
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          maxWidth: "24cm",
          boxShadow: 3,
          borderRadius: "20px",
          padding: { xs: "20", sm: "30px" },
          // paddingX: { xs: "200px", sm: "", md: "" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", sm: "row", md: "row" },
            alignItems: "",
            justifyContent: "space-between",
            my: "20px",
            padding: "25px",
          }}
        >
          <img
            // src="https://i.postimg.cc/gkB8x8yd/ff85e82c-e25b-4913-b13f-09bbae1b1e36-removebg-preview.png"
            src="https://i.postimg.cc/k5rBJF7j/ff85e82c-e25b-4913-b13f-09bbae1b1e36.jpg"
            alt="display-logo"
            width={200}
          />
          <Box
            textAlign={{ xs: "left", sm: "right", md: "right" }}
            width="400px"
          >
            <Typography fontSize="26px">Invoice</Typography>
            <Typography fontSize="20px" fontWeight="600">
              Bint Atelier Enterprises
            </Typography>
            <Typography>
              No 454 Karkasara Adljacent MGK pharmacy before Masallachin Bilal,
              Kano, Nigeria
            </Typography>
            <Typography>Kano Kano</Typography>
            <Typography>NG</Typography>
            <Typography>07046660046</Typography>
            <Typography>Bintatelier@gmail.com</Typography>
            <Typography>Tax Reg No. : BN 3077315</Typography>
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

        <Box
          sx={{
            backgroundColor: "#f0f3f4",
            px: "20px",
            py: "20px",
            my: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography>BILL TO:</Typography>
            <Typography>
              {data[0].client &&
                data[0].client.first_name + " " + data[0].client.last_name}
            </Typography>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"

            // backgroundColor=""
          >
            <Box textAlign="right" marginRight={"40px"}>
              <Typography>Invoice #</Typography>
              <Typography>Date</Typography>
              <Typography>Collection Date</Typography>
            </Box>
            <Box textAlign="right">
              <Typography>{Math.floor(Math.random() * 10000000)}</Typography>
              <Typography>{moment().format("MMM D YYYY")}</Typography>
              <Typography>
                {moment(data[0].collection_date).format("MMM D YYYY")}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box padding="20px">
          <InvoiceItems data={data} />
        </Box>
        <Box display="flex" justifyContent="space-between" mt="20px">
          {/* payment instruction */}
          <Box padding={{ xs: "20px", sm: "", md: "" }}>
            <Typography fontWeight="600">Payment Instruction</Typography>
            <Typography>Account Number: 1017522000</Typography>
            <Typography>Bank Name: Zenith Bank</Typography>
            <Typography>Account Name: Bint Atelier Enterprises</Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Typography>
              Subtotal{" "}
              <CurrencyFormat
                value={totalBalance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Typography>
            <Typography>
              Total{" "}
              <CurrencyFormat
                value={totalBalance}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Typography>
            <Typography>
              Amount Paid{" "}
              <CurrencyFormat
                value={totalAmountPaid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Typography>
            <Divider />
          </Box>

          {/* total amount */}
        </Box>
        <Box
          sx={{
            mt: "20px",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ backgroundColor: "#f0f3f4", px: "30px", py: "20px" }}>
            <Typography>Amount Due</Typography>
            <Typography sx={{ fontWeight: "400", fontSize: "30px" }}>
              <CurrencyFormat
                value={totalBalance - totalAmountPaid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
            </Typography>
          </Box>
        </Box>

        <Box mt="30px" padding="20px">
          <Typography fontWeight="600">Dear Esteemed Client</Typography>
          <Typography mb="10px" fontWeight="600">
            You are to either pay 50% deposit or full payment of your service
            charge to enable us to start processing your outfits. Please send
            Proof of Payment to enable us serve you better. Charges of N2000
            applies 3 days after your date of collection. NO REFUND{" "}
            <span style={{ color: "red", fontWeight: "black" }}>X</span>
          </Typography>
          <Typography fontWeight="600" mb="30px">
            THANK YOU
          </Typography>

          {/* account number */}
          {/* <Typography>Bank Account: 1234567890</Typography>
        <Typography>Bank Name: FCMB</Typography>
        <Typography mb="30px">Account Name: Bint atelier Enerprises</Typography> */}
          <Divider />
          <Typography mb="10px">
            By making Payment, the customer agrees to the services and condition
            describe in this document.
          </Typography>

          <Box
            mb="70px"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            paddingX={{ xs: "10px", sm: "100px", md: "100px" }}
          >
            {/* bint sign */}
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography textAlign="center" fontSize="20px" fontWeight="600">
                Bint Atelier Enterprises
              </Typography>
              <img
                src="https://i.postimg.cc/66F6VvPg/bint-sign-removebg-preview.png"
                width="100px"
                alt="bint sign"
              />
              <Box width="100%" backgroundColor="#cccccc" height="1px" />
              <Typography textAlign="center">
                {moment().format("MMM D YYYY")}
              </Typography>
            </Box>

            {/* customer sign */}
            <Box>
              <Typography
                textAlign="center"
                mb="95px"
                fontSize="20px"
                fontWeight="600"
              >
                {data[0].client &&
                  data[0].client.first_name + " " + data[0].client.last_name}
              </Typography>
              <Divider />
              <Typography textAlign="center">{"---  ---  ---"}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ComponentToPrint;
