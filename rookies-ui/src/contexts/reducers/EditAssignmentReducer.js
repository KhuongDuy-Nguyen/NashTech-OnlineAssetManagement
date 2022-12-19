import { ACTIONS } from "../actions/EditAssignmentAction";

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
    case ACTIONS.SET_ASSIGNMENT:
      state = {
        ...state,
        form: payload
      };
      break;


    case ACTIONS.SET_FIELD_POPUP_ASSET:
      state = { ...state, popupAsset: {
        ...state.popupAsset,
        [payload.name]: payload.value
      }};
      break;
    case ACTIONS.ADD_ASSET_POPUP_ASSET:
      state = { ...state, popupAsset: {
        ...state.popupAsset,
        assets: [payload, ...state.popupAsset.assets.filter(item => item.id != payload.id)]
      }}
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
