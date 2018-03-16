import { combineReducers } from 'redux';
import authReducer from './authReducer';
import surveysListReducer from './surveysListReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  surveysList: surveysListReducer,
  form: reduxForm
});
