import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
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
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import TableOrder from "./StyleTableOrder";
import Modal from "./Modal";
import Form from "./Form";
import * as yup from "yup";
import { Formik } from "formik";
import SelectItem from "./SelectItem";

// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { useDispatch, useSelector } from "react-redux";
import { createClientOrder, getClientMeasurement } from "api/clients.api";
import { minHeight } from "@mui/system";

// import { LocalizationProvider } from "@mui/x-date-pickers";

const addNewClientSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  username: yup.string().required("phone number is Required"),
  phone_number: yup
    .string()
    .required("This field is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  full_name: yup
    .string()
    .min(8, ({ min }) => `full name must be at least ${min} characters`)
    .required("full name is Required"),
  address: yup.string().required("Client Address is Required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const initialState = {
  measurement: "",
  amount: "",
  no_of_attire: "",
  style: "",
  description: "",
};

const AddNewOrder = ({ onSubmit, formData, onInput }) => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(new Date());
  const [client, setClient] = React.useState("");
  const [selectedMeasurement, setSelectedMeasurement] = React.useState([]);

  const { clients, token } = useSelector((state) => state.auth);

  const handleSetClient = async (e) => {
    setClient(e.target.value);

    const data = await getClientMeasurement(e.target.value, token);
    setSelectedMeasurement(data);
  };

  const handleFinishSelectingClient = () => {
    console.log(client);
  };

  const handleRegisterClient = async (form) => {
    const data = await createClientOrder(
      { ...form, collection_date: value.format(), client: client },
      token
    );

    console.log(data);
  };

  return (
    <div>
      <Formik
        // validationSchema={addNewClientSchema}
        initialValues={initialState}
        onSubmit={(data) => {
          handleRegisterClient(data);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <Form type="outlined">
            <FormControl
              // variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: 220, sm: 225 },
                maxWidth: { xs: 220, sm: 225 },
              }}
            >
              <InputLabel id="demo-simple-select-autowidth-label">
                Clients
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={client}
                onBlur={handleFinishSelectingClient}
                onChange={(e) => handleSetClient(e)}
                autoWidth
                label="Clients"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {clients.map((client) => (
                  <MenuItem value={client.id}>{client.email}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              // variant="standard"
              sx={{
                m: 1,
                minWidth: { xs: 220, sm: 225 },
                maxWidth: { xs: 220, sm: 225 },
              }}
            >
              <InputLabel id="demo-simple-select-autowidth-label">
                Measurement
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={values.measurement}
                onChange={handleChange("measurement")}
                autoWidth
                label="Age"
              >
                {selectedMeasurement.length < 1 ? (
                  <MenuItem value="">
                    <em>Please select client first..</em>
                  </MenuItem>
                ) : (
                  selectedMeasurement.map((item) => (
                    <MenuItem value={item.id}>
                      {item.measurement_owner}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterMoment}>
              <FormControl variant="standard">
                <MobileDatePicker
                  label="Date of collections"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </FormControl>
            </LocalizationProvider>
            <TextField
              id="standard-password-input"
              label="Amount"
              type="text"
              name="amount_to_paid"
              value={values.amount}
              onChange={handleChange("amount")}
              autoComplete="current-password"
              // variant="standard"
            />
            {/* <TextField
              id="standard-password-input"
              label="Amount Paid"
              type="text"
              name="amount_paid"
              value={values.amount_paid}
              onChange={handleChange("amount_paid")}
              autoComplete="current-password"
              // variant="standard"
            /> */}
            <TextField
              id="standard-password-input"
              label="No of attire"
              type="text"
              name="no_of_attire"
              value={values.no_of_attire}
              onChange={handleChange("no_of_attire")}
              autoComplete="current-password"
              // variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Style"
              type="text"
              name="style"
              value={values.style}
              onChange={handleChange("style")}
              autoComplete="current-password"
              // variant="standard"
            />
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              value={values.description}
              onChange={handleChange("description")}
              // defaultValue="Order description"
              // variant="standard"
            />
            <Box mt={2}>
              <Button
                variant={"contained"}
                sx={{ width: "100%" }}
                onClick={handleSubmit}
              >
                Submit order
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ViewEditOrder = ({ data }) => {
  return (
    <Box
      sx={{
        minWidth: { xs: "xs" },
      }}
    >
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
              Client Name
            </Typography>
            <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
              {data.client.first_name} {data.client.last_name}
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
              Client Email
            </Typography>
            <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
              {data.client.email}
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
              Amount
            </Typography>
            <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
              ₦{data.amount}
            </Typography>
          </Box>
          <Divider />
        </>
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

      <Box marginTop={"40px"} spacing={2}>
        <Button variant="outlined" sx={{ marginRight: "10px" }}>
          Edit
        </Button>
        <Button variant="outlined">Generate Invoice</Button>
      </Box>
    </Box>
  );
};

const boxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const imageUrl =
  "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80";

export default function OverviewDashboard() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => setModalOpen(!modalOpen);

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [title, setTitle] = React.useState("");

  const { order } = useSelector((state) => state.auth);

  const handleOpenModal = (from, data = null) => {
    switch (from) {
      case "view edit order":
        setSelectedOption(<ViewEditOrder data={data} />);
        setTitle("Order information");
        handleCloseModal();
        break;

      case "add new order":
        setSelectedOption(<AddNewOrder />);
        setTitle("Add New Order");
        handleCloseModal();
        break;

      default:
        return;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Typography variant={'h6'}>Welcome to dashboard</Typography> */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} title={title}>
        {selectedOption}
      </Modal>
      <Grid container spacing={2}>
        <Grid container spacing={2}>
          <CardGrid
            style={{
              display: "flex",
              // justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "30%",
                overflow: "hidden",
                borderRadius: "10px",
                marginRight: "20px",
              }}
            >
              <img
                src={imageUrl}
                style={{ position: "relative" }}
                width={"100%"}
                alt={"Icon "}
              />
            </div>
            <Typography variant={"h6"} sx={{ color: "white" }}>
              Order Information
            </Typography>
          </CardGrid>
        </Grid>
        <Grid container spacing={2}>
          <Box px={2} pt={4} pb={2}>
            <Button
              variant="contained"
              endIcon={<PlusIcon />}
              sx={{ px: 4, py: 2 }}
              color={"secondary"}
              onClick={() => handleOpenModal("add new order")}
            >
              New Order
            </Button>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={20}>
            <div
              style={{
                backgroundColor: "#191c24",
                // height: "100px",
                borderRadius: "6px",
                padding: "20px",
              }}
            >
              <Typography variant={"p"} color={"white"}>
                Order status
              </Typography>
              <TableOrder
                onRowClick={handleOpenModal}
                tableHeader={["Client Name", "Order Number"]}
                tableContent={order}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
