import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
    SET_LIST_REPORT: "SET_LIST_REPORT",
    SET_LOADING: "SET_LOADING",
};

export const loadReportAction = () => async (dispatch) => {
    await axios
        .get(`${API_ENDPOINT}/v1/assets/report`)
        .then((res) => {
            dispatch({
                type: ACTIONS.SET_LIST_REPORT,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type: ACTIONS.SET_LIST_REPORT,
                payload: [],
            });
        }
        );

    // const rows = [];

    // await setTimeout(() => {
    //     for (var i = 0; i < 30; i++) {
    //         rows.push({
    //             id: i + 1,
    //             categoryName: "Category " + i,
    //             total: 1000 + i,
    //             assigned: 100 + i,
    //             avalable: 100 + i + 2,
    //             notAvailable: 100 * i,
    //             waitingForRecycling: 100,
    //             recycled: 200
    //         })
    //     }
    //     dispatch({
    //         type: ACTIONS.SET_LIST_RETURNING,
    //         payload: rows,
    //     });
    // }, 1000)
};

export const setLoadingAction = (isLoading) => (dispatch) => {
    dispatch({
        type: ACTIONS.SET_LOADING,
        payload: isLoading,
    });
};

