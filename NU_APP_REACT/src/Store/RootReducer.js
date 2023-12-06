import LoginReducer from './LoginStore/LoginReducer';
import ProfileReducer from './LoginStore/ProfileReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    login: LoginReducer,
    profile: ProfileReducer
})

export default rootReducer;