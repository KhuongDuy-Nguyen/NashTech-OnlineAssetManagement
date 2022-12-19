
import { ACTIONS } from "../actions/ReportAction";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.SET_LIST_REPORT:
            const data = payload.map((report, index) => {
                return { ...report, id: index }
            });
            state = { ...state, reports: data };
            break;
        default:
            break;
    }
    return { ...state };
};

export default reducer;
