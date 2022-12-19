import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import { styled, alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import InputLabel from "@mui/material/InputLabel";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Title from "../../common/title/Title";
import InputBase from "@mui/material/InputBase";
import Pagination from "@mui/material/Pagination";
import Modal from "@mui/material/Modal";
import DisabledByDefaultOutlinedIcon from "@mui/icons-material/DisabledByDefaultOutlined";
import { useContext } from "react";
import { AssetContext } from "../../../contexts/providers/AssetProvider";
import IconButton from "@mui/material/IconButton";
import { UserContext } from "../../../contexts/providers/UserProvider";
import Stack from "@mui/material/Stack";
import { ListAssetContext } from "../../../contexts/providers/ListAssetProvider";
import RemoveAsset from "../../common/dialog/removeAssets/RemoveAsset";
import { Grid } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Asset Found
    </Stack>
  );
}
function NoRowsDetailOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      Empty
    </Stack>
  );
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
      showFirstButton
      showLastButton
    />
  );
}
function ListAsset() {
  const { assetState } = useContext(AssetContext);
  const {
    listAssetState,
    handleChange,
    changeState,
    handleSearch,
    handleClose,
    handleOnCellClick,
    // openRemoveDialog,
    openCheckAssignmentDialog,
    // selectRemoveIdDialog,
  } = useContext(ListAssetContext);
  const states = [
    "All",
    "Assigned",
    "Available",
    "Not available",
    "Waiting for recycling",
    "Recycled",
  ];

  const columnDetail = [
    {
      field: "assignedDate",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Date</h4>
          </strong>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "assignedTo",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Assigned to</h4>
          </strong>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "assignedBy",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Assigned by</h4>
          </strong>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "returnDate",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Returned Date</h4>
          </strong>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
  ];
  // Remove asset
  const columns = [
    {
      field: "code",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Asset Code</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.code}</p>
          </div>
        );
      },
      type: "code",
      width: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Asset Name</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.name}</p>
          </div>
        );
      },
      type: "name",
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "categoryName",
      renderHeader: () => {
        return (
          <strong>
            <h4>Category</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.categoryName}</p>
          </div>
        );
      },
      sortComparator: (v1, v2) => {
        const d1 = v1.split(" ");
        const d2 = v2.split(" ");
        let check;
        if (!(d1[0] === d2[0])) {
          if (d1[0] > d2[0]) {
            return 1;
          }
          return -1;
        }
        const name1 = d1.join(",");
        const name2 = d2.join(",");
        check = name1.localeCompare(name2);
        return check ? 1 : -1;
      },
      type: "string",
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "state",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>State</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => handleOnCellClick(params.id)}
          >
            <p>{params.row.state}</p>
          </div>
        );
      },
      type: "date",
      width: 110,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      width: 110,
      flex: 2,
      sortable: false,
      filterable: false,
      headerAlign: "center",
      align: "center",
      renderHeader: () => {
        return <h4>Action</h4>;
      },
      align: "center",
      renderCell: (params) => {
        if (params.row.state === "Assigned") {
          return (
            <div>
              <GridActionsCellItem
                disabled
                icon={<EditRoundedIcon />}
                label="edit"
              />
              <GridActionsCellItem
                disabled
                icon={<HighlightOffRoundedIcon style={{ color: "#ECAFB6" }} />}
                label="Delete"
              />
            </div>
          );
        } else {
          return (
            <div>
              <Link to={"/assets/edit/" + params.id}>
                <GridActionsCellItem icon={<EditRoundedIcon />} label="edit" />
              </Link>
              <GridActionsCellItem
                icon={<HighlightOffRoundedIcon style={{ color: "red" }} />}
                label="Delete"
                onClick={() => {
                  // selectRemoveIdDialog(params.row.id);
                  openCheckAssignmentDialog(params.row.id);
                }}
              />
            </div>
          );
        }
      },
    },
  ];
  return (
    <div>
      <Title title="Asset List"></Title>
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
                id="demo-simple-select-label"
                style={{ backgroundColor: "white", zIndex: "1" }}
              >
                State
              </InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={listAssetState.assetState}
                onChange={changeState}
                renderValue={() => listAssetState.assetState.toString()}
              >
                {states.map((state) => {
                  return (
                    <MenuItem key={state} value={state}>
                      <Checkbox
                        checked={listAssetState.assetState.indexOf(state) > -1}
                      />
                      <ListItemText primary={state} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label" style={{ backgroundColor: "white", zIndex: "1" }}>Category</InputLabel>
              <Select
                IconComponent={() => <FilterAltIcon />}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                multiple
                value={listAssetState.assetCategory}
                onChange={handleChange}
                renderValue={() => listAssetState.assetCategory.toString()}
              >
                <MenuItem value={"All"}>
                  <Checkbox
                    checked={listAssetState.assetCategory.indexOf("All") > -1}
                  />
                  <ListItemText primary={"All"} />
                </MenuItem>
                {assetState.categories.map((cate) => {
                  return (
                    <MenuItem key={cate.name} value={cate.name}>
                      <Checkbox
                        checked={
                          listAssetState.assetCategory.indexOf(cate.name) > -1
                        }
                      />
                      <ListItemText primary={cate.name} />
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item lg={3} xs={12}>
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
                  onChange={handleSearch}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </form>
          </Grid>
          <Grid item lg={3} xs={12}>
            <Link
              to={"create"}
              style={{ width: "100%", textDecoration: "none" }}
            >
              <Button
                variant="contained"
                style={{
                  background: "#e30613",
                  borderRadius: "8px",
                  textTransform: "none",
                  width: "100%",
                }}
              >
                Create new asset
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>

      <Box sx={{ height: 480, width: "100%" }}>
        <DataGrid
          rows={assetState.assets.filter((item) => {
            if (
              listAssetState.assetState.length &&
              listAssetState.assetState[0] !== "All" &&
              !listAssetState.assetState.includes(item.state)
            ) {
              return false;
            }
            if (
              listAssetState.assetCategory.length &&
              listAssetState.assetCategory[0] !== "All" &&
              !listAssetState.assetCategory.includes(item.categoryName)
            ) {
              return false;
            }
            if (
              !(
                item.code
                  .toUpperCase()
                  .includes(listAssetState.search.toUpperCase()) ||
                item.name
                  .toUpperCase()
                  .includes(listAssetState.search.toUpperCase())
              )
            ) {
              return false;
            }
            return true;
          })}
          columns={columns}
          pageSize={10}
          disableColumnMenu
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay,
          }}
        ></DataGrid>
      </Box>

      <Modal
        keepMounted
        open={listAssetState.open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px", width: "700px", height: "auto" }}>
          <div
            style={{
              display: "flex",
              borderBottom: "1px solid black",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: '20px'
            }}
          >
            <Title title="Detailed Asset Information" />
            <IconButton onClick={handleClose}>
              <DisabledByDefaultOutlinedIcon
                sx={{ fontSize: 40 }}
                style={{ color: "#e30613" }}
              />
            </IconButton>
          </div>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={3}>Asset Code</Grid>
            <Grid item xs={9}>{listAssetState.assetDetails.code}</Grid>
            <Grid item xs={3}>Asset Name</Grid>
            <Grid item xs={9}>{listAssetState.assetDetails.name}</Grid>
            <Grid item xs={3}>Category</Grid>
            <Grid item xs={9}>{listAssetState.assetDetails.categoryName}</Grid>
            <Grid item xs={3}>Installed Date</Grid>
            <Grid item xs={9}>
              {listAssetState.assetDetails.installedDate
                ? listAssetState.assetDetails.installedDate
                : "N/A"}            
            </Grid>
            <Grid item xs={3}>State</Grid>
            <Grid item xs={9}>{listAssetState.assetDetails.state}</Grid>
            <Grid item xs={3}>Location</Grid>
            <Grid item xs={9}>{listAssetState.assetDetails.location}</Grid>
            <Grid item xs={3}>Specification</Grid>
            <Grid item xs={9} style={{ overflowWrap: "break-word" }}>{listAssetState.assetDetails.specification}</Grid>
            <Grid item xs={3}>History</Grid>
            <Grid item xs={9}>
              <Box
                sx={{
                  height: 200,
                  width: "100%",
                  paddingTop: "20px",
                  paddingLeft: "15px",
                }}
              >
                <DataGrid
                  rows={
                    // []

                    listAssetState.assetDetails.assignments
                      ? listAssetState.assetDetails.assignments
                      : []
                  }
                  getRowId={(r) => r.assignedTo}
                  columns={columnDetail}
                  components={{
                    NoRowsOverlay: NoRowsDetailOverlay,
                  }}
                  hideFooter
                ></DataGrid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <RemoveAsset />
    </div>
  );
}

export default ListAsset;
