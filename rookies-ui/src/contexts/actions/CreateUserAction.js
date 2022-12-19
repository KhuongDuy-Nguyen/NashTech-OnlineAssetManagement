import axios from 'axios';
import { convertDateByFormat } from '../../utils/DateUtils';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',
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

export const submitAction = (form, navigate, addUserFunc) => async (dispatch) => { 
  form.dob = convertDateByFormat(form.dob, 'dd/MM/yyyy');
  form.joinedDate = convertDateByFormat(form.joinedDate, 'dd/MM/yyyy');

  await axios.post(`${API_ENDPOINT}/v1/users`, form).then(response => {
    addUserFunc(response.data);
    navigate('/users');
  }).catch(error => {
    console.log(error);
  })

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