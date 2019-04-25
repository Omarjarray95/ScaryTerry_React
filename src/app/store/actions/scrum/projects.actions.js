import projectsService from 'app/services/projectsService';

export const ADD_PROJECT_SUCCESS = 'ADD_PROJECT_SUCCESS';
export const ADD_PROJECT_ERROR = 'ADD_PROJECT_SUCCESS';
export const READ_PROJECTS = 'READ_PROJECTS';
export const READ_PROJECT = 'READ_PROJECT';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const PROJECT_NAME_AVAILABLE = 'PROJECT_NAME_AVAILABLE';
export const PROJECT_NAME_UNAVAILABLE = 'PROJECT_NAME_UNAVAILABLE';

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