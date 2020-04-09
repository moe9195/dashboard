import { SET_DATA, LOADING, SET_COUNTRY } from "../actions/actionTypes";

const initialState = { countryData: null, loading: true, country: null };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
