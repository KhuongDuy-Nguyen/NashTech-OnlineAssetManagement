import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import ListItem from "@mui/material/ListItem";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import PieChartOutlineIcon from "@mui/icons-material/PieChartOutline";
import StyleIcon from "@mui/icons-material/Style";

import { Link, useLocation } from "react-router-dom";

import styles from "./Sidebar.module.css";
import { AppContext } from "../../../contexts/providers/AppProvider";
import { useContext } from "react";
import Title from "../title/Title";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...openedMixin(theme),
  "& .MuiDrawer-paper": openedMixin(theme),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Sidebar = (props) => {
  const { appState } = useContext(AppContext);
  const theme = useTheme();
  const location = useLocation();
  const pathSplit = location.pathname.split("/");
  const path = pathSplit.length == 0 ? "" : pathSplit[1];

  return (
    <Drawer variant="permanent" open={props.open} className={styles["sidebar"]}>
      <DrawerHeader></DrawerHeader>

      <ListItem disablePadding sx={{ display: "block" }}>
        <div className={styles["wrap-logo"]}>
          <img className={styles["logo"]} src="/logo.png" alt="Not found" />
        </div>
        <Title title="Online Asset Management" />
      </ListItem>

      <ListItem disablePadding sx={{ display: "block" }}>
        <Link to="/" className={path == "" ? styles["active"] : ""}>
          <span className={styles["icon"]}>
            <HomeIcon />
          </span>
          <span className={styles["title"]}>Home</span>
        </Link>
      </ListItem>

      {appState.user.role == "ADMIN" && (
        <ListItem disablePadding sx={{ display: "block" }}>
          <Link to="/users" className={path == "users" ? styles["active"] : ""}>
            <span className={styles["icon"]}>
              <PersonIcon />
            </span>
            <span className={styles["title"]}>Manage User</span>
          </Link>
        </ListItem>
      )}

      {appState.user.role == "ADMIN" && (
        <ListItem disablePadding sx={{ display: "block" }}>
          <Link
            to="/assets"
            className={path == "assets" ? styles["active"] : ""}
          >
            <span className={styles["icon"]}>
              <StyleIcon />
            </span>
            <span className={styles["title"]}>Manage Asset</span>
          </Link>
        </ListItem>
      )
      }

      {
        appState.user.role == 'ADMIN' && (
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link to='/assignments' className={path == 'assignments' ? styles['active'] : ''}>
              <span className={styles['icon']}><AssignmentIcon /></span>
              <span className={styles['title']}>Manage Assignment</span>
            </Link>
          </ListItem>
        )}

      {
        appState.user.role == 'ADMIN' && (
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link to='/returnings' className={path == 'returnings' ? styles['active'] : ''}>
              <span className={styles['icon']}><AssignmentReturnIcon /></span>
              <span className={styles['title']}>Request for Returning</span>
            </Link>
          </ListItem>
        )}

      {
        appState.user.role === 'ADMIN' && (
          <ListItem disablePadding sx={{ display: 'block' }}>
            <Link to='/reports' className={path === 'reports' ? styles['active'] : ''}>
              <span className={styles['icon']}><PieChartOutlineIcon /></span>
              <span className={styles['title']}>Report</span>
            </Link>
          </ListItem>
        )}
    </Drawer>
  );
};

export default Sidebar;
