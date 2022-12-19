import axios from "axios";
// import * as dotenv from 'dotenv'
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const ACTIONS = {
  SET_CHECK: "SET_CHECK",
  SET_CHECK2: "SET_CHECK2",
  SET_ASSET_STATE: "SET_ASSET_STATE",
  SET_OPEN: "SET_OPEN",
  SET_CHECK_ID: "SET_CHECK_ID",
  // SET_LIST_ASSETS: "SET_LIST_ASSETS",
  SET_ASSET_DETAIL: "SET_ASSET_DETAIL",
  SET_SEARCH: "SET_SEARCH",
  SET_ASSET_CATE: "SET_ASSET_CATE",
  // SET_LIST_CATE: "SET_LIST_CATE",
  SET_OPEN_DELETE: "SET_OPEN_DELETE",
  SET_LIST_ASSET_HISTORY: "SET_LIST_ASSET_HISTORY",

  RESET_REMOVE_DIALOG: "RESET_REMOVE_DIALOG",
  SET_FIELD_REMOVE_ASSET_DIALOG: "SET_FIELD_REMOVE_ASSET_DIALOG",
  SET_REMOVE_ASSET_DIALOG: "SET_REMOVE_ASSET_DIALOG",
};

export const setCheck1Action = (check) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK,
    payload: check,
  });
};
export const setAssetCategories = (assetCategory) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSET_CATE,
    payload: assetCategory,
  });
};
export const setCheck2Action = (check2) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_CHECK2,
    payload: check2,
  });
};
export const setAssetStateAction = (assetState) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ASSET_STATE,
    payload: assetState,
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

export const setAssetDetailAction = (id) => async (dispatch) => {
  await axios
    .get(`${API_ENDPOINT}/v1/assets/${id}`)
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_ASSET_DETAIL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleCloseAction = () => (dispatch) => {
  dispatch({
    type: ACTIONS.RESET_REMOVE_DIALOG,
  });
};

export const setRemoveAssetDialogAction = (removeAssetDialog) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_REMOVE_ASSET_DIALOG,
    payload: removeAssetDialog,
  });
};

export const handleCheckRemoveAction = (id) => (dispatch) => {
  axios
    .delete(`${API_ENDPOINT}/v1/assets/checkHasExistAssignment`, { params: { id: id } })
    .then((res) => {
      console.log(res.data);
      if (res.data === true) {
        setRemoveAssetDialogAction({
          title: "Cannot Delete Asset",
          content:
            "Cannot delete the asset because it belongs to one or more historical assignments. If the asset is not able to be used anymore, please update its state in <a href=/assets/edit/" +
            id +
            "> Edit Asset page </a>",
          hiddenButton: true,
          assetId: id,
          open: true,
        })(dispatch);
      }
      else{
        setRemoveAssetDialogAction({
          title: "Are you sure?",
          content:"Do you want to delete this asset?",
          hiddenButton: false,
          assetId: id,
          open: true,
        })(dispatch);
      }
    })
    .catch((err) => {
      console.log(err);
      setRemoveAssetDialogAction({
        title: "Cannot Delete Asset",
        content: err.response.data.message,
        hiddenButton: true,
        assetId: id,
        open: true,
      })(dispatch);
    });
};

export const handleRemoveAction = (id) => (dispatch) => {
  axios
    .delete(`${API_ENDPOINT}/v1/assets`, { params: { id: id } })
    .then((res) => {
      console.log(res.data);
      // setOpenAction(false)(dispatch);
    })
    .catch((err) => {
      console.log(err);
      setRemoveAssetDialogAction({
        title: "Cannot Delete Asset",
        content: err.response.data.message,
        hiddenButton: true,
        assetId: id,
        open: true,
      })(dispatch);
    });
};