import { createContext, useContext, useEffect, useReducer } from "react";
import { validateDate } from "../../utils/Validate";
import {
  loadReturningAction,
  setFieldConditionAction,
  setLoadingAction,
  setFieldModalDelete,
  submitAction,
  setFieldModalAccept,
  acceptAction,
} from "../actions/RequestReturningAction";

import RequestReturningReducer from "../reducers/RequestReturningReducer";
import { AppContext } from "./AppProvider";

export const RequestReturningContext = createContext();

const initState = {
  conditions: {
    states: ["All"],
    returnedDate: null,
    search: "",
  },
  modalDelete: {
    open: false,
    id: null,
  },
  modalAccept: {
    open: false,
    id: null,
  },
  returnings: [],
};

const RequestReturningProvider = (props) => {
  const [requestReturningState, dispatch] = useReducer(
    RequestReturningReducer,
    initState
  );

  useEffect(() => {
    console.log(requestReturningState);
  }, [requestReturningState]);
  const { setLoading } = useContext(AppContext);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await loadReturningAction()(dispatch);
    setLoading(false);
  }

  const changeTypeCondition = (value) => {
    let states = [];
    if (
      value.length == 0 ||
      (value.includes("All") &&
        !requestReturningState.conditions.states.includes("All"))
    )
      states = ["All"];
    else states = value.filter((item) => item != "All");
    setFieldConditionAction("states", states)(dispatch);
  };

  const changeDateCondition = (value) => {
    setFieldConditionAction("returnedDate", value)(dispatch);
  };

  const changeSearchCondition = (value) => {
    setFieldConditionAction("search", value)(dispatch);
  };

  const changeDeleteId = (value) => {
    setFieldModalDelete("id", value)(dispatch);
  };

  const changeOpenDelete = (value) => {
    setFieldModalDelete("open", value)(dispatch);
  };

  const deleteSubmit = () => {
    submitAction({ ...requestReturningState.modalDelete })(dispatch);
    changeOpenDelete(false);
  };

  const changeAcceptId = (value) => {
    setFieldModalAccept("id", value)(dispatch);
  };

  const changeOpenAccept = (value) => {
    setFieldModalAccept("open", value)(dispatch);
  };

  const acceptSubmit = () => {
    acceptAction({ ...requestReturningState.modalAccept })(dispatch);
    changeOpenAccept(false);
  };

  const value = {
    requestReturningState,
    changeTypeCondition,
    changeDateCondition,
    changeSearchCondition,
    changeDeleteId,
    changeOpenDelete,
    deleteSubmit,
    changeAcceptId,
    changeOpenAccept,
    acceptSubmit,
  };

  return (
    <RequestReturningContext.Provider value={value}>
      {props.children}
    </RequestReturningContext.Provider>
  );
};

export default RequestReturningProvider;
