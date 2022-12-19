import { ACTIONS } from "../actions/CreateAssetAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_FIELD:
      state = {
        ...state,
        form: { ...state.form, [payload.name]: payload.value },
      };
      break;
    case ACTIONS.SET_ENABLE_SUBMIT:
      state = { ...state, enableSubmit: payload };
      break;
    case ACTIONS.SET_FIELD_CATEGORY:
      const category = state.categories.find((item) => item.code == payload);
      state = {
        ...state,
        form: {
          ...state.form,
          categoryName: category.name,
          categoryCode: category.code,
        },
      };
      break;
  

    case ACTIONS.REMOVE_FIELD_ERROR:
      delete state.error[payload];
      state = { ...state, error: { ...state.error } };
      break;
    case ACTIONS.ADD_FIELD_ERROR:
      state = {
        ...state,
        error: { ...state.error, [payload.name]: payload.value },
      };
      break;


    case ACTIONS.ADD_NEW_CATEGORY:
      state = {
        ...state,
        categories: [
          ...state.categories,
          { id: null, name: payload.name, code: payload.code },
        ],
      };
      break;


    case ACTIONS.SET_NEW_CATEGORY_FIELD:
      state = {
        ...state,
        newCategory: { ...state.newCategory, [payload.name]: payload.value },
      };
      break;
    case ACTIONS.ADD_FIELD_NEW_CATEGORY_ERROR:
      state = {
        ...state,
        newCategory: {
          ...state.newCategory,
          error: { ...state.newCategory.error, [payload.name]: payload.value }
        }
      };
      break;
    case ACTIONS.REMOVE_FIELD_NEW_CATEGORY_ERROR:
      delete state.newCategory.error[payload];
      state.newCategory.error = {...state.newCategory.error};
      break;
    case ACTIONS.RESET_NEW_CATEGORY:
      state.newCategory = {
        name: null,
        code: null,
    
        isShowInput: false,
        enableSubmit: false,
        error: {}    
      }
      break;
    case ACTIONS.SET_CATEGORIES:
      state = { ...state, categories: payload};
      break;
      

    case ACTIONS.SET_LOADING:
      state = { ...state, status: { ...state.status, isLoading: payload } };
      break;
    case ACTIONS.SET_MESSAGE:
      state = { ...state, status: { ...state.status, message: payload } };
      break;
    case ACTIONS.SET_SUCCESS:
      state = { ...state, status: { ...state.status, success: payload } };
      break;
    case ACTIONS.SET_STATUS:
      state = { ...state, status: payload };
      break;
  
    default:
      break;
  }

  return { ...state };
};

export default reducer;
