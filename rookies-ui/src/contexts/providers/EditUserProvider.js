import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { changeToSlug } from "../../utils/ConvertString";
import { getAge, isDay, isGreater } from "../../utils/DateUtils";
import * as Validate from "../../utils/Validate";
import {
  addErrorFieldAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  submitAction,
  setUserDetailAction,
} from "../actions/EditUserAction";
import EditUserReducer from "../reducers/EditUserReducer";
import { useParams } from "react-router-dom";
import { UserContext } from "./UserProvider";
import { AppContext } from "./AppProvider";

export const EditUserContext = createContext();
const initState = {
  checkId: "",
  form: {
    dob: null,
    id: "",
    gender: true,
    joinedDate: null,
    role: "ADMIN",
  },
  error: {},
  enableSubmit: false,
};

const EditUserProvider = (props) => {
  let { id } = useParams();
  const { editUser } = useContext(UserContext);
  const { setLoading } = useContext(AppContext);
  const navigate = useNavigate();
  const [editUserState, dispatch] = useReducer(EditUserReducer, initState);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (Object.keys(editUserState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [editUserState.error]);

  const loadData = async () => {
    setLoading(true);
    await setUserDetailAction(id, navigate)(dispatch);
    setLoading(false);
  }

  const changeField = (e) => {
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    value = value.trim();

    switch (name) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "dob":
        validateDob(value);
        break;
      case "joinedDate":
        validateJoinedDate(value);
        break;
      default:
        validateDefault(name, value);
        break;
    }
  };

  const validateDefault = (name, value) => {
    if (value == null || value == '')
      addErrorFieldAction(name, `Field ${name} is not null`)(dispatch);
    else removeErrorFieldAction(name)(dispatch);
  }

  const validateFirstName = (value) => {
    const slug = changeToSlug(value);

    if (!Validate.validateFirstName(slug)) {
      if (value.length > 50) {
        addErrorFieldAction(
          "firstName",
          "First name is incorrect format. Max length is 50"
        )(dispatch);
      } else {
        addErrorFieldAction(
          "firstName",
          "First name is incorrect format"
        )(dispatch);
      }
    } else {
      if (value.length > 50) {
        addErrorFieldAction("firstName", "Max length is 50")(dispatch);
      } else {
        removeErrorFieldAction("firstName")(dispatch);
      }
    }
  };

  const validateLastName = (value) => {
    const slug = changeToSlug(value);

    if (!Validate.validateLastname(slug)) {
      if (value.length > 50) {
        addErrorFieldAction(
          "lastName",
          "Last name is incorrect format. Max length is 50"
        )(dispatch);
      } else {
        addErrorFieldAction(
          "lastName",
          "Last name is incorrect format"
        )(dispatch);
      }
    } else {
      if (value.length > 50) {
        addErrorFieldAction("lastName", "Max length is 50")(dispatch);
      } else {
        removeErrorFieldAction("lastName")(dispatch);
      }
    }
  };

  const validateDob = (value) => {
    if(!Validate.validateDate(new Date(value))) {
      addErrorFieldAction('dob', '')(dispatch);
      return ;   
    } else {
      if (value && getAge(value) < 18) {
        addErrorFieldAction(
          "dob",
          "User is under 18. Please select a different date"
        )(dispatch);
      } else {
        removeErrorFieldAction("dob")(dispatch);
      }
  
      const dob = value;
      const { joinedDate } = editUserState.form;
  
      if (dob && joinedDate) {
        if((isDay(joinedDate, 0) || isDay(joinedDate, 6)) && isGreater(dob, joinedDate)) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is not later than Date of Birth. Please select a different date. Joined date is Saturday or Sunday. Please select a different date. "
          )(dispatch);
          return ;
        }
        
        if(isGreater(dob, joinedDate)) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is not later than Date of Birth. Please select a different date"
          )(dispatch);  
          return ;
        }
  
        if((isDay(joinedDate, 0) || isDay(joinedDate, 6))) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is Saturday or Sunday. Please select a different date"
          )(dispatch);
          return ;        
        }
  
        removeErrorFieldAction('joinedDate')(dispatch);
      }  
    }
  };

  const validateJoinedDate = (value) => {
    if(!Validate.validateDate(new Date(value))) {
      addErrorFieldAction('joinedDate', '')(dispatch); 
      return ;   
    } else {
      const joinedDate = value;
      const { dob } = editUserState.form;
  
      if (dob && joinedDate) {
        if((isDay(joinedDate, 0) || isDay(joinedDate, 6)) && isGreater(dob, joinedDate)) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is not later than Date of Birth. Please select a different date. Joined date is Saturday or Sunday. Please select a different date. "
          )(dispatch);
          return ;
        }
        
        if(isGreater(dob, joinedDate)) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is not later than Date of Birth. Please select a different date"
          )(dispatch);  
          return ;
        }
  
        if((isDay(joinedDate, 0) || isDay(joinedDate, 6))) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is Saturday or Sunday. Please select a different date"
          )(dispatch);
          return ;        
        }
  
      } else {
        if(isDay(joinedDate, 0) || isDay(joinedDate, 6)) {
          addErrorFieldAction(
            "joinedDate",
            "Joined date is Saturday or Sunday. Please select a different date"
          )(dispatch);
  
          return ;
        }      
      }
      removeErrorFieldAction('joinedDate')(dispatch);
      
    }
  };

  const isBlankField = () => {
    if (
      editUserState.form.firstName == null ||
      editUserState.form.firstName.trim() == ""
    )
      return true;
    if (
      editUserState.form.lastName == null ||
      editUserState.form.lastName.trim() == ""
    )
      return true;
    if (
      editUserState.form.dob == null ||
      editUserState.form.dob.trim() == ""
    )
      return true;
    if (
      editUserState.form.joinedDate == null ||
      editUserState.form.joinedDate.trim() == ""
    )
      return true;
    if (editUserState.form.role == null) return true;
    if (editUserState.form.gender == null) return true;
    return false;
  };


  const submit = async () => {
    if (editUserState.enableSubmit) {
      setLoading(true);
      await submitAction({ ...editUserState.form }, navigate, editUser)(dispatch);
      setLoading(false);
    }
  };

  const value = {
    editUserState,
    changeField,
    submit,
    navigate,
  };

  return (
    <EditUserContext.Provider value={value}>
      {props.children}
    </EditUserContext.Provider>
  );
};

export default EditUserProvider;
