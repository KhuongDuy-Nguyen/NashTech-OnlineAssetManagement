import { BreakfastDiningOutlined } from "@mui/icons-material";
import { ACTIONS } from "../actions/RequestReturningAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_LIST_RETURNING:
      state = { ...state, returnings: payload };
      break;
    case ACTIONS.SET_FIELD_CONDITION:
      state = {
        ...state,
        conditions: {
          ...state.conditions,
          [payload.name]: payload.value,
        },
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
    case ACTIONS.SET_FIELD_MODAL_DELETE:
      state = {
        ...state,
        modalDelete: {
          ...state.modalDelete,
          [payload.name]: payload.value,
        },
      };
      break;
    case ACTIONS.SET_FIELD_MODAL_ACCEPT:
      state = {
        ...state,
        modalAccept: {
          ...state.modalAccept,
          [payload.name]: payload.value,
        },
      };
      break;
    case ACTIONS.SET_TICK_ROW_REQUEST:
      state = {
        ...state,
        returnings: state.returnings.map((item) =>
          item.id == payload.id ? payload : item
        ),
      };
      break;
    case ACTIONS.DELETE_RETURN_REQUEST:
      state = {
        ...state,
        returnings: state.returnings.filter((item) => item.id != payload),
      };
      break;
    default:
      break;
  }
  return { ...state };
};

export default reducer;
