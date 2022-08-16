import * as React from "react";
import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import { getListOfOrder } from "api/clients.api";
import BasicModal from "./Modal";
import Invoice from "./ClientInvoice";
import ReactPDF from "@react-pdf/renderer";
import ReactToPrint from "react-to-print";

// const ComponentToPrint = ({ data }) => {
//   return (
//     <Box
//       sx={{
//         minWidth: { xs: "xs" },
//       }}
//     >
//       <Box
//         sx={{
//           width: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <img
//           src="https://i.postimg.cc/gkB8x8yd/ff85e82c-e25b-4913-b13f-09bbae1b1e36-removebg-preview.png"
//           alt="display-logo"
//           width={200}
//         />
//       </Box>
//       {/* order detail */}
//       <>
//         <Divider>
//           <Chip label="ORDER DETAIL" />
//         </Divider>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Number of Attire
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               {data.no_of_attire}
//             </Typography>
//           </Box>
//           <Divider />
//         </>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Style
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               {data.style}
//             </Typography>
//           </Box>
//           <Divider />
//         </>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Description
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               {data.description}
//             </Typography>
//           </Box>
//           <Divider />
//         </>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Collection Date
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               {data.collection_date}
//             </Typography>
//           </Box>
//           <Divider />
//         </>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Status of order
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               {data.status}
//             </Typography>
//           </Box>
//           <Divider />
//         </>

//         <>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "space-between",
//               my: "10px",
//             }}
//           >
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               Amount
//             </Typography>
//             <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//               ₦{data.amount}
//             </Typography>
//           </Box>
//           <Divider />
//         </>
//       </>
//       <>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             my: "10px",
//           }}
//         >
//           <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//             Amount Paid
//           </Typography>
//           <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//             ₦{data.amount_paid}
//           </Typography>
//         </Box>
//         <Divider />
//       </>

//       {/* measurement detail */}
//       <>
//         <Divider sx={{ marginTop: "30px" }}>
//           <Chip label="MEASUREMENT DETAIL" />
//         </Divider>
//         <Box></Box>
//       </>

//       <>
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             my: "10px",
//           }}
//         >
//           <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//             Measurement Name
//           </Typography>
//           <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
//             {data.measurement.measurement_owner}
//           </Typography>
//         </Box>
//         <Divider />
//       </>

//       {/* <Box marginTop={"40px"} spacing={2}>
//         <ReactToPrint
//           trigger={() => <Button variant="outlined">Generate Invoice</Button>}
//           content={() => componentRef}
//         />
//       </Box> */}
//     </Box>
//   );
// };

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

const ViewEditOrder = ({ data }) => {
  let componentRef = React.useRef();

  return (
    <Box
      sx={{
        minWidth: { xs: "xs" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "none",
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
            <Typography
              sx={{
                fontSize: { xs: "12px", sm: "18px" },
                color: data.status === "Completed" ? "green" : "yellow",
              }}
            >
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
      <div style={{ display: "none" }}>
        <ComponentToPrint data={data} ref={(el) => (componentRef = el)} />
      </div>
    </Box>
  );
};

export default function ClientDashboard({}) {
  const [loading, setLoading] = React.useState(false);
  const [firstTime, setFirstTime] = React.useState(true);
  const { user, token } = useSelector((state) => state.auth);
  const [clientOrder, setClientOrder] = React.useState([]);
  const [clickData, setClickData] = React.useState({});

  const [modalOpen, setModalOpen] = React.useState(false);
  const handleCloseModal = () => setModalOpen(!modalOpen);

  const handleOrderClick = (order) => {
    setClickData(order);
    handleCloseModal();
  };

  React.useEffect(() => {
    setTimeout(() => {
      setFirstTime(false);
    }, 3000);
  }, [firstTime]);

  React.useEffect(() => {
    getClientOrder();
  }, []);

  const getClientOrder = async () => {
    setLoading(true);
    const order = await getListOfOrder(token);

    setClientOrder(order);
    setLoading(false);
  };

  if (firstTime) {
    return (
      <Container>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            height: "100vh",
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="https://i.postimg.cc/FRpTkw7B/ff85e82c-e25b-4913-b13f-09bbae1b1e36.jpg"
            alt={"display logo"}
          />
          {/* <Typography sx={{ color: "white" }}>
            Welcome to Bint Atelier{" "}
          </Typography>

          <Typography sx={{ fontSize: "26px", color: "white" }}>
            {user.first_name}
          </Typography> */}
        </Box>
      </Container>
    );
  }

  const pdf = (k) => {
    console.log("hello from pdf");
    ReactPDF.renderToStream(<Invoice />);
  };

  return (
    <Container sx={{ padding: { xs: "0" } }}>
      <BasicModal isOpen={modalOpen} onClose={handleCloseModal} title=" ">
        <ViewEditOrder data={clickData} />
      </BasicModal>
      <Box sx={{ width: "100%", height: "100vh" }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              backgroundColor: "black",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <CircularProgress />
            <Typography color="white" mt="20px">
              Getting your orders please wait...
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100vh",
              backgroundColor: "#454242",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* this is the header */}
            <Box
              sx={{
                width: "100%",
                height: "70px",
                backgroundColor: "#383232",
                display: "flex",
                alignItems: "center",
                paddingX: "20px",
              }}
            >
              <Typography color={"white"}>Bint Atelier</Typography>
            </Box>

            <Typography
              color={"white"}
              paddingX="20px"
              mt="50px"
              fontSize={"20px"}
              fontWeight="600"
            >
              Order Details
            </Typography>
            <Box
              sx={{
                minHeight: "200px",
                backgroundColor: "#383232",
                mt: "15px",
              }}
            >
              {clientOrder.length < 1 ? (
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Typography color={"white"}>
                    You don't have order with us yet
                  </Typography>
                  <Typography color={"white"}>CALL 09066424203</Typography>
                </Box>
              ) : (
                <>
                  <Box
                    display="flex"
                    paddingX="20px"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="15px"
                    mb="10px"
                  >
                    <Typography
                      color={"white"}
                      fontSize={"18px"}
                      fontWeight="500"
                    >
                      Name
                    </Typography>
                    <Typography
                      color={"white"}
                      fontSize={"18px"}
                      fontWeight="500"
                    >
                      Status
                    </Typography>
                  </Box>
                  <Divider color="white" />

                  {/* list of order data */}
                  {clientOrder.map((order) => (
                    <>
                      <Box
                        key={order.id}
                        display="flex"
                        paddingX="20px"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="15px"
                        mb="10px"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOrderClick(order)}
                      >
                        <Typography
                          color={"white"}
                          fontSize={"18px"}
                          fontWeight="300"
                        >
                          {order.measurement.measurement_owner}
                        </Typography>
                        <Typography
                          color={"white"}
                          fontSize={"18px"}
                          fontWeight="300"
                        >
                          {order.status && order.status}
                        </Typography>
                      </Box>
                      <Divider color="white" />
                    </>
                  ))}
                </>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </Container>
  );
}
