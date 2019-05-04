import * as Actions from '../../actions';

const initialState = {
    creationDate: "",
    program: {name: ""},
    title: "",
    description: "",
    field: {name: ""},
    entreprise: {name: ""},
    startDate: "",
    endDate: "",
    duration: "",
    skills: [],
    productOwner: {firstName: "", lastName: ""},
    scrumMaster: {firstName: "", lastName: ""},
    developmentTeam: {firstName: "", lastName: ""},
    sprints: [],
    state: "",
    productBacklog: {items: []}
};

const project = function (state = initialState, action)
{
    switch ( action.type )
    {
        case Actions.READ_PROJECT:
        {
            return action.payload;
        }
        case Actions.REQUEST_ERROR:
        {
            return state;
        }
        default:
        {
            return state
        }
    }
};

export default project;