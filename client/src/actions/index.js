import axios from "axios";
import types from "./types";

function fetchUser() {
  const request = axios.get("/api/current_user");
  return dispatch => {
    request.then(res => {
      dispatch({
        type: types.fetchUser,
        payload: res.data
      });
    });
  };
}
function fetchSurveysList() {
  const request = axios.get("/api/surveys");
  return dispatch => {
    request.then(res => {
      dispatch({
        type: types.fetchSurveysList,
        payload: res.data
      });
    });
  };
}
function handlePaymentToken(token){
  const request = axios.post("/api/stripe", token);
  return dispatch => {
    request.then(res => {
      dispatch({
        type: types.fetchUser,
        payload: res.data
      })
    })
  }

}

function submitSurvey(values, history){
  const request = axios.post("/api/surveys", values);
  history.push('/surveys');
  return dispatch => {
    request.then(res => {
      dispatch({
        type: types.fetchUser,
        payload: res.data
      })
    })
  }
}

export { fetchUser, fetchSurveysList, handlePaymentToken, submitSurvey };
