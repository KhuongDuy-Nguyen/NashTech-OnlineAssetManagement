import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import {
  addErrorFieldAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  submitAction,
} from "../actions/LoginAction";

import LoginReducer from "../reducers/LoginReducer";
import { AppContext } from "./AppProvider";

const initState = {
  form: {
    username: "",
    password: "",
  },
  error: {},
  enableSubmit: false,

  status: {
    isLoading: false,
    success: true,
    message: "",
  },
};

export const LoginContext = createContext();

const LoginProvider = (props) => {
  const [loginState, dispatch] = useReducer(LoginReducer, initState);
  const navigate = useNavigate();

  const { loadUser, setLoading } = useContext(AppContext);

  useEffect(() => {
    if (Object.keys(loginState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [loginState.error]);

  const changeField = (e) => {
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    if (name == "username") validateUsername(value);
    else if (name == "password") validatePassword(value);
  };

  const validateUsername = (value) => {
    if (value == null || value.trim() == "") {
      addErrorFieldAction("username", "Username field not blank")(dispatch);
    } else {
      removeErrorFieldAction("username")(dispatch);
    }
  };

  const validatePassword = (value) => {
    if (value == null || value.trim() == "") {
      addErrorFieldAction("password", "Password field not blank")(dispatch);
    } else {
      removeErrorFieldAction("password")(dispatch);
    }
  };

  const isBlankField = () => {
    if (
      loginState.form.username == null ||
      loginState.form.username.trim() == ""
    )
      return true;
    if (
      loginState.form.password == null ||
      loginState.form.password.trim() == ""
    )
      return true;
    return false;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loginState.enableSubmit) {
      setLoading(true);
      await submitAction(loginState.form, navigate, loadUser)(dispatch);
      setLoading(false);
    }
  };

  const value = {
    loginState,
    changeField,
    submit,
  };
  return (
    <LoginContext.Provider value={value}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
