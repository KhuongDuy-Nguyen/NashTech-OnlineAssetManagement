import axios from "axios";

import { convertDateByFormat } from "../../utils/DateUtils";

export const ACTIONS = {
  SET_FIELD: "SET_FIELD",
  SET_FIELD_CATEGORY: "SET_FIELD_CATEGORY",
  SET_ENABLE_SUBMIT: "SET_ENABLE_SUBMIT",
  REMOVE_FIELD_ERROR: "REMOVE_FIELD_ERROR",
  ADD_FIELD_ERROR: "ADD_FIELD_ERROR",

  SET_CATEGORIES: "SET_CATEGORIES",

  SET_NEW_CATEGORY_FIELD: "SET_NEW_CATEGORY_FIELD",
  ADD_NEW_CATEGORY: "ADD_NEW_CATEGORY",
  REMOVE_FIELD_NEW_CATEGORY_ERROR: "REMOVE_FIELD_NEW_CATEGORY_ERROR",
  ADD_FIELD_NEW_CATEGORY_ERROR: "ADD_FIELD_NEW_CATEGORY_ERROR",
  RESET_NEW_CATEGORY: "RESET_NEW_CATEGORY",

  SET_LOADING: "SET_LOADING",
  SET_MESSAGE: "SET_MESSAGE",
  SET_SUCCESS: "SET_SUCCESS",
  SET_STATUS: "SET_STATUS",
};
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const loadCategoriesAction = () => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/categories`)
    .then((response) => {
      dispatch({
        type: ACTIONS.SET_CATEGORIES,
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

export const setFieldCategoryAction = (code) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD_CATEGORY,
    payload: code,
  });
};

export const setFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: { name, value },
  });
};

export const setEnableSubmitAction = (enable) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable,
  });
};

export const setLoadingAction = (isLoading) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading,
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

export const setNewCategoryFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_NEW_CATEGORY_FIELD,
    payload: { name, value },
  });
};

export const addNewCategoryAction = (name, code) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_NEW_CATEGORY,
    payload: { name, code },
  });
};

export const addNewCategoryErrorFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_FIELD_NEW_CATEGORY_ERROR,
    payload: { name, value },
  });
};

export const removeNewCategoryErrorFieldAction = (name) => (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_FIELD_NEW_CATEGORY_ERROR,
    payload: name,
  });
};

export const resetNewCategoryAction = () => (dispatch) => {
  dispatch({
    type: ACTIONS.RESET_NEW_CATEGORY,
  });
};

export const submitAction =
  (form, navigate, addAssetFunc) => async (dispatch) => {
    setLoadingAction(true)(dispatch);

    form.installedDate = convertDateByFormat(form.installedDate, "dd/MM/yyyy");
    console.log(form);
    await axios
      .post(`${API_ENDPOINT}/v1/assets`, form)
      .then((response) => {
        setStatusAction({
          isLoading: false,
          message: "Successful!",
          success: true,
        })(dispatch);
        addAssetFunc(response.data);
        navigate("/assets");
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

    setLoadingAction(false)(dispatch);
  };
