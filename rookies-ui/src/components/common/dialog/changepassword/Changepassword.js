import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Box, { BoxProps } from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/providers/AppProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const theme = createTheme({
    palette: {
      neutral: {
        main: "#1976d2",
        contrastText: "#fff",
      },
    },
  });

  const handleBackdropClick = (event) => {
    event.stopPropagation();
    return false;
  };

  const [errors, setError] = React.useState({
    errorPassword: false,
  });

  const [values, setValues] = React.useState({
    showPassword: false,
    showNewPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowNewPassword = () => {
    setValues({
      ...values,
      showNewPassword: !values.showNewPassword,
    });
  };

  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };

  const {
    appState,
    handleChange_ModalChangePassword,
    submit_ModalChangePassword,
    cancle_ModalChangePassword,
    handleChange_ModalChangePassword1,
  } = useContext(AppContext);

  const handleCancel = (event, reason) => {
      props.setOpen(false);
      setValues({
        showPassword: false,
        showNewPassword: false,
      });
      cancle_ModalChangePassword();
  };

  React.useEffect(() => {
    if (
      appState.status.success == true &&
      appState.status.message == "Successful!"
    ) {
      cancle_ModalChangePassword();
      props.setOpen(false);
      props.setOpenNoti(true);
    }
  }, [appState.status]);

  return (
    <Dialog
      open={props.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCancel}
      onBackdropClick={handleBackdropClick}
      disableEscapeKeyDown
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Change password"}</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
        <Box
          sx={{
            width: "20vw",
            height: "auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            flexDirection: "column",
            borderRadius: 1,
          }}
        >
          <FormControl
            sx={{ m: 0, mt: 1, mb: 0.5, width: "100%" }}
            variant="outlined"
            error={appState.status.message == "Old Password incorrect"}
            id={
              appState.status.message == "Old Password incorrect"
                ? "outlined-error-helper-text"
                : "outlined-adornment-password"
            }
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Old Password
            </InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 50 }}
              sx={{ width: "100%" }}
              id="outlined-adornment-password"
              type={values.showPassword ? "text" : "password"}
              value={
                appState.modalChangePassword.password == null
                  ? ""
                  : appState.modalChangePassword.password
              }
              onChange={handleChange_ModalChangePassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color={
                      appState.status.message == "Old Password incorrect"
                        ? "error"
                        : ""
                    }
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Old Password"
            />
          </FormControl>
          {appState.status.message == "Old Password incorrect" && (
            <Alert
              severity="error"
              sx={{
                width: "90%",
                py: 1,
                px: "5%",
              }}
            >
              Password is incorrect
            </Alert>
          )}
          <FormControl
            sx={{ m: 0, mt: 2, mb: 0.5, width: "100%" }}
            variant="outlined"
            error={appState.modalChangePassword.errorNew != null}
            id={
              appState.modalChangePassword.errorNew != null
                ? "outlined-error-helper-text"
                : "outlined-adornment-password"
            }
          >
            <InputLabel htmlFor="outlined-adornment-password">
              New Password
            </InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 50 }}
              sx={{ width: "100%" }}
              id="outlined-adornment-password"
              type={values.showNewPassword ? "text" : "password"}
              value={
                appState.modalChangePassword.newPassword == null
                  ? ""
                  : appState.modalChangePassword.newPassword
              }
              onChange={handleChange_ModalChangePassword1}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    color={
                      appState.modalChangePassword.errorNew != null
                        ? "error"
                        : ""
                    }
                    aria-label="toggle password visibility"
                    onClick={handleClickShowNewPassword}
                    onMouseDown={handleMouseDownNewPassword}
                    edge="end"
                  >
                    {values.showNewPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="New Password"
            />
          </FormControl>
          {appState.modalChangePassword.errorNew != null && (
            <Alert
              severity="error"
              sx={{
                width: "90%",
                py: 1,
                px: "5%",
              }}
            >
              {appState.modalChangePassword.errorNew}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <ThemeProvider theme={theme}>
        <DialogActions>
          <Button
            disabled={
              appState.modalChangePassword.password == null ||
              appState.modalChangePassword.newPassword == null ||
              appState.modalChangePassword.errorNew != null
            }
            onClick={submit_ModalChangePassword}
            color="error"
            variant="contained"
          >
            Save
          </Button>
          <Button color="success" onClick={handleCancel} variant="contained">
            Cancel
          </Button>
        </DialogActions>
      </ThemeProvider>
    </Dialog>
  );
}
