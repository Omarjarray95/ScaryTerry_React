import skillsService from 'app/services/skillsService';

export const READ_SKILLS = 'READ_SKILLS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SKILL_NAME_AVAILABLE = 'SKILL_NAME_AVAILABLE';
export const SKILL_NAME_UNAVAILABLE = 'SKILL_NAME_UNAVAILABLE';
export const ADD_SKILL_SUCCESS = 'ADD_SKILL_SUCCESS';
export const ADD_SKILL_ERROR = 'ADD_SKILL_ERROR';

export function submitAddSkill(skill)
{
    return (dispatch) =>
        skillsService.createSkill(skill)
            .then((data) =>
                {
                    return dispatch({
                        type: ADD_SKILL_SUCCESS,
                        payload: data
                    });
                }
            )
            .catch(error =>
            {
                return dispatch({
                    type   : ADD_SKILL_ERROR,
                    payload: error
                });
            });
}

export function readSkills()
{
    return (dispatch) =>
        skillsService.getSkills()
            .then((skills) =>
                {
                    return dispatch({
                        type: READ_SKILLS,
                        payload: skills
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

export function checkSkillName(name)
{
    return (dispatch) =>
        skillsService.checkName(name)
            .then((res) =>
                {
                    return dispatch({
                        type: SKILL_NAME_AVAILABLE,
                        payload: res
                    });
                }
            )
            .catch(res =>
            {
                return dispatch({
                    type   : SKILL_NAME_UNAVAILABLE,
                    payload: res
                });
            });
}