import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { validateDate } from "../../utils/Validate";
import {
  addErrorFieldAction,
  addNewCategoryAction,
  addNewCategoryErrorFieldAction,
  loadCategoriesAction,
  removeErrorFieldAction,
  removeNewCategoryErrorFieldAction,
  resetNewCategoryAction,
  setEnableSubmitAction,
  setFieldAction,
  setFieldCategoryAction,
  setLoadingAction,
  setNewCategoryFieldAction,
  submitAction,
} from "../actions/CreateAssetAction";
import CreateAssetReducer from "../reducers/CreateAssetReducer";
import { AppContext } from "./AppProvider";
import { AssetContext } from "./AssetProvider";

export const CreateAssetContext = createContext();

const initState = {
  form: {
    name: null,
    specification: null,
    installedDate: null,
    state: "Available",
    categoryName: null,
    categoryCode: null,
  },
  newCategory: {
    name: null,
    code: null,

    isShowInput: false,
    enableSubmit: false,
    error: {},
  },
  enableSubmit: false,
  error: {},
  categories: [],
};

const CreateAssetProvider = (props) => {
  const [createAssetState, dispatch] = useReducer(
    CreateAssetReducer,
    initState
  );
  const { addAsset } = useContext(AssetContext);
  const { setLoading } = useContext(AppContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(createAssetState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [createAssetState.error]);

  useEffect(() => {
    if (
      Object.keys(createAssetState.newCategory.error).length > 0 ||
      isBlankFieldNewCategory()
    ) {
      setNewCategoryFieldAction("enableSubmit", false)(dispatch);
    } else {
      setNewCategoryFieldAction("enableSubmit", true)(dispatch);
    }
  }, [createAssetState.newCategory.error]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoadingAction(true)(dispatch);
    await loadCategoriesAction()(dispatch);
    setLoadingAction(false)(dispatch);
  }

  const changeField = (e) => {
    const { name, value } = e.target;
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

  const changeCategoryField = (code) => {
    if (code == null || code.trim() == "") addErrorFieldAction('code', `Field category is not blank`)(dispatch);
    else removeErrorFieldAction('code')(dispatch);
    setFieldCategoryAction(code)(dispatch);    
    closeNewCategoryField();
  };

  const changeNewCategoryField = (e) => {
    const { name, value } = e.target;
    setNewCategoryFieldAction(name, value)(dispatch);
    validateFieldNewCategory(name, value);
  };

  const openNewCategoryField = () => {
    setNewCategoryFieldAction("isShowInput", true)(dispatch);
  };

  const closeNewCategoryField = () => {
    resetNewCategoryAction()(dispatch);
  };

  const addNewCategory = () => {
    addNewCategoryAction(
      createAssetState.newCategory.name,
      createAssetState.newCategory.code
    )(dispatch);
    closeNewCategoryField();
  };

  const validateFieldNewCategory = (name, value) => {
    switch (name) {
      case "name":
        validateNewCategoryName(value);
        break;
      case "code":
        validateNewCategoryCode(value);
        break;
      default:
        break;
    }
  };

  const validateNewCategoryName = (value) => {
    const category = createAssetState.categories.find(
      (item) => item.name == value
    );
    if (category) {
      addNewCategoryErrorFieldAction(
        "name",
        "Category is already existed. Please enter a different category"
      )(dispatch);
    } else {
      removeNewCategoryErrorFieldAction("name")(dispatch);
    }
  };

  const validateNewCategoryCode = (value) => {
    const category = createAssetState.categories.find(
      (item) => item.code == value
    );
    if (category) {
      addNewCategoryErrorFieldAction(
        "code",
        "Prefix is already existed. Please enter a different prefix"
      )(dispatch);
    } else {
      removeNewCategoryErrorFieldAction("code")(dispatch);
    }
  };

  const isBlankField = () => {
    if (
      createAssetState.form.name == null ||
      createAssetState.form.name.trim() == ""
    )
      return true;

    if (
      createAssetState.form.specification == null ||
      createAssetState.form.specification.trim() == ""
    )
      return true;

    if (
      createAssetState.form.installedDate == null ||
      createAssetState.form.installedDate.trim() == ""
    )
      return true;

    if (
      createAssetState.form.categoryName == null ||
      createAssetState.form.categoryName.trim() == ""
    )
      return true;
  
    if (
      createAssetState.form.categoryCode == null ||
      createAssetState.form.categoryCode.trim() == ""
    )
      return true;

    if (createAssetState.form.state == null) return true;

    return false;
  };

  const isBlankFieldNewCategory = () => {
    if (
      createAssetState.newCategory.name == null ||
      createAssetState.newCategory.name.trim() == ""
    )
      return true;

    if (
      createAssetState.newCategory.code == null ||
      createAssetState.newCategory.code.trim() == ""
    )
      return true;

    return false;
  };

  const submit = async () => {
    if(createAssetState.enableSubmit) {
      setLoading(true);
      await submitAction({...createAssetState.form}, navigate, addAsset)(dispatch);
      setLoading(false);
    }
  }

  const value = {
    createAssetState,
    changeField,
    changeNewCategoryField,
    openNewCategoryField,
    closeNewCategoryField,
    addNewCategory,
    changeCategoryField,
    submit,
    navigate
  };

  return (
    <CreateAssetContext.Provider value={value}>
      {props.children}
    </CreateAssetContext.Provider>
  );
};

export default CreateAssetProvider;
