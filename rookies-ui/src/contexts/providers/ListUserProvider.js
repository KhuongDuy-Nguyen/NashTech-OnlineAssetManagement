import { createContext, useContext, useReducer } from "react";
import { useEffect } from "react";
import {
  setCheck1Action,
  setCheck2Action,
  setUserRoleAction,
  setOpenAction,
  setCheckIdAction,
  setUserDetailAction,
  setSearchAction,
  setCheckDeleteAction,
  setOpenDeleteAction,
  setDisbleUserAction,
} from "../actions/ListUserAction";
import ListUserReducer from "../reducers/ListUserReducer";
import { UserContext } from "./UserProvider";
export const ListUserContext = createContext();

const initState = {
  check: false,
  check2: false,
  userRole: [],
  open: false,
  checkId: "",
  listUser: [],
  userDetail: [],
  search: "",
  checkDelete: "",
  openDelete: false,
  messageDelete: "",
};

const ListUserProvider = (props) => {
  const [listUserState, dispatch] = useReducer(ListUserReducer, initState);
  const { deleUser } = useContext(UserContext);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUserRoleAction(typeof value === "string" ? value.split(",") : value)(
      dispatch
    );
    setCheck1Action(!listUserState.check)(dispatch);
  };

  useEffect(() => {}, [listUserState]);

  useEffect(() => {
    if (listUserState.userRole[listUserState.userRole.length - 1] === "ALL") {
      setUserRoleAction(["ALL"])(dispatch);
    } else if (listUserState.userRole[0] === "ALL") {
      listUserState.userRole.splice(0, 1);
      setUserRoleAction(listUserState.userRole)(dispatch);
      setCheck2Action(!listUserState.check2)(dispatch);
    }
  }, [listUserState.check]);

  useEffect(() => {}, [listUserState.check2]);

  useEffect(() => {
    setUserDetailAction(listUserState.checkId)(dispatch);
  }, [listUserState.checkId]);

  const handleOnCellClick = (id) => {
    setCheckIdAction(id)(dispatch);
    setOpenAction(true)(dispatch);
  };
  const handleOnCellClickEdit = (params) => {
    setCheckIdAction(params.id)(dispatch);
  };
  const hanldeClickDelete = (id) => {
    setCheckDeleteAction(id)(dispatch);
    setCheckIdAction(id)(dispatch);
  };
  const handleCloseDelete = () => {
    setOpenDeleteAction(false)(dispatch);
  };
  const disableUser = (id) => {
    setDisbleUserAction(id, deleUser)(dispatch);
    setOpenDeleteAction(false)(dispatch);
  };
  useEffect(() => {
    setOpenAction(false)(dispatch);
  }, [listUserState.openDelete]);
  const handleSearch = (e) => {
    setSearchAction(e.target.value.toUpperCase())(dispatch);
  };

  const handleClose = () => {
    setOpenAction(false)(dispatch);
  };

  const value = {
    listUserState,
    handleChange,
    handleOnCellClick,
    handleClose,
    handleSearch,
    handleOnCellClickEdit,
    hanldeClickDelete,
    handleCloseDelete,
    disableUser,
  };

  return (
    <ListUserContext.Provider value={value}>
      {props.children}
    </ListUserContext.Provider>
  );
};

export default ListUserProvider;
