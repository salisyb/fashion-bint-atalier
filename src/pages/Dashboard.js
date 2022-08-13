import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ClientIcon from "@mui/icons-material/PeopleAlt";
import OrderIcon from "@mui/icons-material/ShoppingCart";

import Overview from "../components/dashboard/OverviewDashboard";
import ClientOverview from "../components/dashboard/ClientOverView";
import { useSelector, useDispatch } from "react-redux";
import { getListOfOrder } from "api/clients.api";
import { setOrders } from "store/auth";

const drawerWidth = 240;

const drawerMenuList = [
  { id: 1, label: "Home", icon: <DashboardIcon /> },
  { id: 2, label: "Client", icon: <ClientIcon /> },
  { id: 3, label: "Order", icon: <OrderIcon /> },
];
// ["Home", "Client", "Order", "Drafts"]

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState("Home");

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    const orders = await getListOfOrder(token);

    if (orders.length > 0) {
      dispatch(setOrders(orders));
    }
  };

  const handleToggleDrawer = () => {
    setOpen(!open);
  };

  const handleNavigation = (navigation) => {
    setCurrent(navigation);
  };
  return (
    // <AnimationRevealPage>
    <Box sx={{ display: "flex", backgroundColor: "#00000" }}>
      <CssBaseline />
      {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Bint Atelier
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleToggleDrawer}>
            {theme.direction === "rtl" ? (
              // <ChevronRightIcon />
              <MenuIcon />
            ) : open ? (
              <ChevronLeftIcon />
            ) : (
              <MenuIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {drawerMenuList.map((item, index) => (
            <ListItem key={item.id} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleNavigation(item.label)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        {current === "Home" && (
          <AnimationRevealPage direction={"left"}>
            <Overview />
          </AnimationRevealPage>
        )}

        {current === "Client" && (
          <AnimationRevealPage direction={"right"}>
            <ClientOverview />
          </AnimationRevealPage>
        )}
      </Box>
    </Box>
    // </AnimationRevealPage>
  );
};
