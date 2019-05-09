import {combineReducers} from 'redux';
import user from './user.reducer';
import managedUser from './managedUser.reducer';
import login from './login.reducer';
import register from './register.reducer';

const authReducers = combineReducers({
    user,
    managedUser,
    login,
    register
});

export default authReducers;