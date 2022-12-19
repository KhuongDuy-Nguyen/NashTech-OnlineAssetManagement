import { ACTIONS } from "../actions/CreateAssignmentAction";

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


    case ACTIONS.SET_FIELD_POPUP_ASSET:
      state = { ...state, popupAsset: {
        ...state.popupAsset,
        [payload.name]: payload.value
      }};
      break;
    case ACTIONS.SET_FIELD_POPUP_USER:
      state = { ...state, popupUser: {
        ...state.popupUser,
        [payload.name]: payload.value
      }};
      break;
  
    default:
      break;
  }

  return { ...state };
};

export default reducer;
