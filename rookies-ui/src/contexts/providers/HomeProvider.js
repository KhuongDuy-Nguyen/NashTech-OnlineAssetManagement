import { createContext, useContext, useEffect, useReducer } from "react";
import {
  loadHomeAction,
  acceptAssignmentAction,
  declineAssignmentAction,
  returnRequestAssignmentAction,
  setFieldModalAction,
  detailAssignmentAction,
  setFieldDialogAcceptAction,
  setFieldDialogDeclineAction,
  setFieldDialogReturnAction,
  setAssigmentIdAction,
} from "../actions/HomeAction";

import HomeReducer from "../reducers/HomeReducer";
import { AppContext } from "./AppProvider";

export const HomeContext = createContext();

const initState = {
  listAssignment: [],
  assignmentId: {},
  modalDetail: {
    data: {},
    open: false,
  },

  dialogAccept: {
    data: {},
    open: false,
  },

  dialogDecline: {
    data: {},
    open: false,
  },

  dialogReturn: {
    data: {},
    open: false,
  },
};

const HomeAssignmentProvider = (props) => {
  const [homeState, dispatch] = useReducer(HomeReducer, initState);
  const { setLoading } = useContext(AppContext); 

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [homeState.dialogAccept]);

  useEffect(() => {
    loadData();
  }, [homeState.dialogDecline]);

  useEffect(() => {
    loadData();
  }, [homeState.dialogReturn]);

  const loadData = async () => {
    setLoading(true);
    await loadHomeAction()(dispatch);
    setLoading(false);
  };

  const changeOpenModalStatus = (value) => {
    setFieldModalAction("open", value)(dispatch);
  };

  const changeOpenDialogAcceptStatus = (value) => {
    setFieldDialogAcceptAction("open", value)(dispatch);
  };

  const changeOpenDialogDeclineStatus = (value) => {
    setFieldDialogDeclineAction("open", value)(dispatch);
  };

  const changeOpenDialogReturnStatus = (value) => {
    setFieldDialogReturnAction("open", value)(dispatch);
  };

  const showDetailAssignment = (id) => {
    detailAssignmentAction(id)(dispatch);
    changeOpenModalStatus(true);
  };

  const acceptAssignment = (id) => {
    setAssigmentIdAction(id)(dispatch);
    changeOpenDialogAcceptStatus(true);
  };

  const clickAcceptAssignment = (id) => {
    acceptAssignmentAction(id)(dispatch);
    changeOpenDialogAcceptStatus(false);
  };

  const declineAssignment = (id) => {
    setAssigmentIdAction(id)(dispatch);
    changeOpenDialogDeclineStatus(true);
  };

  const clickDeclinedAssignment = (id) => {
    declineAssignmentAction(id)(dispatch);
    changeOpenDialogDeclineStatus(false);
  };

  const returnAssignment = (id) => {
    setAssigmentIdAction(id)(dispatch);
    changeOpenDialogReturnStatus(true);
  };

  const clickReturnAssignment = (id) => {
    returnRequestAssignmentAction(id)(dispatch);
    changeOpenDialogReturnStatus(false);
  };

  const value = {
    homeState,
    acceptAssignment,
    declineAssignment,
    returnAssignment,
    showDetailAssignment,
    changeOpenModalStatus,
    changeOpenDialogAcceptStatus,
    changeOpenDialogDeclineStatus,
    changeOpenDialogReturnStatus,
    clickAcceptAssignment,
    clickDeclinedAssignment,
    clickReturnAssignment,
  };

  return (
    <HomeContext.Provider value={value}>{props.children}</HomeContext.Provider>
  );
};

export default HomeAssignmentProvider;
