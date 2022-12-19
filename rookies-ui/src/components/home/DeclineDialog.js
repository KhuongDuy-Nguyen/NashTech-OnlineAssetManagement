import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useContext } from "react";
import { HomeContext } from "../../contexts/providers/HomeProvider";
import IconButton from "@mui/material/IconButton";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const { homeState, changeOpenDialogDeclineStatus, clickDeclinedAssignment } =
    useContext(HomeContext);

  // console.log(homeState.dialogAccept.open);

  return (
    <Dialog
      open={homeState.dialogDecline.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => changeOpenDialogDeclineStatus(false)}
      aria-describedby="alert-dialog-slide-description"
      style={{
        "border-color": "black",
        "border-width": "2px",
        "border-style": "solid",
      }}
    >
      <DialogTitle sx={{ ml: 3 }}>
        Are you sure?
      </DialogTitle>
      <DialogContent sx={{ p: 0, pl: 6, pr: 6, height: "100%" }}>
        <DialogContentText
          id="alert-dialog-slide-description"
          style={{ color: "black" }}
        >
          <p>Do you want to decline this assignment?</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mx: "auto", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => clickDeclinedAssignment(homeState.assignmentId)}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => changeOpenDialogDeclineStatus(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
