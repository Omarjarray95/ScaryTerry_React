import projectsService from 'app/services/projectsService';

export const PROJECT_NAME_AVAILABLE = 'PROJECT_NAME_AVAILABLE';
export const PROJECT_NAME_UNAVAILABLE = 'PROJECT_NAME_UNAVAILABLE';

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