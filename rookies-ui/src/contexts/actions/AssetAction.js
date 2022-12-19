import axios from "axios";
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const ACTIONS = {
  ADD_ASSET: "ADD_ASSET",
  EDIT_ASSET: "EDIT_ASSET",
  LIST_ASSET: "LIST_ASSET",
  LIST_CATEGORY: "LIST_CATEGORY",
  REMOVE_ASSET: "REMOVE_ASSET",
};

export const addAssetAction = (asset) => (dispatch) => {
  dispatch({
    type: ACTIONS.ADD_ASSET,
    payload: asset,
  });
};

export const editAssetAction = (asset) => (dispatch) => {
  dispatch({
    type: ACTIONS.EDIT_ASSET,
    payload: asset,
  });
};
export const categoriesListAction = () => async (dispatch) => {
  await axios.get(`${API_ENDPOINT}/v1/categories`).then((res) => {
    dispatch({
      type: ACTIONS.LIST_CATEGORY,
      payload: res.data,
    });
  });
};
export const assetListAction = () => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/assets`)
    .then((res) => {
      dispatch({
        type: ACTIONS.LIST_ASSET,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.data));
};

export const removeAssetAction = (id) => (dispatch) => {
  dispatch({
    type: ACTIONS.REMOVE_ASSET,
    payload: id,
  });
};
