import { ACTIONS } from "../actions/HomeAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_LIST_ASSIGNMENT:
      state = { ...state, listAssignment: payload };
      break;

    case ACTIONS.SET_ACCEPT_ASSIGNMENT:
      state = { ...state, dialogAccept: payload };
      break;

    case ACTIONS.SET_ASSIGMENT_ID:
      state = { ...state, assignmentId: payload };
      break;

    case ACTIONS.SET_DECLINE_ASSIGNMENT:
      state = { ...state, dialogDecline: payload };
      break;

    case ACTIONS.SET_RETURN_ASSIGNMENT:
      state = { ...state, dialogReturn: payload };
      break;

    case ACTIONS.SET_ASSIGNMENT_DETAIL:
      state = { ...state, modalDetail: payload };
      break;

    case ACTIONS.SET_FIELD_MODAL:
      state = {
        ...state,
        modalDetail: {
          ...state.modalDetail,
          [payload.name]: payload.value,
        },
      };
      break;

    case ACTIONS.SET_FIELD_DIALOG_ACCEPT:
      state = {
        ...state,
        dialogAccept: {
          ...state.dialogAccept,
          [payload.name]: payload.value,
        },
      };
      break;

    case ACTIONS.SET_FIELD_DIALOG_DECLINE:
      state = {
        ...state,
        dialogDecline: {
          ...state.dialogDecline,
          [payload.name]: payload.value,
        },
      };
      break;

    case ACTIONS.SET_FIELD_DIALOG_RETURN:
      state = {
        ...state,
        dialogReturn: {
          ...state.dialogReturn,
          [payload.name]: payload.value,
        },
      };
      break;

    default:
      break;
  }
  return { ...state };
};

export default reducer;
