import fieldsService from 'app/services/fieldsService';

export const READ_FIELDS = 'READ_FIELDS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const FIELD_NAME_AVAILABLE = 'FIELD_NAME_AVAILABLE';
export const FIELD_NAME_UNAVAILABLE = 'FIELD_NAME_UNAVAILABLE';

export function readFields()
{
    return (dispatch) =>
        fieldsService.getFields()
            .then((fields) =>
                {
                    return dispatch({
                        type: READ_FIELDS,
                        payload: fields
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

export function checkFieldName({name})
{
    return (dispatch) =>
        fieldsService.checkName(name)
            .then((res) =>
                {
                    return dispatch({
                        type: FIELD_NAME_AVAILABLE,
                        payload: res
                    });
                }
            )
            .catch(res =>
            {
                return dispatch({
                    type   : FIELD_NAME_UNAVAILABLE,
                    payload: res
                });
            });
}