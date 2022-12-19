import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import {
  loadDetailAssignmentAction,
} from "../actions/AssignmentAction";
import {
  setFieldConditionAction,
  setFieldModalAction,
  setAssigmentIdAction,
  setFieldDialogReturnAction,
  returnRequestAssignmentAction,
} from "../actions/ListAssignmentAction";
import {
  setFieldModalDelete,
  submitAction,
} from "../actions/ListAssignmentAction";

import ListAssignmentReducer from "../reducers/ListAssignmentReducer";
import { AppContext } from "./AppProvider";
import { AssignmentContext } from "./AssignmentProvider";

export const ListAssignmentContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    assignedDate: null,
    search: "",
  },
  modalDetail: {
    open: false,
    data: {},
  },
  dialogReturn: {
    data: {},
    open: false,
  },
  modalDelete: {
    open: false,
    id: null,
  },
};

const ListAssignmentProvider = (props) => {
  const [listAssignmentState, dispatch] = useReducer(
    ListAssignmentReducer,
    initState
  );
  const { assignmentState, changeStateAssignment, deleteAssignment } =
    useContext(AssignmentContext);
  const { setLoading } = useContext(AppContext);
  const navigate = useNavigate();

  const changeDeleteId = (value) => {
    setFieldModalDelete("id", value)(dispatch);
  };

  const changeOpenDelete = (value) => {
    setFieldModalDelete("open", value)(dispatch);
  };

  const changeTypeCondition = (value) => {
    let states = [];
    if (
      value.length == 0 ||
      (value.includes("All") &&
        !listAssignmentState.conditions.states.includes("All"))
    )
      states = ["All"];
    else states = value.filter((item) => item != "All");
    setFieldConditionAction("states", states)(dispatch);
  };

  const changeDateCondition = (value) => {
    setFieldConditionAction("assignedDate", value)(dispatch);
  };

  const changeSearchCondition = (value) => {
    setFieldConditionAction("search", value)(dispatch);
  };

  const changeOpenModalStatus = (value) => {
    setFieldModalAction("open", value)(dispatch);
  };

  const changeOpenDialogReturnStatus = (value) => {
    setFieldDialogReturnAction("open", value)(dispatch);
  };
  const returnAssignment = (id) => {
    setAssigmentIdAction(id)(dispatch);
    changeOpenDialogReturnStatus(true);
  };

  const clickReturnAssignment = (id) => {
    returnRequestAssignmentAction(id, changeStateAssignment)(dispatch);
    changeOpenDialogReturnStatus(false);
  };

  const showDetailAssignment = async (id) => {
    setLoading(true);
    await loadDetailAssignmentAction(id)(dispatch);
    setLoading(false);
  };

  const deleteSubmit = async () => {
    setLoading(true);
    await submitAction(
      { ...listAssignmentState.modalDelete },
      navigate,
      deleteAssignment
    )(dispatch);
    changeOpenDelete(false);
    setLoading(false);
  };

  const value = {
    listAssignmentState,
    assignmentState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeOpenModalStatus,
    showDetailAssignment,
    returnAssignment,
    changeOpenDialogReturnStatus,
    clickReturnAssignment,
    navigate,
    changeOpenDelete,
    changeDeleteId,
    deleteSubmit,
  };

  return (
    <ListAssignmentContext.Provider value={value}>
      {props.children}
    </ListAssignmentContext.Provider>
  );
};

export default ListAssignmentProvider;
