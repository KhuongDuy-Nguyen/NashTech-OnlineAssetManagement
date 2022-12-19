import axios from "axios";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_ENABLE_SUBMIT: "SET_ENABLE_SUBMIT",
  ADD_FIELD_ERROR: "ADD_FIELD_ERROR",
  REMOVE_FIELD_ERROR: "REMOVE_FIELD_ERROR",
  SET_FIELD: "SET_FIELD",
  SET_LOADING: "SET_LOADING",
  SET_MESSAGE: "SET_MESSAGE",
  SET_SUCCESS: "SET_SUCCESS",
  SET_STATUS: "SET_STATUS",
};

export const setEnableSubmitAction = (enable) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable,
  });
};

export const addErrorFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_FIELD_ERROR,
    payload: { name, value },
  });
};

export const removeErrorFieldAction = (name) => (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_FIELD_ERROR,
    payload: name,
  });
};

export const setFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: { name, value },
  });
};

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading,
  });
};

export const setStatusAction = (status) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_STATUS,
    payload: status,
  });
};

export const setMessageAction = (message) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_MESSAGE,
    payload: message,
  });
};

export const setSuccesAction = (success) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_SUCCESS,
    payload: success,
  });
};

export const submitAction = (form, navigate, loadUser) => async (dispatch) => {
      setStatusAction({
        isLoading: false,
        message: "Successful!",
        success: true,
      })(dispatch);
  
  await axios
    .post(`${API_ENDPOINT}/v1/auth/login`, form)
    .then((response) => {
      const { token, username, fullName, role, location, enabled } =
        response.data;
      localStorage["TOKEN"] = token;
      localStorage["username"] = username;
      localStorage["fullName"] = fullName;
      localStorage["role"] = role;
      localStorage["enabled"] = enabled;
      localStorage["location"] = location;

      setStatusAction({
        isLoading: false,
        message: "Successful!",
        success: true,
      })(dispatch);

      navigate("/");
      loadUser();
    })
    .catch((error) => {
      if(error.response == undefined) {
        setStatusAction({
          isLoading: false,
          message: error.message,
          success: false
        })(dispatch)
      } else {
        setStatusAction({
          isLoading: false,
          message: error.response.data.message,
          success: false
        })(dispatch)
      }
    });
};
