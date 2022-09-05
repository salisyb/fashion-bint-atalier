import * as React from "react";
// import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ReactToPrint, { useReactToPrint } from "react-to-print";

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
import {
  createClientOrder,
  createInvoiceOrder,
  deleteOrderInformation,
  getClientMeasurement,
  getListOfOrder,
  updateOrderInformation,
} from "api/clients.api";
import { minHeight } from "@mui/system";
import moment from "moment";
import { setOrders, addOrders, getClient, removeOrder } from "store/auth";
import CircularProgress from "@mui/material/CircularProgress";
import OneComponentPrint from "./InvoicePrintOne";

import MarkComponentPrint from "./InvoicePrintMany";
import CurrencyFormat from "react-currency-format";
import { useHistory } from "react-router-dom";
import { generateRef } from "utils/helper";

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

  const [loading, setLoading] = React.useState(false);

  const handleSetClient = async (e) => {
    setClient(e.target.value);

    const data = await getClientMeasurement(e.target.value, token);
    setSelectedMeasurement(data);
  };

  const handleFinishSelectingClient = () => {
    console.log(client);
  };

  const handleRegisterClientOrder = async (form) => {
    let orderForm = {};
    setLoading(true);

    try {
      orderForm = {
        ...form,
        collection_date: value.format("YYYY-MM-DD"),
        client: client,
      };
    } catch (error) {
      const cd = moment(value);
      orderForm = {
        ...form,
        collection_date: cd.format("YYYY-MM-DD"),
        client: client,
      };
    }

    const data = await createClientOrder(orderForm, token);

    if (data) {
      dispatch(addOrders(data));
    }

    setLoading(false);
    onSubmit();
  };

  return (
    <div>
      <Formik
        // validationSchema={addNewClientSchema}
        initialValues={initialState}
        onSubmit={(data) => {
          handleRegisterClientOrder(data);
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
                  inputFormat="DD/MM/YYYY"
                  label="Date of collections"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(params) => (
                    <>
                      {console.log(params)}
                      <TextField {...params} />
                    </>
                  )}
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
                {loading ? <CircularProgress /> : "Submit order"}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

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

const ViewEditOrder = ({ data, onClose }) => {
  let componentRef = React.useRef();

  const [edit, setEdit] = React.useState(false);
  const { token } = useSelector((state) => state.auth);

  const [orderEdit, setOrderEdit] = React.useState({
    amount_paid: data.amount_paid,
    discount: data.discount,
    status: data.status,
    amount: data.amount,
    description: data.description,
    no_of_attire: data.no_of_attire,
    style: data.style,
  });

  const [status, setState] = React.useState(data.status);
  const [amount_paid, setAmountPaid] = React.useState(data.amount_paid);
  const [discount, setDiscount] = React.useState(data.discount);
  const [loading, setLoading] = React.useState(false);

  const toggleEdit = () => setEdit(!edit);

  const handleSetEdit = (e) => {
    setOrderEdit({ ...orderEdit, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = async () => {
    setLoading(true);
    // update the order information

    const response = await updateOrderInformation(
      data.id,
      { ...data, ...orderEdit },
      token
    );

    // console.log(response);
    setLoading(false);
    toggleEdit();
    onClose();
  };

  return (
    <>
      <Box
        sx={{
          minWidth: { xs: "xs" },
          maxHeight: "500px",
          overflow: "scroll",
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
              {!edit ? (
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {orderEdit.no_of_attire}
                </Typography>
              ) : (
                <TextField
                  type="text"
                  placeholder="Number of attire"
                  value={orderEdit.no_of_attire}
                  name="no_of_attire"
                  onChange={(e) => handleSetEdit(e)}
                  size="small"
                />
              )}
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
              {!edit ? (
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {orderEdit.style}
                </Typography>
              ) : (
                <TextField
                  type="text"
                  placeholder="Style"
                  value={orderEdit.style}
                  name="style"
                  onChange={(e) => handleSetEdit(e)}
                  size="small"
                />
              )}
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
              {!edit ? (
                <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                  {orderEdit.description}
                </Typography>
              ) : (
                <TextField
                  type="text"
                  placeholder="Description"
                  value={orderEdit.description}
                  name="description"
                  onChange={(e) => handleSetEdit(e)}
                  size="small"
                />
              )}
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
                {moment(data.collection_date).format("MMM D YYYY")}
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

              {!edit ? (
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "18px" },
                    color:
                      orderEdit.status === "Completed" ? "green" : "yellow",
                  }}
                >
                  {orderEdit.status}
                </Typography>
              ) : (
                <TextField
                  type="text"
                  placeholder="Status of order"
                  value={orderEdit.status}
                  name="status"
                  onChange={(e) => handleSetEdit(e)}
                  size="small"
                />
              )}
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
              Price
            </Typography>
            {!edit ? (
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                <CurrencyFormat
                  value={orderEdit.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </Typography>
            ) : (
              <TextField
                type="text"
                placeholder="Price"
                name="amount"
                value={orderEdit.amount}
                onChange={(e) => handleSetEdit(e)}
                size="small"
              />
            )}
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
              Amount Paid
            </Typography>

            {!edit ? (
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                ₦{orderEdit.amount_paid}
              </Typography>
            ) : (
              <TextField
                type="text"
                placeholder="Amount paid"
                name="amount_paid"
                value={orderEdit.amount_paid}
                onChange={(e) => handleSetEdit(e)}
                size="small"
              />
            )}
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
              Discount
            </Typography>

            {!edit ? (
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                {orderEdit.discount && `₦${orderEdit.discount}`}
              </Typography>
            ) : (
              <TextField
                type="text"
                placeholder="Discount"
                value={orderEdit.discount}
                name="discount"
                onChange={(e) => handleSetEdit(e)}
                size="small"
              />
            )}
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
              Total Amount
            </Typography>
            <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
              <CurrencyFormat
                value={
                  Number(orderEdit.amount) * Number(orderEdit.no_of_attire) -
                  (orderEdit.discount ? orderEdit.discount : 0)
                }
                displayType={"text"}
                thousandSeparator={true}
                prefix={"₦"}
              />
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
        
      </Box> */}

        <Box marginTop={"40px"} spacing={2}>
          {!edit ? (
            <Button
              variant="outlined"
              onClick={toggleEdit}
              sx={{ marginRight: "10px" }}
            >
              Edit
            </Button>
          ) : (
            <>
              {!loading && (
                <Button
                  variant="outlined"
                  onClick={toggleEdit}
                  sx={{ marginRight: "10px" }}
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSaveEdit}
                variant="outlined"
                sx={{ marginRight: "10px" }}
                disabled={loading}
              >
                {loading ? <CircularProgress size={22} /> : "Save"}
              </Button>
            </>
          )}
          {/* <ReactToPrint
          trigger={() => <Button variant="outlined">Generate Invoice</Button>}
          content={() => componentRef}
        /> */}
        </Box>

        <div style={{ display: "none" }}>
          <OneComponentPrint data={data} ref={(el) => (componentRef = el)} />
        </div>
      </Box>
    </>
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
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => {
    getOrders();
    setModalOpen(!modalOpen);
  };

  let componentRef = React.useRef();

  const history = useHistory();

  const [selectedOption, setSelectedOption] = React.useState(null);
  const [title, setTitle] = React.useState("");

  const { order } = useSelector((state) => state.auth);
  const [modalData, setModalData] = React.useState(null);
  const [markedOrder, setMarkedOrder] = React.useState([]);

  React.useEffect(() => {
    getOrders();
  }, []);

  React.useEffect(() => {
    // get list of client

    dispatch(getClient());
  }, []);

  const getOrders = async () => {
    const orders = await getListOfOrder(token);

    if (orders.length > 0) {
      dispatch(setOrders(orders));
    }
  };

  const handleOpenModal = (from, data = null) => {
    switch (from) {
      case "view edit order":
        setSelectedOption("view");
        setTitle("Order information");
        setModalData(data);
        handleCloseModal();
        break;

      case "add new order":
        setSelectedOption("add");
        setTitle("Add New Order");
        handleCloseModal();
        break;

      default:
        return;
    }
  };

  const deleteOrder = async () => {
    setLoading(true);
    markedOrder.map(async (order) => {
      const deleted = await deleteOrderInformation(order.id);
      if (deleted) {
        handleOnMark(order);
        dispatch(removeOrder(order.id));
      }
    });

    setLoading(false);
  };

  const generateInvoice = async () => {
    setLoading(true);

    const ref = generateRef();

    const data = {
      reference: ref,
      order: markedOrder.map((order) => order.id),
    };
    const res = await createInvoiceOrder(data);

    if (res) {
      history.push(`/invoices?kbyb=${res.reference}`);
      setLoading(false);
      return;
    }

    alert("Please try again");
    setLoading(false);
  };

  const pageStyle = `
  @page {
    size: 320mm 397mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: pageStyle,
  });

  const handleOnMark = (order) => {
    const mOrder = markedOrder.filter((item) => item.id === order.id);

    if (mOrder.length < 1) {
      setMarkedOrder([...markedOrder, order]);
      return;
    }

    const newOrder = markedOrder.filter((item) => order.id !== item.id);
    setMarkedOrder(newOrder);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <CircularProgress />
        <br />
        <Typography>Please wait</Typography>
      </Box>
    );
  }

  return (
    <>
      {markedOrder.length > 0 && (
        <>
          <div
            style={{
              display: "none",
              position: "absolute",
              height: "100vh",
              width: "100vw",
            }}
          >
            <MarkComponentPrint data={markedOrder} ref={componentRef} />
          </div>
        </>
      )}
      <Box sx={{ flexGrow: 1 }}>
        {/* <Typography variant={"h6"}>Welcome to dashboard</Typography> */}
        <Modal isOpen={modalOpen} onClose={handleCloseModal} title={title}>
          {selectedOption === "view" ? (
            <ViewEditOrder
              data={modalData}
              onSubmit={handleCloseModal}
              onClose={handleCloseModal}
            />
          ) : (
            <AddNewOrder onSubmit={handleCloseModal} />
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
                Order Information
              </Typography>
            </CardGrid>
          </Grid>
          <Grid container spacing={2}>
            <Box
              width={"100%"}
              px={2}
              pt={4}
              pb={2}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                variant="contained"
                endIcon={<PlusIcon />}
                // sx={{ px: 4, py: 2 }}
                color={"secondary"}
                sx={{ width: { xs: "100%", sm: "200px" }, height: "40px" }}
                onClick={() => handleOpenModal("add new order")}
              >
                New Order
              </Button>
              {markedOrder.length > 0 && (
                <>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      marginTop: { xs: "10px", sm: "" },
                    }}
                  >
                    <Button
                      onClick={deleteOrder}
                      sx={{ width: "100%" }}
                      variant="contained"
                      color="error"
                    >
                      Delete
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "200px" },
                      marginTop: { xs: "10px", sm: "" },
                    }}
                  >
                    <Button
                      onClick={generateInvoice}
                      sx={{ width: "100%" }}
                      variant="outlined"
                    >
                      Generate Invoice
                    </Button>
                  </Box>
                </>
              )}
            </Box>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={20}>
              <div
                style={{
                  minHeight: "200px",
                  backgroundColor: "#191c24",
                  // height: "100px",
                  borderRadius: "6px",
                  padding: "20px",
                }}
              >
                <Typography variant={"p"} color={"white"}>
                  Order status
                </Typography>
                {order.length !== 0 ? (
                  <TableOrder
                    onRowClick={handleOpenModal}
                    tableHeader={["Client Name", "Mark"]}
                    tableContent={order}
                    onMark={handleOnMark}
                  />
                ) : (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    padding="40px"
                  >
                    <Typography color="white" fontSize="20px">
                      There is no order yet
                    </Typography>
                  </Box>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
