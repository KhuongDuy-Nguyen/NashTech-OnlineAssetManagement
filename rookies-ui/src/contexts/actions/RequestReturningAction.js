import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_FIELD_CONDITION: "SET_FIELD_CONDITION",
  SET_FIELD_MODAL: "SET_FIELD_MODAL",
  SET_LIST_RETURNING: "SET_LIST_RETURNING",
  SET_FIELD_MODAL_DELETE: "SET_FIELD_MODAL_DELETE",
  SET_FIELD_MODAL_ACCEPT: "SET_FIELD_MODAL_ACCEPT",
  SET_TICK_ROW_REQUEST: "SET_ROW_REQUEST",
  DELETE_RETURN_REQUEST: "DELETE_RETURN_REQUEST",

  SET_LOADING: "SET_LOADING",
  SET_MESSAGE: "SET_MESSAGE",
  SET_SUCCESS: "SET_SUCCESS",
  SET_STATUS: "SET_STATUS",
};

export const setFieldConditionAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_CONDITION,
    payload: { name, value },
  });
};

export const setFieldModalAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL,
    payload: { name, value },
  });
};

export const loadReturningAction = () => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/return-requests`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_LIST_RETURNING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.data));
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

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading,
  });
};

export const setFieldModalDelete = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL_DELETE,
    payload: { name, value },
  });
};

export const submitAction = (form) => async (dispatch) => {
  setLoadingAction(true)(dispatch);
  await axios
    .delete(`${API_ENDPOINT}/v1/return-requests`, { params: { id: form.id } })
    .then((response) => {
      setStatusAction({
        isLoading: false,
        message: "Successful!",
        success: true,
      })(dispatch);
      dispatch({
        type: ACTIONS.DELETE_RETURN_REQUEST,
        payload: form.id,
      });
    })
    .catch((error) => {
      if (error.response == undefined) {
        setStatusAction({
          isLoading: false,
          message: error.message,
          success: false,
        })(dispatch);
      } else {
        setStatusAction({
          isLoading: false,
          message: error.response.data,
          success: false,
        })(dispatch);
      }
    });
};

export const setFieldModalAccept = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_MODAL_ACCEPT,
    payload: { name, value },
  });
};

export const acceptAction = (form) => async (dispatch) => {
  setLoadingAction(true)(dispatch);
  await axios
    .post(
      `${API_ENDPOINT}/v1/return-requests`,
      { id: form.id },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then((response) => {
      setStatusAction({
        isLoading: false,
        message: "Successful!",
        success: true,
      })(dispatch);
      dispatch({
        type: ACTIONS.SET_TICK_ROW_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      if (error.response == undefined) {
        setStatusAction({
          isLoading: false,
          message: error.message,
          success: false,
        })(dispatch);
      } else {
        setStatusAction({
          isLoading: false,
          message: error.response.data,
          success: false,
        })(dispatch);
      }
    });
};
