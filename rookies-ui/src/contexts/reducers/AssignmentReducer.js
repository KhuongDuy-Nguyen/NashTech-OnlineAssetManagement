import { ACTIONS } from "../actions/AssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSIGNMENT:
      state = { ...state, assignments: [payload, ...state.assignments] };
      break;
    case ACTIONS.EDIT_ASSIGNMENT:
      state = {
        ...state,
        assignments: [
          payload,
          ...state.assignments.filter((item) => item.id != payload.id),
        ],
      };
      state = {
        ...state,
        assignments: [
          payload,
          ...state.assignments.filter((item) => item.id != payload.id),
        ],
      };
      break;
    case ACTIONS.DELETE_ASSIGNMENT:
      state = {
        ...state,
        assignments: state.assignments.filter((item) => item.id != payload),
      };
      break;
    case ACTIONS.SET_LIST_ASSIGNMENT:
      state = { ...state, assignments: payload };
      break;
    case ACTIONS.SET_RETURN_ASSIGNMENT:
      state = { ...state, dialogReturn: payload };
      break;
    case ACTIONS.SET_ASSIGMENT_ID:
      state = { ...state, assignmentId: payload };
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
    case ACTIONS.SET_STATE_ASSIGNMENT_ACTION:
      const assignment = state.assignments.find(
        (item) => item.id == payload.id
      );
      assignment.stateReturnRequest = payload.stateReturnRequest;
      // state = { ...state, assignments: [...state.assignments] };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;
