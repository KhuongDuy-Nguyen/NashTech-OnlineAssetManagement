import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_LIST_ASSIGNMENT: "SET_LIST_ASSIGNMENT",

  SET_ACCEPT_ASSIGNMENT: "SET_ACCEPT_ASSIGNMENT",
  SET_DECLINE_ASSIGNMENT: "SET_DECLINE_ASSIGNMENT",
  SET_RETURN_REQUEST_ASSIGNMENT: "SET_RETURN_REQUEST_ASSIGNMENT",

  SET_FIELD_DIALOG_RETURN: "SET_FIELD_DIALOG_RETURN",
  SET_FIELD_DIALOG_ACCEPT: "SET_FIELD_DIALOG_ACCEPT",
  SET_FIELD_DIALOG_DECLINE: "SET_FIELD_DIALOG_DECLINE",

  SET_FIELD_MODAL: "SET_FIELD_MODAL",
  SET_ASSIGNMENT_DETAIL: "SET_ASSIGNMENT_DETAIL",
  SET_RETURN_ASSIGNMENT: "SET_RETURN_ASSIGNMENT",
  SET_ASSIGMENT_ID: "SET_ASSIGNMENT_ID",
};

export const loadHomeAction = () => async (dispatch) => {
  // console.log("CALL API ASSIGNMENT");

  await axios.get(`${API_ENDPOINT}/v1/assignments`).then((res) => {
    // console.log(res.data);
    dispatch({
      type: ACTIONS.SET_LIST_ASSIGNMENT,
      payload: res.data,
    });
  }).catch(error => {
    console.log(error)
    dispatch({
      type: ACTIONS.SET_LIST_ASSIGNMENT,
      payload: [],
    });
  });
};

export const detailAssignmentAction = (id) => async (dispatch) => {
  // console.log("CALL API DETAIL ASSIGNMENT");

  await axios
    .get(`${API_ENDPOINT}/v1/assignments/${id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_ASSIGNMENT_DETAIL,
        payload: {
          data: res.data,
          open: true,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setFieldModalAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL,
    payload: { name, value },
  });
};
export const setAssigmentIdAction = (id) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSIGMENT_ID,
    payload: id,
  });
};

export const setFieldDialogAcceptAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_DIALOG_ACCEPT,
    payload: { name, value },
  });
};

export const setFieldDialogDeclineAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_DIALOG_DECLINE,
    payload: { name, value },
  });
};

export const setFieldDialogReturnAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_DIALOG_RETURN,
    payload: { name, value },
  });
};

export const acceptAssignmentAction = (id) => async (dispatch) => {
  console.log("CALL API ACCEPT ASSIGNMENT");
  await axios
    .put(`${API_ENDPOINT}/v1/assignments/accept/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ACTIONS.SET_ACCEPT_ASSIGNMENT,
        payload: {
          data: res.data,
          open: false,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const declineAssignmentAction = (id) => async (dispatch) => {
  console.log("CALL API DECLINE ASSIGNMENT");

  await axios
    .put(`${API_ENDPOINT}/v1/assignments/decline/${id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_DECLINE_ASSIGNMENT,
        payload: {
          data: res.data,
          open: false,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const returnRequestAssignmentAction = (id) => async (dispatch) => {
  console.log("CALL API RETURN REQUEST ASSIGNMENT");
  await axios
    .post(`${API_ENDPOINT}/v1/return-requests/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ACTIONS.SET_RETURN_ASSIGNMENT,
        payload: {
          data: res.data,
          open: false,
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
