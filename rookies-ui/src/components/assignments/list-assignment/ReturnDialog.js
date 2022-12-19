import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useContext } from "react";
// import { HomeContext } from "../../contexts/providers/HomeProvider";
import IconButton from "@mui/material/IconButton";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import { ListAssignmentContext } from "../../../contexts/providers/ListAssignmentProvider";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const {
    listAssignmentState,
    changeOpenDialogReturnStatus,
    clickReturnAssignment,
  } = useContext(ListAssignmentContext);

  // console.log(homeState.dialogAccept.open);

  return (
    <Dialog
      open={listAssignmentState.dialogReturn.open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => changeOpenDialogReturnStatus(false)}
      aria-describedby="alert-dialog-slide-description"
      style={{
        "border-color": "black",
        "border-width": "2px",
        "border-style": "solid",
      }}
    >
      <DialogTitle sx={{ ml: 3 }}>Are you sure?</DialogTitle>
      <DialogContent sx={{ p: 0, pl: 6, pr: 6, height: "100%" }}>
        <DialogContentText
          id="alert-dialog-slide-description"
          style={{ color: "black" }}
        >
          <p>Do you want to create a returning request for this asset?</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ mx: "auto", p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={() =>
            clickReturnAssignment(listAssignmentState.assignmentId)
          }
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={() => changeOpenDialogReturnStatus(false)}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
