import { ACTIONS } from "../actions/AssetAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_ASSET:
      const category = state.categories.find(
        (item) => item.name == payload.categoryName
      );
      if (category) {
        state = { ...state, assets: [payload, ...state.assets] };
        break;
      } else {
        state = {
          ...state,
          assets: [payload, ...state.assets],
          categories: [{id: null, name: payload.categoryName, code: null}, ...state.categories],
        };
        break;
      }
    case ACTIONS.EDIT_ASSET:
      const oldAsset = state.assets.find((item) => item.id == payload.id);
      if (oldAsset) {
        payload.category = oldAsset.category;
        state = {
          ...state,
          assets: [
            payload,
            ...state.assets.filter((item) => item.id != payload.id),
          ],
        };
      }
      break;
    case ACTIONS.REMOVE_ASSET:
      state = { ...state, assets: state.assets.filter(item => item.id != payload)};
      break;
    case ACTIONS.LIST_ASSET:
      state = { ...state, assets: payload };
      break;
    case ACTIONS.LIST_CATEGORY:
      state = { ...state, categories: payload };
      break;
    default:
      break;
  }

  return { ...state };
};

export default reducer;
