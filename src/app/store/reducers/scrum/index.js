import {combineReducers} from 'redux';
import enterprises from './enterprises.reducer';
import fields from './fields.reducer';
import programs from './programs.reducer';
import projects from './projects.reducer';
import employees from './employees.reducer';
import suggestions from "./suggestions.reducer";
import skills from "./skills.reducer";
import name from './name.reducer';
import fieldname from "./fieldname.reducer";
import fieldname1 from "./fieldname1.reducer";
import enterprisename from "./enterprisename.reducer";
import programname from "./programname.reducer";
import skillname from "./skillname.reducer";
import project from "./project.reducer";
import operation from "./operation.reducer";
import productBacklog from "./productBacklog.reducer";

const Reducers = combineReducers({
    operation,
    enterprises,
    fields,
    programs,
    projects,
    employees,
    suggestions,
    skills,
    project,
    productBacklog,
    name,
    enterprisename,
    fieldname,
    fieldname1,
    programname,
    skillname
});

export default Reducers;