import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import styles from "./Header.module.css";
import ChangePassword from "../dialog/changepassword/Changepassword";
import ChangePasswordLoginFirstTimeDialog from "../dialog/change-password-login-first-time/ChangePasswordLoginFirstTimeDialog";
import Logout from "../dialog/Logout";
import { AppContext } from "../../../contexts/providers/AppProvider";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const drawerWidth = 300;

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

const Header = (props) => {
  const { appState } = React.useContext(AppContext);
  const { pathname } = useLocation();
  const [title, setTitle] = useState("NASHTECH");
  
  useEffect(() => {
    if(pathname == '/') {
      setTitle("Home")
    } else if(pathname == '/users') {
      setTitle("Manage User")
    } else if(pathname == '/users/create') {
      setTitle("Manage User > Create New User")
    } else if(pathname.includes('/users/edit')) {
      setTitle("Manage User > Edit User");
    } else if(pathname == '/assets') {
      setTitle("Manage Asset")
    } else if(pathname == '/assets/create') {
      setTitle("Manage Asset > Create New Asset")
    } else if(pathname.includes('/assets/edit')) {
      setTitle("Manage Asset > Edit Asset");
    } else if(pathname == '/assignments') {
      setTitle("Manage Assignment")
    } else if(pathname == '/assignments/create') {
      setTitle("Manage Assignment > Create New Assignment")
    } else if(pathname.includes('/assignments/edit')) {
      setTitle("Manage Assignment > Edit Assignment");
    } else if(pathname.includes('/returnings')) {
      setTitle("Request for Returning")
    } else if(pathname.includes('/report')) {
      setTitle("Report");
    } else {
      setTitle("NASHTECH")
    }


  }, [pathname]);

  const [open, setOpen] = React.useState(false);
  const [logout, setLogout] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    setAnchorEl(null);
  };

  const handleClickOpenLogout = () => {
    setLogout(true);
    setAnchorEl(null);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleClickOpen}>Change password</MenuItem>
      <MenuItem onClick={handleClickOpenLogout}>Log out</MenuItem>
    </Menu>
  );
  const [openNoti, setOpenNoti] = React.useState(false);

  const handleCloseNoti = (event, reason) => {
    if (reason === "backdropClick") {
    } else setOpenNoti(false);
  };

  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };

  return (
    <AppBar
      position="fixed"
      open={true}
      style={{ backgroundColor: "var(--primary_color)", zIndex: 2 }}
    >
      <ChangePassword open={open} setOpen={setOpen} setOpenNoti={setOpenNoti} />
      <Dialog
        open={openNoti}
        onClose={handleCloseNoti}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        onBackdropClick={handleBackdropClick}
        disableEscapeKeyDown
      >
        <DialogTitle id="alert-dialog-title">{"Change password"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your password has been changed successfully
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoti} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ChangePasswordLoginFirstTimeDialog />
      <Logout open={logout} setOpen={setLogout} />
      <Toolbar className={styles["topbar"]}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={props.handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, display: "none" }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: "none", sm: "block" } }}
        >
          {title}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { md: "flex" } }}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <span>{appState.user.username}</span>
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
      {renderMenu}
    </AppBar>
  );
};

export default Header;
