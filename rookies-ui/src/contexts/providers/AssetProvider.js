import { createContext, useContext, useEffect, useReducer } from "react";
import {
  addAssetAction,
  editAssetAction,
  assetListAction,
  categoriesListAction,
  removeAssetAction
} from "../actions/AssetAction";
import AssetReducer from "../reducers/AssetReducer";
import { AppContext } from "./AppProvider";

const initState = {
  assets: [],
  categories: [],
};

export const AssetContext = createContext();

const AssetProvider = (props) => {
  const [assetState, dispatch] = useReducer(AssetReducer, initState);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
  }, [assetState]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await assetListAction()(dispatch);
    await categoriesListAction()(dispatch);
    setLoading(false);
  }

  const addAsset = (asset) => {
    addAssetAction(asset)(dispatch);
  };

  const editAsset = (asset) => {
    editAssetAction(asset)(dispatch);
  };

  const removeAsset = (id) => {
    removeAssetAction(id)(dispatch);
  }

  const value = {
    assetState,
    addAsset,
    editAsset,
    removeAsset
  };
  return (
    <AssetContext.Provider value={value}>
      {props.children}
    </AssetContext.Provider>
  );
};

export default AssetProvider;
