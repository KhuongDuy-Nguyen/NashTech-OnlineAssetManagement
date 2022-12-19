import { createContext, useContext, useEffect, useReducer } from "react";

import { utils as XLSXUtils, writeFile } from 'xlsx'

import {
    loadReportAction,
} from "../actions/ReportAction";

import ReportReducer from "../reducers/ReportReducer";
import { AppContext } from "./AppProvider";

export const ReportContext = createContext();

const initState = {
    reports: [],
};

const ReportProvider = (props) => {
    const [reportState, dispatch] = useReducer(
        ReportReducer,
        initState
    );

    useEffect(() => {
    }, [reportState]);
    const { setLoading } = useContext(AppContext);

    useEffect(() => {
        loadData();
    }, []);


    const loadData = async () => {
        setLoading(true);
        await loadReportAction()(dispatch);
        setLoading(false);
    };

    const exportToExcel = (reports) => {
        const fileName = "reports"
        const fileName2 = "report"
        let rows = [...reports];

        rows = rows.map((report) => {
            return {
                'Category': report.cateName,
                'Total': report.total,
                'Assigned': report.assigned,
                'Available': report.available,
                'Not available': report.notAvailable,
                'Waiting for recycling': report.waitingForRecycling,
                'Recycled': report.recycled
            }
        })

        rows.sort((a, b) => {
            const nameA = a.Category.toUpperCase();
            const nameB = b.Category.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });


        const ws = XLSXUtils.json_to_sheet(rows)
        const wb = XLSXUtils.book_new();
        XLSXUtils.book_append_sheet(wb, ws, fileName2);
        // XLSXUtils.sheet_add_aoa(ws, [["Category 1", "Total 1", "Assigned 1", "Available", "Not available", "Waiting for recycling", "Recycled"]], { origin: "A1" });

        // const max_width = data.reduce((w, r) => Math.max(w, r.notAvailable.length), 10);
        // ws["!cols"] = [{ wch: max_width }];
        ws["!cols"] = [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 }];
        ws["!rows"] = [{ hpt: 40 }];
        /* Set worksheet sheet to "wide" */
        // ws["!margins"] = { left: 2.0, right: 2.0, top: 2.0, bottom: 2.0, header: 0.5, footer: 0.5 }
        writeFile(wb, `${fileName}.xlsx`)
    }

    const value = {
        reportState,
        exportToExcel
    };



    return (
        <ReportContext.Provider value={value}>
            {props.children}
        </ReportContext.Provider>
    );
};

export default ReportProvider;
