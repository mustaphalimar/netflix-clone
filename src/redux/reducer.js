import { SET_USER } from "./actions";
const initialState = {
  user: null,
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload.user };

    default:
      return state;
  }
};

export default reducer;
