import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import {
  addErrorFieldAction,
  loadAssetAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  submitAction,
} from "../actions/EditAssetAction";
import EditAssetReducer from "../reducers/EditAssetReducer";
import { AppContext } from "./AppProvider";
import { AssetContext } from "./AssetProvider";

export const EditAssetContext = createContext();

const initState = {
  form: {
    name: null,
    specification: null,
    installedDate: null,
    state: "Available",
    categoryName: null,
  },
  enableSubmit: false,
  error: {},
};

const EditAssetProvider = (props) => {
  const [editAssetState, dispatch] = useReducer(
    EditAssetReducer,
    initState
  );
  const { editAsset } = useContext(AssetContext);
  const { setLoading } = useContext(AppContext);

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    if (Object.keys(editAssetState.error).length > 0 || isBlankField() || editAssetState.form.state == 'Assigned') {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editAssetState.error]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await loadAssetAction(id, navigate)(dispatch);
    setLoading(false);
  }

  const changeField = (e) => {
    const { name, value } = e.target;
    if(name == 'state' && editAssetState.form.state == 'Assigned') return ;
    setFieldAction(name, value)(dispatch);
    validate(name, value);
  };

  const validate = (name, value) => {
    switch(name) {
      case 'installedDate':
        validateInstalledDate(value);
        break;
      default:
        validateDefault(name, value);
        break;
    }
  };

  const validateInstalledDate = (value) => {
    const installedDate = new Date(value);
    if(!validateDate(installedDate)) {
      addErrorFieldAction('installedDate', '')(dispatch); 
      return ;   
    } else {
      const currentDate = new Date();
      if(installedDate > currentDate) {
        addErrorFieldAction('installedDate', 'Select only current or past date for Installed Date')(dispatch);
      } else {
        removeErrorFieldAction('installedDate')(dispatch);
      }  
    }
  }

  const validateDefault = (name, value) => {
    if (value == null || value.trim() == "") addErrorFieldAction(name, `Field ${name} is not blank`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  }


  const isBlankField = () => {
    if (
      editAssetState.form.name == null ||
      editAssetState.form.name.trim() == ""
    )
      return true;

    if (
      editAssetState.form.specification == null ||
      editAssetState.form.specification.trim() == ""
    )
      return true;

    if (
      editAssetState.form.installedDate == null ||
      editAssetState.form.installedDate.trim() == ""
    )
      return true;
  
    if (editAssetState.form.state == null) return true;

    return false;
  };


  const submit = () => {
    if(editAssetState.enableSubmit) {
      setLoading(true);
      submitAction({...editAssetState.form}, navigate, editAsset)(dispatch);
      setLoading(false);
    }
  }

  const value = {
    editAssetState,
    changeField,
    submit,
    navigate
  };

  return (
    <EditAssetContext.Provider value={value}>
      {props.children}
    </EditAssetContext.Provider>
  );
};

export default EditAssetProvider;
