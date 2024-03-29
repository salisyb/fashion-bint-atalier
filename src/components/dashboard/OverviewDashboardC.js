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
import { getClientListOfOrder, getListOfOrder } from "api/clients.api";
import BasicModal from "./Modal";
import Invoice from "./ClientInvoice";
import ReactPDF from "@react-pdf/renderer";
import ReactToPrint from "react-to-print";
import moment from "moment";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import CurrencyFormat from "react-currency-format";
import tw from "twin.macro";
import styled from "styled-components";
import {
  FaInstagram,
  FaSnapchatGhost,
  FaWhatsapp,
  FaTiktok,
  FaMailBulk,
} from "react-icons/fa";

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-400 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

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
                <CurrencyFormat
                  value={data.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
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
              <CurrencyFormat
                value={data.amount_paid}
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
  const [selected, setSelected] = React.useState(0);

  return (
    <Box
      sx={{
        minWidth: { xs: "xs" },
        maxHeight: "500px",
        overflow: "scroll",
        "&::-webkit-scrollbar": { display: "none" },
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

      <Divider>
        <Chip
          label="ORDER DETAIL"
          onClick={() => setSelected(0)}
          color={selected === 0 ? "warning" : "default"}
        />
      </Divider>
      {selected === 0 && (
        <>
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
              <Typography
                sx={{
                  fontSize: { xs: "12px", sm: "18px" },
                  color: data.status === "Completed" ? "green" : "black",
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
                Price
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                <CurrencyFormat
                  value={data.amount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
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
                Discount
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                {data.discount && (
                  <CurrencyFormat
                    value={data.discount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₦"}
                  />
                )}
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
                Amount Paid
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                <CurrencyFormat
                  value={data.amount_paid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
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
                Total Amount
              </Typography>
              <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                <CurrencyFormat
                  value={
                    Number(data.amount) * Number(data.no_of_attire) -
                    (data.discount ? data.discount : 0)
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₦"}
                />
              </Typography>
            </Box>
            <Divider />
          </>
        </>
      )}

      {/* measurement detail */}
      <>
        <Divider sx={{ marginTop: "30px" }}>
          <Chip
            label="MEASUREMENT DETAIL"
            onClick={() => setSelected(1)}
            color={selected === 1 ? "warning" : "default"}
          />
        </Divider>
        <Box></Box>
      </>

      {selected === 1 && (
        <Box
          sx={{
            minHeight: "600px",
          }}
        >
          {Object.entries(data.measurement).map(([key, value]) => (
            <>
              {key !== "id" && key !== "owner" && (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      my: "10px",
                    }}
                  >
                    <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                      {key.replaceAll("_", " ")}
                    </Typography>
                    <Typography sx={{ fontSize: { xs: "12px", sm: "18px" } }}>
                      {value}
                    </Typography>
                  </Box>
                  <Divider />
                </>
              )}
            </>
          ))}
        </Box>
      )}
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
  const [selected, setSelected] = React.useState(0);

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
    const order = await getClientListOfOrder(user.id);

    if (order) {
      setClientOrder(order);
    }
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
              backgroundColor: "#FFFFFF",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* this is the header */}
            <Box
              sx={{
                width: "100%",
                height: "70px",
                backgroundColor: "#E1AD01",
                display: "flex",
                alignItems: "center",
                paddingX: "20px",
                justifyContent: "space-between",
              }}
            >
              <Typography color={"black"}>Bint Atelier</Typography>
              <Box>
                <a href="/">
                  <FiHome fontSize={"20px"} />
                </a>
              </Box>
            </Box>

            <Typography
              color={"black"}
              paddingX="20px"
              mt="10px"
              fontWeight="600"
              sx={{
                fontSize: { xs: "14px", sm: "20px" },
              }}
            >
              Welcome, {user.first_name} {user.last_name}
            </Typography>

            <Box
              sx={{
                minHeight: "200px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                backgroundColor: "#E1AD01",
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
                  <Typography color={"black"}>
                    You don't have order with us yet
                  </Typography>
                  <Typography color={"black"}>
                    you can contact us here
                  </Typography>
                  <SocialLinksContainer>
                    <SocialLink href="https://instagram.com/bint_atelier">
                      <FaInstagram />
                    </SocialLink>
                    <SocialLink href="https://www.snapchat.com/add/bint_atelier">
                      <FaSnapchatGhost />
                    </SocialLink>
                    <SocialLink href="https://wa.me/+07046660046">
                      <FaWhatsapp />
                    </SocialLink>
                    <SocialLink href="https://tiktok.com/@bint_atelier">
                      <FaTiktok />
                    </SocialLink>
                    <SocialLink href="bintatelier@gmail.com">
                      <FaMailBulk />
                    </SocialLink>
                  </SocialLinksContainer>
                </Box>
              ) : (
                <>
                  {/* <Box
                    display="flex"
                    paddingX="20px"
                    justifyContent="space-between"
                    alignItems="center"
                    mt="15px"
                    mb="10px"
                  >
                    <Typography
                      color={"black"}
                      fontSize={"18px"}
                      fontWeight="500"
                    >
                      Name
                    </Typography>
                    <Typography
                      color={"black"}
                      fontSize={"18px"}
                      fontWeight="500"
                    >
                      Status
                    </Typography>
                  </Box>
                  <Divider color="black" /> */}

                  {/* list of order data */}
                  {clientOrder.map((order) => (
                    <>
                      <Box
                        key={order.id}
                        display="flex"
                        // justifyContent="space-between"
                        backgroundColor="white"
                        alignItems="center"
                        mt="15px"
                        mb="10px"
                        padding="10px"
                        marginX="15px"
                        borderRadius="10px"
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleOrderClick(order)}
                      >
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10px",
                            backgroundColor: "#E1AD01",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <FiShoppingCart />
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width="100%"
                        >
                          <Typography
                            color={"black"}
                            fontSize={"18px"}
                            fontWeight="600"
                            marginLeft="10px"
                          >
                            {order.style}
                          </Typography>
                          <Typography
                            color={
                              order.status !== "Pending" ? "green" : "black"
                            }
                            fontSize={"18px"}
                            fontWeight="400"
                          >
                            {order.status && order.status}
                          </Typography>
                        </Box>
                      </Box>
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
