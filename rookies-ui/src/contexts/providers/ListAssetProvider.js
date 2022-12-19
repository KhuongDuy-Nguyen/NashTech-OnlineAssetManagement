import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  setAssetStateAction,
  setCheck1Action,
  setCheck2Action,
  setAssetDetailAction,
  setAssetCategories,
  setSearchAction,
  setOpenAction,
  setCheckIdAction,
  handleCloseAction,
  handleRemoveAction,
  handleCheckRemoveAction,
} from "../actions/ListAssetAction";

import ListAssetReducer from "../reducers/ListAssetReducer";
import { AppContext } from "./AppProvider";
import { AssetContext } from "./AssetProvider";

export const ListAssetContext = createContext();

const initState = {
  check: false,
  check2: false,
  assetState: [],
  open: false,
  checkId: "",
  listAssets: [],
  assetDetails: {},
  search: "",
  listCategory: [],
  assetCategory: [],
  listAssetHistory: [],
  removeAssetDialog: {
    title: "",
    content: "",
    hiddenButton: false,
    assetId: 0,
    open: false,
  },
};

const ListAssetProvider = (props) => {
  const { removeAsset } = useContext(AssetContext);
  const [listAssetState, dispatch] = useReducer(ListAssetReducer, initState);

  const handleClose = () => {
    setOpenAction(false)(dispatch);
    handleCloseAction()(dispatch);
  };

  const handleOnCellClick = (id) => {
    setCheckIdAction(id)(dispatch);
    setOpenAction(true)(dispatch);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setAssetCategories(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listAssetState.check)(dispatch);
  };
  const changeState = (event) => {
    const {
      target: { value },
    } = event;

    setAssetStateAction(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listAssetState.check)(dispatch);
  };

  useEffect(() => {
    setAssetStateAction(["Assigned", "Available", "Not available"])(dispatch);
  }, []);

  useEffect(() => {
    if (
      listAssetState.assetState[listAssetState.assetState.length - 1] === "All"
    ) {
      setAssetStateAction(["All"])(dispatch);
    } else if (listAssetState.assetState[0] === "All") {
      listAssetState.assetState.splice(0, 1);
      setAssetStateAction(listAssetState.assetState)(dispatch);
      setCheck2Action(!listAssetState.check2)(dispatch);
    }
  }, [listAssetState.check]);

  useEffect(() => {
    if (
      listAssetState.assetCategory[listAssetState.assetCategory.length - 1] ===
      "All"
    ) {
      setAssetCategories(["All"])(dispatch);
    } else if (listAssetState.assetCategory[0] === "All") {
      listAssetState.assetCategory.splice(0, 1);
      setAssetCategories(listAssetState.assetCategory)(dispatch);
      setCheck2Action(!listAssetState.check2)(dispatch);
    }
  }, [listAssetState.check]);

  const handleSearch = (e) => {
    setSearchAction(e.target.value.toUpperCase())(dispatch);
  };

  useEffect(() => {
    setAssetDetailAction(listAssetState.checkId)(dispatch);
  }, [listAssetState.checkId]);

  // Delete asset
  const handleRemove = () => {
    handleRemoveAction(listAssetState.removeAssetDialog.assetId)(dispatch);
    removeAsset(listAssetState.removeAssetDialog.assetId);
    handleClose();
  };

  const openCheckAssignmentDialog = (id) => {
    handleCheckRemoveAction(id)(dispatch);
  };

  const value = {
    listAssetState,
    handleChange,
    changeState,
    handleSearch,
    handleOnCellClick,
    handleClose,
    handleRemove,
    openCheckAssignmentDialog,
  };

  return (
    <ListAssetContext.Provider value={value}>
      {props.children}
    </ListAssetContext.Provider>
  );
};

export default ListAssetProvider;
