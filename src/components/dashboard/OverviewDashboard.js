import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Container, Typography } from "@mui/material";
import CardGrid from "./CardGrid";
import Table from "./StyleTable";
import Modal from "./Modal";
import Form from "./Form";

import Button from "@mui/material/Button";
import PlusIcon from "@mui/icons-material/ControlPoint";

const AddNewOrder = () => {
  return (
    <div>
      <Form />
      <Box mt={2}>
        <Button variant={"contained"} sx={{ width: "80%" }}>
          Submit
        </Button>
      </Box>
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
