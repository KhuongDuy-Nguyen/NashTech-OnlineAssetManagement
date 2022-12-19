import { createContext, useContext, useEffect, useReducer } from "react";
import {
  addNewAssignmentAction,
  editAssignmentAction,
  loadAssignmentAction,
  setFieldDialogReturnAction,
  setStateAssignmentAction,
} from "../actions/AssignmentAction";
import AssignmentReducer from "../reducers/AssignmentReducer";
import { deleteAssignmentAction } from "../actions/AssignmentAction";
import { AppContext } from "./AppProvider";

const initState = {
  assignments: [],
  dialogReturn: {
    data: {},
    open: false,
  },
};

export const AssignmentContext = createContext();

const AssignmentProvider = (props) => {
  const [assignmentState, dispatch] = useReducer(AssignmentReducer, initState);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    console.log(assignmentState);
  }, [assignmentState]);

  useEffect(() => {
    loadData();
  }, []);
  const changeStateAssignment = (id, stateReturnRequest) => {
    setStateAssignmentAction(id, stateReturnRequest)(dispatch);
  };
  const loadData = async () => {
    setLoading(true);
    await loadAssignmentAction()(dispatch);
    setLoading(false);
  };

  const addNewAssignment = (assignment) => {
    addNewAssignmentAction(assignment)(dispatch);
  };

  const editAssignment = (assignment) => {
    editAssignmentAction(assignment)(dispatch);
  };
  const changeOpenDialogReturnStatus = (value) => {
    setFieldDialogReturnAction("open", value)(dispatch);
  };

  const deleteAssignment = (assignment) => {
    deleteAssignmentAction(assignment)(dispatch);
  };

  const value = {
    assignmentState,
    addNewAssignment,
    changeOpenDialogReturnStatus,
    changeStateAssignment,

    editAssignment,
    deleteAssignment,
  };
  return (
    <AssignmentContext.Provider value={value}>
      {props.children}
    </AssignmentContext.Provider>
  );
};

export default AssignmentProvider;
