import { Box, Pagination, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useContext } from "react";
import Title from "../common/title/Title";
import ModalDetail from "./ModalDetail";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import ReplayRoundedIcon from "@mui/icons-material/ReplayRounded";
import { HomeContext } from "../../contexts/providers/HomeProvider";
import CloseIcon from "@mui/icons-material/Close";

import {
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";

import AcceptDialog from "./AcceptDialog";
import DeclineDialog from "./DeclineDialog";
import ReturnDialog from "./ReturnDialog";

function NoRowsOverlay() {
  return (
    <Stack height="100%" alignItems="center" justifyContent="center">
      No Assignment have assign to you
    </Stack>
  );
}

const ListAssignment = (props) => {
  const {
    homeState,
    showDetailAssignment,

    // Action
    acceptAssignment,
    declineAssignment,
    returnAssignment,
  } = useContext(HomeContext);

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

  const columns = [
    {
      field: "assetCode",
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
            onClick={() => {
              showDetailAssignment(params.row.id);
            }}
          >
            <p>{params.row.assetCode}</p>
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
      field: "assetName",
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
            onClick={() => showDetailAssignment(params.row.id)}
          >
            <p>{params.row.assetName}</p>
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
            onClick={() => showDetailAssignment(params.row.id)}
          >
            <p>{params.row.categoryName}</p>
          </div>
        );
      },
      type: "string",
      width: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "assignedDate",
      renderHeader: () => {
        return (
          <strong style={{ display: "flex" }}>
            <h4>Assigned Date</h4>
          </strong>
        );
      },
      renderCell: (params) => {
        return (
          <div
            style={{ width: "100%", height: "100%", textAlign: "center" }}
            onClick={() => showDetailAssignment(params.row.id)}
          >
            <p>{params.row.assignedDate}</p>
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
            onClick={() => showDetailAssignment(params.row.id)}
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
      align: "center",
      sortable: false,
      filterable: false,
      headerAlign: "center",
      renderHeader: () => {
        return <h4>Action</h4>;
      },
      renderCell: (params) => {
        if (params.row.state === "Accepted") {
          return (
            <div>
              <GridActionsCellItem
                disabled
                label="Accept"
                icon={<CheckRoundedIcon />}
                style={{ color: "#F6B4B8" }}
              />
              <GridActionsCellItem
                disabled
                label="Decline"
                icon={<CloseIcon style={{ color: "#B1B1B1" }} />}
              />
              {params.row.stateReturnRequest ? (
                <GridActionsCellItem
                  label="Return"
                  disabled
                  // onClick={() => {
                  //   returnAssignment(params.row.id);
                  // }}
                  icon={<ReplayRoundedIcon style={{ color: "#0000ff52" }} />}
                />
              ) : (
                <GridActionsCellItem
                  label="Return"
                  onClick={() => {
                    returnAssignment(params.row.id);
                  }}
                  icon={<ReplayRoundedIcon style={{ color: "blue" }} />}
                />
              )}
            </div>
          );
        } else {
          return (
            <div>
              <GridActionsCellItem
                label="Accept"
                icon={<CheckRoundedIcon style={{ color: "red" }} />}
                onClick={() => {
                  acceptAssignment(params.row.id);
                }}
              />
              <GridActionsCellItem
                label="Decline"
                onClick={() => {
                  declineAssignment(params.row.id);
                }}
                icon={<CloseIcon style={{ color: "black" }} />}
              />
              <GridActionsCellItem
                disabled
                label="Return"
                icon={<ReplayRoundedIcon style={{ color: "#BCBCBC" }} />}
              />
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      <ModalDetail />
      <Title title="My Assignment"></Title>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      ></div>
      <Box sx={{ height: 535, width: "100%" }}>
        <DataGrid
          rows={homeState.listAssignment}
          columns={columns}
          pageSize={10}
          disableColumnMenu
          components={{
            Pagination: CustomPagination,
            NoRowsOverlay,
          }}
        />
      </Box>

      <AcceptDialog />
      <DeclineDialog />
      <ReturnDialog />
    </>
  );
};

export default ListAssignment;
