import axios from 'axios';

import { convertDateByFormat, convertDateByFormatEdit } from "../../utils/DateUtils"

export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',  
  SET_ASSET: 'SET_ASSET',
}
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const loadAssetAction = (id, navigate) => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/assets/${id}`).then(response => {
    if(response.data.installedDate) response.data.installedDate = convertDateByFormatEdit(response.data.installedDate, "yyyy-MM-dd");
    dispatch({
      type: ACTIONS.SET_ASSET,
      payload: response.data
    })
  }).catch(error => {
    console.log(error);
    navigate('/404');
  })
}

export const setFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: {name, value}
  })
}

export const setEnableSubmitAction = (enable) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable
  });
}

export const addErrorFieldAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_FIELD_ERROR,
    payload: {name, value}
  })
}

export const removeErrorFieldAction = (name) => dispatch => {
  dispatch({
    type: ACTIONS.REMOVE_FIELD_ERROR,
    payload: name
  })
}



export const submitAction = (form, navigate, editAssetFunc) => async (dispatch) => {
  form.installedDate = convertDateByFormat(form.installedDate, 'dd/MM/yyyy');

  await axios.put(`${API_ENDPOINT}/v1/assets`, form).then(response => {
    editAssetFunc(response.data);
    navigate('/assets');
  }).catch(error => {
    console.log(error);
  })
}