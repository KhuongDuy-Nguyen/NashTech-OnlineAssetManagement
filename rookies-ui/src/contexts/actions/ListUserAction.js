import axios from "axios";
// import * as dotenv from 'dotenv'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_CHECK: "SET_CHECK",
  SET_CHECK2: "SET_CHECK2",
  SET_USER_ROLE: "SET_USER_ROLE",
  SET_OPEN: "SET_OPEN",
  SET_CHECK_ID: "SET_CHECK_ID",
  SET_LIST_USERS: "SET_LIST_USERS",
  SET_USER_DETAIL: "SET_USER_DETAIL",
  SET_SEARCH: "SET_SEARCH",
  SET_LIST_USER: "SET_LIST_USER",
  SET_CHECK_DELETE_USER: "SET_CHECK_DELETE_USER",
  SET_OPEN_DELETE: "SET_OPEN_DELETE",
  SET_DISABLE_USER: "SET_DISABLE_USER",
  // SET_CHECK_ID_DE
};

export const setCheck1Action = (check) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK,
    payload: check,
  });
};
export const setCheck2Action = (check2) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK2,
    payload: check2,
  });
};
export const setUserRoleAction = (userRole) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_USER_ROLE,
    payload: userRole,
  });
};
export const setOpenAction = (open) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_OPEN,
    payload: open,
  });
};
export const setSearchAction = (search) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SEARCH,
    payload: search,
  });
};
export const setCheckIdAction = (checkId) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK_ID,
    payload: checkId,
  });
};
export const setOpenDeleteAction = (openDelete) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_OPEN_DELETE,
    payload: openDelete,
  });
};
export const setCheckDeleteAction = (id) => (dispatch) => {
  axios
    .get(`${API_ENDPOINT}/v1/users/check-assignment?userId=${id}`)
    .then((res) => {
      console.log(res.data);

      dispatch({
        type: ACTIONS.SET_CHECK_DELETE_USER,
        payload: res.data,
      });
      dispatch({
        type: ACTIONS.SET_OPEN_DELETE,
        payload: true,
      });
    });
};
export const setUserDetailAction = (id) => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/users/${id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_USER_DETAIL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const setDisbleUserAction = (id, disableAction) => async (dispatch) => {
  await axios.delete(`${API_ENDPOINT}/v1/users?id=${id}`).then((res) => {
    dispatch({
      type: ACTIONS.SET_DISABLE_USER,
      payload: res.data,
    });
    disableAction(id);
  });
};
