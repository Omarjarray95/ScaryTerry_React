import projectsService from 'app/services/projectsService';
import * as Actions from '../../../main/showSprintBacklog/store/actions';
import * as scrumActions from '../../../store/actions';

export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_ERROR';
export const READ_PROJECTS = 'READ_PROJECTS';
export const READ_PROJECT = 'READ_PROJECT';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const PROJECT_NAME_AVAILABLE = 'PROJECT_NAME_AVAILABLE';
export const PROJECT_NAME_UNAVAILABLE = 'PROJECT_NAME_UNAVAILABLE';
export const GET_PRODUCTBACKLOG = 'GET_PRODUCTBACKLOG';
export const READ_SUGGESTIONS = 'READ_SUGGESTIONS';

export function submitAddProject({project})
{
    return (dispatch) =>
        projectsService.createProject(project)
            .then((data) =>
                {
                    return dispatch({
                        type: ADD_PROJECT_SUCCESS,
                        payload: data
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : ADD_PROJECT_ERROR,
                    payload: error
                });
            });
}

export function readProjects()
{
    return (dispatch) =>
        projectsService.getProjects()
            .then((projects) =>
                {
                    return dispatch({
                        type: READ_PROJECTS,
                        payload: projects
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function readProject(id)
{
    return (dispatch) =>
        projectsService.getProject(id)
            .then((project) =>
                {
                    return dispatch({
                        type: READ_PROJECT,
                        payload: project
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function affectTeam(data, id)
{
    return (dispatch) =>
        projectsService.affectTeam(data, id)
            .then((project) =>
                {
                    return dispatch({
                        type: READ_PROJECT,
                        payload: project
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function getTeamSuggestions(id)
{
    return (dispatch) =>
        projectsService.getTeamSuggestions(id)
            .then((suggestions) =>
                {
                    return dispatch({
                        type: READ_SUGGESTIONS,
                        payload: suggestions
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function addSprint(data, id)
{
    return (dispatch) =>
        projectsService.addSprint(data, id)
            .then((project) =>
                {
                    return dispatch({
                        type: READ_PROJECT,
                        payload: project
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function deleteSprint(sprint, project)
{
    return (dispatch) =>
        projectsService.deleteSprint(sprint, project)
            .then((project) =>
                {
                    return dispatch({
                        type: READ_PROJECT,
                        payload: project
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function getProductBacklog(id)
{
    return (dispatch) =>
        projectsService.getProductBacklog(id)
            .then((productBacklog) =>
                {
                    return dispatch({
                        type: GET_PRODUCTBACKLOG,
                        payload: productBacklog
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function addItem(data, id)
{
    return (dispatch) =>
        projectsService.addItem(data, id)
            .then((productBacklog) =>
                {
                    return dispatch({
                        type: GET_PRODUCTBACKLOG,
                        payload: productBacklog
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function deleteItem(item, pB)
{
    return (dispatch) =>
        projectsService.deleteItem(item, pB)
            .then((productBacklog) =>
                {
                    return dispatch({
                        type: GET_PRODUCTBACKLOG,
                        payload: productBacklog
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function addUserStory(data, id)
{
    return (dispatch) =>
        projectsService.addUserStory(data, id)
            .then(() =>
                {
                    dispatch(Actions.getUserStories(id, 'Pending'));
                    dispatch(Actions.getUserStories(id, 'In Progress'));
                    dispatch(Actions.getUserStories(id, 'To Verify'));
                    dispatch(Actions.getUserStories(id, 'Done'));
                    dispatch(Actions.getSprintBacklog(id));
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function updateUserStory(data, id, sprint)
{
    return (dispatch) =>
        projectsService.updateUserStory(data, id)
            .then(() =>
                {
                    dispatch(Actions.getUserStories(sprint, 'Pending'));
                    dispatch(Actions.getUserStories(sprint, 'In Progress'));
                    dispatch(Actions.getUserStories(sprint, 'To Verify'));
                    dispatch(Actions.getUserStories(sprint, 'Done'));
                    dispatch(Actions.getSprintBacklog(sprint));
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function updateUserStoryState(id, state, sprint)
{
    return (dispatch) =>
        projectsService.updateUserStoryState(id, state)
            .then(() =>
                {
                    dispatch(Actions.getUserStories(sprint, 'Pending'));
                    dispatch(Actions.getUserStories(sprint, 'In Progress'));
                    dispatch(Actions.getUserStories(sprint, 'To Verify'));
                    dispatch(Actions.getUserStories(sprint, 'Done'));
                    dispatch(Actions.getSprintBacklog(sprint));
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function readSprintProject(id)
{
    return (dispatch) =>
        projectsService.getSprintProject(id)
            .then((project) =>
                {
                    return dispatch({
                        type: READ_PROJECT,
                        payload: project
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function addSkills(data, id)
{
    return (dispatch) =>
        projectsService.addSkills(data, id)
            .then(() =>
                {
                    dispatch(scrumActions.readProject(id));
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : REQUEST_ERROR,
                    payload: error
                });
            });
}

export function checkProjectTitle({title})
{
    return (dispatch) =>
        projectsService.checkTitle(title)
            .then((res) =>
                {
                    return dispatch({
                        type: PROJECT_NAME_AVAILABLE,
                        payload: res
                    });
                }
            )
            .catch(res =>
            {
                return dispatch({
                    type   : PROJECT_NAME_UNAVAILABLE,
                    payload: res
                });
            });
}

export function resetAddProject()
{
    return (dispatch) =>
    {
        return dispatch({
            type   : ADD_PROJECT_ERROR,
            payload: ""
        });
    }
}