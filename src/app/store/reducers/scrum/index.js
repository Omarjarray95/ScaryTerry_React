import {combineReducers} from 'redux';
import enterprises from './enterprises.reducer';
import fields from './fields.reducer';
import programs from './programs.reducer';
import name from './name.reducer';
import fieldname from "./fieldname.reducer";
import enterprisename from "./enterprisename.reducer";

const Reducers = combineReducers({
    enterprises,
    fields,
    programs,
    name,
    enterprisename,
    fieldname
});

export default Reducers;