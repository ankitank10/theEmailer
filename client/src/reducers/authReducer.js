import types from "../actions/types";
export default function(state = null, action) {
  switch (action.type) {
    case types.fetchUser:
      return action.payload || false;
    default:
      return state;
  }
}
