import axios from "axios";

export const ACTIONS = {
  SET_USERS: "SET_USERS",
  ADD_USER: "ADD_USER",
  EDIT_USER: "EDIT_USER",
  DELETE_USER: "DELETE_USER",
};

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const setUsersAction = () => async (dispatch) => {
  await axios.get(`${API_ENDPOINT}/v1/users`).then((res) => {
    dispatch({
      type: ACTIONS.SET_USERS,
      payload: res.data,
    });
  });
};

export const addUserAction = (user) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_USER,
    payload: user,
  });
};

export const editUserAction = (user) => (dispatch) => {
  dispatch({
    type: ACTIONS.EDIT_USER,
    payload: user,
  });
};
export const setDisbleUserAction = (userId) => async (dispatch) => {
  dispatch({
    type: ACTIONS.DELETE_USER,
    payload: userId,
  });
};
