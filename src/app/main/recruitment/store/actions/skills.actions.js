import axios from 'axios';

export const GET_SKILLS = '[RECRUITMENT APP] GET SKILLS';
export const SET_PRODUCTS_SEARCH_TEXT = '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export function getSkills()
{
    const request = axios.get('http://localhost:3001/skills/getskills');

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_SKILLS,
                payload: response.data
            })
        }
        );
}
export function setProductsSearchText(event)
{
    return {
        type      : SET_PRODUCTS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
