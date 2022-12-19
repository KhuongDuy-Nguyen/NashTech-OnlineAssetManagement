import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import {
  addErrorFieldAction,
  loadAssetAction,
  loadUserAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  setFieldPopupAssetAction,
  setFieldPopupUserAction,
  setLoadingAction,
  submitAction,
} from "../actions/CreateAssignmentAction";
import CreateAssignmentReducer from "../reducers/CreateAssignmentReducer";
import { AppContext } from "./AppProvider";
import { AssignmentContext } from "./AssignmentProvider";

export const CreateAssignmentContext = createContext();
const now = new Date();
const initState = {
  popupAsset: {
    assets: [],
    search: "",
    selected: null,
  },
  popupUser: {
    users: [],
    search: "",
    selected: null,
  },
  form: {
    userId: null,
    assetId: null,
    assignedDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    note: null,
  },
  error: {},
  enableSubmit: false,
};

const CreateAssignmentProvider = (props) => {
  const { addNewAssignment } = useContext(AssignmentContext);
  const { setLoading } = useContext(AppContext);
  const [createAssignmentState, dispatch] = useReducer(
    CreateAssignmentReducer,
    initState
  );
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(createAssignmentState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [createAssignmentState.error]);

  const loadData = async () => {
    setLoading(true);
    await loadUserAction()(dispatch);
    await loadAssetAction()(dispatch);
    setLoading(false);
  };

  const changeSelectUser = (userId) => {
    setFieldPopupUserAction("selected", userId)(dispatch);
  };

  const changeSearchUser = (searchStr) => {
    setFieldPopupUserAction("search", searchStr)(dispatch);
  };

  const changeSelectAsset = (assetId) => {
    setFieldPopupAssetAction("selected", assetId)(dispatch);
  };

  const changeSearchAsset = (searchStr) => {
    setFieldPopupAssetAction("search", searchStr)(dispatch);
  };

  const saveAssetId = () => {
    setFieldAction(
      "assetId",
      createAssignmentState.popupAsset.selected
    )(dispatch);
    validate("assetId", createAssignmentState.popupAsset.selected);
  };

  const saveUserId = () => {
    setFieldAction(
      "userId",
      createAssignmentState.popupUser.selected
    )(dispatch);
    validate("userId", createAssignmentState.popupUser.selected);
  };

  const changeField = (e) => {
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    validate(name, value);
  };

  const validate = (name, value) => {
    if (name == "assignedDate") validateAssignedTime(value);
    else {
      if (name != "note") {
        validateDefault(name, value);
      } else {
        removeErrorFieldAction(name)(dispatch);
      }
    }
  };

  const validateDefault = (name, value) => {
    if (value == null)
      addErrorFieldAction(name, `Field ${name} is not null`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  };

  const validateAssignedTime = (value) => {
    const assignedTime = new Date(value);
    if(!validateDate
    (assignedTime)) {
      addErrorFieldAction('assignedDate', '')(dispatch); 
      return ;   
    } else {
      const currentTime = new Date();
      const oneDay=1000*60*60*24;
      const diff = Math.ceil((currentTime.getTime()-assignedTime.getTime())/oneDay)
      if (diff > 1) {
        addErrorFieldAction(
          "assignedDate",
          "Select only current or future date for Assigned Date"
        )(dispatch);
      } else {
        removeErrorFieldAction("assignedDate")(dispatch);
      }
      
    }
  };

  const isBlankField = () => {
    if (createAssignmentState.form.assetId == null) return true;
    if (createAssignmentState.form.userId == null) return true;
    if (
      createAssignmentState.form.assignedDate == null ||
      createAssignmentState.form.assignedDate.trim() == ""
    )
      return true;
    return false;
  };

  const submit = async () => {
    if (createAssignmentState.enableSubmit) {
      setLoading(true);
      await submitAction({...createAssignmentState.form}, navigate, addNewAssignment)(dispatch);
      setLoading(false);
    }
  };

  const value = {
    createAssignmentState,
    changeSelectUser,
    changeSearchUser,
    changeSelectAsset,
    changeSearchAsset,
    changeField,
    saveAssetId,
    saveUserId,
    submit,
    navigate,
  };

  return (
    <CreateAssignmentContext.Provider value={value}>
      {props.children}
    </CreateAssignmentContext.Provider>
  );
};

export default CreateAssignmentProvider;
