import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../../../contexts/providers/AppProvider";


const ChangePasswordLoginFirstTimeDialog = (props) => {
  const {
    appState,
    handleChange_ModalLoginFirstTime,
    setShowPassword_ModalLoginFirstTime,
    submit_ModalLoginFirstTime
  } = useContext(AppContext);

  return (
    <Dialog
      open={!appState.user.enabled}
      keepMounted
      disableEscapeKeyDown
      aria-describedby="alert-dialog-slide-login-first-time"
    >
      <DialogTitle>Change password</DialogTitle>
      <DialogContent sx={{ pb: 0 }}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          This is the first time you logged in. You have to change your password
          to continue
          <FormControl
            sx={{ width: "100%", my: 2 }}
            variant="outlined"
            error={appState.modalLoginFirstTime.error != null}
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={
                appState.modalLoginFirstTime.showPassword ? "text" : "password"
              }
              value={appState.modalLoginFirstTime.password}
              onChange={handleChange_ModalLoginFirstTime}
              inputProps={{ maxLength: 50 }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      setShowPassword_ModalLoginFirstTime(
                        !appState.modalLoginFirstTime.showPassword
                      )
                    }
                    edge="end"
                  >
                    {appState.modalLoginFirstTime.showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
          {appState.modalLoginFirstTime.error != null && (
            <Alert severity="error">{appState.modalLoginFirstTime.error}</Alert>
          )}
        </Typography>
      </DialogContent>
        <DialogActions>
        <Typography id="modal-btn" sx={{ mt: 2 }}>
          <Button
            color="error"
            variant="contained"
            disabled={appState.modalLoginFirstTime.error != null}
            onClick={submit_ModalLoginFirstTime}
          >
            Save
          </Button>
        </Typography>
        </DialogActions>
    </Dialog>

  );
};

export default ChangePasswordLoginFirstTimeDialog;
