import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Popover,
  Radio,
  Stack,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import Title from "../../common/title/Title";
import styles from "./EditAssignment.module.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useContext, useState } from "react";
import { EditAssignmentContext } from "../../../contexts/providers/EditAssignmentProvider";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../../common/pagination/CustomPagination";

const EditAssignment = (props) => {
  const {
    editAssignmentState,
    changeSelectAsset,
    changeSearchAsset,
    changeSelectUser,
    changeSearchUser,
    changeField,
    saveAssetId,
    saveUserId,
    submit,
    navigate,
  } = useContext(EditAssignmentContext);

  const [userAnchor, setUserAnchor] = useState(null);
  const [assetAnchor, setAssetAnchor] = useState(null);

  const userHandleClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const assetHandleClick = (event) => {
    setAssetAnchor(event.currentTarget);
  };

  const userHandleClose = () => {
    setUserAnchor(null);
  };

  const assetHandleClose = () => {
    setAssetAnchor(null);
  };

  const userOpen = Boolean(userAnchor);
  const userId = userOpen ? "user-popover" : undefined;

  const assetOpen = Boolean(assetAnchor);
  const assetId = assetOpen ? "asset-popover" : undefined;

  const userColumns = [
    {
      field: "id",
      headerName: "",
      minWidth: 40,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return (
          <Radio
            checked={
              params.id ===
              (editAssignmentState.popupUser.selected != null
                ? editAssignmentState.popupUser.selected
                : false)
            }
            onChange={() => changeSelectUser(params.row.id)}
            value={params.id}
            name="radio-user"
          />
        );
      },
    },
    {
      field: "code",
      headerName: "Staff Code",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      minWidth: 100,
      flex: 1.5,
    },
    {
      field: "role",
      headerName: "Type",
      minWidth: 150,
      flex: 1.5,
    },
  ];

  const assetColumns = [
    {
      field: "id",
      headerName: "",
      minWidth: 40,
      flex: 0.5,
      sortable: false,
      renderCell: (params) => (
        <Radio
          checked={
            params.id ===
            (editAssignmentState.popupAsset.selected != null
              ? editAssignmentState.popupAsset.selected
              : false)
          }
          onChange={() => changeSelectAsset(params.row.id)}
          value={params.id}
          name="radio-asset"
        />
      ),
    },
    {
      field: "code",
      headerName: "Asset Code",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "name",
      headerName: "Asset Name",
      minWidth: 100,
      flex: 1.5,
    },
    {
      field: "categoryName",
      headerName: "Category",
      minWidth: 150,
      flex: 1.5,
    },
  ];


  function AssetNoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No Asset Found
      </Stack>
    );
  }

  function UserNoRowsOverlay() {
    return (
      <Stack height="100%" alignItems="center" justifyContent="center">
        No User Found
      </Stack>
    );
  }

  return (
    <>
      <Title title="Edit Assignment" />
      <Card>
        <CardContent>
          <form className={styles["edit-assignment"]}>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-name">User</FormLabel>
              <TextField
                className={styles["input"]}
                id="user"
                name="user"
                disabled
                value={
                  editAssignmentState.form.userId  != null
                    ? editAssignmentState.popupUser.users.find(
                        (item) => item.id == editAssignmentState.form.userId
                      ).fullName
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <Button onClick={userHandleClick}>
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />
              <Popover
                id={userId}
                open={userOpen}
                anchorEl={userAnchor}
                onClose={userHandleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div className={styles["container-popup"]}>
                  <div className={styles["header-popup"]}>
                    <Title title="Select User" />
                    <TextField
                      id="search-user"
                      label="Search"
                      variant="outlined"
                      onChange={(e) => changeSearchUser(e.target.value)}
                      inputProps={{
                        maxLength: 50,
                      }}
                      InputProps={{
                        endAdornment: <SearchIcon />,
                      }}
                    />
                  </div>
                  <div className={styles["body-popup"]}>
                    <DataGrid
                      rows={editAssignmentState.popupUser.users.filter(
                        (item) => {
                          const code = item.code.toUpperCase();
                          const fullName = item.fullName.toUpperCase();
                          const search =
                          editAssignmentState.popupUser.search.toUpperCase();
                          return code.includes(search) || fullName.includes(search);
                        }
                      )}
                      columns={userColumns}
                      components={{ NoRowsOverlay: UserNoRowsOverlay, Pagination: CustomPagination }}
                      pageSize={10}
                      onRowClick={(params) => changeSelectUser(params.id)}
                    />
                  </div>
                  <div className={styles["footer-popup"] + " " + styles["btn"]}>
                    <Button
                      variant="contained"
                      color="error"
                      disabled={
                        editAssignmentState.popupUser.selected == null
                      }
                      onClick={() => {
                        saveUserId();
                        userHandleClose();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={userHandleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Popover>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-name">Asset</FormLabel>
              <TextField
                className={styles["input"]}
                id="asset"
                name="asset"
                disabled
                value={
                  editAssignmentState.form.assetId != null
                    ? editAssignmentState.popupAsset.assets.find(
                        (item) => item.id == editAssignmentState.form.assetId
                      ).name
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <Button onClick={assetHandleClick}>
                      <SearchIcon />
                    </Button>
                  ),
                }}
              />
              <Popover
                id={assetId}
                open={assetOpen}
                anchorEl={assetAnchor}
                onClose={assetHandleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <div className={styles["container-popup"]}>
                  <div className={styles["header-popup"]}>
                    <Title title="Select Asset" />
                    <TextField
                      id="search-asset"
                      label="Search"
                      variant="outlined"
                      value={editAssignmentState.popupAsset.search}
                      onChange={(e) => changeSearchAsset(e.target.value)}
                      inputProps={{
                        maxLength: 50,
                      }}
                      InputProps={{
                        endAdornment: <SearchIcon />,
                      }}
                    />
                  </div>
                  <div className={styles["body-popup"]}>
                    <DataGrid
                      rows={editAssignmentState.popupAsset.assets.filter(
                        (item) => {
                          const code = item.code.toUpperCase();
                          const name = item.name.toUpperCase();
                          const search =
                          editAssignmentState.popupAsset.search.toUpperCase();
                          return code.includes(search) || name.includes(search);
                        }
                      )}
                      columns={assetColumns}
                      onRowClick={(params) => changeSelectAsset(params.id)}
                      components={{ NoRowsOverlay: AssetNoRowsOverlay, Pagination: CustomPagination }}
                      pageSize={10}
                    />
                  </div>
                  <div className={styles["footer-popup"] + " " + styles["btn"]}>
                    <Button
                      variant="contained"
                      color="error"
                      disabled={
                        editAssignmentState.popupAsset.selected == null
                      }
                      onClick={() => {
                        saveAssetId();
                        assetHandleClose();
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={assetHandleClose}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Popover>
            </FormControl>
            <FormControl className={styles["input"]}>
              <FormLabel id="label-installedDate">Assigned Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  defaultValue=""
                  value={editAssignmentState.form.assignedDate}
                  inputFormat="DD/MM/YYYY"
                  onChange={(newValue) => {
                    const e = {
                      target: {
                        name: "assignedDate",
                        value:
                          newValue == null
                            ? ""
                            : `${newValue.$y}-${newValue.$M + 1}-${
                                newValue.$D
                              }`,
                      },
                    };
                    changeField(e);
                  }}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        id="assignedDate"
                        name="assignedDate"
                        error={
                          editAssignmentState.error.assignedDate != null ||
                          params.error
                        }
                        helperText={editAssignmentState.error.assignedDate}
                      />
                    );
                  }}
                />
              </LocalizationProvider>
            </FormControl>

            <FormControl className={styles["input"]}>
              <FormLabel id="label-note">Note</FormLabel>
              <TextField
                className={styles["input"]}
                id="note"
                name="note"
                multiline
                rows={3}
                inputProps={{ maxLength: 150 }}
                onChange={changeField}
                value={editAssignmentState.form.note}
              />
            </FormControl>
            <div className={styles["btn"]}>
              <Button
                variant="contained"
                color="error"
                disabled={!editAssignmentState.enableSubmit}
                onClick={submit}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate("/assignments")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default EditAssignment;
