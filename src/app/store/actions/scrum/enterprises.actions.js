import enterprisesService from 'app/services/enterprisesService';

export const READ_ENTERPRISES = 'READ_ENTERPRISES';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const ENTERPRISE_NAME_AVAILABLE = 'ENTERPRISE_NAME_AVAILABLE';
export const ENTERPRISE_NAME_UNAVAILABLE = 'ENTERPRISE_NAME_UNAVAILABLE';

export function readEnterprises()
{
    return (dispatch) =>
        enterprisesService.getEnterprises()
            .then((enterprises) =>
                {
                    return dispatch({
                        type: READ_ENTERPRISES,
                        payload: enterprises
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

export function checkEnterpriseName({name})
{
    return (dispatch) =>
        enterprisesService.checkName(name)
            .then((res) =>
                {
                    return dispatch({
                        type: ENTERPRISE_NAME_AVAILABLE,
                        payload: res
                    });
                }
            )
            .catch(res =>
            {
                return dispatch({
                    type   : ENTERPRISE_NAME_UNAVAILABLE,
                    payload: res
                });
            });
}