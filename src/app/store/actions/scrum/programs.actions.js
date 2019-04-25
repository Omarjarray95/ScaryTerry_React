import programsService from 'app/services/programsService';

export const READ_PROGRAMS = 'READ_PROGRAMS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const PROGRAM_NAME_AVAILABLE = 'PROGRAM_NAME_AVAILABLE';
export const PROGRAM_NAME_UNAVAILABLE = 'PROGRAM_NAME_UNAVAILABLE';

export function readPrograms()
{
    return (dispatch) =>
        programsService.getPrograms()
            .then((programs) =>
                {
                    return dispatch({
                        type: READ_PROGRAMS,
                        payload: programs
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

export function checkProgramName({name})
{
    return (dispatch) =>
        programsService.checkName(name)
            .then((res) =>
                {
                    return dispatch({
                        type: PROGRAM_NAME_AVAILABLE,
                        payload: res
                    });
                }
            )
            .catch(res =>
            {
                return dispatch({
                    type   : PROGRAM_NAME_UNAVAILABLE,
                    payload: res
                });
            });
}