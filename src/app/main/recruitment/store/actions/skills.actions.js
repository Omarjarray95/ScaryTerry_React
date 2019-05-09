import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import { dispatch } from 'rxjs/internal/observable/pairs';

export const GET_SKILLS = '[RECRUITMENT APP] GET SKILLS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';
export const SAVE_SKILL = '[RECRUITMENT APP] SAVE SKILL';
export const DELETE_SKILL = '[RECRUITMENT APP] DELETE SKILL';

export function getSkills()
{
    const request = axios.get('http://localhost:3001/skills/details');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_SKILLS,
                payload: response.data
            })
        }
        );
}

export function deleteSkill(id) {
    const request = axios.get('http://localhost:3001/skills/deleteskill/'+id);

    return (dispatch) =>
        request.then(response=>{
            Promise.all([dispatch({
                type: DELETE_SKILL,
                payload: response.data,
            })]).then(()=>dispatch(getSkills()));
        })
}

export function saveSkill(data)
{
    const request = axios.post('http://localhost:3001/skills/addskill', data);

    console.info("submit",data);
    return (dispatch) =>
        request.then((response) => {
            console.log(response);
               
                dispatch(showMessage({message: 'Skill Saved'}));
                Promise.all([
                    dispatch({
                        type   : SAVE_SKILL,
                        payload: response.data
                    })
                ]).then(()=>dispatch(getSkills()));
            }
        ).catch(err=>{
            
            if(err.response.status===500){
                const error = err.response;   
                console.log(err.response);
                dispatch(showMessage({message: err.response.data.message}));
            }
        });
}

export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
