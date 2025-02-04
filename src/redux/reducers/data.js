import {
  SET_DATA,
  LOADING,
  SET_COUNTRY,
  CHANGE_LANGUAGE
} from "../actions/actionTypes";

const initialState = {
  countryData: null,
  loading: true,
  country: null,
  language: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case SET_COUNTRY:
      return {
        ...state,
        country: action.payload
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
