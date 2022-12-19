import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { validateDate } from "../../utils/Validate";

import {
  addErrorFieldAction,
  loadAssetAction,
  loadAssignmentAction,
  loadUserAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  setFieldPopupAssetAction,
  setFieldPopupUserAction,
  submitAction,
} from "../actions/EditAssignmentAction";
import EditAssignmentReducer from "../reducers/EditAssignmentReducer";
import { AppContext } from "./AppProvider";
import { AssignmentContext } from "./AssignmentProvider";

export const EditAssignmentContext = createContext();
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
    id: null,
    userId: null,
    assetId: null,
    assignedDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
    note: null,
  },
  error: {},
  enableSubmit: false,
};

const EditAssignmentProvider = (props) => {
  const { editAssignment } = useContext(AssignmentContext);
  const { setLoading } = useContext(AppContext);
  const [editAssignmentState, dispatch] = useReducer(
    EditAssignmentReducer,
    initState
  );
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(editAssignmentState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editAssignmentState.error]);

  useEffect(() => {
    console.log(editAssignmentState);
  }, [editAssignmentState]);

  const loadData = async () => {
    setLoading(true);
    await loadUserAction()(dispatch);
    await loadAssetAction()(dispatch);
    await loadAssignmentAction(params.id, navigate)(dispatch);
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
      editAssignmentState.popupAsset.selected
    )(dispatch);
    validate("assetId", editAssignmentState.popupAsset.selected);
  };

  const saveUserId = () => {
    setFieldAction(
      "userId",
      editAssignmentState.popupUser.selected
    )(dispatch);
    validate("userId", editAssignmentState.popupUser.selected);
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
    if(!validateDate(assignedTime)) {
      addErrorFieldAction('assignedDate', '')(dispatch); 
      return ;   
    } else {
      const currentTime = new Date();
      const oneDay=1000*60*60*24
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
    if (editAssignmentState.form.assetId == null) return true;
    if (editAssignmentState.form.userId == null) return true;
    if (
      editAssignmentState.form.assignedDate == null ||
      editAssignmentState.form.assignedDate.trim() == ""
    )
      return true;
    return false;
  };

  const submit = async () => {
    if (editAssignmentState.enableSubmit) {
      setLoading(true);
      await submitAction({...editAssignmentState.form}, navigate, editAssignment)(dispatch);
      setLoading(false);
    }
  };

  const value = {
    editAssignmentState,
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
    <EditAssignmentContext.Provider value={value}>
      {props.children}
    </EditAssignmentContext.Provider>
  );
};

export default EditAssignmentProvider;
