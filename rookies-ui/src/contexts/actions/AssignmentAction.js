import axios from "axios";
import { setFieldModalAction } from "./ListAssignmentAction";

export const ACTIONS = {
  ADD_ASSIGNMENT: "ADD_ASSIGNMENT",
  EDIT_ASSIGNMENT: "EDIT_ASSIGNMENT",
  DELETE_ASSIGNMENT: "DELETE_ASSIGNMENT",
  SET_LIST_ASSIGNMENT: "SET_LIST_ASSIGNMENT",

  RETURN_ASSET: "RETURN_REQUEST",
  SET_RETURN_ASSIGNMENT: "SET_RETURN_ASSIGNMENT",
  SET_ASSIGMENT_ID: "SET_ASSIGNMENT_ID",
  SET_FIELD_DIALOG_RETURN: "SET_FIELD_DIALOG_RETURN",
  SET_STATE_ASSIGNMENT_ACTION: "SET_STATE_ASSIGNMENT_ACTION",
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const deleteAssignmentAction = (assignment) => (dispatch) => {
  dispatch({
    type: ACTIONS.DELETE_ASSIGNMENT,
    payload: assignment,
  });
};

export const addNewAssignmentAction = (assignment) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_ASSIGNMENT,
    payload: assignment,
  });
};

export const editAssignmentAction = (assignment) => (dispatch) => {
  dispatch({
    type: ACTIONS.EDIT_ASSIGNMENT,
    payload: assignment,
  });
};
export const returnRequestAssignmentAction = (id) => async (dispatch) => {
  // console.log("CALL API RETURN REQUEST ASSIGNMENT");
  dispatch({
    type: ACTIONS.SET_STATE_ASSIGNMENT_ACTION,
    payload: { id, stateReturnRequest: true },
  });
};
export const setFieldDialogReturnAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_DIALOG_RETURN,
    payload: { name, value },
  });
};
export const setAssigmentIdAction = (id) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSIGMENT_ID,
    payload: id,
  });
};
export const loadAssignmentAction = () => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/assignments/admin`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_LIST_ASSIGNMENT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.data));
};

export const loadDetailAssignmentAction = (id) => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/assignments/${id}`)
    .then((res) => {
      setFieldModalAction("data", res.data)(dispatch);
      setFieldModalAction("open", true)(dispatch);
    })
    .catch((err) => console.log(err.data));
};

export const setStateAssignmentAction =
  (id, stateReturnRequest) => (dispatch) => {
    dispatch({
      type: ACTIONS.SET_STATE_ASSIGNMENT_ACTION,
      payload: { id, stateReturnRequest },
    });
  };
