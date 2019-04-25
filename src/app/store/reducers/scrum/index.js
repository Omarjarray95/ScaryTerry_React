import {combineReducers} from 'redux';
import enterprises from './enterprises.reducer';
import fields from './fields.reducer';
import programs from './programs.reducer';
import projects from './projects.reducer';
import name from './name.reducer';
import fieldname from "./fieldname.reducer";
import enterprisename from "./enterprisename.reducer";
import project from "./project.reducer";
import operation from "./operation.reducer";

const Reducers = combineReducers({
    operation,
    enterprises,
    fields,
    programs,
    projects,
    project,
    name,
    enterprisename,
    fieldname
});

export default Reducers;