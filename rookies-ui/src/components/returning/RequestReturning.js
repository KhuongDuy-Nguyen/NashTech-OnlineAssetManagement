import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Slide,
  Stack,
  TextField,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as React from "react";

import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";

import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext } from "react";
import { RequestReturningContext } from "../../contexts/providers/RequestReturningProvider";
import { compareDate, convertDateByFormatEdit_v2 } from "../../utils/DateUtils";
import CustomPagination from "../common/pagination/CustomPagination";
import Search from "../common/search/Search";
import SearchIconWrapper from "../common/search/SearchIconWrapper";
import StyledInputBase from "../common/search/StyledInputBase";
import Title from "../common/title/Title";
import { validateDate } from "../../utils/Validate";

function RequestReturningNoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Request Returning Found
    </Stack>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const states = ["All", "Completed", "Waiting for returning"];

const sortByDate = (v1, v2) => {
  const date1 = new Date(convertDateByFormatEdit_v2(v1, "yyyy/MM/dd"));
  const date2 = new Date(convertDateByFormatEdit_v2(v2, "yyyy/MM/dd"));
  return date1 - date2;
};

const RequestReturning = (props) => {
  const {
    requestReturningState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus,
    changeDeleteId,
    changeOpenDelete,
    deleteSubmit,
    changeAcceptId,
    changeOpenAccept,
    acceptSubmit,
  } = useContext(RequestReturningContext);

  const columns = [
    {
      field: "id",
      minWidth: 50,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>No</h4>,
    },
    {
      field: "assetCode",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Asset Code</h4>,
    },
    {
      field: "assetName",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Asset Name</h4>,
    },
    {
      field: "requestedBy",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Requested by</h4>,
    },
    {
      field: "assignedDate",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Assigned Date</h4>,
      sortComparator: sortByDate,
    },
    {
      field: "acceptedBy",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Accepted By</h4>,
    },
    {
      field: "returnedDate",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>Returned Date</h4>,
      sortComparator: sortByDate,
    },
    {
      field: "state",
      flex: 2,
      headerAlign: "center",
      align: "center",
      renderHeader: () => <h4>State</h4>,
    },
    {
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      sortable: false,
      filterable: false,
      renderHeader: () => <h4>Action</h4>,
      renderCell: (params) => {
        const isTick = params.row.state == "Waiting for returning";
        const isCancel = params.row.state == "Waiting for returning";

        return (
          <div>
            <GridActionsCellItem
              disabled={!isTick}
              icon={
                <DoneIcon
                  style={{
                    color: isTick ? "red" : "#F6B4B8",
                  }}
                />
              }
              label="Completed"
              onClick={(e) => {
                e.stopPropagation();
                changeOpenAccept(true);
                changeAcceptId(params.id);
              }}
            />
            <GridActionsCellItem
              disabled={!isCancel}
              icon={
                <CloseIcon style={{ color: isCancel ? "black" : "#BCBCBC" }} />
              }
              label="Cancel"
              onClick={(e) => {
                e.stopPropagation();
                changeOpenDelete(true);
                changeDeleteId(params.id);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Title title="Request List"></Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item lg={3} xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel
                style={{ backgroundColor: "white", zIndex: "1" }}
                id="demo-simple-select-label"
              >
                State
              </InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={requestReturningState.conditions.states}
                onChange={(e) => changeTypeCondition(e.target.value)}
                renderValue={() =>
                  requestReturningState.conditions.states.join(", ")
                }
              >
                {states.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item}>
                      <Checkbox
                        name="state"
                        checked={requestReturningState.conditions.states.includes(
                          item
                        )}
                      />
                      <ListItemText primary={item} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormControl style={{ width: "100%" }}>
              <form autoComplete="off">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={requestReturningState.conditions.returnedDate}
                    inputFormat="DD/MM/YYYY"
                    onChange={(newValue) => {
                      changeDateCondition(
                        newValue == null
                          ? ""
                          : `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`
                      );
                    }}
                    renderInput={(params) => {
                      return (
                        <TextField
                          {...params}
                          id="returnedDate"
                          name="returnedDate"
                          error={false}
                          style={{ width: "100%" }}
                        />
                      );
                    }}
                  />
                </LocalizationProvider>
              </form>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12} order={{ xs: 4, lg: 3 }}></Grid>
          <Grid item lg={3} xs={12} order={{ xs: 3, lg: 4 }}>
            <form autoComplete="off">
              <Search style={{ marginLeft: 0, width: "100%" }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  style={{
                    border: "1px solid black",
                    borderRadius: "8px",
                    width: "100%",
                  }}
                  placeholder="Search…"
                  type="search"
                  onChange={(e) => changeSearchCondition(e.target.value)}
                  inputProps={{
                    "aria-label": "search",
                    maxLength: 50,
                  }}
                />
              </Search>
            </form>
          </Grid>
        </Grid>
      </div>
      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={requestReturningState.returnings.filter((item) => {
            console.log(
              requestReturningState.conditions.returnedDate == null,
              requestReturningState.conditions.returnedDate == ""
            );
            return (
              (requestReturningState.conditions.states.includes("All") ||
                requestReturningState.conditions.states.includes(item.state)) &&
              (requestReturningState.conditions.returnedDate == null ||
                requestReturningState.conditions.returnedDate == "" ||
                (item.returnedDate != null &&
                  validateDate(new Date(requestReturningState.conditions.returnedDate)) &&
                  compareDate(
                    new Date(requestReturningState.conditions.returnedDate),
                    new Date(
                      convertDateByFormatEdit_v2(
                        item.returnedDate,
                        "yyyy/MM/dd"
                      )
                    )
                  ))) &&
              (item.assetCode
                .toUpperCase()
                .includes(
                  requestReturningState.conditions.search.toUpperCase()
                ) ||
                item.assetName
                  .toUpperCase()
                  .includes(
                    requestReturningState.conditions.search.toUpperCase()
                  ) ||
                item.requestedBy
                  .toUpperCase()
                  .includes(
                    requestReturningState.conditions.search.toUpperCase()
                  ))
            );
          })}
          columns={columns}
          components={{
            NoRowsOverlay: RequestReturningNoRowsOverlay,
            Pagination: CustomPagination,
          }}
          pageSize={10}
          disableColumnMenu
          disableSelectionOnClick
          onRowClick={() => changeOpenModalStatus(true)}
        />
      </Box>

      <Dialog
        open={requestReturningState.modalDelete.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => changeOpenDelete(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ ml: 3 }}>Are you sure?</DialogTitle>
        <DialogContent sx={{ p: 0, pl: 6, pr: 6, height: "100%" }}>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "black" }}
          >
            <p>Do you want to cancel this returning request?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: "auto", p: 2 }}>
          <Button
            onClick={() => deleteSubmit()}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => changeOpenDelete(false)}
            color="success"
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={requestReturningState.modalAccept.open}
        onClose={() => changeOpenAccept(false)}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ ml: 3 }}>Are you sure?</DialogTitle>
        <DialogContent sx={{ p: 0, pl: 6, pr: 6, height: "100%" }}>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "black" }}
          >
            <p>Do you want to mark this returning request as 'Completed'?</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: "auto", p: 2 }}>
          <Button
            onClick={() => acceptSubmit()}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => changeOpenAccept(false)}
            color="success"
            variant="contained"
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RequestReturning;
