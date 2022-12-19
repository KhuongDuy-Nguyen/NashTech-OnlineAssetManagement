import {
    Box,
    Button,
    Grid,
    Stack,
} from "@mui/material";
import * as React from "react";
import Title from "../common/title/Title";

import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import CustomPagination from "../common/pagination/CustomPagination";
import { ReportContext } from "../../contexts/providers/ReportProvider";



function ReportNoRowsOverlay() {
    return (
        <Stack height="100%" alignItems="center" justifyContent="center">
            No Report Found
        </Stack>
    );
}

const Report = (props) => {
    const {
        reportState,
        exportToExcel
    } = useContext(ReportContext);

    const columns = [
      {
        field: "cateName",
        minWidth: 150,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Category</h4>
            </strong>
          );
        },
      },
      {
        field: "total",
        minWidth: 120,
        flex: 1.5,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Total</h4>
            </strong>
          );
        },
      },
      {
        field: "assigned",
        minWidth: 150,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Assigned</h4>
            </strong>
          );
        },
      },
      {
        field: "available",
        minWidth: 150,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Available</h4>
            </strong>
          );
        },
      },
      {
        field: "notAvailable",
        minWidth: 150,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Not available</h4>
            </strong>
          );
        },
      },
      {
        field: "waitingForRecycling",
        minWidth: 200,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Waiting for recycling</h4>
            </strong>
          );
        },
      },
      {
        field: "recycled",
        minWidth: 150,
        flex: 2,
        headerAlign: "center",
        align: "center",
        renderHeader: () => {
          return (
            <strong>
              <h4>Recycled</h4>
            </strong>
          );
        },
      },
    ];

    return (
      <>
        <Title title="Report"></Title>

        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            <Button
              onClick={() => exportToExcel(reportState.reports)}
              variant="contained"
              style={{
                background: "#e30613",
                borderRadius: "8px",
                textTransform: "none",
                width: "100px",
              }}
            >
              Export
            </Button>
          </Grid>
        </Grid>

        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        ></div>

        <Box sx={{ height: 500, width: "100%" }}>
          <DataGrid
            initialState={{
              sorting: {
                sortModel: [{ field: "cateName", sort: "asc" }],
              },
            }}
            rows={reportState.reports}
            columns={columns}
            disableColumnMenu
            components={{
              NoRowsOverlay: ReportNoRowsOverlay,
              Pagination: CustomPagination,
            }}
            pageSize={10}
          />
        </Box>
      </>
    );
};

export default Report;
