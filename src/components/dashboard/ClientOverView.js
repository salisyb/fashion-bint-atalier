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

import { TextField } from "@mui/material";
// import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/ControlPoint";
import TabPanel from "./TabPanel";
import MeasurementTab from "./MeasurementTab";

const AddNewOrder = ({ onSubmit, formData, onInput }) => {
  const [formError, setFormError] = React.useState();
  const onSubmitValidate = () => {
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      setFormError(null);
      if (formData[key] === "") {
        // alert("Please complete the form first");
        setFormError("Please complete the form to add new client");
        isValid = false;
      }
    });

    if (isValid) {
      onSubmit();
    }
  };
  return (
    <div>
      <Form>
        <Typography color={"red"}>{formError}</Typography>
        <TextField
          id="standard-password-input"
          label="Username"
          required
          name={"username"}
          value={formData.username}
          onChange={onInput}
          type="text"
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={onInput}
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={onInput}
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Phone number"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={onInput}
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Address"
          type="text"
          name="address"
          value={formData.address}
          onChange={onInput}
          autoComplete="current-password"
          variant="standard"
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="text"
          name="password"
          value={formData.password}
          onChange={onInput}
          autoComplete="current-password"
          variant="standard"
        />
        <Box mt={2}>
          <Button
            variant={"contained"}
            sx={{ width: "100%" }}
            onClick={onSubmitValidate}
          >
            Add New Client
          </Button>
        </Box>
      </Form>
    </div>
  );
};

const PersonalInformation = ({ data }) => (
  <Box>
    {Object.entries(data).map(([key, value]) => {
      return (
        <>
          <Grid container spacing={2} mt={2}>
            <Grid xs={12} sm={3}>
              <Typography color={"#8B8989"}>{key.toUpperCase()}</Typography>
            </Grid>
            <Grid xs={12} sm={3}>
              <Typography>{value.toUpperCase()}</Typography>
            </Grid>
          </Grid>
        </>
      );
    })}
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
          <MeasurementTab />
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

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [addClientForm, setAddClientForm] = React.useState(clientInitialValue);

  const [client, setClient] = React.useState([]);
  const [clientData, setClientData] = React.useState(null);

  const handleAddClient = () => {
    setClient([...client, addClientForm]);
    setAddClientForm(clientInitialValue);
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
              {client.length < 1 ? (
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
                  tableContent={client}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
