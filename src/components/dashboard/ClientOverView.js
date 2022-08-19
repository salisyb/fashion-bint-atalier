import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import Modal from "./Modal";
import Form from "./Form";
import { Formik } from "formik";
import * as yup from "yup";

import { TextField } from "@mui/material";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/ControlPoint";
import TabPanel from "./TabPanel";
import MeasurementTab from "./MeasurementTab";
import { useDispatch, useSelector } from "react-redux";
import { createClient, getClient } from "store/auth";

const addNewClientSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  username: yup.string().required("username number is Required"),
  phone_number: yup
    .string()
    .required("This field is Required")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Phone number is not valid"
    ),
  full_name: yup
    .string()
    .min(4, ({ min }) => `full name must be at least ${min} characters`)
    .required("full name is Required"),
  address: yup.string().required("Client Address is Required"),
  password: yup
    .string()
    .min(3, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

const initialState = {
  full_name: "",
  phone_number: "",
  email: "",
  address: "",
  username: "",
  password: "",
};

const AddNewOrder = ({ onSubmit, formData, onInput }) => {
  const dispatch = useDispatch();

  const handleRegisterClient = (form) => {
    const { full_name, phone_number, email, address, username, password } =
      form;
    const [first_name, last_name] = full_name.split(" ");

    dispatch(
      createClient({
        first_name,
        last_name,
        phone_number,
        email,
        address,
        username,
        password,
      })
    );

    onSubmit();
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
            <TextField
              id="standard-password-input"
              label="Username"
              required
              name={"username"}
              value={values.username}
              onChange={handleChange("username")}
              type="text"
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Full Name"
              type="text"
              name="full_name"
              value={values.full_name}
              onChange={handleChange("full_name")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Phone number"
              type="text"
              name="phone_number"
              value={values.phone_number}
              onChange={handleChange("phone_number")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Address"
              type="text"
              name="address"
              value={values.address}
              onChange={handleChange("address")}
              autoComplete="current-password"
              variant="standard"
            />
            <TextField
              id="standard-password-input"
              label="Password"
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange("password")}
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

const PersonalInformation = ({ data }) => (
  <Box>
    {console.log(data)}
    <>
      <Grid container spacing={2} mt={2}>
        {/* username */}
        <Grid xs={12} sm={6}>
          <Typography color={"#8B8989"}>{"Username"}</Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>{data && data.username}</Typography>
        </Grid>

        {/* full name  */}
        <Grid xs={12} sm={6}>
          <Typography color={"#8B8989"}>{"Full name"}</Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>{`${data && data.first_name} ${
            data && data.last_name
          }`}</Typography>
        </Grid>

        {/* email address */}
        <Grid xs={12} sm={6}>
          <Typography color={"#8B8989"}>{"Email Address"}</Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>{data && data.email}</Typography>
        </Grid>

        {/* phone number  */}
        <Grid xs={12} sm={6}>
          <Typography color={"#8B8989"}>{"Phone number"}</Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>
            {data &&
              data.clientsinformation &&
              data.clientsinformation.phone_number}
          </Typography>
        </Grid>

        {/* address  */}
        <Grid xs={12} sm={6}>
          <Typography color={"#8B8989"}>{"Address"}</Typography>
        </Grid>
        <Grid xs={12} sm={6}>
          <Typography>
            {data && data.clientsinformation && data.clientsinformation.address}
          </Typography>
        </Grid>
      </Grid>
    </>
  </Box>
);

const ViewEditOrder = ({ data }) => {
  const [currentTab, setCurrentTab] = React.useState(0);

  const handleCurrentTab = (value) => {
    setCurrentTab(value);
  };
  return (
    <div style={{ height: "500px" }}>
      <TabPanel onCurrentTabChange={handleCurrentTab}>
        {currentTab === 0 ? (
          <PersonalInformation data={data} />
        ) : (
          <MeasurementTab userData={data} />
        )}
      </TabPanel>
      {/* {currentTab !== 0 && (
       
      )} */}
    </div>
  );
};

// const boxStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };

const imageUrl =
  "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80";

const clientInitialValue = {
  username: "",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  password: "",
};

export default function ClientOverview() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => setModalOpen(!modalOpen);
  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [addClientForm, setAddClientForm] = React.useState(clientInitialValue);

  const [client, setClient] = React.useState([]);
  const [clientData, setClientData] = React.useState(null);

  const { clients } = useSelector((state) => state.auth);
  console.log(clients);

  React.useEffect(() => {
    // get list of client

    dispatch(getClient());
  }, []);

  const handleAddClient = () => {
    handleCloseModal();
  };

  const handleOpenModal = (from, data = null) => {
    switch (from) {
      case "view edit client":
        setSelectedOption("view edit client");
        setClientData(data);
        setTitle("Client");
        handleCloseModal();
        break;

      case "add new client":
        setSelectedOption("add new client");
        setTitle("Add New Client");
        handleCloseModal();
        break;

      default:
        return;
    }
  };

  const handleInput = (e) => {
    setAddClientForm({ ...addClientForm, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <Typography variant={'h6'}>Welcome to dashboard</Typography> */}
      <Modal isOpen={modalOpen} onClose={handleCloseModal} title={title}>
        {selectedOption === "add new client" ? (
          <AddNewOrder
            formData={addClientForm}
            onInput={handleInput}
            onSubmit={handleAddClient}
          />
        ) : (
          <ViewEditOrder data={clientData} />
        )}
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
              Client Information
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
              onClick={() => handleOpenModal("add new client")}
            >
              Add Client
            </Button>
          </Box>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={20}>
            <div
              style={{
                backgroundColor: "#191c24",
                width: "100%",
                borderRadius: "6px",
                padding: "20px",
              }}
            >
              <Typography variant={"p"} color={"white"}>
                List of Client
              </Typography>
              {clients.length < 1 ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    widht: "100%",
                    height: "350px",
                  }}
                >
                  <Typography color={"white"}>
                    you haven't add client yet
                  </Typography>
                </div>
              ) : (
                <Table
                  onRowClick={handleOpenModal}
                  tableHeader={["Client Name", "Client Number"]}
                  tableContent={clients}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
