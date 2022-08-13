import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  Container,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import Modal from "./Modal";
import Form from "./Form";
import * as yup from "yup";
import { Formik } from "formik";

import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/ControlPoint";
import { useDispatch } from "react-redux";

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
  client: "",
  measurement: "",
  collection_date: "",
  amount_to_paid: "",
  amount_paid: "",
  no_of_attire: "",
  style: "",
  description: "",
};

const AddNewOrder = ({ onSubmit, formData, onInput }) => {
  const dispatch = useDispatch();

  const handleRegisterClient = (form) => {
    console.log(form);
  };

  return (
    <div>
      <Formik
        validationSchema={addNewClientSchema}
        initialValues={initialState}
        onSubmit={(data) => handleRegisterClient(data)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <Form>
            {/* <TextField
              id="standard-password-input"
              label="Clients"
              required
              name={"client"}
              value={values.client}
              onChange={handleChange("client")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            /> */}
            <InputLabel id="demo-simple-select-standard-label">
              Client
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values.client}
              onChange={handleChange}
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <TextField
              id="standard-password-input"
              label="Measurement"
              type="text"
              name="measurement"
              value={values.measurement}
              onChange={handleChange("measurement")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Collection Date"
              type="data"
              name="collection_data"
              value={values.collection_date}
              onChange={handleChange("collection_date")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Amount to Paid"
              type="text"
              name="amount_to_paid"
              value={values.amount_to_paid}
              onChange={handleChange("amount_to_paid")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Amount Paid"
              type="text"
              name="amount_paid"
              value={values.amount_paid}
              onChange={handleChange("amount_paid")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="No of attire"
              type="text"
              name="no_of_attire"
              value={values.no_of_attire}
              onChange={handleChange("no_of_attire")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Style"
              type="text"
              name="style"
              value={values.style}
              onChange={handleChange("style")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Description"
              type="text"
              name="password"
              value={values.description}
              onChange={handleChange("description")}
              autoComplete="current-password"
              variant="standard"
            />
            <Box mt={2}>
              <Button
                variant={"contained"}
                sx={{ width: "100%" }}
                onClick={handleSubmit}
              >
                Add New Client
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ViewEditOrder = () => {
  return (
    <div>
      <h1>View edit order</h1>
    </div>
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

  const handleOpenModal = (from, data = null) => {
    console.log("click");
    switch (from) {
      case "view edit order":
        setSelectedOption(<ViewEditOrder />);
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
              <Table
                onRowClick={handleOpenModal}
                tableHeader={["Client Name", "Order Number"]}
                tableContent={[]}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
