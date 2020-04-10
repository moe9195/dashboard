import { SET_COUNTRY, SET_DATA, LOADING, CHANGE_LANGUAGE } from "./actionTypes";

// const instance = axios.create({
//   baseURL: "https://covid19.mathdro.id/api/countries/",
// });

// export const fetchCountryData = (country) => async (dispatch) => {
//   try {
//     const res = await instance.get(`${country}`);
//     const countryData = res.data;
//     dispatch({ type: SET_COUNTRY, payload: countryData });
//   } catch (err) {
//     console.error(err);
//   }
// };

export const setData = data => {
  return { type: SET_DATA, payload: data };
};

export const loading = condition => {
  return { type: LOADING, payload: condition };
};

export const setCountry = country => {
  return { type: SET_COUNTRY, payload: country };
};

export const changeLanguage = language => {
  return { type: CHANGE_LANGUAGE, payload: language };
};
